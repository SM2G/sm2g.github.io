// Terminator animation functionality
document.addEventListener('DOMContentLoaded', function() {
  // Create random data points for the animation
  const createDataPoints = (container, count) => {
    for (let i = 0; i < count; i++) {
      const point = document.createElement('div');
      point.className = 'point';
      point.style.left = `${Math.random() * 100}%`;
      point.style.top = `${Math.random() * 100}%`;
      point.style.animationDelay = `${Math.random() * 3}s`;
      container.appendChild(point);
    }
  };
  
  // Initialize all terminator headers
  document.querySelectorAll('.terminator-header').forEach(header => {
    const dataPoints = header.querySelector('.data-points');
    if (dataPoints) {
      createDataPoints(dataPoints, 15);
    }
    
    // Add subtle movement to target box on mouse move
    header.addEventListener('mousemove', (e) => {
      const targetBox = header.querySelector('.target-box');
      if (targetBox) {
        const rect = header.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const offsetX = (x - centerX) / 20;
        const offsetY = (y - centerY) / 20;
        
        targetBox.style.transform = `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px))`;
      }
    });
  });
});