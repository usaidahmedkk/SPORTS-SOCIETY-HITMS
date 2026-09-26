// ========== PRELOADER ==========
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('preloader').classList.add('hidden');
    document.body.style.overflow = 'auto';
  }, 2200);
});
document.body.style.overflow = 'hidden';

// ========== CUSTOM CURSOR ==========
const cursor = document.getElementById('cursor');
const cursorDot = document.getElementById('cursorDot');
let mouseX = 0, mouseY = 0, cursorX = 0, cursorY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorDot.style.left = mouseX - 3 + 'px';
  cursorDot.style.top = mouseY - 3 + 'px';
});

function animateCursor() {
  cursorX += (mouseX - cursorX) * 0.15;
  cursorY += (mouseY - cursorY) * 0.15;
  cursor.style.left = cursorX - 10 + 'px';
  cursor.style.top = cursorY - 10 + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

document.querySelectorAll('a, button, .trio-card, .why-card, .event-card, .mosaic-item, .leader-card').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
});

if ('ontouchstart' in window) {
  cursor.style.display = 'none';
  cursorDot.style.display = 'none';
  document.body.style.cursor = 'auto';
}

// ========== SCROLL PROGRESS ==========
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  document.getElementById('scrollProgress').style.width = scrollPercent + '%';
});

// ========== NAVBAR SCROLL ==========
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 80);
});

// ========== MOBILE NAV ==========
function toggleMobileNav() {
  document.getElementById('mobileNav').classList.toggle('active');
  document.getElementById('hamburger').classList.toggle('active');
}
function closeMobileNav() {
  document.getElementById('mobileNav').classList.remove('active');
  document.getElementById('hamburger').classList.remove('active');
}

// ========== HERO PARTICLES ==========
const particleContainer = document.getElementById('heroParticles');
for (let i = 0; i < 55; i++) {
  const p = document.createElement('div');
  p.classList.add('particle');
  p.style.left = Math.random() * 100 + '%';
  p.style.animationDuration = (Math.random() * 4 + 3) + 's';
  p.style.animationDelay = Math.random() * 6 + 's';
  const size = (Math.random() * 3 + 1) + 'px';
  p.style.width = size; p.style.height = size;
  particleContainer.appendChild(p);
}

// ========== SPORTS WEEK 2 PARTICLES ==========
const sw2Container = document.getElementById('sw2Particles');
if (sw2Container) {
  const colors = ['rgba(197,165,90,0.6)', 'rgba(255,255,255,0.3)', 'rgba(197,165,90,0.4)'];
  for (let i = 0; i < 40; i++) {
    const p = document.createElement('div');
    p.classList.add('sw2-particle');
    const size = (Math.random() * 5 + 2) + 'px';
    p.style.width = size; p.style.height = size;
    p.style.left = Math.random() * 100 + '%';
    p.style.background = colors[Math.floor(Math.random() * colors.length)];
    p.style.animationDuration = (Math.random() * 6 + 4) + 's';
    p.style.animationDelay = Math.random() * 8 + 's';
    sw2Container.appendChild(p);
  }
}

// ========== SCROLL REVEAL ==========
const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
function checkReveal() {
  const windowHeight = window.innerHeight;
  revealElements.forEach(el => {
    if (el.getBoundingClientRect().top < windowHeight - 80) el.classList.add('active');
  });
}
window.addEventListener('scroll', checkReveal);
window.addEventListener('load', () => setTimeout(checkReveal, 300));

// ========== COUNTER ANIMATION ==========
const counters = document.querySelectorAll('.counter');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counter = entry.target;
      const target = parseInt(counter.getAttribute('data-target'));
      const start = performance.now();
      function updateCounter(now) {
        const progress = Math.min((now - start) / 2000, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        counter.textContent = Math.floor(eased * target);
        if (progress < 1) requestAnimationFrame(updateCounter);
        else counter.textContent = target + '+';
      }
      requestAnimationFrame(updateCounter);
      counterObserver.unobserve(counter);
    }
  });
}, { threshold: 0.5 });
counters.forEach(c => counterObserver.observe(c));

// ========== TILT EFFECT ==========
document.querySelectorAll('.trio-card, .why-card, .event-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = (y - rect.height / 2) / 18;
    const rotateY = (rect.width / 2 - x) / 18;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
  });
});

// ========== LIGHTBOX ==========
function openLightbox(el) {
  const img = el.querySelector('img');
  document.getElementById('lightboxImg').src = img.src;
  document.getElementById('lightbox').classList.add('active');
}
function closeLightbox() {
  document.getElementById('lightbox').classList.remove('active');
}
document.getElementById('lightbox').addEventListener('click', (e) => {
  if (e.target === document.getElementById('lightbox')) closeLightbox();
});

// ========== SMOOTH SCROLL ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const targetPos = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: targetPos, behavior: 'smooth' });
    }
  });
});

// ========== MAGNETIC BUTTONS ==========
document.querySelectorAll('.btn-primary, .btn-outline, .nav-cta, .sw2-btn').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px)`;
  });
  btn.addEventListener('mouseleave', () => { btn.style.transform = 'translate(0,0)'; });
});

// ========== ANIMATED GRADIENT HERO ==========
const heroOverlay = document.querySelector('.hero-overlay');
let gradientAngle = 0;
function animateGradient() {
  gradientAngle = (gradientAngle + 0.25) % 360;
  if (heroOverlay) heroOverlay.style.background = `linear-gradient(${gradientAngle}deg,rgba(15,38,64,0.7) 0%,rgba(15,38,64,0.85) 40%,rgba(197,165,90,0.04) 70%,var(--bg-dark) 100%)`;
  requestAnimationFrame(animateGradient);
}
animateGradient();

// ========== PARALLAX HERO ==========
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const heroBg = document.querySelector('.hero-bg img');
  if (heroBg && scrolled < window.innerHeight) {
    heroBg.style.transform = `scale(1.1) translateY(${scrolled * 0.3}px)`;
  }
});

// ========== SW2 SECTION GLOW PULSE ==========
const sw2Title = document.querySelector('.sw2-title em');
if (sw2Title) {
  let glowDir = 1, glowVal = 0;
  setInterval(() => {
    glowVal += glowDir * 2;
    if (glowVal >= 100 || glowVal <= 0) glowDir *= -1;
    sw2Title.style.textShadow = `0 0 ${20 + glowVal * 0.4}px rgba(197,165,90,${0.4 + glowVal * 0.004})`;
  }, 30);
}

// ========== SCROLL UP / DOWN CONTROLS ==========
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
function scrollToBottom() {
  window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
}
(function () {
  const controls = document.getElementById('scrollControls');
  if (!controls) return;
  window.addEventListener('scroll', () => {
    controls.classList.toggle('visible', window.scrollY > 300);
  });
})();
