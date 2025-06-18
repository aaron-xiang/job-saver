document.addEventListener("DOMContentLoaded", async () => {
  console.log("Popup loaded - starting debug mode");
  
  const jobTitleInput = document.getElementById("jobTitle");
  const companyInput = document.getElementById("company");
  const descriptionInput = document.getElementById("description");
  const saveButton = document.getElementById("saveJob");
  const jobListDiv = document.getElementById("jobList");

  // Initialize database
  try {
    await openDB();
    console.log("Database initialized successfully");
  } catch (error) {
    console.error("Error initializing database:", error);
  }

  // Load and display saved jobs
  async function loadJobs() {
    console.log("Loading jobs...");
    try {
      const jobs = await getAllJobs();
      console.log("Jobs retrieved:", jobs);
      
      jobListDiv.innerHTML = "";

      if (jobs.length === 0) {
        jobListDiv.innerHTML = "<p>No saved jobs yet.</p>";
        console.log("ℹNo jobs found");
        return;
      }

      jobs.forEach((job, index) => {
        console.log(`Processing job ${index + 1}:`, job);
        
        // Check if job has an ID
        if (!job.id) {
          console.warn("Job missing ID:", job);
        }
        
        const jobItem = document.createElement("div");
        jobItem.style.marginBottom = "15px";
        jobItem.style.padding = "10px";
        jobItem.style.border = "1px solid #ddd";
        jobItem.style.borderRadius = "5px";
        
        // Create delete button separately to add event listener
        const deleteButton = document.createElement("button");
        deleteButton.textContent = `Delete`;
        deleteButton.style.cssText = "margin-top: 5px; background: #ff4444; color: white; border: none; padding: 3px 8px; border-radius: 3px; cursor: pointer;";
        
        // Add event listener to delete button (NO inline onclick!)
        deleteButton.addEventListener("click", async () => {
          console.log("Delete button clicked for job ID:", job.id);
          await deleteJobById(job.id);
        });
        
        // Create the job item content
        jobItem.innerHTML = `
          <strong>${job.title || 'No Title'}</strong> at ${job.company || 'No Company'}<br>
          <small>Applied: ${job.dateApplied || 'No Date'}</small><br>
          <small>ID: ${job.id}</small><br>
          <details style="margin-top: 5px;">
            <summary>Job Description</summary>
            <p style="margin: 5px 0; font-size: 12px;">${(job.description || 'No description').substring(0, 200)}${(job.description || '').length > 200 ? '...' : ''}</p>
          </details>
        `;
        
        // Append the delete button to the job item
        jobItem.appendChild(deleteButton);
        jobListDiv.appendChild(jobItem);
      });
      
      console.log("Jobs loaded successfully");
    } catch (error) {
      console.error("Error loading jobs:", error);
      jobListDiv.innerHTML = "<p>Error loading jobs. Check console.</p>";
    }
  }

  // Delete job function
  async function deleteJobById(id) {
    console.log("Delete function called with ID:", id, typeof id);
    
    if (!id) {
      console.error("No ID provided to delete function");
      alert("Error: No job ID provided");
      return;
    }
    
    if (confirm(`Are you sure you want to delete this job?`)) {
      try {
        console.log("Attempting to delete job...");
        const result = await deleteJob(id);
        console.log("Delete result:", result);
        
        console.log("Refreshing job list...");
        await loadJobs(); // Refresh job list
        
      } catch (error) {
        console.error("Error deleting job:", error);
        alert(`Error deleting job: ${error.message}`);
      }
    } else {
      console.log("ℹDelete cancelled by user");
    }
  }

  // Save job function
  async function saveJobData() {
    const title = jobTitleInput.value.trim();
    const company = companyInput.value.trim();
    const description = descriptionInput.value.trim();

    if (!title || !company) {
      alert("Please fill in at least the job title and company.");
      return;
    }

    const jobData = {
      title,
      company,
      description,
      dateApplied: new Date().toISOString().split("T")[0]
    };

    try {
      console.log("Saving job:", jobData);
      await saveJob(jobData);
      alert("Job saved successfully!");
      
      // Clear form
      jobTitleInput.value = "";
      companyInput.value = "";
      descriptionInput.value = "";
      
      // Reload jobs list
      await loadJobs();
    } catch (error) {
      console.error("Error saving job:", error);
      alert("Error saving job. Please try again.");
    }
  }

  // Auto-populate fields when popup opens
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    const response = await chrome.tabs.sendMessage(tab.id, { action: "scrapeJobData" });
    
    if (response) {
      jobTitleInput.value = response.title || "";
      companyInput.value = response.company || "";
      descriptionInput.value = response.description || "";
      console.log("Auto-populated job data:", response);
    }
  } catch (error) {
    console.log("Could not auto-populate job data:", error);
  }

  // Event listeners
  saveButton.addEventListener("click", saveJobData);

  // Load jobs on popup open
  await loadJobs();
});