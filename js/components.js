// Component Loader - Load navbar and footer dynamically
(function() {
  // Function to load HTML component
  async function loadComponent(elementId, componentPath) {
    try {
      const response = await fetch(componentPath);
      if (!response.ok) {
        throw new Error(`Failed to load ${componentPath}`);
      }
      const html = await response.text();
      const element = document.getElementById(elementId);
      if (element) {
        element.innerHTML = html;
      }
    } catch (error) {
      console.error('Error loading component:', error);
    }
  }

  // Determine the base path based on current location
  function getBasePath() {
    const path = window.location.pathname;
    // Check if we're in a subdirectory (like /policies/)
    if (path.includes('/policies/')) {
      return '../components';
    }
    return 'components';
  }

  // Load components when DOM is ready
  document.addEventListener('DOMContentLoaded', function() {
    const basePath = getBasePath();
    
    // Load navbar
    loadComponent('navbar-placeholder', `${basePath}/navbar.html`);
    
    // Load footer
    loadComponent('footer-placeholder', `${basePath}/footer.html`);
  });
})();
