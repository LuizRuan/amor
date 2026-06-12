/* ============================================================
   BEATRIZ & RUAN — JavaScript Principal
   ============================================================ */

// ── CONFIGURAÇÕES ─────────────────────────────────────────
const WEDDING_DATE = new Date('2024-12-28'); // 28 de dezembro de 2024

const LOVE_MESSAGE = `Beatriz, você é a mulher mais incrível que já conheci. Desde o primeiro dia que te olhei, soube que era você. Você me faz querer ser o melhor homem possível todos os dias. Nossa história é a minha história favorita, e não poderia imaginar essa vida sem você ao meu lado. Feliz Dia dos Namorados, meu amor. Hoje e sempre. 💕`;

// ── TODAS AS FOTOS ─────────────────────────────────────────
const ALL_PHOTOS = [
  "fotos/Casamento Beatriz e Ruan (388).jpg",
  "fotos/Casamento Beatriz e Ruan (70).jpg",
  "fotos/Casamento Beatriz e Ruan (127).jpg",
  "fotos/Casamento Beatriz e Ruan (147).jpg",
  "fotos/Casamento Beatriz e Ruan (148).jpg",
  "fotos/Casamento Beatriz e Ruan (508).jpg",
  "fotos/WhatsApp Image 2026-06-11 at 22.30.19.jpeg",
  "fotos/WhatsApp Image 2026-06-11 at 22.30.18 (1).jpeg",
  "fotos/WhatsApp Image 2026-06-11 at 22.30.18.jpeg",
  "fotos/WhatsApp Image 2026-06-11 at 22.30.19 (1).jpeg",
  "fotos/WhatsApp Image 2026-06-11 at 22.30.20.jpeg",
  "fotos/WhatsApp Image 2026-06-11 at 22.30.20 (1).jpeg",
  "fotos/WhatsApp Image 2026-06-11 at 22.30.21.jpeg",
  "fotos/WhatsApp Image 2026-06-11 at 22.30.21 (1).jpeg",
  "fotos/WhatsApp Image 2026-06-11 at 22.30.21 (2).jpeg",
  "fotos/WhatsApp Image 2026-06-11 at 22.30.21 (3).jpeg",
  "fotos/WhatsApp Image 2026-06-11 at 22.30.22.jpeg",
  "fotos/WhatsApp Image 2026-06-11 at 22.30.22 (1).jpeg",
  "fotos/WhatsApp Image 2026-06-11 at 22.30.22 (2).jpeg",
  "fotos/WhatsApp Image 2026-06-11 at 22.30.22 (3).jpeg",
  "fotos/WhatsApp Image 2026-06-11 at 22.30.23.jpeg",
  "fotos/WhatsApp Image 2026-06-11 at 22.30.23 (1).jpeg",
  "fotos/WhatsApp Image 2026-06-11 at 22.30.24.jpeg",
  "fotos/WhatsApp Image 2026-06-11 at 22.30.25.jpeg",
];

// ── SPLASH → ENTRAR NO SITE ────────────────────────────────
function enterSite() {
  const splash = document.getElementById('splash');
  const main   = document.getElementById('mainSite');

  splash.classList.add('hide');

  setTimeout(() => {
    splash.style.display = 'none';
    main.classList.remove('hidden');
    initSite();
  }, 800);
}

// ── INICIALIZAR SITE ───────────────────────────────────────
function initSite() {
  createFloatingHearts();
  startTypewriter();
  initScrollAnimations();
  initGallery();
  calcDays();
}

// ── CORAÇÕES FLUTUANTES ────────────────────────────────────
function createFloatingHearts() {
  const container = document.getElementById('floatingHearts');
  const emojis = ['💕', '❤️', '🌹', '✨', '💗', '💖', '💝'];
  const count = 18;

  for (let i = 0; i < count; i++) {
    const heart = document.createElement('div');
    heart.className = 'float-heart';
    heart.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.fontSize = `${0.8 + Math.random() * 1.2}rem`;
    heart.style.animationDuration = `${8 + Math.random() * 12}s`;
    heart.style.animationDelay = `${Math.random() * 10}s`;
    container.appendChild(heart);
  }
}

// ── TYPEWRITER ─────────────────────────────────────────────
function startTypewriter() {
  const el = document.getElementById('typewriterText');
  if (!el) return;

  let i = 0;
  const speed = 35;

  function type() {
    if (i < LOVE_MESSAGE.length) {
      el.textContent += LOVE_MESSAGE.charAt(i);
      i++;
      setTimeout(type, speed);
    } else {
      el.classList.add('done');
    }
  }

  // Start when section is visible
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      type();
      observer.disconnect();
    }
  }, { threshold: 0.3 });

  observer.observe(el.parentElement);
}

// ── SCROLL REVEAL ──────────────────────────────────────────
function initScrollAnimations() {
  // Add reveal class to sections
  document.querySelectorAll('.section').forEach(s => s.classList.add('reveal'));
  document.querySelectorAll('.stat-card').forEach(s => s.classList.add('reveal'));

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // Reason cards with staggered delay
  const reasonObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const cards = entry.target.querySelectorAll('.reason-card');
        cards.forEach((card, i) => {
          setTimeout(() => card.classList.add('visible'), i * 120);
        });
        reasonObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  const reasonsList = document.querySelector('.reasons-list');
  if (reasonsList) reasonObserver.observe(reasonsList);
}

// ── GALERIA & LIGHTBOX ─────────────────────────────────────
let currentLightboxIndex = 0;

function initGallery() {
  const items = document.querySelectorAll('.gallery-item');
  items.forEach((item) => {
    const idx = parseInt(item.dataset.index);
    item.addEventListener('click', () => openLightbox(idx));
    item.addEventListener('touchstart', () => {}, { passive: true });
  });
}

function openLightbox(index) {
  currentLightboxIndex = index;
  const lb = document.getElementById('lightbox');
  const img = document.getElementById('lightboxImg');
  img.src = ALL_PHOTOS[index];
  img.alt = `Foto ${index + 1}`;
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}

function changeLightbox(dir) {
  currentLightboxIndex = (currentLightboxIndex + dir + ALL_PHOTOS.length) % ALL_PHOTOS.length;
  const img = document.getElementById('lightboxImg');
  img.style.opacity = '0';
  setTimeout(() => {
    img.src = ALL_PHOTOS[currentLightboxIndex];
    img.style.opacity = '1';
  }, 150);
}

// Touch swipe para o lightbox
(function() {
  let touchStartX = 0;
  document.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  document.addEventListener('touchend', e => {
    if (!document.getElementById('lightbox').classList.contains('open')) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) changeLightbox(dx < 0 ? 1 : -1);
  });
})();

// Fechar com ESC
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowRight') changeLightbox(1);
  if (e.key === 'ArrowLeft')  changeLightbox(-1);
});

// ── CONTADOR DE DIAS ───────────────────────────────────────
function calcDays() {
  const el = document.getElementById('daysCounter');
  if (!el) return;

  const now  = new Date();
  const diff = Math.floor((now - WEDDING_DATE) / (1000 * 60 * 60 * 24));
  const target = Math.max(0, diff);

  // Animate counter
  let current = 0;
  const step = Math.ceil(target / 60);
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = current.toLocaleString('pt-BR');
    if (current >= target) clearInterval(timer);
  }, 30);
}
