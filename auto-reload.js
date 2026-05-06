// Simple auto-reload functionality
let lastModified = {};

function checkForChanges() {
    // Check main files that might change
    const files = ['index.html', 'style.css', 'script.js'];
    
    files.forEach(file => {
        fetch(file, { method: 'HEAD' })
            .then(response => {
                const modified = response.headers.get('last-modified');
                if (lastModified[file] && lastModified[file] !== modified) {
                    console.log(`File ${file} changed, reloading...`);
                    location.reload();
                }
                lastModified[file] = modified;
            })
            .catch(() => {
                // File might not exist, that's ok
            });
    });
}

// Check for changes every 2 seconds
setInterval(checkForChanges, 2000);

// Initial check
checkForChanges();
