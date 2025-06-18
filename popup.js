document.addEventListener("DOMContentLoaded", async () => {
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

  // Auto-populate fields when popup opens
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    const response = await chrome.tabs.sendMessage(tab.id, { action: "scrapeJobData" });
    
    if (response) {
      jobTitleInput.value = response.title || "";
      companyInput.value = response.company || "";
      descriptionInput.value = response.description || "";
    }
  } catch (error) {
    console.log("Could not auto-populate job data:", error);
  }

  // Load and display saved jobs
  async function loadJobs() {
    try {
      const jobs = await getAllJobs();
      jobListDiv.innerHTML = "";

      if (jobs.length === 0) {
        jobListDiv.innerHTML = "<p>No saved jobs yet.</p>";
        return;
      }

      jobs.forEach((job) => {
        const jobItem = document.createElement("div");
        jobItem.style.marginBottom = "15px";
        jobItem.style.padding = "10px";
        jobItem.style.border = "1px solid #ddd";
        jobItem.style.borderRadius = "5px";
        
        jobItem.innerHTML = `
          <strong>${job.title}</strong> at ${job.company}<br>
          <small>Applied: ${job.dateApplied}</small><br>
          <details style="margin-top: 5px;">
            <summary>Job Description</summary>
            <p style="margin: 5px 0; font-size: 12px;">${job.description.substring(0, 200)}${job.description.length > 200 ? '...' : ''}</p>
          </details>
          <button onclick="deleteJobById(${job.id})" style="margin-top: 5px; background: #ff4444; color: white; border: none; padding: 3px 8px; border-radius: 3px; cursor: pointer;">Delete</button>
        `;
        jobListDiv.appendChild(jobItem);
      });
    } catch (error) {
      console.error("Error loading jobs:", error);
      jobListDiv.innerHTML = "<p>Error loading jobs.</p>";
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
      await saveJob(jobData);
      alert("Job saved successfully!");
      
      // Clear form
      jobTitleInput.value = "";
      companyInput.value = "";
      descriptionInput.value = "";
      
      // Reload jobs list
      loadJobs();
    } catch (error) {
      console.error("Error saving job:", error);
      alert("Error saving job. Please try again.");
    }
  }

  // Delete job function (make it global so it can be called from HTML)
  window.deleteJobById = async function(id) {
    if (confirm("Are you sure you want to delete this job?")) {
      try {
        await deleteJob(id);
        loadJobs(); // Refresh job list
      } catch (error) {
        console.error("Error deleting job:", error);
        alert("Error deleting job. Please try again.");
      }
    }
  };

  // Event listeners
  saveButton.addEventListener("click", saveJobData);

  // Load jobs on popup open
  loadJobs();
});