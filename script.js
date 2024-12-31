let currentSlide = 0;
const totalSlides = 4;
const visibleSlides = 3;



function updateDots() {
    const dots = document.querySelectorAll('.timeline-dot');
    dots.forEach((dot, index) => {
    if (index <= currentSlide+2) {
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
    try {
        // Show loading indicator
        const loadingEl = document.getElementById('loading');
        if (loadingEl) loadingEl.style.display = 'block';
        
        

        const username = 'phaschananpak0112';
        const repository = 'resume';
        const branch = 'main';
        const cvPath = 'docs/2024-CV-Phashananpak.pdf';
        
        // Construct the raw content URL
        const downloadUrl = `https://raw.githubusercontent.com/${username}/${repository}/${branch}/${cvPath}`;
        
        // Fetch with timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
        
        const response = await fetch(downloadUrl, {
            signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = '2024-CV-Phaschananpak.pdf';
        
        a.click();
        
        // Cleanup
        window.URL.revokeObjectURL(url);
        
        // Show success message
        alert('Download started successfully!');
        
    } catch (error) {
        console.error('Error downloading CV:', error);
        alert(`Failed to download CV: ${error.message}`);
    } finally {
        // Hide loading indicator
        const loadingEl = document.getElementById('loading');
        if (loadingEl) loadingEl.style.display = 'none';
    }
}



