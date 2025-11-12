/* ============================================
   Newsletter Popup Functionality
   ============================================ */

// Show newsletter modal
function showNewsletterModal() {
  const modal = document.getElementById('newsletterModal');
  if (modal) {
    modal.classList.add('show');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }
}

// Close newsletter modal
function closeNewsletterModal() {
  const modal = document.getElementById('newsletterModal');
  if (modal) {
    modal.classList.remove('show');
    document.body.style.overflow = ''; // Restore scrolling
    
    // Set cookie to prevent showing again for 7 days
    setCookie('newsletterShown', 'true', 7);
  }
}

// Close modal when clicking outside the content
window.addEventListener('click', function(event) {
  const modal = document.getElementById('newsletterModal');
  if (event.target === modal) {
    closeNewsletterModal();
  }
});

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    closeNewsletterModal();
  }
});

// Set cookie
function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// Get cookie
function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

// Show popup on page load (after 2 seconds) if not shown before
window.addEventListener('load', function() {
  const newsletterShown = getCookie('newsletterShown');
  
  if (!newsletterShown) {
    setTimeout(function() {
      showNewsletterModal();
    }, 2000); // Show after 2 seconds
  }
});

// Handle form submission
document.addEventListener('DOMContentLoaded', function() {
  const newsletterForm = document.getElementById('newsletterForm');
  
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(event) {
      event.preventDefault();
      
      // Get form values
      const userType = document.getElementById('userType').value;
      const emailAddress = document.getElementById('emailAddress').value;
      const emailConsent = document.getElementById('emailConsent').checked;
      
      // Validate
      if (!userType || !emailAddress || !emailConsent) {
        alert('Please fill in all required fields and accept the terms.');
        return;
      }
      
      // Create email body
      const subject = encodeURIComponent('Newsletter Subscription Request');
      const body = encodeURIComponent(
        `New Newsletter Subscription\n\n` +
        `User Type: ${userType}\n` +
        `Email Address: ${emailAddress}\n` +
        `Consent Given: Yes\n\n` +
        `Please add this subscriber to the newsletter mailing list.`
      );
      
      // Open default email client
      window.location.href = `mailto:info@ordosaxum.ca?subject=${subject}&body=${body}`;
      
      // Show success message
      alert('Thank you for subscribing! Your email client will open to send your subscription request.');
      
      // Close modal and set cookie
      closeNewsletterModal();
      
      // Reset form
      newsletterForm.reset();
    });
  }
  
  // Add click handler for "Subscribe to our newsletter" link
  const subscribeLinks = document.querySelectorAll('.cta-subtitle-link');
  subscribeLinks.forEach(link => {
    link.addEventListener('click', function(event) {
      event.preventDefault();
      showNewsletterModal();
    });
  });
});
