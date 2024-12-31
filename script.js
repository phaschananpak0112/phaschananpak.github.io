let currentSlide = 0;
const totalSlides = 4;
const visibleSlides = 3;

function updateDots() {
    const dots = document.querySelectorAll('.timeline-dot');
    dots.forEach((dot, index) => {
    if (index <= currentSlide + 2) {
        dot.classList.add('active');
    } else {
        dot.classList.remove('active');
    }
    });
}

function updateNavigation() {
    const prevButton = document.querySelector('.nav-button:first-child');
    const nextButton = document.querySelector('.nav-button:last-child');
    
    prevButton.disabled = currentSlide === 0;
    nextButton.disabled = currentSlide >= totalSlides - visibleSlides;
}

function nextSlide() {
    if (currentSlide < totalSlides - visibleSlides) {
    currentSlide++;
    updateSlides();
    }
}

function prevSlide() {
    if (currentSlide > 0) {
    currentSlide--;
    updateSlides();
    }
}

function updateSlides() {
    const grid = document.querySelector('.education-grid');
    grid.style.transform = `translateX(-${currentSlide * 33.33}%)`;
    updateNavigation();
    updateDots();
}


// download cv
// In the downloadCV function, update these variables:

async function downloadCV() {
    // Replace with your GitHub username and repository name
    const username = 'phaschananpak0112';        // Your GitHub username
    const repository = 'resume';    // Your repository name
    const branch = 'main'; 
    
    // Path to your CV in the docs folder
    const cvPath = 'docs/2024-CV-Phaschananpak.pdf';
    
    try {
        // Construct the raw content URL
        const downloadUrl = `https://raw.githubusercontent.com/${username}/${repository}/${branch}/${cvPath}`;
        
        // Fetch the PDF
        const response = await fetch(downloadUrl);
        
        if (!response.ok) {
            throw new Error('Failed to download CV');
        }
        
        // Convert response to blob
        const blob = await response.blob();
        
        // Create download link
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = '2024-CV-Phaschananpak.pdf'; // Name that will appear when downloading
        
        // Trigger download
        document.body.appendChild(a);
        a.click();
        
        // Cleanup
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        
    } catch (error) {
        console.error('Error downloading CV:', error);
        document.getElementById('errorMessage').style.display = 'block';
    }
}

function logDownload() {
    const downloads = JSON.parse(localStorage.getItem('downloadCV') || '[]');
    downloads.push(new Date().toISOString());
    localStorage.setItem('downloadCV', JSON.stringify(downloads));
}

// Add to downloadCV function:
await logDownload();