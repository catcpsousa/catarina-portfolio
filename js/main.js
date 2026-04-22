
const filters = document.getElementById('filters');
const cards = [...document.querySelectorAll('.project-card')];
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const closeMenuBtn = document.getElementById('closeMenuBtn');
const mobileMenuBackdrop = document.getElementById('mobileMenuBackdrop');

function openMenu() {
  mobileMenu.classList.add('open');
  mobileMenuBackdrop.classList.add('open');
  document.body.classList.add('menu-open');
}

function closeMenu() {
  mobileMenu.classList.remove('open');
  mobileMenuBackdrop.classList.remove('open');
  document.body.classList.remove('menu-open');
}

menuBtn?.addEventListener('click', openMenu);
closeMenuBtn?.addEventListener('click', closeMenu);
mobileMenuBackdrop?.addEventListener('click', closeMenu);

mobileMenu?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', closeMenu);
});


filters?.addEventListener('click', e => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    const filter = btn.dataset.filter;
    filters.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    cards.forEach(card => {
        const show = filter === 'all' || card.dataset.category === filter;
        card.style.display = show ? 'block' : 'none';
        if (show) card.classList.add('is-visible');
    });
});

const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('is-visible');
}), { threshold: .16 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
cards.forEach(card => observer.observe(card));

window.addEventListener('scroll', () => {
    const y = window.scrollY * 0.08;
    document.querySelector('.glow-a')?.style.setProperty('transform', `translateY(${y}px)`);
    document.querySelector('.glow-b')?.style.setProperty('transform', `translateY(${-y}px)`);
});

const backToTopBtn = document.getElementById('backToTopBtn');

function toggleBackToTop() {
  if (window.scrollY > window.innerHeight * 0.8) {
    backToTopBtn.removeAttribute('hidden');
    backToTopBtn.classList.add('is-visible');
  } else {
    backToTopBtn.classList.remove('is-visible');
    backToTopBtn.setAttribute('hidden', '');
  }
}

backToTopBtn?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('scroll', toggleBackToTop);
window.addEventListener('load', toggleBackToTop);

