// Hero animation functionality
document.addEventListener('DOMContentLoaded', function() {
  const heroSection = document.querySelector('.hero-section');
  if (!heroSection) return;
  
  // Create data points
  const heroOverlay = heroSection.querySelector('.hero-overlay');
  if (heroOverlay) {
    // Create random data points
    for (let i = 0; i < 20; i++) {
      const dataPoint = document.createElement('div');
      dataPoint.className = 'data-point';
      dataPoint.style.left = `${Math.random() * 100}%`;
      dataPoint.style.top = `${Math.random() * 100}%`;
      dataPoint.style.animationDelay = `${Math.random() * 3}s`;
      heroOverlay.appendChild(dataPoint);
    }
  }
  
  // Add subtle parallax effect on mouse move
  heroSection.addEventListener('mousemove', (e) => {
    const targetBox = heroSection.querySelector('.target-box.main');
    if (targetBox) {
      const rect = heroSection.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const offsetX = (x - centerX) / 30;
      const offsetY = (y - centerY) / 30;
      
      targetBox.style.transform = `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px))`;
    }
    
    // Move data points slightly
    const dataPoints = heroSection.querySelectorAll('.data-point');
    dataPoints.forEach(point => {
      const moveX = (e.clientX - window.innerWidth / 2) / 100;
      const moveY = (e.clientY - window.innerHeight / 2) / 100;
      point.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
  });
});