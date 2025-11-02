/* ============================================
   OrdoSaxum - JavaScript Interactivity
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize smooth scrolling for navigation links
  initializeNavigation();
  
  // Initialize hero video fallback
  initializeHeroVideo();
  
  // Initialize animations on scroll
  initializeScrollAnimations();
});

/**
 * Toggle mobile menu
 */
function toggleMenu() {
  const navMenu = document.getElementById('navMenu');
  const hamburger = document.querySelector('.hamburger');
  
  navMenu.classList.toggle('active');
  hamburger.classList.toggle('active');
}

/**
 * Initialize navigation interactivity
 */
function initializeNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // Close mobile menu when clicking a link
      const navMenu = document.getElementById('navMenu');
      const hamburger = document.querySelector('.hamburger');
      
      if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
      }
      
      // If link is just '#' or empty href, prevent default
      if (this.getAttribute('href') === '#') {
        e.preventDefault();
      }
    });
  });
}

/**
 * Initialize hero video with fallback to placeholder
 */
function initializeHeroVideo() {
  const videoElement = document.querySelector('.hero-video');
  const placeholder = document.getElementById('video-placeholder');
  
  if (videoElement) {
    // Fallback if video fails to load
    videoElement.addEventListener('error', function() {
      videoElement.style.display = 'none';
      placeholder.style.display = 'flex';
    });
    
    // Check if video actually loads
    setTimeout(function() {
      if (!videoElement.readyState || videoElement.readyState < 1) {
        videoElement.style.display = 'none';
        placeholder.style.display = 'flex';
      }
    }, 2000);
  }
}

/**
 * Initialize scroll animations for product cards
 */
function initializeScrollAnimations() {
  const productCards = document.querySelectorAll('.product-card, .collection-item');
  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  productCards.forEach(card => {
    card.style.opacity = '0';
    observer.observe(card);
  });
}

/**
 * Add fade-in animation
 */
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(style);

// Handle dropdown menu for mobile
function handleDropdownMenu() {
  const navItems = document.querySelectorAll('.nav-item');
  
  navItems.forEach(item => {
    item.addEventListener('click', function(e) {
      if (window.innerWidth <= 768) {
        const dropdown = this.querySelector('.dropdown-menu');
        if (dropdown) {
          e.preventDefault();
          dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
        }
      }
    });
  });
}

// Initialize dropdown for mobile on load and resize
window.addEventListener('load', handleDropdownMenu);
window.addEventListener('resize', handleDropdownMenu);

// Smooth scroll behavior for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href !== '#' && document.querySelector(href)) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

/* ============================================
   CAROUSEL FUNCTIONALITY
   ============================================ */

let currentSlide = 0;
const slidesToShow = 4; // Desktop default
let autoPlayInterval;

function slideCarousel(direction) {
  const track = document.getElementById('carouselTrack');
  if (!track) return;
  
  const slides = track.querySelectorAll('.carousel-slide');
  const totalSlides = slides.length;
  
  if (totalSlides === 0) return;
  
  // Determine how many slides to show based on viewport
  let visibleSlides = slidesToShow;
  if (window.innerWidth <= 768) {
    visibleSlides = 2; // Mobile/Tablet: show 2
  }
  
  const maxSlide = Math.max(0, totalSlides - visibleSlides);
  
  // Update current slide
  currentSlide += direction;
  
  // Boundary checks
  if (currentSlide < 0) {
    currentSlide = 0;
  } else if (currentSlide > maxSlide) {
    currentSlide = maxSlide;
  }
  
  // Calculate offset
  const slideWidth = slides[0].offsetWidth;
  const computedStyle = window.getComputedStyle(track);
  const gap = parseInt(computedStyle.gap) || 15;
  const offset = -(currentSlide * (slideWidth + gap));
  
  track.style.transform = `translateX(${offset}px)`;
}

// Auto-play functionality
function startAutoPlay() {
  stopAutoPlay(); // Clear any existing interval
  autoPlayInterval = setInterval(() => {
    const track = document.getElementById('carouselTrack');
    if (!track) return;
    
    const slides = track.querySelectorAll('.carousel-slide');
    const totalSlides = slides.length;
    
    let visibleSlides = slidesToShow;
    if (window.innerWidth <= 768) {
      visibleSlides = 2;
    }
    
    const maxSlide = Math.max(0, totalSlides - visibleSlides);
    
    // If at the end, loop back to start
    if (currentSlide >= maxSlide) {
      currentSlide = -1; // Will become 0 after slideCarousel(1)
    }
    
    slideCarousel(1);
  }, 5000); // Change slide every 5 seconds
}

function stopAutoPlay() {
  if (autoPlayInterval) {
    clearInterval(autoPlayInterval);
    autoPlayInterval = null;
  }
}

// Initialize carousel on page load
function initializeCarousel() {
  const carouselWrapper = document.querySelector('.carousel-wrapper');
  if (carouselWrapper) {
    // Start auto-play
    startAutoPlay();
    
    // Pause on hover
    carouselWrapper.addEventListener('mouseenter', stopAutoPlay);
    carouselWrapper.addEventListener('mouseleave', startAutoPlay);
    
    // Recalculate on window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        // Reset to first slide on resize
        currentSlide = 0;
        slideCarousel(0);
      }, 250);
    });
  }
}

// Add carousel initialization to DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
  initializeCarousel();
});

