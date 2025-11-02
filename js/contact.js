/* ============================================
   Contact Page JavaScript
   ============================================ */

/**
 * Toggle location country section
 */
function toggleLocation(country) {
  const locationsList = document.getElementById(country + '-locations');
  const icon = document.getElementById(country + '-icon');
  
  if (locationsList.classList.contains('collapsed')) {
    locationsList.classList.remove('collapsed');
    icon.classList.remove('rotated');
    icon.textContent = '▲';
  } else {
    locationsList.classList.add('collapsed');
    icon.classList.add('rotated');
    icon.textContent = '▼';
  }
}

/**
 * Toggle individual office details
 */
function toggleOffice(office) {
  const details = document.getElementById(office + '-details');
  const icon = document.getElementById(office + '-icon');
  
  // Get all office details
  const allOffices = ['toronto', 'richmond', 'markham', 'vaughan'];
  
  if (details.classList.contains('active')) {
    // Keep the current office open when clicking again
    return;
  }

  // Opening new office - close all others first
  allOffices.forEach(officeId => {
    const officeDetails = document.getElementById(officeId + '-details');
    const officeIcon = document.getElementById(officeId + '-icon');
    
    if (officeDetails && officeDetails.classList.contains('active')) {
      officeDetails.classList.remove('active');
      officeIcon.classList.remove('rotated');
      officeIcon.textContent = '▼';
    }
  });
  
  // Open the clicked office
  details.classList.add('active');
  icon.classList.add('rotated');
  icon.textContent = '▲';
}

// Initialize - Toronto office open by default
document.addEventListener('DOMContentLoaded', function() {
  const torontoDetails = document.getElementById('toronto-details');
  const torontoIcon = document.getElementById('toronto-icon');
  
  if (torontoDetails) {
    torontoDetails.classList.add('active');
    torontoIcon.classList.add('rotated');
    torontoIcon.textContent = '▲';
  }
});
