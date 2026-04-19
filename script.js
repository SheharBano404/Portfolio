// ==============================
// SHEHAR BANO — PORTFOLIO JS
// Blood Red × Neon Purple
// ==============================

// ---- CUSTOM CURSOR ----
const cursorOuter = document.getElementById('cursorOuter');
const cursorInner = document.getElementById('cursorInner');
let mouseX = 0, mouseY = 0;
let outerX = 0, outerY = 0;

window.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorInner.style.left = mouseX + 'px';
  cursorInner.style.top = mouseY + 'px';
});

(function animateCursor() {
  outerX += (mouseX - outerX) * 0.12;
  outerY += (mouseY - outerY) * 0.12;
  cursorOuter.style.left = outerX + 'px';
  cursorOuter.style.top = outerY + 'px';
  requestAnimationFrame(animateCursor);
})();

// ---- LOADER ----
window.addEventListener('load', () => {
  const bar = document.getElementById('loaderBar');
  const pct = document.getElementById('loaderPct');
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 12 + 3;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      setTimeout(() => document.getElementById('loader').classList.add('done'), 400);
    }
    bar.style.width = progress + '%';
    pct.textContent = Math.floor(progress) + '%';
  }, 80);
});

// ---- THEME TOGGLE ----
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;
let isDark = true;
themeToggle.addEventListener('click', () => {
  isDark = !isDark;
  html.setAttribute('data-theme', isDark ? 'dark' : 'light');
  themeToggle.querySelector('.theme-icon').textContent = isDark ? '☀' : '☾';
});

// ---- HAMBURGER ----
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
mobileMenu.querySelectorAll('.mob-link').forEach(l => l.addEventListener('click', () => mobileMenu.classList.remove('open')));

// ---- SCROLL PROGRESS ----
window.addEventListener('scroll', () => {
  const progress = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
  document.getElementById('scroll-progress').style.width = progress + '%';
});

// ---- NAVBAR ----
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  nav.style.background = window.scrollY > 50
    ? (isDark ? 'rgba(7,4,15,0.98)' : 'rgba(245,240,255,0.98)')
    : (isDark ? 'rgba(7,4,15,0.8)' : 'rgba(245,240,255,0.8)');
});

// ---- TYPING ANIMATION ----
const phrases = [
  'Full-Stack Web Developer',
  'AI & Computer Vision Engineer',
  'Cloud & DevOps Specialist',
  'IoT & Embedded Systems Builder',
  'Cybersecurity Enthusiast',
  '4.0 CGPA — Top of Class'
];
let phraseIdx = 0, charIdx = 0, deleting = false;
const typedEl = document.getElementById('typed-text');

function type() {
  const cur = phrases[phraseIdx];
  if (!deleting) {
    typedEl.textContent = cur.substring(0, charIdx + 1);
    charIdx++;
    if (charIdx === cur.length) { deleting = true; setTimeout(type, 1800); return; }
  } else {
    typedEl.textContent = cur.substring(0, charIdx - 1);
    charIdx--;
    if (charIdx === 0) { deleting = false; phraseIdx = (phraseIdx + 1) % phrases.length; }
  }
  setTimeout(type, deleting ? 45 : 75);
}
setTimeout(type, 2200);

