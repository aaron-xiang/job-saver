chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "scrapeJobData") {
      const title = document.querySelector("h1").innerText || ""; // Update selector as needed
      const company = document.querySelector(".company-name").innerText || ""; // Update selector
      const description = document.querySelector(".job-description").innerText || ""; // Update selector
      const date = new Date().toISOString().split("T")[0]; // Default to today
  
      sendResponse({ title, company, description, date });
    }
});
  