/* Каталог ТоргАгроХим — общий блок для всех вариантов сайта.
   Данные: window.TAH_CATALOG (media/catalog/data.js: 481 позиция из черновика клиента + Фертика 19.10.2026).
   Сверху блок «Партнёры»: карточка производителя открывает всю его продукцию (или ссылка #partner-<id>).
   Подключение: <div class="tahc" id="tahc"></div> + data.js + этот файл.
   Внешний вид задаётся CSS-переменными варианта (--c-bg, --c-card, --c-text, --c-muted, --c-line,
   --c-acc, --c-acc-ink, --c-radius, --c-head). Фильтр из ссылки: #catalog-<id группы>. */
(function () {
  var D = window.TAH_CATALOG; var root = document.getElementById('tahc');
  if (!D || !root) return;
  var WA = root.getAttribute('data-wa') || '79283120201';
  var TEL = root.getAttribute('data-tel') || '+79187441441';
  var IMG = window.TAH_IMG || null; // в самодостаточных файлах картинки встроены
  var imgDir = root.getAttribute('data-img') || '../media/catalog/img/';
  var PAGE = 12;
  var LOGO = { bashinkom: 'bashinkom.png', eurochem: 'eurochem.svg', agrimatco: 'agrimatco.png', kimitec: 'kimitec.svg', polyfeed: 'polyfeed.svg', biogrow: 'biogrow.png', bui: 'bui.png', acron: 'acron.png', daymsa: 'daymsa.png', pharmbiomed: 'pharmbiomed.png', agrosintez: 'agrosintez.png', nestm: 'nestm.png', mcfp: 'mcfp.png', biolchim: 'biolchim.png', ikar: 'ikar.svg', himagromarketing: 'himagromarketing.png', fertika: 'fertika.png' };
  var logoDir = root.getAttribute('data-logos') || '../media/partners/';
  var logoSrc = function (id) { var f = LOGO[id]; if (!f) return ''; return (window.TAH_LOGO && window.TAH_LOGO[f]) || logoDir + f; };

  var css = '' +
  '.tahc{--r:var(--c-radius,14px);color:var(--c-text,#1d2a18);font-size:15px}' +
  '.tahc *{box-sizing:border-box}' +
  '.tahc .tc-bar{display:grid;grid-template-columns:1.4fr 1fr auto;gap:10px;align-items:end;margin-bottom:14px}' +
  '.tahc label{display:block;font-size:12.5px;font-weight:600;color:var(--c-muted,#5d6a55);margin-bottom:6px}' +
  '.tahc input,.tahc select{width:100%;min-height:48px;padding:0 14px;border-radius:calc(var(--r) - 4px);border:1px solid var(--c-line,#dcdcd2);background:var(--c-card,#fff);color:inherit;font:inherit;font-size:15px}' +
  '.tahc input::placeholder{color:var(--c-muted,#5d6a55);opacity:.8}' +
  '.tahc input:focus-visible,.tahc select:focus-visible,.tahc button:focus-visible,.tahc a:focus-visible{outline:2px solid var(--c-acc,#3c6b2a);outline-offset:2px}' +
  '.tahc .tc-reset{min-height:48px;padding:0 16px;border-radius:calc(var(--r) - 4px);border:1px solid var(--c-line,#dcdcd2);background:transparent;color:inherit;font:inherit;font-weight:600;cursor:pointer;white-space:nowrap}' +
  '.tahc .tc-reset:hover{border-color:var(--c-acc,#3c6b2a)}' +
  '.tahc .tc-chips{display:flex;gap:8px;overflow-x:auto;padding:2px 0 10px;scrollbar-width:thin}' +
  '.tahc .tc-chip{flex:none;min-height:40px;padding:0 16px;border-radius:999px;border:1px solid var(--c-line,#dcdcd2);background:transparent;color:inherit;font:inherit;font-size:14px;font-weight:600;cursor:pointer;white-space:nowrap;transition:background-color .2s,color .2s,border-color .2s}' +
  '.tahc .tc-chip:hover{border-color:var(--c-acc,#3c6b2a)}' +
  '.tahc .tc-chip[aria-pressed="true"]{background:var(--c-acc,#3c6b2a);border-color:var(--c-acc,#3c6b2a);color:var(--c-acc-ink,#fff)}' +
  '.tahc .tc-chip small{opacity:.7;font-weight:500;margin-left:6px}' +
  '.tahc .tc-sub .tc-chip{min-height:34px;font-size:13px;padding:0 12px}' +
  '.tahc .tc-types{display:flex;align-items:center;gap:10px;margin:2px 0 6px}.tahc .tc-types>span{flex:none;font-size:13px;font-weight:700;color:var(--c-muted,#5d6a55)}.tahc .tc-types .tc-chips{padding-bottom:4px}' +
  '.tahc .tc-count{font-size:13.5px;color:var(--c-muted,#5d6a55);margin:4px 0 16px}' +
  '.tahc .tc-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}' +
  '.tahc .tc-card{display:flex;flex-direction:column;background:var(--c-card,#fff);border:1px solid var(--c-line,#dcdcd2);border-radius:var(--r);overflow:hidden;transition:transform .25s cubic-bezier(.16,1,.3,1),box-shadow .25s,border-color .25s}' +
  '.tahc .tc-card:hover{transform:translateY(-3px);border-color:var(--c-acc,#3c6b2a);box-shadow:0 14px 30px -18px rgba(0,0,0,.35)}' +
  '.tahc .tc-pic{position:relative;aspect-ratio:4/3;background:#fff;display:grid;place-items:center;overflow:hidden;cursor:pointer;border:0;padding:0;width:100%}' +
  '.tahc .tc-pic img{position:absolute;inset:0;width:100%;height:100%;object-fit:contain;padding:10px}' +
  '.tahc .tc-pic[data-scope="family"] img,.tahc .tc-pic[data-scope="illustration"] img{object-fit:cover;padding:0}' +
  '.tahc .tc-body{padding:14px 14px 16px;display:flex;flex-direction:column;gap:6px;flex:1}' +
  '.tahc .tc-brand{font-size:12px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;color:var(--c-muted,#5d6a55)}' +
  '.tahc .tc-name{font-family:var(--c-head,inherit);font-size:17px;font-weight:600;line-height:1.25;margin:0}' +
  '.tahc .tc-sum{font-size:13.5px;color:var(--c-muted,#5d6a55);line-height:1.45}' +
  '.tahc .tc-pack{font-size:12.5px;color:var(--c-muted,#5d6a55)}' +
  '.tahc .tc-acts{margin-top:auto;padding-top:10px;display:flex;gap:8px}' +
  '.tahc .tc-btn,.tahc-dlg .tc-btn{flex:1;display:inline-flex;align-items:center;justify-content:center;gap:6px;min-height:44px;padding:0 10px;border-radius:calc(var(--r) - 4px);font:inherit;font-size:13.5px;font-weight:700;text-decoration:none;cursor:pointer;border:1px solid var(--c-line,#dcdcd2);background:transparent;color:inherit;white-space:nowrap}' +
  '.tahc .tc-btn.wa,.tahc-dlg .tc-btn.wa{background:var(--c-acc,#3c6b2a);border-color:var(--c-acc,#3c6b2a);color:var(--c-acc-ink,#fff)}' +
  '.tahc .tc-btn:hover,.tahc-dlg .tc-btn:hover{filter:brightness(1.08)}' +
  '.tahc .tc-more{display:flex;justify-content:center;margin-top:22px}' +
  '.tahc .tc-more[hidden],.tahc .tc-chip[hidden]{display:none}' +
  '.tahc .tc-else{border:0;background:none;padding:4px 0;font:inherit;font-weight:700;color:var(--c-acc,#3c6b2a);text-decoration:underline;text-underline-offset:3px;cursor:pointer}' +
  '@media (max-width:600px){.tahc .tc-pic{aspect-ratio:1/1}.tahc .tc-pic img{padding:6px}}' +
  '.tahc .tc-more button{min-height:50px;padding:0 28px;border-radius:999px;border:1px solid var(--c-acc,#3c6b2a);background:transparent;color:inherit;font:inherit;font-weight:700;cursor:pointer}' +
  '.tahc .tc-more button:hover{background:var(--c-acc,#3c6b2a);color:var(--c-acc-ink,#fff)}' +
  '.tahc .tc-empty{padding:40px 20px;text-align:center;border:1px dashed var(--c-line,#dcdcd2);border-radius:var(--r);color:var(--c-muted,#5d6a55)}' +
  '.tahc-dlg{width:min(860px,calc(100% - 24px));max-height:calc(100% - 24px);padding:0;border:0;border-radius:18px;background:var(--c-card,#fff);color:var(--c-text,#1d2a18)}' +
  '.tahc-dlg::backdrop{background:rgba(0,0,0,.55)}' +
  '.tahc-dlg .dl{display:grid;grid-template-columns:1fr 1.25fr;gap:0}' +
  '.tahc-dlg .dl-pic{background:#fff;display:grid;place-items:center;min-height:280px}' +
  '.tahc-dlg .dl-pic img{width:100%;height:100%;max-height:420px;object-fit:contain;padding:18px}' +
  '.tahc-dlg .dl-txt{padding:26px 26px 24px;display:flex;flex-direction:column;gap:10px;font-size:14.5px}' +
  '.tahc-dlg h3{font-family:var(--c-head,inherit);font-size:24px;line-height:1.15;margin:0;padding-right:40px}' +
  '.tahc-dlg dl{display:grid;grid-template-columns:120px 1fr;gap:6px 14px;margin:6px 0}' +
  '.tahc-dlg dt{color:var(--c-muted,#5d6a55);font-size:13px}' +
  '.tahc-dlg dd{margin:0}' +
  '.tahc-dlg .note{font-size:12.5px;color:var(--c-muted,#5d6a55)}' +
  '.tahc-dlg{position:fixed;inset:0;margin:auto}.tahc-dlg .x{position:absolute;z-index:2;top:12px;right:12px;width:44px;height:44px;border-radius:50%;border:1px solid var(--c-line,#dcdcd2);background:var(--c-card,#fff);color:inherit;font-size:22px;line-height:1;cursor:pointer}' +
  '.tahc-dlg .acts{display:flex;gap:8px;flex-wrap:wrap;margin-top:6px}' +
  '.tahc .tc-partners{margin:0 0 30px}' +
  '.tahc .tc-ph{display:flex;justify-content:space-between;align-items:baseline;gap:16px;flex-wrap:wrap;margin-bottom:14px}' +
  '.tahc .tc-ph h3{font-family:var(--c-head,inherit);font-size:21px;font-weight:600;margin:0}' +
  '.tahc .tc-ph p{margin:0;font-size:13.5px;color:var(--c-muted,#5d6a55)}' +
  '.tahc .tc-plist{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:10px}' +
  '.tahc .tc-pcard{display:flex;flex-direction:column;align-items:flex-start;gap:4px;min-height:112px;padding:14px 16px;text-align:left;border-radius:var(--r);border:1px solid var(--c-line,#dcdcd2);background:var(--c-card,#fff);color:inherit;font:inherit;cursor:pointer;transition:border-color .2s,transform .25s cubic-bezier(.16,1,.3,1)}' +
  '.tahc .tc-pcard:hover{border-color:var(--c-acc,#3c6b2a);transform:translateY(-2px)}' +
  '.tahc .tc-pcard[aria-pressed="true"]{border-color:var(--c-acc,#3c6b2a);box-shadow:inset 0 0 0 1px var(--c-acc,#3c6b2a)}' +
  '.tahc .tc-pcard .lg{display:grid;place-items:center;width:100%;height:58px;margin-bottom:6px;background:#fff;border-radius:calc(var(--r) - 6px)}' +
  '.tahc .tc-pcard .lg img{max-width:82%;max-height:46px;object-fit:contain;transition:transform .3s cubic-bezier(.16,1,.3,1)}' +
  '.tahc .tc-pcard:hover .lg img,.tahc .tc-pcard:focus-visible .lg img,.tahc .tc-pcard:active .lg img{transform:scale(1.35)}' +
  '.tahc .tc-pcard .lg{position:relative;z-index:1}' +
  '@media (prefers-reduced-motion:reduce){.tahc .tc-pcard .lg img{transition:none}}' +
  '.tahc .tc-pcard b{font-family:var(--c-head,inherit);font-size:16px;font-weight:600;line-height:1.2}' +
  '.tahc .tc-pcard span{font-size:12.5px;line-height:1.4;color:var(--c-muted,#5d6a55)}' +
  '.tahc .tc-pcard em{margin-top:auto;padding-top:6px;font-style:normal;font-size:13px;font-weight:700;color:var(--c-acc,#3c6b2a)}' +
  '@media (max-width:1100px){.tahc .tc-grid{grid-template-columns:repeat(3,1fr)}}' +
  '@media (max-width:760px){.tahc .tc-plist{grid-template-columns:1fr 1fr;gap:8px}.tahc .tc-pcard{min-height:0;padding:10px 12px}.tahc .tc-pcard span:not(.lg){display:none}.tahc .tc-pcard b{font-size:14px}.tahc .tc-pcard .lg{height:48px}.tahc .tc-pcard .lg img{max-height:38px}}' +
  '@media (max-width:760px){.tahc .tc-bar{grid-template-columns:1fr 1fr}.tahc .tc-bar .tc-q{grid-column:1/-1}.tahc .tc-grid{grid-template-columns:1fr 1fr;gap:10px}.tahc .tc-name{font-size:15px}.tahc .tc-sum{display:none}.tahc .tc-acts{flex-direction:column}.tahc-dlg .dl{grid-template-columns:1fr}.tahc-dlg .dl-pic{min-height:200px}.tahc-dlg dl{grid-template-columns:1fr;gap:2px}.tahc-dlg dd{margin-bottom:6px}}' +
  '@media (max-width:380px){.tahc .tc-grid{grid-template-columns:1fr}}' +
  '@media (prefers-reduced-motion:reduce){.tahc .tc-card{transition:none}.tahc .tc-card:hover{transform:none}}';
  css += '#catalog{scroll-margin-top:84px}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  var FIX = { 'Buyskiy himicheskiy zavod': 'Буйский химический завод' };
  var nm = function (s) { return FIX[s] || s; };
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var tops = D.groups.filter(function (g) { return !g.parent; });
  var subsOf = function (id) { return D.groups.filter(function (g) { return g.parent === id; }); };
  var gName = {}; D.groups.forEach(function (g) { gName[g.id] = g.name; });
  var TYPES = ['water-soluble', 'granular', 'liquid', 'micronutrients', 'fertigation', 'fungicides', 'insecticides', 'herbicides', 'acaricides', 'seed-treatments', 'adjuvants', 'bio', 'stimulants', 'substrates'];
  var count = function (id) { return D.items.filter(function (p) { return p.groups.indexOf(id) >= 0; }).length; };
  var state = { top: '', sub: '', partner: '', q: '', shown: PAGE };
  var src = function (p) { return IMG && IMG[p.img] ? IMG[p.img] : imgDir + p.img; };
  var waLink = function (p) { return 'https://wa.me/' + WA + '?text=' + encodeURIComponent('Здравствуйте! Интересует: ' + p.name + (p.brand ? ' (' + nm(p.brand) + ')' : '') + '. Подскажите цену и наличие.'); };

  var pCount = {}; D.items.forEach(function (p) { pCount[p.partnerId] = (pCount[p.partnerId] || 0) + 1; });
  var partners = D.partners.filter(function (p) { return pCount[p.id]; }).sort(function (a, b) { return pCount[b.id] - pCount[a.id]; });
  var pos = function (n) { var t = n % 10, h = n % 100; return n + (t === 1 && h !== 11 ? ' позиция' : t >= 2 && t <= 4 && (h < 12 || h > 14) ? ' позиции' : ' позиций'); };

  root.innerHTML =
    '<div class="tc-partners" id="partners"><div class="tc-ph"><h3>Партнёры</h3><p>Нажмите на производителя: ниже откроется вся его продукция.</p></div>' +
      '<div class="tc-plist" role="group" aria-label="Производители">' + partners.map(function (p) {
        var sub = nm(p.name) !== p.subtitle ? p.subtitle : '';
        var lg = logoSrc(p.id);
        return '<button class="tc-pcard" type="button" data-partner="' + esc(p.id) + '" aria-pressed="false">' + (lg ? '<span class="lg"><img src="' + lg + '" alt="" loading="lazy"></span>' : '') + '<b>' + esc(nm(p.name)) + '</b>' + (sub ? '<span>' + esc(sub) + '</span>' : '') + '<em>' + pos(pCount[p.id]) + ' →</em></button>';
      }).join('') + '</div></div>' +
    '<div class="tc-bar">' +
      '<div class="tc-q"><label for="tc-q">Поиск по названию, составу или задаче</label><input id="tc-q" type="search" placeholder="Например: кальций, фунгицид, Акварин" autocomplete="off"></div>' +
      '<div><label for="tc-p">Производитель</label><select id="tc-p"><option value="">Все производители</option>' +
        D.partners.map(function (p) { return '<option value="' + esc(p.id) + '">' + esc(nm(p.name)) + '</option>'; }).join('') + '</select></div>' +
      '<button class="tc-reset" type="button">Сбросить</button>' +
    '</div>' +
    '<div class="tc-chips" role="group" aria-label="Направление">' +
      '<button class="tc-chip" type="button" data-top="" aria-pressed="true">Вся продукция<small>' + D.items.length + '</small></button>' +
      tops.map(function (g) { return '<button class="tc-chip" type="button" data-top="' + g.id + '" aria-pressed="false">' + esc(g.name) + '<small>' + count(g.id) + '</small></button>'; }).join('') +
    '</div>' +
    '<div class="tc-chips tc-sub" role="group" aria-label="Подгруппа" hidden></div>' +
    '<div class="tc-types"><span>По виду:</span><div class="tc-chips" role="group" aria-label="Вид продукции">' + TYPES.filter(function (id) { return count(id); }).map(function (id) { return '<button class="tc-chip" type="button" data-type="' + id + '" aria-pressed="false">' + esc(gName[id]) + '<small>' + count(id) + '</small></button>'; }).join('') + '</div></div>' +
    '<p class="tc-count" aria-live="polite"></p>' +
    '<div class="tc-grid"></div>' +
    '<div class="tc-more"><button type="button">Показать ещё</button></div>';

  var $ = function (s) { return root.querySelector(s); };
  var grid = $('.tc-grid'), cnt = $('.tc-count'), more = $('.tc-more'), subBox = $('.tc-sub');

  var dlg = document.createElement('dialog'); dlg.className = 'tahc-dlg'; (root.closest('section') || root.parentNode).appendChild(dlg);
  dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });

  var filtered = function () {
    var q = state.q.trim().toLowerCase();
    return D.items.filter(function (p) {
      if (state.top && p.groups.indexOf(state.top) < 0) return false;
      if (state.sub && p.groups.indexOf(state.sub) < 0) return false;
      if (state.partner && p.partnerId !== state.partner) return false;
      if (q) { var hay = (p.name + ' ' + (p.brand || '') + ' ' + (p.category || '') + ' ' + (p.composition || '') + ' ' + (p.summary || '') + ' ' + (p.use || '')).toLowerCase(); if (hay.indexOf(q) < 0) return false; }
      return true;
    });
  };

  var card = function (p) {
    return '<article class="tc-card">' +
      '<button class="tc-pic" type="button" data-id="' + esc(p.id) + '" data-scope="' + esc(p.imageScope || 'product') + '" aria-label="Подробнее: ' + esc(p.name) + '"><img src="' + src(p) + '" alt="" loading="lazy" decoding="async" width="420" height="315"></button>' +
      '<div class="tc-body"><span class="tc-brand">' + esc(nm(p.brand || '')) + '</span><h3 class="tc-name">' + esc(p.name) + '</h3>' +
      (p.summary ? '<p class="tc-sum">' + esc(p.summary) + '</p>' : '') +
      (p.packaging ? '<span class="tc-pack">' + esc(p.packaging) + '</span>' : '') +
      '<div class="tc-acts"><button class="tc-btn" type="button" data-id="' + esc(p.id) + '">Подробнее</button><a class="tc-btn wa" href="' + waLink(p) + '" target="_blank" rel="noopener">Цена в WhatsApp</a></div></div></article>';
  };

  var render = function () {
    var list = filtered();
    var allHits = 0;
    if (state.q.trim() && (state.top || state.sub || state.partner)) { var keep = state; state = { top: '', sub: '', partner: '', q: keep.q, shown: PAGE }; allHits = filtered().length; state = keep; }
    var more2 = allHits - list.length;
    cnt.innerHTML = list.length ? 'Найдено позиций: ' + list.length + '. Цена и наличие — у менеджера.' +
      (more2 > 0 ? ' <button class="tc-else" type="button" data-all>Ещё ' + more2 + ' в других разделах — искать везде</button>' : '') : '';
    grid.innerHTML = list.length ? list.slice(0, state.shown).map(card).join('') : '<div class="tc-empty" style="grid-column:1/-1">Ничего не нашлось в выбранном разделе.' +
      (allHits ? '<br><button class="tc-chip" type="button" data-all style="margin-top:14px">Искать во всех разделах: ' + allHits + '</button>' : ' Сбросьте фильтры или напишите менеджеру, что ищете: подберём.') + '</div>';
    more.hidden = list.length <= state.shown;
    if (!more.hidden) more.firstChild.textContent = 'Показать ещё ' + Math.min(PAGE, list.length - state.shown) + ' из ' + (list.length - state.shown);
    root.querySelectorAll('.tc-pcard').forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-partner') === state.partner ? 'true' : 'false'); });
    root.querySelectorAll('.tc-chips:not(.tc-sub) .tc-chip').forEach(function (b) { var on = b.getAttribute('data-top') === state.top; b.setAttribute('aria-pressed', on ? 'true' : 'false'); if (on) b.parentNode.scrollLeft = Math.max(0, b.offsetLeft - b.parentNode.offsetLeft - 16); });
    // счётчики видов и направлений — в пределах выбранного производителя; пустые прячем
    var inP = state.partner ? D.items.filter(function (p) { return p.partnerId === state.partner; }) : D.items;
    root.querySelectorAll('[data-type],.tc-chips:not(.tc-sub) [data-top]:not([data-top=""])').forEach(function (b) { var id = b.getAttribute('data-type') || b.getAttribute('data-top'); var n = inP.filter(function (p) { return p.groups.indexOf(id) >= 0; }).length; b.querySelector('small').textContent = n; b.hidden = !n; });
    root.querySelectorAll('[data-type]').forEach(function (b) { var id = b.getAttribute('data-type'); b.setAttribute('aria-pressed', (state.sub === id || (!state.sub && state.top === id)) ? 'true' : 'false'); });
    var nIn = function (id) { return inP.filter(function (p) { return p.groups.indexOf(id) >= 0; }).length; };
    var subs = state.top ? subsOf(state.top).filter(function (g) { return nIn(g.id); }) : [];
    subBox.hidden = !subs.length;
    subBox.innerHTML = subs.length ? '<button class="tc-chip" type="button" data-sub="" aria-pressed="' + (!state.sub) + '">Все в группе</button>' + subs.map(function (g) { return '<button class="tc-chip" type="button" data-sub="' + g.id + '" aria-pressed="' + (state.sub === g.id) + '">' + esc(g.name) + '<small>' + nIn(g.id) + '</small></button>'; }).join('') : '';
  };

  var open = function (id) {
    var p = D.items.filter(function (x) { return x.id === id; })[0]; if (!p) return;
    var row = function (k, v) { return v ? '<dt>' + k + '</dt><dd>' + esc(Array.isArray(v) ? v.join(', ') : v) + '</dd>' : ''; };
    dlg.innerHTML = '<button class="x" type="button" aria-label="Закрыть" autofocus>×</button><div class="dl"><div class="dl-pic"><img src="' + src(p) + '" alt="' + esc(p.name) + '"></div><div class="dl-txt">' +
      '<span class="tc-brand" style="font-size:12px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;color:var(--c-muted,#5d6a55)">' + esc(nm(p.brand || '')) + '</span><h3>' + esc(p.name) + '</h3>' +
      (p.description ? '<p>' + esc(p.description) + '</p>' : (p.summary ? '<p>' + esc(p.summary) + '</p>' : '')) +
      '<dl>' + row('Категория', p.category) + row('Состав', p.composition) + row('Форма', p.form) + row('Фасовка', p.packaging) + row('Культуры', p.crops) + row('Применение', p.use) + '</dl>' +
      '<p class="note">Характеристики, фасовку и наличие уточнит менеджер. Регламент применения проверяйте по этикетке поставляемой продукции.</p>' +
      '<div class="acts"><a class="tc-btn wa" style="flex:none;padding:0 18px" href="' + waLink(p) + '" target="_blank" rel="noopener">Цена в WhatsApp</a><a class="tc-btn" style="flex:none;padding:0 18px" href="tel:' + TEL + '">Позвонить</a></div>' +
      '</div></div>';
    dlg.querySelector('.x').addEventListener('click', function () { dlg.close(); });
    if (dlg.showModal) dlg.showModal(); else dlg.setAttribute('open', '');
  };

  root.addEventListener('click', function (e) {
    var t = e.target.closest('button,a'); if (!t || !root.contains(t)) return;
    if (t.hasAttribute('data-partner')) { showPartner(state.partner === t.getAttribute('data-partner') ? '' : t.getAttribute('data-partner')); }
    else if (t.hasAttribute('data-type')) { var g = D.groups.filter(function (x) { return x.id === t.getAttribute('data-type'); })[0]; var same = (g.parent ? state.sub : state.top) === g.id && (g.parent ? true : !state.sub); state.top = same ? '' : (g.parent || g.id); state.sub = same ? '' : (g.parent ? g.id : ''); state.shown = PAGE; render(); }
    else if (t.hasAttribute('data-top')) { state.top = t.getAttribute('data-top'); state.sub = ''; state.shown = PAGE; render(); }
    else if (t.hasAttribute('data-sub')) { state.sub = t.getAttribute('data-sub'); state.shown = PAGE; render(); }
    else if (t.hasAttribute('data-all')) { state.top = ''; state.sub = ''; state.partner = ''; $('#tc-p').value = ''; state.shown = PAGE; render(); }
    else if (t.classList.contains('tc-reset')) { state = { top: '', sub: '', partner: '', q: '', shown: PAGE }; $('#tc-q').value = ''; $('#tc-p').value = ''; render(); }
    else if (t.parentNode === more) { state.shown += PAGE; render(); }
    else if (t.hasAttribute('data-id')) { open(t.getAttribute('data-id')); }
  });
  var timer; $('#tc-q').addEventListener('input', function (e) { clearTimeout(timer); timer = setTimeout(function () { state.q = e.target.value; state.shown = PAGE; render(); }, 180); });
  $('#tc-p').addEventListener('change', function (e) { state.partner = e.target.value; state.shown = PAGE; render(); });

  // Карточка партнёра: вся его продукция без других фильтров, прокрутка к списку
  var showPartner = function (id) {
    state = { top: '', sub: '', partner: id, q: '', shown: PAGE }; $('#tc-q').value = ''; $('#tc-p').value = id; render();
    if (!id) return;
    var bar = $('.tc-bar'); bar.style.scrollMarginTop = '84px';
    bar.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  };

  // Ссылки вида #catalog-<группа> с карточек направлений открывают каталог с фильтром, #partner-<id> — продукцию партнёра
  var fromHash = function () {
    var pm = /^#partner-([a-z0-9-]+)$/.exec(location.hash);
    if (pm && pCount[pm[1]]) { showPartner(pm[1]); return; }
    var m = /^#catalog-([a-z-]+)$/.exec(location.hash); if (!m) return;
    var g = D.groups.filter(function (x) { return x.id === m[1]; })[0]; if (!g) return;
    state.top = g.parent || g.id; state.sub = g.parent ? g.id : ''; state.shown = PAGE; render();
    var sec = document.getElementById('catalog') || root; if (!sec.style.scrollMarginTop) sec.style.scrollMarginTop = '84px'; sec.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  };
  window.addEventListener('hashchange', fromHash);
  // Плитки направлений и логотипы партнёров на странице: открываем каталог на каждое нажатие,
  // а не только при смене адреса (повторное нажатие той же плитки hashchange не вызывает)
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href^="#catalog-"],a[href^="#partner-"]');
    if (!a || root.contains(a)) return;
    e.preventDefault();
    if (history.replaceState) history.replaceState(null, '', a.getAttribute('href')); else location.hash = a.getAttribute('href');
    fromHash();
  });
  // iOS Safari включает :active (увеличение логотипа при нажатии) только при наличии обработчика touchstart
  document.addEventListener('touchstart', function () {}, { passive: true });
  render(); fromHash();
})();
