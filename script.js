/* ═══════════════════════════════════════════
   PORTFOLIO — script.js
   Interactive Features & Animations
═══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ─────────────────────────────────────────
     1. CUSTOM CURSOR
  ───────────────────────────────────────── */
  const cursor       = document.getElementById('cursor');
  const cursorFollow = document.getElementById('cursorFollower');

  if (cursor && cursorFollow) {
    let mouseX = 0, mouseY = 0;
    let followX = 0, followY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX + 'px';
      cursor.style.top  = mouseY + 'px';
    });

    // Smooth follower
    function animateCursor() {
      followX += (mouseX - followX) * 0.12;
      followY += (mouseY - followY) * 0.12;
      cursorFollow.style.left = followX + 'px';
      cursorFollow.style.top  = followY + 'px';
      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover effects on interactive elements
    const hoverEls = document.querySelectorAll(
      'a, button, .skill-card, .portfolio-item, .card-badge, .tag, .social-link, input, textarea, select'
    );
    hoverEls.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
        cursorFollow.classList.add('hover');
      });
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
        cursorFollow.classList.remove('hover');
      });
    });
  }

  /* ─────────────────────────────────────────
     2. NAVBAR — Scroll + Mobile Toggle
  ───────────────────────────────────────── */
  const nav        = document.getElementById('nav');
  const navToggle  = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  // Scroll: add glass effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });

  // Mobile toggle
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });

  // Close on link click
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  /* ─────────────────────────────────────────
     3. INTERSECTION OBSERVER — Reveal + Skill Bars
  ───────────────────────────────────────── */
  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => revealObserver.observe(el));

  // Skill card staggered delay
  const skillCards = document.querySelectorAll('.skill-card');
  skillCards.forEach(card => {
    const delay = card.getAttribute('data-delay') || 0;
    card.style.transitionDelay = delay + 'ms';
  });

  // Skill bar animation
  const skillBars = document.querySelectorAll('.skill-bar');

  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar   = entry.target;
        const fill  = bar.querySelector('.skill-fill');
        const width = bar.getAttribute('data-width');
        setTimeout(() => {
          fill.style.width = width + '%';
        }, 300);
        barObserver.unobserve(bar);
      }
    });
  }, { threshold: 0.5 });

  skillBars.forEach(bar => barObserver.observe(bar));

  /* ─────────────────────────────────────────
     4. PORTFOLIO FILTER
  ───────────────────────────────────────── */
  const filterBtns   = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      portfolioItems.forEach(item => {
        const category = item.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });

  /* ─────────────────────────────────────────
     5. CONTACT FORM
  ───────────────────────────────────────── */
  const contactForm  = document.getElementById('contactForm');
  const formSuccess  = document.getElementById('formSuccess');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Simulate send (no backend)
      const btn = contactForm.querySelector('button[type="submit"]');
      const btnSpan = btn.querySelector('span');
      btn.disabled = true;
      btnSpan.textContent = 'Mengirim...';

      setTimeout(() => {
        contactForm.reset();
        btn.disabled = false;
        btnSpan.textContent = 'Kirim Pesan';
        formSuccess.classList.add('show');
        setTimeout(() => formSuccess.classList.remove('show'), 5000);
      }, 1500);
    });
  }

  /* ─────────────────────────────────────────
     6. SMOOTH SCROLL for anchor links
  ───────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const offset = 80; // nav height
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ─────────────────────────────────────────
     7. ACTIVE NAV LINK on scroll
  ───────────────────────────────────────── */
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-link');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === `#${id}`) {
            link.style.color = 'var(--gold)';
          }
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => sectionObserver.observe(s));

  /* ─────────────────────────────────────────
     8. PORTFOLIO ITEM — hover tilt effect
  ───────────────────────────────────────── */
  portfolioItems.forEach(item => {
    item.addEventListener('mousemove', (e) => {
      const rect = item.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width  - 0.5;
      const y = (e.clientY - rect.top)  / rect.height - 0.5;
      item.style.transform = `translateY(-6px) rotateX(${-y * 5}deg) rotateY(${x * 5}deg)`;
      item.style.transition = 'transform 0.1s ease';
    });
    item.addEventListener('mouseleave', () => {
      item.style.transform = '';
      item.style.transition = 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)';
    });
  });

  /* ─────────────────────────────────────────
     9. HERO ORB — subtle parallax on mousemove
  ───────────────────────────────────────── */
  const orbs = document.querySelectorAll('.orb');
  document.addEventListener('mousemove', (e) => {
    const cx = window.innerWidth  / 2;
    const cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx;
    const dy = (e.clientY - cy) / cy;

    orbs.forEach((orb, i) => {
      const factor = (i + 1) * 15;
      orb.style.transform = `translate(${dx * factor}px, ${dy * factor}px)`;
    });
  });

  /* ─────────────────────────────────────────
     10. TYPING EFFECT — hero eyebrow badge
  ───────────────────────────────────────── */
  const badge = document.querySelector('.hero-eyebrow .mono');
  if (badge) {
    const messages = [
      'Available for freelance',
      'Mahasiswa Universitas Negeri Semarang',
      'Open to collaborate',
      'Ready to create',
    ];
    let msgIdx  = 0;
    let charIdx = 0;
    let deleting = false;

    function type() {
      const current = messages[msgIdx];
      if (!deleting) {
        badge.textContent = current.slice(0, charIdx + 1);
        charIdx++;
        if (charIdx === current.length) {
          deleting = true;
          setTimeout(type, 1800);
          return;
        }
      } else {
        badge.textContent = current.slice(0, charIdx - 1);
        charIdx--;
        if (charIdx === 0) {
          deleting = false;
          msgIdx = (msgIdx + 1) % messages.length;
        }
      }
      setTimeout(type, deleting ? 40 : 70);
    }

    setTimeout(type, 1500);
  }

  /* ─────────────────────────────────────────
     11. COUNTER ANIMATION — hero stats
  ───────────────────────────────────────── */
  const counters = document.querySelectorAll('.card-badge .mono');

  function animateCounter(el, target, suffix) {
    let current = 0;
    const duration = 1500;
    const steps    = 60;
    const step     = target / steps;
    const interval = duration / steps;

    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = Math.round(current) + suffix;
      if (current >= target) clearInterval(timer);
    }, interval);
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        counters.forEach(counter => {
          const text   = counter.textContent;
          const match  = text.match(/(\d+)(\+?)/);
          if (match) {
            const num    = parseInt(match[1]);
            const suffix = match[2] || '';
            animateCounter(counter, num, suffix);
          }
        });
        counterObserver.disconnect();
      }
    });
  }, { threshold: 0.5 });

  const heroCard = document.querySelector('.hero-card');
  if (heroCard) counterObserver.observe(heroCard);

});