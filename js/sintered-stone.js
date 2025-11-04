// Sintered Stone Page JavaScript - Interactive Hero Canvas

document.addEventListener('DOMContentLoaded', function() {
  initInteractiveHero();
});

function initInteractiveHero() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const revealRadius = 80; // Size of the "eraser" circle
  const fadeTime = 5000; // 5 seconds before covering back up
  
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
    drawScene();
  }

  function drawScene() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw bottom image (fully visible underneath)
    ctx.drawImage(bottomImage, 0, 0, canvas.width, canvas.height);
    
    // Draw top image with 70% transparency (30% opacity) on a temporary canvas
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
    
    // Draw bottom image (always visible underneath)
    ctx.drawImage(bottomImage, 0, 0, canvas.width, canvas.height);
    
    // Create a temporary canvas for the top layer with holes
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    const tempCtx = tempCanvas.getContext('2d');
    
    // Draw top image with transparency on temp canvas
    tempCtx.globalAlpha = 0.3;
    tempCtx.drawImage(topImage, 0, 0, canvas.width, canvas.height);
    tempCtx.globalAlpha = 1.0;
    
    // Erase circles from the top image (reveal bottom image)
    tempCtx.globalCompositeOperation = 'destination-out';
    
    // Update and draw revealed areas
    for (let i = revealedAreas.length - 1; i >= 0; i--) {
      const area = revealedAreas[i];
      const age = now - area.timestamp;
      
      if (age > fadeTime) {
        // Fade out the reveal effect (top image comes back)
        area.opacity -= 0.02;
        if (area.opacity <= 0) {
          revealedAreas.splice(i, 1);
          continue;
        }
      }
      
      // Draw the eraser circle
      tempCtx.globalAlpha = area.opacity;
      tempCtx.beginPath();
      tempCtx.arc(area.x, area.y, area.radius, 0, Math.PI * 2);
      tempCtx.fill();
    }
    
    // Reset composite operation
    tempCtx.globalCompositeOperation = 'source-over';
    tempCtx.globalAlpha = 1.0;
    
    // Draw the modified top layer onto main canvas
    ctx.drawImage(tempCanvas, 0, 0);
    
    requestAnimationFrame(animate);
  }

  // Handle window resize
  window.addEventListener('resize', resizeCanvas);
}
