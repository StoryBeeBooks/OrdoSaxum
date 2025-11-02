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
  
  if (details.classList.contains('active')) {
    details.classList.remove('active');
    icon.classList.remove('rotated');
    icon.textContent = '▼';
  } else {
    details.classList.add('active');
    icon.classList.add('rotated');
    icon.textContent = '▲';
  }
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
