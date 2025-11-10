// Natural Stone Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // Gallery Filter Functionality
  initGalleryFilters();
  
  // Stone Card Hover Effects
  initStoneCards();
  
  // Smooth Scroll for CTA Button
  initSmoothScroll();
});

// Gallery Filter Functionality
function initGalleryFilters() {
  const filters = document.querySelectorAll('.gallery-filter');
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  filters.forEach(filter => {
    filter.addEventListener('click', function() {
      const filterValue = this.getAttribute('data-filter');
      
      // Update active state
      filters.forEach(f => f.classList.remove('active'));
      this.classList.add('active');
      
      // Filter gallery items
      galleryItems.forEach(item => {
        const category = item.getAttribute('data-category');
        
        if (filterValue === 'all' || category === filterValue) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });
}

// Stone Card Interactive Effects
function initStoneCards() {
  const stoneCards = document.querySelectorAll('.stone-card');
  
  stoneCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      // Add subtle parallax effect
      this.addEventListener('mousemove', handleCardParallax);
    });
    
    card.addEventListener('mouseleave', function() {
      this.removeEventListener('mousemove', handleCardParallax);
      // Reset transform
      const image = this.querySelector('.stone-card-image');
      if (image) {
        image.style.transform = 'scale(1.1)';
      }
    });
  });
}

function handleCardParallax(e) {
  const card = e.currentTarget;
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;
  
  const percentX = (x - centerX) / centerX;
  const percentY = (y - centerY) / centerY;
  
  const image = card.querySelector('.stone-card-image');
  if (image) {
    image.style.transform = `scale(1.1) translate(${percentX * 10}px, ${percentY * 10}px)`;
  }
}

// Smooth Scroll
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href !== '#!') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
}

// Intersection Observer for Fade-in Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Apply fade-in animation to sections
document.addEventListener('DOMContentLoaded', function() {
  const sections = document.querySelectorAll('.natural-intro, .stone-categories, .marble-usage, .inspiration-gallery, .natural-cta');
  
  sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(section);
  });
});
