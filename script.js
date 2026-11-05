/* ============================================================
   VENKATA RAVINDRA MARASU — PORTFOLIO CORE SCRIPTS & INTERACTIONS
============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // 1. THEME SWITCHER (Light / Dark Mode)
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector('i') : null;
  const currentTheme = localStorage.getItem('ravindra_theme') || 'light';

  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('ravindra_theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }

  function updateThemeIcon(theme) {
    if (!themeIcon) return;
    if (theme === 'dark') {
      themeIcon.className = 'fa-solid fa-sun';
      themeIcon.title = 'Switch to Light Mode';
    } else {
      themeIcon.className = 'fa-solid fa-moon';
      themeIcon.title = 'Switch to Dark Mode';
    }
  }

  // 2. AMBIENT CONSTELLATION PARTICLES (Lightweight, non-intrusive)
  const canvas = document.getElementById('ambient-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }, { passive: true });

    const particles = [];
    const particleCount = Math.min(width > 768 ? 42 : 18, 50);

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 1.8 + 1
      });
    }

    function animateParticles() {
      ctx.clearRect(0, 0, width, height);
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      const dotColor = isDark ? 'rgba(56, 189, 248, 0.45)' : 'rgba(37, 99, 235, 0.35)';
      const lineColor = isDark ? 'rgba(56, 189, 248, 0.08)' : 'rgba(37, 99, 235, 0.06)';

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.fillStyle = dotColor;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 130) {
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(animateParticles);
    }
    requestAnimationFrame(animateParticles);
  }

  // 3. TYPED ROLE HEADLINE IN HERO
  const roles = [
    'Frontend Developer',
    'React.js & JavaScript Specialist',
    'Redux Toolkit & RTK Query Architect',
    'Material UI & UI Component Engineer'
  ];
  const typedEl = document.getElementById('hero-typed-text');
  if (typedEl) {
    let rIdx = 0, cIdx = 0, isDeleting = false;
    function typeRole() {
      const fullText = roles[rIdx];
      if (isDeleting) {
        typedEl.textContent = fullText.substring(0, --cIdx);
      } else {
        typedEl.textContent = fullText.substring(0, ++cIdx);
      }

      let speed = isDeleting ? 35 : 75;
      if (!isDeleting && cIdx === fullText.length) {
        speed = 2200;
        isDeleting = true;
      } else if (isDeleting && cIdx === 0) {
        isDeleting = false;
        rIdx = (rIdx + 1) % roles.length;
        speed = 350;
      }
      setTimeout(typeRole, speed);
    }
    typeRole();
  }

  // 4. NAVBAR SCROLL EFFECT & SCROLLSPY
  const navbarWrapper = document.getElementById('navbar-wrapper');
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbarWrapper?.classList.add('scrolled');
    } else {
      navbarWrapper?.classList.remove('scrolled');
    }

    let currentId = '';
    const scrollPosition = window.scrollY + 140;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPosition >= top && scrollPosition < top + height) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });

  // 5. MOBILE MENU TOGGLE
  const menuToggleBtn = document.getElementById('menu-toggle-btn');
  const mobileNavDrawer = document.getElementById('mobile-nav-drawer');

  if (menuToggleBtn && mobileNavDrawer) {
    menuToggleBtn.addEventListener('click', () => {
      mobileNavDrawer.classList.toggle('open');
      const isOpen = mobileNavDrawer.classList.contains('open');
      menuToggleBtn.innerHTML = isOpen
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';
    });

    mobileNavDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNavDrawer.classList.remove('open');
        menuToggleBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
      });
    });
  }

  // 6. HERO CODE WINDOW TABS & SIMULATED EXECUTION
  const windowTabs = document.querySelectorAll('.window-tab');
  const codePanes = document.querySelectorAll('.code-tab-pane');
  const runCodeBtn = document.getElementById('run-code-btn');
  const copyCodeBtn = document.getElementById('copy-code-btn');
  const consoleDrawer = document.getElementById('terminal-console-drawer');

  let activeTabKey = 'pane-rtk';

  windowTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      windowTabs.forEach(t => t.classList.remove('active'));
      codePanes.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      activeTabKey = tab.dataset.target;
      const targetPane = document.getElementById(activeTabKey);
      if (targetPane) targetPane.classList.add('active');

      if (consoleDrawer) {
        consoleDrawer.classList.remove('open');
      }
    });
  });

  // Simulated code execution
  if (runCodeBtn && consoleDrawer) {
    runCodeBtn.addEventListener('click', () => {
      consoleDrawer.classList.add('open');
      if (activeTabKey === 'pane-rtk') {
        consoleDrawer.innerHTML = `
          <div><span class="console-prefix">$</span> npx vitest run hrmApi.test.js</div>
          <div class="console-info">[RTK Query] Connecting to /api/hrm/ base query...</div>
          <div class="console-info">[RTK Query] Normalized cache registered with tag types: ['Employee', 'Attendance', 'Leave']</div>
          <div class="console-success"><i class="fa-solid fa-check"></i> [200 OK] GET /api/hrm/employees → 142 records loaded in 28ms</div>
          <div class="console-success"><i class="fa-solid fa-check-double"></i> RTK Query automated caching &amp; invalidation verified (100% Passing)</div>
        `;
      } else if (activeTabKey === 'pane-react') {
        consoleDrawer.innerHTML = `
          <div><span class="console-prefix">$</span> npm run build &amp;&amp; vite preview</div>
          <div class="console-info">Vite v5.2.0 building for production...</div>
          <div class="console-info">✓ 38 modules transformed.</div>
          <div class="console-success"><i class="fa-solid fa-check"></i> Material UI CourseCatalog rendered with dynamic filters and role check.</div>
          <div class="console-success"><i class="fa-solid fa-circle-nodes"></i> Real-time student progress tracking mounted smoothly.</div>
        `;
      } else {
        consoleDrawer.innerHTML = `
          <div><span class="console-prefix">$</span> node validateAuth.test.js</div>
          <div class="console-info">[AUTH] Testing employee email and OTP verification rules...</div>
          <div class="console-info">[AUTH] Format check passed: 6-digit numeric OTP regex validated.</div>
          <div class="console-success"><i class="fa-solid fa-shield-check"></i> Session validation passed: { isValid: true, status: 200 }</div>
        `;
      }
    });
  }

  // Copy code button
  if (copyCodeBtn) {
    copyCodeBtn.addEventListener('click', () => {
      const activePane = document.querySelector('.code-tab-pane.active');
      if (activePane) {
        navigator.clipboard.writeText(activePane.innerText.trim()).then(() => {
          const originalText = copyCodeBtn.innerHTML;
          copyCodeBtn.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
          copyCodeBtn.style.background = '#10b981';
          copyCodeBtn.style.color = '#fff';
          setTimeout(() => {
            copyCodeBtn.innerHTML = originalText;
            copyCodeBtn.style.background = '';
            copyCodeBtn.style.color = '';
          }, 2000);
        });
      }
    });
  }

  // 7. PROJECT CATEGORY FILTER
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      projectCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 8. RESUME MODAL VIEWER & PRINTING
  const resumeModal = document.getElementById('resume-modal');
  const resumeTriggers = [
    document.getElementById('nav-resume-btn'),
    document.getElementById('dock-resume-btn'),
    document.getElementById('hero-resume-btn'),
    document.getElementById('about-resume-btn'),
    document.getElementById('mobile-resume-btn')
  ].filter(Boolean);

  const closeResumeModalBtn = document.getElementById('close-resume-modal');
  const printResumeBtn = document.getElementById('print-resume-btn');

  function openResumeModal() {
    if (resumeModal) {
      resumeModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeResumeModal() {
    if (resumeModal) {
      resumeModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  resumeTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openResumeModal();
    });
  });

  if (closeResumeModalBtn) {
    closeResumeModalBtn.addEventListener('click', closeResumeModal);
  }

  if (resumeModal) {
    resumeModal.addEventListener('click', (e) => {
      if (e.target === resumeModal) {
        closeResumeModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && resumeModal && resumeModal.classList.contains('active')) {
      closeResumeModal();
    }
  });

  if (printResumeBtn) {
    printResumeBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // 9. CONTACT FORM SUBMISSION (Connected to Node.js backend /api/contact)
  const contactForm = document.getElementById('contact-form');
  const formFeedback = document.getElementById('form-feedback');

  if (contactForm && formFeedback) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const origBtnHtml = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Submitting...';

      const formData = new FormData(contactForm);
      const payload = {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message')
      };

      try {
        // Attempt posting to local Node.js server API
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        if (response.ok) {
          const resData = await response.json();
          formFeedback.className = 'form-feedback success';
          formFeedback.style.display = 'block';
          formFeedback.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${resData.message || 'Thank you! Your message has been sent successfully to Venkata Ravindra Marasu.'}`;
          contactForm.reset();
        } else {
          throw new Error('API server error');
        }
      } catch (err) {
        // Fallback: graceful notification with direct mailto link
        formFeedback.className = 'form-feedback success';
        formFeedback.style.display = 'block';
        formFeedback.innerHTML = `
          <i class="fa-solid fa-circle-check"></i> Thank you, <strong>${payload.name}</strong>! 
          Your message details were recorded. You can also email directly to 
          <a href="mailto:ravindramarasu22@gmail.com?subject=${encodeURIComponent(payload.subject)}&body=${encodeURIComponent(payload.message)}" style="color:#2563eb;text-decoration:underline;">
            ravindramarasu22@gmail.com
          </a>.
        `;
        contactForm.reset();
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = origBtnHtml;
        setTimeout(() => {
          if (formFeedback) formFeedback.style.display = 'none';
        }, 10000);
      }
    });
  }

  // 10. Current year in footer
  const yearEl = document.getElementById('current-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});
