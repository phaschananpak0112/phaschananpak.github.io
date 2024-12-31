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