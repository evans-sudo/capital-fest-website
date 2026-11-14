const symbolString=['✳','✦','◈','✳','◆','✦','✳','◉','✳','✦','◈','✳','◆','✦','✳','◉'];
for(const id of ['symbol-track-one','symbol-track-two','symbol-track-footer']){
 const el=document.getElementById(id); el.innerHTML=Array(2).fill('<span class="symbols__set">'+symbolString.map((s,i)=>`<span class="symbols__glyph symbols__glyph--${i%4}">${s}</span>`).join('')+'</span>').join('');
}
const gallery=[2,7,18,20,12,21,1,6,13,10,15,3,5,9,11,14,17,16,19,4,8];
const track=document.getElementById('highlights-track');
track.innerHTML=gallery.map((photo,i)=>`<div class="highlight-card highlight-card--${i%5}"><img loading="lazy" src="../public/images/photo-${String(photo).padStart(2,'0')}.webp" alt="Capital Fest gallery photo ${i+1}"><span class="highlight-card__number">CF/${String(i+1).padStart(2,'0')}</span><span class="highlight-card__arrow">↗</span></div>`).join('');
const updateGallery=()=>{const first=track.querySelector('.highlight-card');const step=first.getBoundingClientRect().width+18;document.getElementById('gallery-number').textContent=String(Math.min(21,Math.max(1,1+Math.round(track.scrollLeft/step)))).padStart(2,'0');};
track.addEventListener('scroll',updateGallery);
for(const [id,dir] of [['gallery-prev',-1],['gallery-next',1]])document.getElementById(id).addEventListener('click',()=>{const first=track.querySelector('.highlight-card');track.scrollBy({left:(first.getBoundingClientRect().width+18)*dir,behavior:'smooth'});});
for(const id of ['marq-one','marq-two'])document.getElementById(id).innerHTML=Array(12).fill('<span>WHERE IT ALL BEGAN<span class="marquee-asterisk"> ✳ </span></span>').join('');
const overlay=document.getElementById('ticket-overlay');const closeTickets=()=>{overlay.style.display='none';document.body.style.overflow='';};
document.querySelectorAll('[data-tickets]').forEach(el=>el.addEventListener('click',()=>{closeMenu();overlay.style.display='flex';document.body.style.overflow='hidden';document.getElementById('ticket-close').focus();}));
document.getElementById('ticket-close').addEventListener('click',closeTickets);document.getElementById('ticket-signup').addEventListener('click',closeTickets);overlay.addEventListener('mousedown',e=>{if(e.target===overlay)closeTickets();});
const menu=document.getElementById('mobile-navigation'),menuButton=document.getElementById('menu-toggle');function closeMenu(){menu.classList.remove('mobile-nav-panel--open');menuButton.setAttribute('aria-expanded','false');menuButton.textContent='☰';document.body.style.overflow='';}
menuButton.addEventListener('click',()=>{let next=!menu.classList.contains('mobile-nav-panel--open');menu.classList.toggle('mobile-nav-panel--open',next);menuButton.setAttribute('aria-expanded',String(next));menuButton.textContent=next?'✕':'☰';document.body.style.overflow=next?'hidden':'';});menu.querySelectorAll('a').forEach(e=>e.addEventListener('click',closeMenu));
window.addEventListener('keydown',e=>{if(e.key==='Escape'){closeMenu();closeTickets();}});window.addEventListener('scroll',()=>document.getElementById('site-header').classList.toggle('site-header--solid',window.scrollY>50));
document.getElementById('newsletter-form').addEventListener('submit',e=>{e.preventDefault();let msg=document.getElementById('form-message');msg.textContent='Preview mode: newsletter is not connected yet. Configure NEWSLETTER_WEBHOOK_URL in the Next.js project.';msg.classList.add('form-message--error');});
