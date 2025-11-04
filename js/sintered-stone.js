// Sintered Stone Page JavaScript - Interactive Hero Canvas

document.addEventListener('DOMContentLoaded', function() {
  initInteractiveHero();
});

function initInteractiveHero() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const revealRadius = 80; // Size of the "eraser" circle
  const fadeTime = 4000; // 4 seconds before fading back to top image
  
  // Set canvas size
  function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    loadImages();
  }

  // Load both images
  const bottomImage = new Image();
  const topImage = new Image();
  let imagesLoaded = 0;
  
  bottomImage.src = 'Image Assets/Sintered Stone/SinteredHero2.JPG';
  topImage.src = 'Image Assets/Sintered Stone/SinteredHero1.jpg';

  // Track revealed areas with timestamp
  const revealedAreas = [];

  function checkImageLoad() {
    imagesLoaded++;
    if (imagesLoaded === 2) {
      resizeCanvas();
      animate();
    }
  }

  bottomImage.onload = checkImageLoad;
  topImage.onload = checkImageLoad;

  function loadImages() {
    if (imagesLoaded < 2) return;
    
    // Draw bottom image (fully visible underneath)
    ctx.drawImage(bottomImage, 0, 0, canvas.width, canvas.height);
    
    // Draw top image with 70% transparency (30% opacity)
    ctx.globalAlpha = 0.3;
    ctx.drawImage(topImage, 0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = 1.0;
  }

  // Mouse move handler
  canvas.addEventListener('mousemove', function(e) {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Add revealed area with timestamp
    revealedAreas.push({
      x: x,
      y: y,
      radius: revealRadius,
      timestamp: Date.now(),
      opacity: 1
    });
  });

  // Animation loop
  function animate() {
    const now = Date.now();
    
    // Clear canvas and redraw base layers
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw bottom image (fully visible)
    ctx.drawImage(bottomImage, 0, 0, canvas.width, canvas.height);
    
    // Draw top image with transparency
    ctx.globalAlpha = 0.3;
    ctx.drawImage(topImage, 0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = 1.0;
    
    // Process revealed areas (erase top image where cursor has been)
    ctx.globalCompositeOperation = 'destination-out';
    
    // Update and draw revealed areas
    for (let i = revealedAreas.length - 1; i >= 0; i--) {
      const area = revealedAreas[i];
      const age = now - area.timestamp;
      
      if (age > fadeTime) {
        // Fade out the reveal effect
        area.opacity -= 0.02;
        if (area.opacity <= 0) {
          revealedAreas.splice(i, 1);
          continue;
        }
      }
      
      // Draw the reveal circle
      ctx.globalAlpha = area.opacity * 0.3; // Match the top image opacity
      ctx.beginPath();
      ctx.arc(area.x, area.y, area.radius, 0, Math.PI * 2);
      ctx.fill();
    }
    
    // Reset composite operation
    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 1.0;
    
    requestAnimationFrame(animate);
  }

  // Handle window resize
  window.addEventListener('resize', resizeCanvas);
}
