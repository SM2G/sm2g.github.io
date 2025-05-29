// Cyberpunk/Terminator themed hero animation
document.addEventListener('DOMContentLoaded', function() {
  const heroTitle = document.querySelector('.cyber-hero .hero-title');
  if (heroTitle) {
    // Set data-text attribute for glitch effect
    heroTitle.setAttribute('data-text', heroTitle.textContent);
  }
  
  // Add random glitches
  const cyberHero = document.querySelector('.cyber-hero');
  if (cyberHero) {
    // Create glitch elements
    const createGlitchElements = () => {
      // Clear existing glitches
      const existingGlitches = cyberHero.querySelectorAll('.glitch-element');
      existingGlitches.forEach(el => el.remove());
      
      // Create new glitches
      const glitchCount = Math.floor(window.innerWidth / 200); // Responsive number of glitches
      
      for (let i = 0; i < glitchCount; i++) {
        const glitch = document.createElement('div');
        glitch.className = 'glitch-element';
        
        // Random positioning
        glitch.style.left = `${Math.random() * 100}%`;
        glitch.style.top = `${Math.random() * 100}%`;
        
        // Random size
        const size = Math.random() * 50 + 10;
        glitch.style.width = `${size}px`;
        glitch.style.height = `${Math.random() * 5 + 1}px`;
        
        // Random color
        const useSecondary = Math.random() > 0.7;
        glitch.style.backgroundColor = useSecondary ? 
          getComputedStyle(document.documentElement).getPropertyValue('--secondary-color') : 
          getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
        
        // Random opacity
        glitch.style.opacity = Math.random() * 0.5 + 0.1;
        
        // Add to hero
        cyberHero.appendChild(glitch);
        
        // Animate glitch
        setTimeout(() => {
          if (glitch.parentNode) {
            glitch.remove();
          }
        }, Math.random() * 1000 + 200);
      }
      
      // Schedule next glitch
      setTimeout(createGlitchElements, Math.random() * 2000 + 1000);
    };
    
    // Start glitch effect
    createGlitchElements();
  }
});