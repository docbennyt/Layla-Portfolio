// ========================================
// LAYLA PORTFOLIO - COMPLETE JAVASCRIPT
// ========================================

document.addEventListener("DOMContentLoaded", () => {

  // ========================================
  // WATERCOLOR MOUSE TRAIL ANIMATION
  // ========================================
  class WatercolorTrail {
    constructor() {
      this.container = document.getElementById('trail-container');
      if (!this.container) return;

      this.particles = [];
      this.lastSpawnTime = 0;
      this.spawnInterval = 50;
      this.isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      
      this.flowerTypes = [
        { id: 'blue-flower', weight: 0.4 },
        { id: 'yellow-flower', weight: 0.4 },
        { id: 'green-leaf', weight: 0.2 }
      ];
      
      this.init();
    }

    init() {
      if (this.isTouchDevice) {
        this.spawnInterval = 100;
        
        document.addEventListener('touchstart', (e) => {
          const now = Date.now();
          if (now - this.lastSpawnTime >= this.spawnInterval) {
            const touch = e.touches[0];
            this.spawnFlower(touch.clientX, touch.clientY);
            this.lastSpawnTime = now;
          }
        });

        document.addEventListener('touchmove', (e) => {
          const now = Date.now();
          if (now - this.lastSpawnTime >= this.spawnInterval) {
            const touch = e.touches[0];
            this.spawnFlower(touch.clientX, touch.clientY);
            this.lastSpawnTime = now;
          }
        });
        
        this.startAmbientFlowers();
      } else {
        document.addEventListener('mousemove', (e) => {
          const now = Date.now();
          if (now - this.lastSpawnTime >= this.spawnInterval) {
            this.spawnFlower(e.clientX, e.clientY);
            this.lastSpawnTime = now;
          }
        });
      }

      this.animate();
    }

    startAmbientFlowers() {
      const spawnAmbient = () => {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        this.spawnFlower(x, y);
        
        const delay = 2000 + Math.random() * 2000;
        setTimeout(spawnAmbient, delay);
      };
      
      spawnAmbient();
    }

    spawnFlower(x, y) {
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.classList.add('flower-particle');
      svg.setAttribute('width', '24');
      svg.setAttribute('height', '24');
      svg.setAttribute('viewBox', '0 0 20 20');
      
      const flowerType = this.selectWeightedRandom(this.flowerTypes);
      
      const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
      use.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', `#${flowerType.id}`);
      svg.appendChild(use);
      
      const rotation = Math.random() * 360;
      const scale = 0.5 + Math.random() * 0.7;
      const duration = 1500 + Math.random() * 500;
      const floatDistance = 5 + Math.random() * 5;
      
      svg.style.left = `${x - 12}px`;
      svg.style.top = `${y - 12}px`;
      svg.style.transform = `rotate(${rotation}deg) scale(${scale})`;
      
      this.container.appendChild(svg);
      
      const particle = {
        element: svg,
        startTime: Date.now(),
        duration: duration,
        startY: y,
        floatDistance: floatDistance,
        startScale: scale
      };
      
      this.particles.push(particle);
    }

    selectWeightedRandom(items) {
      const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);
      let random = Math.random() * totalWeight;
      
      for (const item of items) {
        if (random < item.weight) return item;
        random -= item.weight;
      }
      
      return items[0];
    }

    animate() {
      const now = Date.now();
      
      for (let i = this.particles.length - 1; i >= 0; i--) {
        const particle = this.particles[i];
        const elapsed = now - particle.startTime;
        const progress = Math.min(elapsed / particle.duration, 1);
        
        if (progress >= 1) {
          particle.element.remove();
          this.particles.splice(i, 1);
          continue;
        }
        
        const eased = 1 - Math.pow(1 - progress, 3);
        
        const newY = particle.startY - (particle.floatDistance * eased);
        const opacity = 1 - progress;
        const scale = particle.startScale * (1 - progress * 0.3);
        
        const rotation = particle.element.style.transform.match(/rotate\(([\d.]+)deg\)/)[1];
        particle.element.style.transform = `rotate(${rotation}deg) scale(${scale})`;
        particle.element.style.top = `${newY - 12}px`;
        particle.element.style.opacity = opacity;
      }
      
      requestAnimationFrame(() => this.animate());
    }
  }

  // Initialize Watercolor Trail
  new WatercolorTrail();

  // ========================================
  // MOBILE NAVIGATION SYSTEM
  // ========================================
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const overlay = document.querySelector(".nav-overlay");
  const body = document.body;
  const navLinkItems = document.querySelectorAll(".nav-links a");

  const openMenu = () => {
    navLinks.classList.add("open");
    menuToggle.classList.add("active");
    overlay.classList.add("show");
    body.style.overflow = "hidden";
  };

  const closeMenu = () => {
    navLinks.classList.remove("open");
    menuToggle.classList.remove("active");
    overlay.classList.remove("show");
    body.style.overflow = "";
  };

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.contains("open") ? closeMenu() : openMenu();
    });
  }

  if (overlay) {
    overlay.addEventListener("click", closeMenu);
  }

  navLinkItems.forEach(link => {
    link.addEventListener("click", (e) => {
      closeMenu();
      
      // Update active state
      navLinkItems.forEach(l => l.classList.remove("active"));
      link.classList.add("active");
    });
  });

  // Handle mobile menu Contact button click
  if (navLinks) {
    navLinks.addEventListener('click', (e) => {
      // Check if click is on the pseudo-element area (contact button)
      const rect = navLinks.getBoundingClientRect();
      const clickY = e.clientY - rect.top;
      const menuHeight = navLinks.scrollHeight;
      
      // If click is near bottom (where ::after button is)
      if (clickY > menuHeight - 80 && clickY < menuHeight) {
        window.location.href = 'mailto:rutendomucheri@gmail.com';
        closeMenu();
      }
    });
  }

  // Swipe to close on mobile
  let startX = 0;
  if (navLinks) {
    navLinks.addEventListener("touchstart", e => {
      startX = e.touches[0].clientX;
    });

    navLinks.addEventListener("touchmove", e => {
      const diff = e.touches[0].clientX - startX;
      if (diff < -60) closeMenu();
    });
  }

  // ========================================
  // HEADER SCROLL EFFECT
  // ========================================
  const header = document.querySelector(".site-header");

  window.addEventListener("scroll", () => {
    if (header) {
      header.classList.toggle("scrolled", window.scrollY > 40);
    }
  });

  // ========================================
  // TYPEWRITER EFFECT
  // ========================================
  const words = ["Rutendo", "Layla", "a Student", "a Leader"];
  const target = document.getElementById("typewriter");
  let wordIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function typeEffect() {
    if (!target) return;
    const word = words[wordIndex];

    if (!deleting) {
      target.textContent = word.slice(0, ++charIndex);
      if (charIndex === word.length) {
        setTimeout(() => deleting = true, 1400);
      }
    } else {
      target.textContent = word.slice(0, --charIndex);
      if (charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
      }
    }

    setTimeout(typeEffect, deleting ? 45 : 90);
  }

  typeEffect();

  // ========================================
  // GALLERY FILTER SYSTEM
  // ========================================
  const filterTabs = document.querySelectorAll('.filter-tab');
  const resumeItems = document.querySelectorAll('.resume-item');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const filter = tab.dataset.filter;
      
      // Update active tab
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      // Filter items with animation
      resumeItems.forEach(item => {
        const category = item.dataset.category;
        
        if (filter === 'all' || category === filter) {
          item.classList.remove('hidden');
          item.style.opacity = '0';
          item.style.transform = 'scale(0.8)';
          
          setTimeout(() => {
            item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.8)';
          setTimeout(() => {
            item.classList.add('hidden');
          }, 400);
        }
      });
    });
  });

  // ========================================
  // SMOOTH SCROLL WITH OFFSET
  // ========================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      e.preventDefault();
      const target = document.querySelector(href);
      
      if (target) {
        const headerHeight = document.querySelector('.site-header')?.offsetHeight || 0;
        const targetPosition = target.offsetTop - headerHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ========================================
  // INTERSECTION OBSERVER FOR ANIMATIONS
  // ========================================
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe all cards
  document.querySelectorAll('.info-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  // ========================================
  // DOWNLOAD CV BUTTON
  // ========================================
  const downloadBtn = document.querySelector('.download-btn');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      // Replace with actual CV file path when available
      alert('CV download coming soon! Connect with Layla via email: rutendomucheri@gmail.com');
      // Uncomment below when CV file is ready:
      // window.location.href = 'assets/layla-cv.pdf';
    });
  }

  // ========================================
  // ACTIVE NAV LINK ON SCROLL
  // ========================================
  const sections = document.querySelectorAll('section[id]');
  
  function highlightNav() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 150;
      const sectionId = section.getAttribute('id');
      const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
      
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinkItems.forEach(link => link.classList.remove('active'));
        if (navLink) navLink.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', highlightNav);

  // ========================================
  // CONSOLE MESSAGE
  // ========================================
  console.log('%c🌸 Layla Portfolio Loaded Successfully! 🌸', 'color: #2c5aa0; font-size: 16px; font-weight: bold;');
  console.log('%cDeveloped by Dr BennyT - Blessing Media', 'color: #ffd700; font-size: 12px;');

});
