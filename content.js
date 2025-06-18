console.log("Job Saver content script loaded");

// Listen for messages from popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "scrapeJobData") {
    const jobData = scrapeJobData();
    sendResponse(jobData);
  }
});

function scrapeJobData() {
  let title = "";
  let company = "";
  let description = "";

  // Try different selectors for popular job sites
  const titleSelectors = [
    '.jobsearch-JobInfoHeader-title', // Indeed
    '[data-testid="job-title"]', // LinkedIn
    '.job-title',
    'h1',
    '[class*="title"]',
    '[class*="job-title"]'
  ];

  const companySelectors = [
    '.jobsearch-InlineCompanyRating', // Indeed
    '.job-details-jobs-unified-top-card__company-name', // LinkedIn
    '.company-name',
    '[class*="company"]',
    '[data-testid="company-name"]'
  ];

  const descriptionSelectors = [
    '.jobsearch-jobDescriptionText', // Indeed
    '.jobs-description-content', // LinkedIn
    '.job-description',
    '[class*="description"]',
    '[class*="job-description"]'
  ];

  // Try to find job title
  for (const selector of titleSelectors) {
    const element = document.querySelector(selector);
    if (element && element.textContent.trim()) {
      title = element.textContent.trim();
      break;
    }
  }

  // Try to find company name
  for (const selector of companySelectors) {
    const element = document.querySelector(selector);
    if (element && element.textContent.trim()) {
      company = element.textContent.trim();
      break;
    }
  }

  // Try to find job description
  for (const selector of descriptionSelectors) {
    const element = document.querySelector(selector);
    if (element && element.textContent.trim()) {
      description = element.textContent.trim();
      break;
    }
  }

  // Fallback: try to get page title if no job title found
  if (!title) {
    title = document.title;
  }

  return { title, company, description };
}