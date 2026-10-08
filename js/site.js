// Mobile menu
const btn = document.querySelector('.menu-btn'), nav = document.getElementById('nav');
if (btn) btn.addEventListener('click', () => { const o = nav.classList.toggle('open'); btn.setAttribute('aria-expanded', o); });
const yr = document.getElementById('yr'); if (yr) yr.textContent = new Date().getFullYear();

// "This week" runs — reads /data/runs.json (edit that file to update the site)
const box = document.getElementById('this-week');
if (box) {
  fetch('/data/runs.json', { cache: 'no-store' }).then(r => r.json()).then(d => {
    if (!d.runs || !d.runs.length) return;
    const esc = s => String(s || '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
    box.innerHTML = d.runs.map(r => `
      <div class="run-row">
        <div class="when"><b>${esc(r.day)}</b><span>${esc(r.date)} · ${esc(r.time)}</span></div>
        <div class="what">${esc(r.title)}<small>${esc(r.where)}</small></div>
        ${r.map ? `<a class="map" href="${esc(r.map)}" target="_blank" rel="noopener">Map →</a>` : '<span></span>'}
      </div>`).join('');
  }).catch(() => {});
}

// Hide any photo that hasn't been uploaded yet (keeps the green panel)
document.querySelectorAll('img').forEach(i => i.addEventListener('error', () => { i.style.visibility = 'hidden'; }));
