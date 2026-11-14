const symbolString = ['✳','✦','◈','✳','◆','✦','✳','◉','✳','✦','◈','✳','◆','✦','✳','◉'];
for (const id of ['symbol-track-one', 'symbol-track-two', 'symbol-track-footer']) {
  document.getElementById(id).innerHTML = Array(2).fill('<span class="symbols__set">' + symbolString.map((symbol, i) => `<span class="symbols__glyph symbols__glyph--${i % 4}">${symbol}</span>`).join('') + '</span>').join('');
}

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const gallery = window.capitalFestPhotos;
const track = document.getElementById('highlights-track');
document.getElementById('gallery-total').textContent = gallery.length;
for (const [i, photo] of gallery.entries()) {
  const card = document.createElement('div');
  card.className = `highlight-card highlight-card--${i % 5}`;
  card.setAttribute('role', 'group');
  card.setAttribute('aria-roledescription', 'slide');
  card.setAttribute('aria-label', `Photo ${i + 1} of ${gallery.length}: ${photo.alt}`);
  const image = document.createElement('img');
  image.loading = 'lazy';
  image.src = '../public' + photo.src;
  image.alt = photo.alt;
  const number = document.createElement('span');
  number.className = 'highlight-card__number';
  number.textContent = `CF/${String(i + 1).padStart(2, '0')}`;
  const arrow = document.createElement('span');
  arrow.className = 'highlight-card__arrow';
  arrow.setAttribute('aria-hidden', 'true');
  arrow.textContent = '↗';
  card.append(image, number, arrow);
  track.append(card);
}
const galleryStep = () => track.querySelector('.highlight-card').getBoundingClientRect().width + (Number.parseFloat(getComputedStyle(track).columnGap) || 18);
const updateGallery = () => {
  document.getElementById('gallery-number').textContent = String(Math.min(gallery.length, Math.max(1, 1 + Math.round(track.scrollLeft / galleryStep())))).padStart(2, '0');
};
track.addEventListener('scroll', updateGallery, { passive: true });
for (const [id, direction] of [['gallery-prev', -1], ['gallery-next', 1]]) {
  document.getElementById(id).addEventListener('click', () => track.scrollBy({ left: galleryStep() * direction, behavior: reducedMotion.matches ? 'auto' : 'smooth' }));
}
for (const id of ['marq-one', 'marq-two']) {
  document.getElementById(id).innerHTML = Array(12).fill('<span>WHERE IT ALL BEGAN<span class="marquee-asterisk"> ✳ </span></span>').join('');
}

const header = document.getElementById('site-header');
const menu = document.getElementById('mobile-navigation');
const menuButton = document.getElementById('menu-toggle');
function setMenuOpen(open) {
  menu.classList.toggle('mobile-nav-panel--open', open);
  menu.inert = !open;
  menu.setAttribute('aria-hidden', String(!open));
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  menuButton.textContent = open ? '✕' : '☰';
  document.body.style.overflow = open ? 'hidden' : '';
  header.classList.toggle('site-header--solid', open || window.scrollY > 50);
  header.classList.remove('site-header--hidden');
}
function closeMenu() { setMenuOpen(false); }
menuButton.addEventListener('click', () => setMenuOpen(menuButton.getAttribute('aria-expanded') !== 'true'));
menu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));

const overlay = document.getElementById('ticket-overlay');
let ticketTrigger = null;
function closeTickets() {
  if (overlay.style.display === 'none') return;
  overlay.style.display = 'none';
  document.body.style.overflow = '';
  ticketTrigger?.focus();
}
document.querySelectorAll('[data-tickets]').forEach(button => button.addEventListener('click', () => {
  closeMenu();
  ticketTrigger = button;
  overlay.style.display = 'flex';
  document.body.style.overflow = 'hidden';
  document.getElementById('ticket-close').focus();
}));
document.getElementById('ticket-close').addEventListener('click', closeTickets);
document.getElementById('ticket-signup').addEventListener('click', closeTickets);
overlay.addEventListener('mousedown', event => { if (event.target === overlay) closeTickets(); });

const backgroundVideo = document.getElementById('hero-video');
let heroVisible = true;
function syncBackgroundVideo() {
  if (reducedMotion.matches || !heroVisible || document.hidden) backgroundVideo.pause();
  else backgroundVideo.play().catch(() => { /* The supplied photo remains visible when autoplay is unavailable. */ });
}
function videoFailed() { backgroundVideo.hidden = true; }
backgroundVideo.addEventListener('error', videoFailed);
backgroundVideo.querySelector('source').addEventListener('error', videoFailed);
reducedMotion.addEventListener('change', syncBackgroundVideo);
document.addEventListener('visibilitychange', syncBackgroundVideo);
new IntersectionObserver(([entry]) => { heroVisible = entry.isIntersecting; syncBackgroundVideo(); }).observe(document.getElementById('home'));
syncBackgroundVideo();

let previousScroll = window.scrollY;
window.addEventListener('scroll', () => {
  const scroll = window.scrollY;
  const menuOpen = menuButton.getAttribute('aria-expanded') === 'true';
  header.classList.toggle('site-header--solid', scroll > 50 || menuOpen);
  if (Math.abs(scroll - previousScroll) > 8) {
    header.classList.toggle('site-header--hidden', scroll > previousScroll && scroll > 160 && !menuOpen);
    previousScroll = scroll;
  }
}, { passive: true });
window.addEventListener('keydown', event => {
  if (event.key === 'Escape') { closeMenu(); closeTickets(); }
  if (event.key === 'Tab' && overlay.style.display !== 'none') {
    const focusables = [...overlay.querySelectorAll('a[href], button:not([disabled])')];
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }
});
document.getElementById('newsletter-form').addEventListener('submit', event => {
  event.preventDefault();
  const message = document.getElementById('form-message');
  message.textContent = 'Offline design preview: newsletter is not connected yet. No signup was submitted.';
  message.classList.add('form-message--error');
});
