(async function() {
  try {
      const db = await openDB();
      console.log("Database created/opened successfully:", db);
  } catch (error) {
      console.error("Error creating database:", error);
  }
})();

// async function loadJobs() {
//   const jobs = await getAllJobs();
//   const jobList = document.getElementById("jobList");
//   jobList.innerHTML = "";

//   jobs.forEach((job) => {
//       const jobItem = document.createElement("div");
//       jobItem.innerHTML = `
//           <strong>${job.title}</strong> at ${job.company} <br>
//           Applied on: ${job.dateApplied} <br>
//           <button onclick="deleteJobById(${job.id})">Delete</button>
//           <hr>
//       `;
//       jobList.appendChild(jobItem);
//   });
// }

// async function deleteJobById(id) {
//   await deleteJob(id);
//   loadJobs(); // Refresh job list
// }

// document.addEventListener("DOMContentLoaded", loadJobs);



// document.addEventListener("DOMContentLoaded", () => {
//   const jobTitleInput = document.getElementById("jobTitle");
//   const companyInput = document.getElementById("company");
//   const descriptionInput = document.getElementById("description");
//   const saveButton = document.getElementById("saveJob");
//   const jobsList = document.getElementById("jobsList");

//   // Load saved jobs from storage and display them
//   function loadJobs() {
//     browser.storage.local.get(null, (data) => {
//       jobsList.innerHTML = ""; // Clear the list
//       Object.entries(data).forEach(([id, job]) => {
//         const li = document.createElement("li");
//         li.textContent = `${job.jobTitle} at ${job.company}`;
//         li.title = job.description;
//         li.dataset.id = id;

//         // Add delete button
//         const deleteBtn = document.createElement("button");
//         deleteBtn.textContent = "Delete";
//         deleteBtn.style.marginLeft = "10px";
//         deleteBtn.addEventListener("click", () => deleteJob(id));
//         li.appendChild(deleteBtn);

//         jobsList.appendChild(li);
//       });
//     });
//   }

//   // Save job to local storage
//   function saveJob() {
//     const jobTitle = jobTitleInput.value.trim();
//     const company = companyInput.value.trim();
//     const description = descriptionInput.value.trim();

//     if (!jobTitle || !company || !description) {
//       alert("Please fill in all fields before saving.");
//       return;
//     }

//     const job = { jobTitle, company, description, date: new Date().toISOString() };
//     const jobId = Date.now().toString();

//     browser.storage.local.set({ [jobId]: job }, () => {
//       console.log("Job saved:", job);
//       loadJobs(); // Reload jobs list
//       jobTitleInput.value = "";
//       companyInput.value = "";
//       descriptionInput.value = "";
//     });
//   }

//   // Delete job from storage
//   function deleteJob(jobId) {
//     browser.storage.local.remove(jobId, () => {
//       console.log("Job deleted:", jobId);
//       loadJobs(); // Reload jobs list
//     });
//   }

//   // Event Listeners
//   saveButton.addEventListener("click", saveJob);

//   // Load jobs on popup open
//   loadJobs();
// });
