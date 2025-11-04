// ===================================
// FABRICATION MASTERY PAGE JAVASCRIPT
// ===================================

// Portfolio Gallery Filtering
document.addEventListener('DOMContentLoaded', function() {
  const filters = document.querySelectorAll('.portfolio-filter');
  const items = document.querySelectorAll('.portfolio-item');

  filters.forEach(filter => {
    filter.addEventListener('click', function() {
      const filterValue = this.getAttribute('data-filter');

      // Update active filter
      filters.forEach(f => f.classList.remove('active'));
      this.classList.add('active');

      // Filter items
      items.forEach(item => {
        const category = item.getAttribute('data-category');
        
        if (filterValue === 'all' || category === filterValue) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });
});

// ===================================
// 3D INTERACTIVE CANVAS - DIGITAL ATELIER
// ===================================

// Check if Three.js is loaded
if (typeof THREE !== 'undefined') {
  const canvas = document.getElementById('fabricationCanvas');
  
  if (canvas) {
    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0a);

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      45,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 2, 8);
    camera.lookAt(0, 0, 0);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvas, 
      antialias: true,
      alpha: true 
    });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight1.position.set(5, 10, 5);
    scene.add(directionalLight1);

    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.4);
    directionalLight2.position.set(-5, 5, -5);
    scene.add(directionalLight2);

    // Create a simple table model (placeholder for actual 3D model)
    const tableGroup = new THREE.Group();

    // Tabletop
    const topGeometry = new THREE.BoxGeometry(4, 0.1, 2.5);
    const topMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xdedede,
      metalness: 0.3,
      roughness: 0.4
    });
    const tabletop = new THREE.Mesh(topGeometry, topMaterial);
    tabletop.position.y = 1;
    tableGroup.add(tabletop);

    // Legs
    const legGeometry = new THREE.BoxGeometry(0.15, 0.9, 0.15);
    const legMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xc0c0c0,
      metalness: 0.2,
      roughness: 0.5
    });

    const legPositions = [
      [-1.8, 0.45, -1.1],
      [1.8, 0.45, -1.1],
      [-1.8, 0.45, 1.1],
      [1.8, 0.45, 1.1]
    ];

    legPositions.forEach(pos => {
      const leg = new THREE.Mesh(legGeometry, legMaterial);
      leg.position.set(pos[0], pos[1], pos[2]);
      tableGroup.add(leg);
    });

    // Add wireframe for technical look
    const wireframeGeometry = new THREE.EdgesGeometry(topGeometry);
    const wireframeMaterial = new THREE.LineBasicMaterial({ 
      color: 0x666666,
      linewidth: 1
    });
    const wireframe = new THREE.LineSegments(wireframeGeometry, wireframeMaterial);
    wireframe.position.copy(tabletop.position);
    tableGroup.add(wireframe);

    scene.add(tableGroup);

    // Mouse interaction
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    canvas.addEventListener('mousedown', (e) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    canvas.addEventListener('mousemove', (e) => {
      if (isDragging) {
        const deltaX = e.clientX - previousMousePosition.x;
        const deltaY = e.clientY - previousMousePosition.y;

        tableGroup.rotation.y += deltaX * 0.01;
        tableGroup.rotation.x += deltaY * 0.01;

        previousMousePosition = { x: e.clientX, y: e.clientY };
      }
    });

    canvas.addEventListener('mouseup', () => {
      isDragging = false;
    });

    canvas.addEventListener('mouseleave', () => {
      isDragging = false;
    });

    // Touch support for mobile
    canvas.addEventListener('touchstart', (e) => {
      isDragging = true;
      const touch = e.touches[0];
      previousMousePosition = { x: touch.clientX, y: touch.clientY };
    });

    canvas.addEventListener('touchmove', (e) => {
      if (isDragging) {
        const touch = e.touches[0];
        const deltaX = touch.clientX - previousMousePosition.x;
        const deltaY = touch.clientY - previousMousePosition.y;

        tableGroup.rotation.y += deltaX * 0.01;
        tableGroup.rotation.x += deltaY * 0.01;

        previousMousePosition = { x: touch.clientX, y: touch.clientY };
      }
    });

    canvas.addEventListener('touchend', () => {
      isDragging = false;
    });

    // Animation with GSAP (if loaded)
    if (typeof gsap !== 'undefined') {
      // Slow rotation animation
      gsap.to(tableGroup.rotation, {
        y: Math.PI * 2,
        duration: 20,
        repeat: -1,
        ease: "none"
      });

      // Subtle floating animation
      gsap.to(tableGroup.position, {
        y: 0.2,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });
    }

    // Render loop
    function animate() {
      requestAnimationFrame(animate);
      
      // Slow auto-rotation when not dragging
      if (!isDragging) {
        tableGroup.rotation.y += 0.001;
      }
      
      renderer.render(scene, camera);
    }

    animate();

    // Handle window resize
    window.addEventListener('resize', () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });
  }
} else {
  console.warn('Three.js not loaded. 3D canvas will not be rendered.');
}
