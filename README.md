# Job Saver Browser Extension

A Chrome browser extension designed to help job seekers save and organize job listings during their job hunt process. Never lose track of job descriptions again when listings get deleted!

## 🎯 Problem Solved

Have you ever applied to a job, only to find that the job listing was deleted before your interview? This extension solves that problem by automatically capturing and storing job details for future reference.

## ✨ Features

- **Auto-Extract Job Data**: Automatically captures job title, company name, and description from popular job sites
- **Manual Editing**: Review and edit extracted information before saving
- **Local Storage**: All data is stored locally using IndexedDB - your privacy is protected
- **Job Management**: View all saved jobs with expandable descriptions
- **Delete Function**: Remove jobs you no longer need
- **Date Tracking**: Automatically records when you saved each job
- **Cross-Platform**: Works on major job sites including Indeed, LinkedIn, SEEK, and more

## 🚀 Installation

### From Source (Development)
1. Clone or download this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right corner
4. Click "Load unpacked" and select the extension folder
5. The Job Saver extension should now appear in your extensions toolbar

## 📖 How to Use

### Saving a Job
1. **Navigate to a job listing** on any job site (Indeed, LinkedIn, SEEK, etc.)
2. **Click the Job Saver extension icon** in your browser toolbar
3. **Review the auto-populated fields**:
   - Job Title
   - Company Name
   - Job Description
4. **Edit any information** if needed or add missing details
5. **Click "Save Job"** to store the listing

### Viewing Saved Jobs
1. **Click the extension icon** from any page
2. **Scroll down to "Saved Jobs"** section
3. **Click on job descriptions** to expand/collapse full details
4. **Use the Delete button** to remove jobs you no longer need

### Managing Your Data
- All job data is stored locally on your computer
- No data is sent to external servers
- You can delete individual jobs at any time
- Data persists across browser sessions

## 🌐 Supported Job Sites

The extension works on most job sites and includes optimized selectors for:
- **Indeed** (indeed.com)
- **LinkedIn Jobs** (linkedin.com/jobs)
- **SEEK** (seek.com.au)
- **Generic job sites** with standard HTML structures

Even if a site isn't specifically supported, you can manually enter job details.

## 🔧 Technical Details

### Technologies Used
- **Manifest V3**: Latest Chrome extension standard
- **IndexedDB**: Local database for storing job data
- **Content Scripts**: For extracting job data from web pages
- **Chrome Extension APIs**: For popup and tab communication

### Permissions
- `storage`: To save job data locally
- `activeTab`: To read job information from the current tab

### Browser Compatibility
- Chrome (Manifest V3)
- Edge (Chromium-based)
- Other Chromium-based browsers

## 🛠️ Development

### Prerequisites
- Basic knowledge of JavaScript, HTML, CSS
- Chrome browser for testing

### Local Development
1. Make changes to the source files
2. Go to `chrome://extensions/`
3. Click the refresh icon on the Job Saver extension
4. Test your changes

### File Descriptions
- **`manifest.json`**: Extension configuration and permissions
- **`popup.html`**: User interface for the extension popup
- **`popup.js`**: Handles popup interactions and job management
- **`content.js`**: Extracts job data from web pages
- **`db.js`**: Database operations using IndexedDB

## 🐛 Troubleshooting

### Extension Not Working
- Ensure you've enabled the extension in `chrome://extensions/`
- Check that the extension has the necessary permissions
- Try refreshing the extension or reloading the page

### Data Not Auto-Populating
- The extension may not recognize the job site's structure
- Manually enter the job details - this is completely normal
- Consider reporting the site for future support

### Jobs Not Saving
- Check the browser console for error messages
- Ensure you've filled in at least the job title and company name
- Try refreshing the extension