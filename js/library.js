/* ── library.js ── */

const grid       = document.getElementById('gameGrid');
const overlay    = document.getElementById('detailOverlay');
const detailCard = document.getElementById('detailCard');
const detailContent = document.getElementById('detailContent');
const headerStats   = document.getElementById('headerStats');
const sortSelect    = document.getElementById('sortSelect');

let activeFilter = 'all';

/* ── helpers ── */
const formatDate = iso => {
  if (!iso) return '—';
  const d = new Date(iso);
  return d.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
};

const statusLabel = s => ({
  playing:   { text: 'Oynuyor', cls: 'status--playing' },
  completed: { text: 'Tamamlandı', cls: 'status--completed' },
  dropped:   { text: 'Bıraktı', cls: 'status--dropped' },
  backlog:   { text: 'Sırada', cls: 'status--backlog' }
}[s] || { text: s, cls: '' });

const stars = rating => {
  const filled = Math.round(rating / 2);
  return Array.from({ length: 5 }, (_, i) =>
    `<span class="${i < filled ? 'star--on' : 'star--off'}">★</span>`
  ).join('');
};

/* ── header stats ── */
function renderStats() {
  const total  = GAMES.length;
  const totalH = GAMES.reduce((a, g) => a + g.hours, 0);
  const favs   = GAMES.filter(g => g.favorite).length;
  const done   = GAMES.filter(g => g.status === 'completed').length;
  headerStats.innerHTML = `
    <div class="stat"><span class="stat__num">${total}</span><span class="stat__lbl">Oyun</span></div>
    <div class="stat"><span class="stat__num">${totalH}</span><span class="stat__lbl">Saat</span></div>
    <div class="stat"><span class="stat__num">${done}</span><span class="stat__lbl">Tamamlanan</span></div>
    <div class="stat"><span class="stat__num">${favs}</span><span class="stat__lbl">Favori</span></div>
  `;
}

/* ── filter & sort ── */
function getFiltered() {
  let list = [...GAMES];
  if (activeFilter === 'favorite')  list = list.filter(g => g.favorite);
  if (activeFilter === 'completed') list = list.filter(g => g.status === 'completed');
  if (activeFilter === 'playing')   list = list.filter(g => g.status === 'playing');

  const sort = sortSelect.value;
  if (sort === 'recent')     list.sort((a,b) => (b.lastPlayed||'') < (a.lastPlayed||'') ? -1 : 1);
  if (sort === 'rating')     list.sort((a,b) => b.rating - a.rating);
  if (sort === 'hours')      list.sort((a,b) => b.hours - a.hours);
  if (sort === 'name')       list.sort((a,b) => a.title.localeCompare(b.title, 'tr'));
  if (sort === 'completion') list.sort((a,b) => b.completion - a.completion);
  return list;
}

/* ── card HTML ── */
function cardHTML(game) {
  const sl = statusLabel(game.status);
  return `
    <article class="game-card ${game.favorite ? 'game-card--fav' : ''}" data-id="${game.id}" tabindex="0">
      <div class="game-card__cover-wrap">
        <img class="game-card__cover" src="${game.cover}" alt="${game.title}" loading="lazy">
        <div class="game-card__shimmer"></div>
        ${game.favorite ? '<span class="fav-badge" title="Favori">⭐</span>' : ''}
        <span class="game-card__status ${sl.cls}">${sl.text}</span>
      </div>

      <div class="game-card__info">
        <h2 class="game-card__title">${game.title}</h2>
        <div class="game-card__meta">
          <span class="meta-item">⏱ ${game.hours} sa</span>
          <span class="meta-item">${stars(game.rating)}</span>
        </div>
        <div class="game-card__progress">
          <div class="progress-bar">
            <div class="progress-bar__fill" style="width:${game.completion}%"></div>
          </div>
          <span class="progress-label">%${game.completion}</span>
        </div>
      </div>

      <!-- hover detail panel -->
      <div class="game-card__hover">
        <p class="hover-review">"${game.review}"</p>
        <div class="hover-grid">
          <div class="hover-item">
            <span class="hover-item__lbl">Puan</span>
            <span class="hover-item__val">${game.rating}<span class="out-of">/10</span></span>
          </div>
          <div class="hover-item">
            <span class="hover-item__lbl">Süre</span>
            <span class="hover-item__val">${game.hours}<span class="out-of"> sa</span></span>
          </div>
          ${game.achievements ? `
          <div class="hover-item">
            <span class="hover-item__lbl">Başarımlar</span>
            <span class="hover-item__val">${game.achievements.earned}<span class="out-of">/${game.achievements.total}</span></span>
          </div>` : ''}
          <div class="hover-item">
            <span class="hover-item__lbl">Son Oynama</span>
            <span class="hover-item__val small">${formatDate(game.lastPlayed)}</span>
          </div>
        </div>
        <div class="hover-genres">
          ${game.genre.map(g => `<span class="genre-tag">${g}</span>`).join('')}
        </div>
        <button class="hover-detail-btn" data-id="${game.id}">Detayları Gör →</button>
      </div>
    </article>
  `;
}

