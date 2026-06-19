// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// Burger menu
const burger = document.getElementById('burger');
const navLinks = document.querySelector('.nav-links');
burger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Animated counters
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = +el.dataset.target;
    const duration = 1800;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = Math.floor(current) + (target >= 100 ? '+' : '');
      if (current >= target) clearInterval(timer);
    }, 16);
    counterObserver.unobserve(el);
  });
}, { threshold: 0.5 });

document.querySelectorAll('.count').forEach(c => counterObserver.observe(c));

// ── Scroll reveal ──
// Marque les éléments avec data-reveal avant qu'ils soient visibles
const revealTargets = [
  { selector: '.stat',          anim: 'reveal-up',    delay: true  },
  { selector: '.about-img',     anim: 'reveal-left',  delay: false },
  { selector: '.about-text',    anim: 'reveal-right', delay: false },
  { selector: '.about-tags span', anim: 'reveal-up',  delay: true  },
  { selector: '.service-card',  anim: 'reveal-up',    delay: true  },
  { selector: '.section-label', anim: 'reveal-fade',  delay: false },
  { selector: 'h2',             anim: 'reveal-up',    delay: false },
  { selector: '.form-group',    anim: 'reveal-up',    delay: true  },
  { selector: '.booking-text',  anim: 'reveal-left',  delay: false },
];

revealTargets.forEach(({ selector, anim, delay }) => {
  document.querySelectorAll(selector).forEach((el, i) => {
    // Ne pas toucher aux éléments du hero
    if (el.closest('#hero')) return;
    el.classList.add('scroll-hidden', anim);
    if (delay) el.style.transitionDelay = `${i * 80}ms`;
  });
});

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('scroll-visible');
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.scroll-hidden').forEach(el => revealObserver.observe(el));

// Envoi du formulaire de contact vers Supabase
document.getElementById('booking-form').addEventListener('submit', async function (e) {
  e.preventDefault();
  const btn = this.querySelector('button[type="submit"]');
  btn.textContent = 'Envoi en cours...';
  btn.disabled = true;

  const fd = new FormData(this);
  const { error } = await sb.from('bookings').insert({
    nom: fd.get('nom'), email: fd.get('email'), telephone: fd.get('telephone'),
    type: fd.get('type'), duree: fd.get('duree'), lieu: fd.get('lieu'),
    message: fd.get('message'), date_reservee: fd.get('date'), heure_reservee: ''
  });

  if (error) {
    btn.innerHTML = 'Erreur — réessayer <i class="fas fa-rotate-right"></i>';
    btn.disabled = false;
    console.error('Envoi formulaire :', error.message);
    return;
  }
  this.reset();
  btn.innerHTML = 'Demande envoyée ✓';
});
