// console.log("Content script loaded!")

// alert("hello world")

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//     if (message.action === "scrapeJobData") {
//       const title = document.querySelector("h1").innerText || ""; // Update selector as needed
//       const company = document.querySelector(".company-name").innerText || ""; // Update selector
//       const description = document.querySelector(".job-description").innerText || ""; // Update selector
//       const date = new Date().toISOString().split("T")[0]; // Default to today
  
//       sendResponse({ title, company, description, date });
//     }
// });
  
document.getElementById("saveJobBtn").addEventListener("click", async () => {
    const jobTitle = document.getElementById("jobTitle").value;
    const jobDescription = document.getElementById("jobDescription").value;
    const company = document.getElementById("company").value;
    const dateApplied = new Date().toISOString().split("T")[0];

    const jobData = { title: jobTitle, description: jobDescription, company, dateApplied };

    await saveJob(jobData);
    alert("Job saved successfully!");
});