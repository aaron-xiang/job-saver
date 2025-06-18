const DB_NAME = "JobTrackerDB";
const STORE_NAME = "jobs";
const DB_VERSION = 1;

/**
 * Open IndexedDB connection and create object store if it doesn't exist.
 */
function openDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        // Runs if database is created or upgraded
        request.onupgradeneeded = (event) => {
            const db = event.target.result;

            // Create an object store named "jobs" if it doesn't exist
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: "id", autoIncrement: true });
                console.log("Object store 'jobs' created.");
            }
        };

        request.onsuccess = (event) => {
            console.log("Database opened:", DB_NAME);
            resolve(event.target.result);
        };

        request.onerror = (event) => {
            console.error("Database error:", event.target.error);
            reject(event.target.error);
        };
    });
}

/**
 * Save a job application to IndexedDB.
 * @param {Object} jobData - Job details (title, description, company, dateApplied).
 */
async function saveJob(jobData) {
    const db = await openDB();
    const transaction = db.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    store.add(jobData);

    return new Promise((resolve, reject) => {
        transaction.oncomplete = () => resolve(true);
        transaction.onerror = () => reject(transaction.error);
    });
}

/**
 * Retrieve all saved job applications.
 * @returns {Promise<Array>} List of jobs.
 */
async function getAllJobs() {
    const db = await openDB();
    const transaction = db.transaction(STORE_NAME, "readonly");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.getAll();

    return new Promise((resolve, reject) => {
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

/**
 * Delete a job by ID.
 * @param {number} id - The ID of the job to delete.
 */
async function deleteJob(id) {
    const db = await openDB();
    const transaction = db.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    store.delete(id);

    return new Promise((resolve, reject) => {
        transaction.oncomplete = () => resolve(true);
        transaction.onerror = () => reject(transaction.error);
    });
}
