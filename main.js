// Integrated cursor/parallax logic at end


// ── Navbar Scroll Effect ──
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 50);
});

// ── Typewriter Effect ──
const typewriterEl = document.querySelector('.name-highlight');
if (typewriterEl) {
  const text = typewriterEl.textContent;
  typewriterEl.textContent = '';
  typewriterEl.classList.add('typewriter-text');
  let i = 0;
  setTimeout(() => {
    const typeInterval = setInterval(() => {
      typewriterEl.textContent += text[i];
      i++;
      if (i >= text.length) {
        clearInterval(typeInterval);
        setTimeout(() => {
          typewriterEl.classList.remove('typewriter-text');
        }, 1500);
      }
    }, 120);
  }, 800);
}

// ── Staggered Scroll Reveal ──
const revealGroups = [
  { selector: '.section-grid', delay: 0 },
  { selector: '.project-card', delay: 0 },
  { selector: '.cert-card', delay: 0 },
  { selector: '.detail-card', delay: 0 },
  { selector: '.skill-group', delay: 0 },
  { selector: '.contact-inner', delay: 0 },
];

revealGroups.forEach(({ selector }) => {
  const els = document.querySelectorAll(selector);
  els.forEach((el, i) => {
    el.classList.add('reveal');
    // Stagger children of the same type
    if (els.length > 1) {
      el.style.transitionDelay = `${i * 0.1}s`;
    }
  });
});

const allRevealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
);
allRevealEls.forEach(el => revealObserver.observe(el));

// ── Smooth Scroll ──
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ── Active Nav Highlight ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 200) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === '#' + current) {
      link.style.color = 'var(--text-bright)';
    }
  });
});
// ── Parallax & Interactive Effects ──
document.addEventListener('mousemove', (e) => {
  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;

  // Move blobs subtly for parallax
  document.querySelectorAll('.blob').forEach((blob, index) => {
    const depth = (index + 1) * 20;
    const moveX = (x - 0.5) * depth;
    const moveY = (y - 0.5) * depth;
    // We combine current float animation with mouse parallax
    blob.style.transform = `translate(${moveX}px, ${moveY}px)`;
  });

  // Cursor glow
  const glowEl = document.getElementById('cursor-glow');
  if (glowEl && window.innerWidth > 768) {
    glowEl.style.left = e.clientX + 'px';
    glowEl.style.top = e.clientY + 'px';
  }
});
