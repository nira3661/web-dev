/**
 * Pundra University - Hero Slider Script
 * Handles smooth auto-sliding, arrow navigation, and dot indicators
 */
let currentSlide = 0;
const slides = document.querySelectorAll('.hero-slider-container .slide');
const dots = document.querySelectorAll('.slider-dots .dot');
let slideInterval = null;

// Function to activate a specific slide index
function showSlide(index) {
  if (slides.length === 0) return;

  if (index >= slides.length) {
    currentSlide = 0;
  } else if (index < 0) {
    currentSlide = slides.length - 1;
  } else {
    currentSlide = index;
  }

  // Update active slide class
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === currentSlide);
  });

  // Update active dot class
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === currentSlide);
  });
}

// Next / Previous buttons trigger
function changeSlide(direction) {
  showSlide(currentSlide + direction);
  resetTimer();
}

// Indicator dots trigger
function goToSlide(index) {
  showSlide(index);
  resetTimer();
}

// Start auto-play loop (slides every 4.5 seconds)
function startAutoPlay() {
  slideInterval = setInterval(() => {
    showSlide(currentSlide + 1);
  }, 4500);
}

// Reset timer whenever user manually navigates
function resetTimer() {
  clearInterval(slideInterval);
  startAutoPlay();
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  startAutoPlay();
});