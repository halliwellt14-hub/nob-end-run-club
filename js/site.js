// Mobile menu: toggle, close on link tap or Escape, swap icon
const btn = document.querySelector('.menu-btn'), nav = document.getElementById('nav');
const BARS = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>';
const CROSS = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M5 5l14 14M19 5L5 19"/></svg>';
function setMenu(open) {
  if (!nav || !btn) return;
  nav.classList.toggle('open', open);
  btn.setAttribute('aria-expanded', open);
  btn.setAttribute('aria-label', open ? 'Close menu' : 'Menu');
  btn.innerHTML = open ? CROSS : BARS;
}
if (btn) {
  btn.addEventListener('click', () => setMenu(!nav.classList.contains('open')));
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });
}
const yr = document.getElementById('yr'); if (yr) yr.textContent = new Date().getFullYear();

// Sticky "Register your interest" button on phones: only appears once the top section has scrolled away
const cta = document.querySelector('.mobile-cta');
const heroEl = document.querySelector('.hero, .page-hero');
if (cta) {
  document.body.classList.add('has-cta');
  if (heroEl && 'IntersectionObserver' in window) {
    new IntersectionObserver(([e]) => cta.classList.toggle('show', !e.isIntersecting)).observe(heroEl);
  } else { cta.classList.add('show'); }
}

// "This week" runs: reads /data/runs.json (edit that file to update the site)
const box = document.getElementById('this-week');
if (box) {
  fetch('/data/runs.json', { cache: 'no-store' }).then(r => r.json()).then(d => {
    if (!d.runs || !d.runs.length) return;
    const esc = s => String(s || '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
    box.innerHTML = d.runs.map(r => `
      <div class="run-row">
        <div class="when"><b>${esc(r.day)}</b><span>${esc(r.date)} · ${esc(r.time)}</span></div>
        <div class="what">${esc(r.title)}<small>${esc(r.where)}</small></div>
        ${r.map ? `<a class="map" href="${esc(r.map)}" target="_blank" rel="noopener">Map</a>` : '<span></span>'}
      </div>`).join('');
  }).catch(() => {});
}

// Hide any photo that fails to load
document.querySelectorAll('img').forEach(i => i.addEventListener('error', () => { i.style.visibility = 'hidden'; }));
