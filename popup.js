document.getElementById("save-btn").addEventListener("click", () => {
    const title = document.getElementById("title").value;
    const company = document.getElementById("company").value;
    const description = document.getElementById("description").value;
    const date = document.getElementById("date").value;
  
    const job = { title, company, description, date };
  
    chrome.storage.local.get({ jobs: [] }, (data) => {
      const jobs = data.jobs;
      jobs.push(job);
      chrome.storage.local.set({ jobs }, () => {
        alert("Job saved!");
        loadJobs();
      });
    });
  });
  
function loadJobs() {
chrome.storage.local.get({ jobs: [] }, (data) => {
    const jobList = document.getElementById("job-list");
    jobList.innerHTML = "";
    data.jobs.forEach((job, index) => {
    const jobDiv = document.createElement("div");
    jobDiv.innerHTML = `<strong>${job.title}</strong> at ${job.company}<br>${job.date}<br>${job.description}<hr>`;
    jobList.appendChild(jobDiv);
    });
});
}

document.addEventListener("DOMContentLoaded", loadJobs);

document.getElementById("scrape-btn").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: "scrapeJobData" }, (response) => {
        if (response) {
          document.getElementById("title").value = response.title;
          document.getElementById("company").value = response.company;
          document.getElementById("description").value = response.description;
          document.getElementById("date").value = response.date;
        } else {
          alert("Failed to scrape job data.");
        }
      });
    });
});