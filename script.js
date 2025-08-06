// Initialize file lists from localStorage or use defaults
const defaultFiles = {
    assignments: [
        { name: 'Assignment 1 - Networking Basics (PDF)', url: 'files/Assignment-1-Networking.pdf' },
        { name: 'Project Proposal Guide (DOCX)', url: 'files/Project-Proposal-Guide.docx' }
    ],
    notes: [
        { name: 'Week 1 - Intro to IT (PDF)', url: 'files/Week1-Intro-to-IT.pdf' },
        { name: 'Database ERD Cheatsheet (PNG Image)', url: 'files/Database-ERD-Cheatsheet.png' }
    ],
    guides: [
        { name: 'W3Schools HTML Tutorial (External Link)', url: 'https://www.w3schools.com/html/' },
        { name: 'MDN JavaScript Guide (External Link)', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' }
    ]
};

// Load files from localStorage or use defaults
function loadFiles() {
    const savedFiles = JSON.parse(localStorage.getItem('bsitFiles')) || defaultFiles;
    
    // Clear existing lists
    document.getElementById('assignmentsList').innerHTML = '';
    document.getElementById('notesList').innerHTML = '';
    document.getElementById('guidesList').innerHTML = '';

    // Populate lists
    for (const category in savedFiles) {
        const list = document.getElementById(`${category}List`);
        savedFiles[category].forEach(file => {
            const li = document.createElement('li');
            li.innerHTML = `<a href="${file.url}" target="_blank">${file.name}</a>`;
            list.appendChild(li);
        });
    }
}

// Upload file handler
function uploadFile() {
    const fileInput = document.getElementById('fileInput');
    const categorySelect = document.getElementById('categorySelect');
    const category = categorySelect.value;
    const files = fileInput.files;

    if (files.length === 0) {
        alert('Please select at least one file!');
        return;
    }

    const savedFiles = JSON.parse(localStorage.getItem('bsitFiles')) || defaultFiles;

    Array.from(files).forEach(file => {
        // Simulate file upload by assuming file is in 'files/' folder
        const fileName = file.name;
        const fileUrl = `files/${fileName}`; // Assumes file is manually placed in 'files/' folder
        savedFiles[category].push({ name: fileName, url: fileUrl });

        // Add to the respective list
        const list = document.getElementById(`${category}List`);
        const li = document.createElement('li');
        li.innerHTML = `<a href="${fileUrl}" target="_blank">${fileName}</a>`;
        list.appendChild(li);
    });

    // Save to localStorage
    localStorage.setItem('bsitFiles', JSON.stringify(savedFiles));

    // Clear input
    fileInput.value = '';
}

// Load files on page load
document.addEventListener('DOMContentLoaded', loadFiles);
