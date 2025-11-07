// Sintered Stone Page JavaScript - Interactive Hero Canvas

document.addEventListener('DOMContentLoaded', function() {
  initInteractiveHero();
});

function initInteractiveHero() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const brushSize = 156; // Size of the brush (doubled from 78)
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
  
  bottomImage.src = 'Image Assets/slab2.jpg';
  topImage.src = 'Image Assets/Sintered Stone/SinteredHero1.jpg';

  // Track revealed areas with timestamp
  const revealedAreas = [];
  let lastMousePos = null;

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
    
    // Draw top image with 5% transparency (95% opacity)
    ctx.globalAlpha = 0.95;
    ctx.drawImage(topImage, 0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = 1.0;
  }

  // Mouse move handler with brush stroke
  canvas.addEventListener('mousemove', function(e) {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // If we have a previous position, create brush strokes between points
    if (lastMousePos) {
      const dx = x - lastMousePos.x;
      const dy = y - lastMousePos.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const steps = Math.ceil(distance / 5); // Create points every 5 pixels
      
      for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        const brushX = lastMousePos.x + dx * t;
        const brushY = lastMousePos.y + dy * t;
        
        revealedAreas.push({
          x: brushX,
          y: brushY,
          size: brushSize,
          timestamp: Date.now(),
          opacity: 1
        });
      }
    } else {
      // First point
      revealedAreas.push({
        x: x,
        y: y,
        size: brushSize,
        timestamp: Date.now(),
        opacity: 1
      });
    }
    
    lastMousePos = { x, y };
  });

  canvas.addEventListener('mouseleave', function() {
    lastMousePos = null;
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
    tempCtx.globalAlpha = 0.95;
    tempCtx.drawImage(topImage, 0, 0, canvas.width, canvas.height);
    tempCtx.globalAlpha = 1.0;
    
    // Erase brush strokes from the top image (reveal bottom image)
    tempCtx.globalCompositeOperation = 'destination-out';
    
    // Update and draw revealed areas with brush effect
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
      
      // Draw soft brush with radial gradient
      const gradient = tempCtx.createRadialGradient(
        area.x, area.y, 0,
        area.x, area.y, area.size
      );
      gradient.addColorStop(0, `rgba(0, 0, 0, ${area.opacity})`);
      gradient.addColorStop(0.5, `rgba(0, 0, 0, ${area.opacity * 0.6})`);
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      tempCtx.fillStyle = gradient;
      tempCtx.fillRect(
        area.x - area.size,
        area.y - area.size,
        area.size * 2,
        area.size * 2
      );
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
