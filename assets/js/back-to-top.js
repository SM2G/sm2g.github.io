// Back to top functionality
document.addEventListener('DOMContentLoaded', function() {
  // Create the button element
  const backToTopButton = document.createElement('button');
  backToTopButton.id = 'back-to-top';
  backToTopButton.title = 'Back to top';
  backToTopButton.innerHTML = '<i class="bi bi-arrow-up"></i>';
  document.body.appendChild(backToTopButton);
  
  // Show/hide based on scroll position
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      backToTopButton.classList.add('visible');
    } else {
      backToTopButton.classList.remove('visible');
    }
  });
  
  // Scroll to top when clicked
  backToTopButton.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
});