/* ── render grid ── */
function renderGrid() {
  const list = getFiltered();
  grid.innerHTML = list.length
    ? list.map(cardHTML).join('')
    : `<div class="empty-state">Bu filtre için oyun bulunamadı.</div>`;

  /* hover / click / keyboard events */
  grid.querySelectorAll('.game-card').forEach(card => {
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter') openDetail(+card.dataset.id);
    });
    /* mobile: no hover panel, direct click opens overlay */
    card.addEventListener('click', e => {
      if (window.innerWidth <= 768 && !e.target.classList.contains('hover-detail-btn')) {
        openDetail(+card.dataset.id);
      }
    });
  });

  grid.querySelectorAll('.hover-detail-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      openDetail(+btn.dataset.id);
    });
  });
}

/* ── detail overlay ── */
function openDetail(id) {
  const g = GAMES.find(x => x.id === id);
  if (!g) return;
  const sl = statusLabel(g.status);
  const achPct = g.achievements
    ? Math.round(g.achievements.earned / g.achievements.total * 100)
    : null;

  detailContent.innerHTML = `
    <div class="detail-hero">
      <img src="${g.cover}" alt="${g.title}" class="detail-hero__img">
      <div class="detail-hero__overlay"></div>
      <div class="detail-hero__text">
        ${g.favorite ? '<span class="fav-badge fav-badge--lg">⭐ Favori</span>' : ''}
        <h2 class="detail-title">${g.title}</h2>
        <div class="detail-genres">${g.genre.map(x => `<span class="genre-tag">${x}</span>`).join('')}</div>
      </div>
    </div>

    <div class="detail-body">
      <div class="detail-review">"${g.review}"</div>

      <div class="detail-stats-row">
        <div class="dstat">
          <span class="dstat__val">${g.rating}<small>/10</small></span>
          <span class="dstat__lbl">Puan</span>
          <div class="dstat__stars">${stars(g.rating)}</div>
        </div>
        <div class="dstat">
          <span class="dstat__val">${g.hours}<small>sa</small></span>
          <span class="dstat__lbl">Oynama Süresi</span>
        </div>
        <div class="dstat">
          <span class="dstat__val">%${g.completion}</span>
          <span class="dstat__lbl">Tamamlanma</span>
        </div>
        ${g.achievements ? `
        <div class="dstat">
          <span class="dstat__val">${g.achievements.earned}<small>/${g.achievements.total}</small></span>
          <span class="dstat__lbl">Başarım</span>
        </div>` : ''}
      </div>

      <div class="detail-progress-section">
        <div class="detail-progress-label">
          <span>Tamamlanma</span>
          <span>%${g.completion}</span>
        </div>
        <div class="progress-bar progress-bar--lg">
          <div class="progress-bar__fill" style="width:${g.completion}%"></div>
        </div>
        ${achPct !== null ? `
        <div class="detail-progress-label" style="margin-top:8px">
          <span>Başarımlar</span>
          <span>%${achPct}</span>
        </div>
        <div class="progress-bar progress-bar--lg progress-bar--gold">
          <div class="progress-bar__fill" style="width:${achPct}%"></div>
        </div>` : ''}
      </div>

      <div class="detail-footer">
        <div class="detail-footer__item">
          <span class="detail-footer__lbl">Durum</span>
          <span class="game-card__status ${sl.cls}">${sl.text}</span>
        </div>
        <div class="detail-footer__item">
          <span class="detail-footer__lbl">Son Oynama</span>
          <span>${formatDate(g.lastPlayed)}</span>
        </div>
      </div>

      ${g.tags ? `<div class="detail-tags">${g.tags.map(t => `<span class="tag">#${t}</span>`).join('')}</div>` : ''}
    </div>
  `;

  overlay.classList.add('is-open');
  document.body.style.overflow = 'hidden';
}

function closeDetail() {
  overlay.classList.remove('is-open');
  document.body.style.overflow = '';
}

/* ── event listeners ── */
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeFilter = btn.dataset.filter;
    renderGrid();
  });
});

sortSelect.addEventListener('change', renderGrid);

document.getElementById('detailClose').addEventListener('click', closeDetail);
overlay.addEventListener('click', e => { if (e.target === overlay) closeDetail(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeDetail(); });

/* ── init ── */
renderStats();
renderGrid();
