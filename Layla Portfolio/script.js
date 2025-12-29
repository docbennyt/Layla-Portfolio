document.addEventListener('DOMContentLoaded', function() {
  // Navigation functionality
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');

  // Handle navigation clicks
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      if (this.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        
        // Remove active class from all links
        navLinks.forEach(l => l.classList.remove('active'));
        
        // Add active class to clicked link
        this.classList.add('active');
        
        // Scroll to section
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
          targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });

  // Update active navigation on scroll
  window.addEventListener('scroll', function() {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (scrollY >= (sectionTop - 200)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // Resume filter functionality
  const filterTabs = document.querySelectorAll('.filter-tab');
  const resumeItems = document.querySelectorAll('.resume-item');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      // Remove active class from all tabs
      filterTabs.forEach(t => t.classList.remove('active'));
      
      // Add active class to clicked tab
      this.classList.add('active');
      
      const filter = this.getAttribute('data-filter');
      
      // Show/hide resume items based on filter
      resumeItems.forEach(item => {
        const category = item.getAttribute('data-category');
        
        if (filter === 'all' || category === filter) {
          item.classList.remove('hidden');
          item.style.display = 'block';
        } else {
          item.classList.add('hidden');
          item.style.display = 'none';
        }
      });
    });
  });

  // Animate skill bars when they come into view
  const skillBars = document.querySelectorAll('.skill-progress');
  
  const animateSkillBars = () => {
    skillBars.forEach(bar => {
      const rect = bar.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
      
      if (isVisible && !bar.classList.contains('animate')) {
        bar.classList.add('animate');
      }
    });
  };

  // Check skill bars on scroll
  window.addEventListener('scroll', animateSkillBars);
  
  // Check skill bars on load
  animateSkillBars();

  // Download CV functionality
  const downloadBtn = document.querySelector('.download-btn');
  downloadBtn.addEventListener('click', function() {
    // Create a simple alert for demo purposes
    alert('CV download would start here. In a real implementation, this would download a PDF file.');
    
    // In a real implementation, you would do something like:
    // window.open('path/to/layla-cv.pdf', '_blank');
  });

  // Learn More button functionality
  const learnMoreBtn = document.querySelector('.learn-more-btn');
  learnMoreBtn.addEventListener('click', function() {
    // Scroll to resume section
    const resumeSection = document.getElementById('resume');
    if (resumeSection) {
      resumeSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });

  // Add hover effects to resume items
  resumeItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    item.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });

  // Add floating animation to decorative elements
  const addFloatingAnimation = () => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        25% { transform: translateY(-10px) rotate(2deg); }
        50% { transform: translateY(-5px) rotate(-1deg); }
        75% { transform: translateY(-15px) rotate(1deg); }
      }
      
      .container::before {
        animation: float 6s ease-in-out infinite;
      }
      
      .container::after {
        animation: float 8s ease-in-out infinite reverse;
      }
    `;
    document.head.appendChild(style);
  };

  addFloatingAnimation();

  // Add parallax effect to hero image
  window.addEventListener('scroll', function() {
    const heroImage = document.querySelector('.hero-image img');
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.3;
    
    if (heroImage) {
      heroImage.style.transform = `translateY(${rate}px)`;
    }
  });

  // Add typewriter effect to welcome text
  const typewriterEffect = (element, text, speed = 100) => {
    element.textContent = '';
    let i = 0;
    
    const timer = setInterval(() => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
      } else {
        clearInterval(timer);
      }
    }, speed);
  };

  // Apply typewriter effect to intro text after a delay
  setTimeout(() => {
    const introElement = document.querySelector('.intro');
    if (introElement) {
      typewriterEffect(introElement, "I'm Layla", 150);
    }
  }, 1000);

  // Add smooth reveal animation for sections
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

  // Observe all major sections
  const sectionsToObserve = document.querySelectorAll('.about, .resume, .info-card');
  sectionsToObserve.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
  });
});

