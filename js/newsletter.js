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
    newsletterForm.addEventListener('submit', async function(event) {
      event.preventDefault();
      
      const submitBtn = document.getElementById('submitBtn');
      const btnText = submitBtn.querySelector('.btn-text');
      const btnLoading = submitBtn.querySelector('.btn-loading');
      const formMessage = document.getElementById('formMessage');
      
      // Check hCaptcha
      const hCaptcha = document.querySelector('.h-captcha textarea[name="h-captcha-response"]');
      if (!hCaptcha || !hCaptcha.value) {
        formMessage.textContent = 'Please complete the captcha verification.';
        formMessage.className = 'form-message form-message-error';
        formMessage.style.display = 'block';
        return;
      }
      
      // Show loading state
      submitBtn.disabled = true;
      btnText.style.display = 'none';
      btnLoading.style.display = 'inline';
      formMessage.style.display = 'none';
      
      // Get form data
      const formData = new FormData(newsletterForm);
      
      try {
        // Submit to Web3Forms
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(Object.fromEntries(formData))
        });
        
        const data = await response.json();
        
        if (response.ok && data.success) {
          // Success message
          formMessage.textContent = 'Thank you for subscribing! Check your email for confirmation.';
          formMessage.className = 'form-message form-message-success';
          formMessage.style.display = 'block';
          
          // Reset form
          newsletterForm.reset();
          
          // Close modal after 3 seconds
          setTimeout(function() {
            closeNewsletterModal();
            formMessage.style.display = 'none';
          }, 3000);
          
        } else {
          throw new Error(data.message || 'Submission failed');
        }
        
      } catch (error) {
        // Error message
        console.error('Form submission error:', error);
        formMessage.textContent = 'Oops! Something went wrong. Please try again or email us directly at info@ordosaxum.ca';
        formMessage.className = 'form-message form-message-error';
        formMessage.style.display = 'block';
        
      } finally {
        // Reset button state
        submitBtn.disabled = false;
        btnText.style.display = 'inline';
        btnLoading.style.display = 'none';
      }
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
