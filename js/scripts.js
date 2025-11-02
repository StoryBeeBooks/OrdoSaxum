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
    // Auto-play disabled per user request
    // startAutoPlay();
    
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
  initializeStoneMasonryAnimation();
});

/* ============================================
   ELEGANT PARTICLE FLOW ANIMATION (THREE.JS)
   ============================================ */

function initializeStoneMasonryAnimation() {
  const container = document.getElementById('stoneBlocksAnimation');
  const canvas = document.getElementById('canvas3d');
  if (!container || !canvas || typeof THREE === 'undefined') return;

  // Scene setup
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf5f5f5);
  scene.fog = new THREE.Fog(0xf5f5f5, 20, 50);
  
  const camera = new THREE.PerspectiveCamera(
    60,
    container.clientWidth / container.clientHeight,
    0.1,
    100
  );
  camera.position.set(0, 5, 15);
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGLRenderer({ 
    canvas: canvas,
    antialias: true,
    alpha: true 
  });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Elegant lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);

  const mainLight = new THREE.DirectionalLight(0xffffff, 0.8);
  mainLight.position.set(10, 10, 10);
  scene.add(mainLight);

  const accentLight = new THREE.PointLight(0xffd700, 0.5, 30);
  accentLight.position.set(-5, 5, 5);
  scene.add(accentLight);

  // Create particle system
  const particleCount = 2000;
  const particles = [];
  
  // Particle geometry and material
  const particleGeometry = new THREE.SphereGeometry(0.05, 8, 8);
  const particleMaterials = [
    new THREE.MeshStandardMaterial({ 
      color: 0xe8e8e8,
      roughness: 0.3,
      metalness: 0.2,
      emissive: 0xffffff,
      emissiveIntensity: 0.1
    }),
    new THREE.MeshStandardMaterial({ 
      color: 0xd4c4b0,
      roughness: 0.4,
      metalness: 0.1,
      emissive: 0xffd700,
      emissiveIntensity: 0.05
    }),
    new THREE.MeshStandardMaterial({ 
      color: 0xc8c8c8,
      roughness: 0.3,
      metalness: 0.3,
      emissive: 0xffffff,
      emissiveIntensity: 0.08
    })
  ];

  // Define countertop shape (target positions for particles)
  const countertopShape = [];
  
  // Main countertop surface
  for (let x = -6; x <= 6; x += 0.3) {
    for (let z = -2; z <= 2; z += 0.3) {
      countertopShape.push({
        x: x,
        y: 0,
        z: z
      });
    }
  }

  // Create particles with random starting positions
  for (let i = 0; i < particleCount; i++) {
    const material = particleMaterials[Math.floor(Math.random() * particleMaterials.length)].clone();
    const particle = new THREE.Mesh(particleGeometry, material);
    
    // Random starting position (scattered in space)
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.random() * Math.PI;
    const radius = 15 + Math.random() * 10;
    
    particle.position.set(
      radius * Math.sin(phi) * Math.cos(theta),
      radius * Math.sin(phi) * Math.sin(theta),
      radius * Math.cos(phi)
    );
    
    // Target position (on countertop)
    if (i < countertopShape.length) {
      particle.userData.target = new THREE.Vector3(
        countertopShape[i].x,
        countertopShape[i].y + (Math.random() - 0.5) * 0.2,
        countertopShape[i].z
      );
    } else {
      // Extra particles orbit around
      particle.userData.target = new THREE.Vector3(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 20
      );
    }
    
    particle.userData.velocity = new THREE.Vector3();
    particle.userData.delay = Math.random() * 1000;
    particle.userData.speed = 0.02 + Math.random() * 0.03;
    particle.userData.orbitSpeed = (Math.random() - 0.5) * 0.001;
    particle.userData.phase = Math.random() * Math.PI * 2;
    
    scene.add(particle);
    particles.push(particle);
  }

  // Create the formed countertop (appears after particles settle)
  const countertopGeometry = new THREE.BoxGeometry(12, 0.3, 4);
  
  // Load texture from slab image
  const textureLoader = new THREE.TextureLoader();
  const slabTexture = textureLoader.load('Image Assets/slab1.jpg'); // Use slab1.jpg (lighter) or slab2.jpg (darker)
  slabTexture.wrapS = THREE.RepeatWrapping;
  slabTexture.wrapT = THREE.RepeatWrapping;
  slabTexture.repeat.set(2, 1); // Adjust repeat for better tiling
  
  const countertopMaterial = new THREE.MeshStandardMaterial({
    map: slabTexture,
    roughness: 0.2,
    metalness: 0.3,
    transparent: true,
    opacity: 0
  });
  const countertop = new THREE.Mesh(countertopGeometry, countertopMaterial);
  countertop.position.set(0, 0, 0);
  scene.add(countertop);

  // Add white/grey edges to the countertop
  const edgesGeometry = new THREE.EdgesGeometry(countertopGeometry);
  const edgesMaterial = new THREE.LineBasicMaterial({ 
    color: 0xffffff, 
    linewidth: 2,
    transparent: true,
    opacity: 0
  });
  const edges = new THREE.LineSegments(edgesGeometry, edgesMaterial);
  countertop.add(edges);

  // Animation state
  let animationStarted = false;
  let animationTime = 0;
  let formationComplete = false;
  let userCanRotate = false;
  
  // Mouse interaction variables
  let isDragging = false;
  let previousMousePosition = { x: 0, y: 0 };
  let countertopRotation = { x: 0, y: 0 };

  // Mouse event listeners for rotation
  canvas.addEventListener('mousedown', (e) => {
    if (userCanRotate) {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    }
  });

  canvas.addEventListener('mousemove', (e) => {
    if (isDragging && userCanRotate) {
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;
      
      countertopRotation.y += deltaX * 0.01;
      countertopRotation.x += deltaY * 0.01;
      
      // Limit vertical rotation
      countertopRotation.x = Math.max(-Math.PI / 4, Math.min(Math.PI / 4, countertopRotation.x));
      
      previousMousePosition = { x: e.clientX, y: e.clientY };
    }
  });

  canvas.addEventListener('mouseup', () => {
    isDragging = false;
  });

  canvas.addEventListener('mouseleave', () => {
    isDragging = false;
  });

  // Touch events for mobile
  canvas.addEventListener('touchstart', (e) => {
    if (userCanRotate && e.touches.length === 1) {
      isDragging = true;
      previousMousePosition = { 
        x: e.touches[0].clientX, 
        y: e.touches[0].clientY 
      };
    }
  });

  canvas.addEventListener('touchmove', (e) => {
    if (isDragging && userCanRotate && e.touches.length === 1) {
      e.preventDefault();
      const deltaX = e.touches[0].clientX - previousMousePosition.x;
      const deltaY = e.touches[0].clientY - previousMousePosition.y;
      
      countertopRotation.y += deltaX * 0.01;
      countertopRotation.x += deltaY * 0.01;
      
      countertopRotation.x = Math.max(-Math.PI / 4, Math.min(Math.PI / 4, countertopRotation.x));
      
      previousMousePosition = { 
        x: e.touches[0].clientX, 
        y: e.touches[0].clientY 
      };
    }
  });

  canvas.addEventListener('touchend', () => {
    isDragging = false;
  });

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);

    if (animationStarted) {
      animationTime += 16;

      particles.forEach((particle, i) => {
        const elapsed = animationTime - particle.userData.delay;
        
        if (elapsed > 0 && particle.material.opacity > 0) {
          // Calculate direction to target
          const direction = new THREE.Vector3()
            .subVectors(particle.userData.target, particle.position)
            .normalize();
          
          const distance = particle.position.distanceTo(particle.userData.target);
          
          // Determine if this particle is part of the countertop or just floating
          const isFloatingParticle = i >= countertopShape.length;
          
          if (!isFloatingParticle) {
            // Particles that form the countertop
            const flowOffset = new THREE.Vector3(
              Math.sin(animationTime * 0.001 + particle.userData.phase) * 0.5,
              Math.cos(animationTime * 0.001 + particle.userData.phase * 1.3) * 0.5,
              Math.sin(animationTime * 0.001 + particle.userData.phase * 0.7) * 0.5
            );
            
            particle.userData.velocity.lerp(
              direction.multiplyScalar(particle.userData.speed).add(flowOffset.multiplyScalar(0.02)),
              0.1
            );
            
            particle.position.add(particle.userData.velocity);
            
            // When particles get very close to target, start fading them
            if (distance < 0.8) {
              const fadeProgress = 1 - (distance / 0.8);
              particle.material.opacity = 1 - fadeProgress;
              particle.scale.setScalar(1 - fadeProgress * 0.5);
              
              // Start materializing the countertop as particles arrive
              if (countertop.material.opacity < 1) {
                countertop.material.opacity += 0.002;
                edges.material.opacity += 0.002;
              }
            }
          } else {
            // Floating particles - gentle orbital movement around the countertop
            const time = animationTime * 0.0005;
            const orbitRadius = 8 + Math.sin(particle.userData.phase) * 2;
            const orbitSpeed = particle.userData.orbitSpeed * 200;
            
            particle.position.x = Math.cos(time + particle.userData.phase) * orbitRadius;
            particle.position.y = Math.sin(time * 1.5 + particle.userData.phase * 1.3) * 3 + 2;
            particle.position.z = Math.sin(time + particle.userData.phase) * orbitRadius;
            
            // Keep them semi-transparent and shimmering
            particle.material.opacity = 0.3 + Math.sin(animationTime * 0.002 + i * 0.1) * 0.15;
          }
          
          // Gentle rotation for all particles
          particle.rotation.x += particle.userData.orbitSpeed;
          particle.rotation.y += particle.userData.orbitSpeed * 1.3;
          
          // Enhanced shimmer effect
          if (particle.material.emissiveIntensity !== undefined && !isFloatingParticle) {
            const proximityGlow = Math.max(0, 1 - (distance / 10));
            particle.material.emissiveIntensity = 
              0.05 + Math.sin(animationTime * 0.003 + i * 0.1) * 0.1 + proximityGlow * 0.3;
          }
        }
      });
      
      // Enable user rotation once countertop is fully formed
      if (countertop.material.opacity >= 0.99 && !userCanRotate) {
        userCanRotate = true;
        canvas.style.cursor = 'grab';
      }

      // Continue fading countertop in smoothly
      if (animationTime > 2500 && countertop.material.opacity < 1) {
        countertop.material.opacity = Math.min(1, countertop.material.opacity + 0.008);
        edges.material.opacity = Math.min(1, edges.material.opacity + 0.008);
      }
      
      // Apply user rotation if enabled
      if (userCanRotate) {
        countertop.rotation.x += (countertopRotation.x - countertop.rotation.x) * 0.1;
        countertop.rotation.y += (countertopRotation.y - countertop.rotation.y) * 0.1;
        
        // Update cursor
        canvas.style.cursor = isDragging ? 'grabbing' : 'grab';
      }

      // Camera movement (only before user interaction)
      if (!userCanRotate) {
        const cameraTime = animationTime * 0.0002;
        camera.position.x = Math.sin(cameraTime) * 3;
        camera.position.y = 5 + Math.sin(cameraTime * 0.7) * 1;
        camera.lookAt(0, 0, 0);

        // Accent light movement
        accentLight.position.x = Math.cos(animationTime * 0.001) * 8;
        accentLight.position.z = Math.sin(animationTime * 0.001) * 8;
      }
    }

    renderer.render(scene, camera);
  }

  // Start animation when visible
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animationStarted) {
        animationStarted = true;
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2
  });

  observer.observe(container);

  // Handle window resize
  window.addEventListener('resize', () => {
    const width = container.clientWidth;
    const height = container.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  });

  // Start animation loop
  animate();
}

