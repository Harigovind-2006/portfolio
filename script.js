// Portfolio Tab Filtering
document.addEventListener('DOMContentLoaded', () => {
  const tabButtons = document.querySelectorAll('.portfolio-tabs button');
  const projectCards = document.querySelectorAll('.project-card');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      tabButtons.forEach(btn => btn.classList.remove('active'));
      // Add active class to clicked button
      button.classList.add('active');

      const filter = button.textContent.toUpperCase();

      projectCards.forEach(card => {
        const category = card.querySelector('p').textContent.toUpperCase();
        
        if (filter === 'ALL') {
          card.style.display = 'block';
          setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'scale(1)'; }, 10);
        } else if (category.includes(filter) || filter.includes(category)) {
          card.style.display = 'block';
          setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'scale(1)'; }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.8)';
          setTimeout(() => { card.style.display = 'none'; }, 300);
        }
      });
    });
  });

  // Scroll Spy for Navigation Active State
  const sections = document.querySelectorAll('.section');
  const navLinks = document.querySelectorAll('.sidebar-nav a, .hero-socials a');

  window.addEventListener('scroll', () => {
    let current = "";

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').includes(current)) {
        link.classList.add('active');
      }
    });
  });

  // Initial animation
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    heroContent.style.opacity = '0';
    heroContent.style.transform = 'translateY(30px)';
    setTimeout(() => {
      heroContent.style.transition = 'all 1s ease-out';
      heroContent.style.opacity = '1';
      heroContent.style.transform = 'translateY(0)';
    }, 200);
  }

  // Contact Form Interactions
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('.btn-submit');
      const originalText = btn.innerHTML;
      
      // Loading State
      btn.innerHTML = '<span>SENDING...</span> ⏳';
      btn.style.opacity = '0.8';
      
      // Simulate network request
      setTimeout(() => {
        btn.innerHTML = '<span>MESSAGE SENT!</span> ✅';
        btn.classList.add('success');
        btn.style.opacity = '1';
        contactForm.reset();
        
        // Reset after 3 seconds
        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.classList.remove('success');
        }, 3000);
      }, 1500);
    });
  }

  // --- 3D Tilt Effect ---
  const tiltElements = document.querySelectorAll('.project-card, .contact-card.interactive, .content-box, .stat-item, .hero-image');
  
  tiltElements.forEach(el => {
    el.addEventListener('mousemove', e => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -10; // Max 10 deg rotation
      const rotateY = ((x - centerX) / centerX) * 10;
      
      el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      el.style.transition = 'none';
      if (!el.classList.contains('content-box') && !el.classList.contains('hero-image')) {
        el.style.zIndex = '20';
      }
    });
    
    el.addEventListener('mouseleave', () => {
      el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
      el.style.transition = 'transform 0.5s ease, z-index 0.5s';
      if (!el.classList.contains('content-box') && !el.classList.contains('hero-image')) {
        el.style.zIndex = '1';
      }
    });
  });

  // --- Loading Screen Logic ---
  const loader = document.getElementById('loader-wrapper');
  if (loader) {
    // Show spinner for a brief duration then hide
    setTimeout(() => {
      loader.style.opacity = '0';
      loader.style.visibility = 'hidden';
    }, 2000);
  }

  // --- Custom Cursor Logic ---
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorOutline = document.querySelector('.cursor-outline');

  if (cursorDot && cursorOutline) {
    window.addEventListener('mousemove', function (e) {
      const posX = e.clientX;
      const posY = e.clientY;

      cursorDot.style.left = `${posX}px`;
      cursorDot.style.top = `${posY}px`;

      // Use Element.animate for smooth trailing effect
      cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
      }, { duration: 500, fill: "forwards" });
    });

    // Add hover effects for clickable items
    const clickables = document.querySelectorAll('a, button, input, textarea, .project-card, .contact-card');
    clickables.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        cursorOutline.classList.add('cursor-hover');
      });
      el.addEventListener('mouseleave', () => {
        cursorOutline.classList.remove('cursor-hover');
      });
    });
  }

  // --- Three.js Background ---
  const canvas = document.getElementById('bg-canvas');
  if (canvas) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.setZ(30);

    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 900;
    const posArray = new Float32Array(particlesCount * 3);

    for(let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 100;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const material = new THREE.PointsMaterial({
        size: 0.15,
        color: 0xffb400,
        transparent: true,
        opacity: 0.8
    });

    const particlesMesh = new THREE.Points(particlesGeometry, material);
    scene.add(particlesMesh);

    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX - windowHalfX);
        mouseY = (event.clientY - windowHalfY);
    });

    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();

        particlesMesh.rotation.y = elapsedTime * 0.05;
        particlesMesh.rotation.x = elapsedTime * 0.02;

        targetX = mouseX * 0.001;
        targetY = mouseY * 0.001;

        particlesMesh.rotation.y += 0.05 * (targetX - particlesMesh.rotation.y);
        particlesMesh.rotation.x += 0.05 * (targetY - particlesMesh.rotation.x);

        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }
});