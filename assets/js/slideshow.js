// Diaporama des photos du DJ (section À propos) — fondu enchaîné
(() => {
  const slides = document.querySelectorAll('#dj-slideshow .slide');
  if (slides.length < 2) return;
  let i = 0;
  setInterval(() => {
    slides[i].classList.remove('active');
    i = (i + 1) % slides.length;
    slides[i].classList.add('active');
  }, 3500);
})();
