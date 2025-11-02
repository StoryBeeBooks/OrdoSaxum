/* ============================================
   Policies Page JavaScript
   ============================================ */

/**
 * Toggle policy section
 */
function togglePolicy(policyId) {
  const content = document.getElementById(policyId + '-content');
  const icon = document.getElementById(policyId + '-icon');
  
  // Get all policy sections
  const allPolicies = ['accessibility', 'privacy', 'terms', 'cookie'];
  
  // If clicking on an already-open policy, do nothing (keep it open)
  if (content.classList.contains('active')) {
    return;
  }
  
  // Opening new policy - close all others first
  allPolicies.forEach(id => {
    const policyContent = document.getElementById(id + '-content');
    const policyIcon = document.getElementById(id + '-icon');
    
    if (policyContent && policyContent.classList.contains('active')) {
      policyContent.classList.remove('active');
      policyIcon.classList.remove('rotated');
      policyIcon.textContent = '▼';
    }
  });
  
  // Open the clicked policy
  content.classList.add('active');
  icon.classList.add('rotated');
  icon.textContent = '▲';
}
