// Network animation with connecting dots
document.addEventListener('DOMContentLoaded', function() {
  const canvas = document.getElementById('network-canvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color') || '#00FFFF';
  const secondaryColor = getComputedStyle(document.documentElement).getPropertyValue('--secondary-color') || '#FF3300';
  
  // Set canvas size
  const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  
  // Handle resize events
  window.addEventListener('resize', () => {
    // Update navbar height variable on resize
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      const navbarHeight = navbar.offsetHeight;
      document.documentElement.style.setProperty('--navbar-height', navbarHeight + 'px');
    }
    
    resizeCanvas();
    mouseRadius = Math.min(150, Math.max(80, window.innerWidth / 8));
    initParticles(); // Reinitialize particles on resize
  });
  
  resizeCanvas();
  
  // Particle class
  class Particle {
    constructor(x, y) {
      this.x = x || Math.random() * canvas.width;
      this.y = y || Math.random() * canvas.height;
      // Adjust speed based on screen size
      const speedFactor = window.innerWidth < 768 ? 0.3 : 0.5;
      this.vx = (Math.random() * speedFactor - speedFactor/2) * (canvas.width / 1920);
      this.vy = (Math.random() * speedFactor - speedFactor/2) * (canvas.height / 1080);
      // Adjust radius based on screen size
      this.radius = Math.random() * (window.innerWidth < 768 ? 1.5 : 2) + 1;
      this.connected = false;
    }
    
    update() {
      // Update position
      this.x += this.vx;
      this.y += this.vy;
      
      // Bounce off edges
      if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
      if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;
      
      // Keep within bounds
      this.x = Math.max(0, Math.min(canvas.width, this.x));
      this.y = Math.max(0, Math.min(canvas.height, this.y));
    }
    
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.connected ? secondaryColor : primaryColor;
      ctx.fill();
    }
  }
  
  // Create particles - adjust count based on screen size
  const getParticleCount = () => {
    const density = window.innerWidth < 768 ? 15000 : 10000; // Lower density (more particles) on larger screens
    return Math.min(80, Math.max(30, Math.floor(window.innerWidth * window.innerHeight / density)));
  };
  
  let particles = [];
  
  const initParticles = () => {
    particles = [];
    const count = getParticleCount();
    for (let i = 0; i < count; i++) {
      particles.push(new Particle());
    }
  };
  
  initParticles();
  
  // Mouse/touch position
  let mouseX = canvas.width / 2;
  let mouseY = canvas.height / 2;
  let mouseRadius = Math.min(150, Math.max(80, window.innerWidth / 8)); // Responsive radius
  
  // Handle both mouse and touch events
  const updateMousePosition = (x, y) => {
    const rect = canvas.getBoundingClientRect();
    mouseX = x - rect.left;
    mouseY = y - rect.top;
  };
  
  canvas.parentElement.addEventListener('mousemove', (e) => {
    updateMousePosition(e.clientX, e.clientY);
  });
  
  // Touch support for mobile
  canvas.parentElement.addEventListener('touchmove', (e) => {
    e.preventDefault(); // Prevent scrolling when touching the canvas
    const touch = e.touches[0];
    updateMousePosition(touch.clientX, touch.clientY);
  });
  
  canvas.parentElement.addEventListener('touchstart', (e) => {
    const touch = e.touches[0];
    updateMousePosition(touch.clientX, touch.clientY);
  });
  
  // Performance optimization for mobile
  const isMobile = window.innerWidth < 768;
  const frameSkip = isMobile ? 2 : 1; // Skip frames on mobile for better performance
  let frameCount = 0;
  
  // Animation loop
  function animate() {
    frameCount++;
    
    // Skip frames on mobile for better performance
    if (frameCount % frameSkip !== 0) {
      requestAnimationFrame(animate);
      return;
    }
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Update and draw particles
    particles.forEach(particle => {
      particle.connected = false;
      particle.update();
    });
    
    // Draw connections
    ctx.lineWidth = isMobile ? 0.5 : 0.75;
    
    // Connect particles to mouse if close enough
    particles.forEach(particle => {
      const dx = mouseX - particle.x;
      const dy = mouseY - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < mouseRadius) {
        particle.connected = true;
        const opacity = 1 - distance / mouseRadius;
        
        ctx.beginPath();
        ctx.moveTo(particle.x, particle.y);
        ctx.lineTo(mouseX, mouseY);
        ctx.strokeStyle = `rgba(${parseInt(secondaryColor.slice(1, 3), 16)}, ${parseInt(secondaryColor.slice(3, 5), 16)}, ${parseInt(secondaryColor.slice(5, 7), 16)}, ${opacity})`;
        ctx.stroke();
      }
    });
    
    // Connect particles to each other if close enough
    // Calculate connection distance based on screen size
    const connectionDistance = Math.min(100, Math.max(60, window.innerWidth / 15));
    
    for (let i = 0; i < particles.length; i++) {
      // Optimize by only checking nearby particles
      const nearbyParticles = particles.filter((p, idx) => {
        if (idx <= i) return false;
        const dx = particles[i].x - p.x;
        const dy = particles[i].y - p.y;
        return dx * dx + dy * dy < connectionDistance * connectionDistance;
      });
      
      for (let j = 0; j < nearbyParticles.length; j++) {
        const particle = nearbyParticles[j];
        const dx = particles[i].x - particle.x;
        const dy = particles[i].y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < connectionDistance) {
          const opacity = 1 - distance / connectionDistance;
          
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particle.x, particle.y);
          ctx.strokeStyle = `rgba(${parseInt(primaryColor.slice(1, 3), 16)}, ${parseInt(primaryColor.slice(3, 5), 16)}, ${parseInt(primaryColor.slice(5, 7), 16)}, ${opacity * 0.5})`;
          ctx.stroke();
        }
      }
    }
    
    // Draw particles on top of connections
    particles.forEach(particle => {
      particle.draw();
    });
    
    requestAnimationFrame(animate);
  }
  
  animate();
});