// ---- CANVAS PARTICLE BACKGROUND ----
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = (Math.random() - 0.5) * 0.5;
    this.r = Math.random() * 1.8 + 0.3;
    this.alpha = Math.random() * 0.4 + 0.1;
    this.color = Math.random() > 0.5 ? '255,45,58' : '191,47,255';
  }
  update() {
    this.x += this.vx; this.y += this.vy;
    if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${this.color},${this.alpha})`;
    ctx.fill();
  }
}

const particles = [];
for (let i = 0; i < 100; i++) particles.push(new Particle());

function drawConnections() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 130) {
        ctx.beginPath();
        const alpha = 0.06 * (1 - dist / 130);
        ctx.strokeStyle = `rgba(191,47,255,${alpha})`;
        ctx.lineWidth = 0.5;
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  drawConnections();
  requestAnimationFrame(animate);
}
animate();

// ---- TECH RING ----
const techData = [
  { icon: '🌐', name: 'React', desc: 'Frontend UI library for dynamic web apps' },
  { icon: '⚙', name: 'Node.js', desc: 'Backend JavaScript runtime environment' },
  { icon: '☁', name: 'AWS', desc: 'Cloud infrastructure (EC2, S3, IAM, etc.)' },
  { icon: '🐳', name: 'Docker', desc: 'Containerization and deployment' },
  { icon: '🤖', name: 'AI/ML', desc: 'Computer Vision, NLP, Deep Learning' },
  { icon: '📡', name: 'IoT', desc: 'Arduino, ESP32, Sensor Systems' },
  { icon: '🔒', name: 'Cyber', desc: 'Ethical Hacking, OSINT, Web Security' },
  { icon: '📱', name: 'Flutter', desc: 'Cross-platform mobile development' },
  { icon: '🗄', name: 'MySQL', desc: 'Relational database design & queries' },
  { icon: '🐧', name: 'Linux', desc: 'Linux admin, scripting, server management' },
  { icon: '🔧', name: 'C/C++', desc: 'Bare-metal embedded programming' },
  { icon: '🚀', name: 'CI/CD', desc: 'Jenkins, GitHub Actions, pipeline automation' },
];

const ring = document.getElementById('techRing');
const ripTitle = document.getElementById('ripTitle');
const ripDesc = document.getElementById('ripDesc');
const stackCount = document.getElementById('stackCount');

// Animate count
let countVal = 0;
const countTarget = techData.length;
const countInterval = setInterval(() => {
  countVal++;
  stackCount.textContent = countVal;
  if (countVal >= countTarget) clearInterval(countInterval);
}, 100);

// Place items in a circle
techData.forEach((tech, i) => {
  const angle = (i / techData.length) * 2 * Math.PI - Math.PI / 2;
  const radius = 130; // px from center of ring (ring is 320px, center at 160)
  const x = 160 + radius * Math.cos(angle);
  const y = 160 + radius * Math.sin(angle);

  const el = document.createElement('div');
  el.className = 'tech-item';
  el.style.left = x + 'px';
  el.style.top = y + 'px';
  el.innerHTML = `<span class="ti-icon">${tech.icon}</span>${tech.name}`;

  el.addEventListener('mouseenter', () => {
    ripTitle.textContent = tech.icon + ' ' + tech.name;
    ripDesc.textContent = tech.desc;
  });
  el.addEventListener('mouseleave', () => {
    ripTitle.textContent = 'Hover a tech';
    ripDesc.textContent = 'to see details';
  });

  ring.appendChild(el);
});

// ---- HERO STATS COUNTER ----
const statEls = document.querySelectorAll('.hstat-num');
let statsAnimated = false;

function animateStats() {
  if (statsAnimated) return;
  statsAnimated = true;
  statEls.forEach(el => {
    const target = parseInt(el.getAttribute('data-target'));
    const isDecimal = target === 40; // represents 4.0
    let current = 0;
    const step = target / 40;
    const interval = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(interval);
      }
      el.textContent = isDecimal ? (current / 10).toFixed(1) : Math.floor(current) + '+';
    }, 40);
  });
}

// Observer for stats
const statsObserver = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) animateStats(); });
}, { threshold: 0.5 });
const heroSection = document.getElementById('hero');
if (heroSection) statsObserver.observe(heroSection);

// ---- SCROLL REVEAL ----
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 100);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });
revealEls.forEach(el => revealObserver.observe(el));

// ---- SKILLS TABS ----
const tabs = document.querySelectorAll('.stab');
const panels = document.querySelectorAll('.skill-panel');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    panels.forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    const panel = document.querySelector(`.skill-panel[data-panel="${tab.dataset.tab}"]`);
    if (panel) {
      panel.classList.add('active');
      // Animate bars when tab switches
      panel.querySelectorAll('.spb-fill').forEach(bar => {
        bar.style.width = '0%';
        setTimeout(() => { bar.style.width = bar.getAttribute('data-w') + '%'; }, 50);
      });
    }
  });
});

// ---- SKILL BAR ANIMATION (on scroll) ----
const skillBarObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.spb-fill').forEach(bar => {
        setTimeout(() => { bar.style.width = bar.getAttribute('data-w') + '%'; }, 400);
      });
      skillBarObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.skills-content').forEach(g => skillBarObserver.observe(g));

// Init first panel bars
setTimeout(() => {
  document.querySelectorAll('.skill-panel.active .spb-fill').forEach(bar => {
    bar.style.width = bar.getAttribute('data-w') + '%';
  });
}, 2500);

// ---- ACTIVE NAV LINK ----
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  sections.forEach(sec => {
    const top = sec.offsetTop - 120;
    const id = sec.getAttribute('id');
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (link) {
      link.style.color = (scrollY >= top && scrollY < top + sec.offsetHeight) ? 'var(--accent)' : '';
    }
  });
});

// ---- PROJECT CARD MAGNETIC EFFECT ----
document.querySelectorAll('.proj-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `translateY(-8px) rotateX(${-y * 5}deg) rotateY(${x * 5}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'all 0.4s';
  });
});

// ---- GLITCH EFFECT ON NAV LOGO ----
const navLogo = document.querySelector('.nav-logo');
setInterval(() => {
  navLogo.classList.add('glitch-flash');
  setTimeout(() => navLogo.classList.remove('glitch-flash'), 200);
}, 5000);