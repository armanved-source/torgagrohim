/* Каталог ТоргАгроХим — общий блок для всех вариантов сайта.
   Данные: window.TAH_CATALOG (media/catalog/data.js: черновик клиента, Фертика, Уралхим 25.11.2026).
   Разделы до трёх уровней: направление → раздел → подраздел (например, Удобрения → Гранулированные → Азотные).
   В выбранном разделе под фильтрами — производители этого раздела: нажатие показывает линейку производителя в разделе.
   Сверху блок «Партнёры»: карточка производителя открывает всю его продукцию (или ссылка #partner-<id>).
   Подключение: <div class="tahc" id="tahc"></div> + data.js + этот файл.
   Внешний вид задаётся CSS-переменными варианта (--c-bg, --c-card, --c-text, --c-muted, --c-line,
   --c-acc, --c-acc-ink, --c-radius, --c-head). Фильтр из ссылки: #catalog-<id группы>. Товар: #product-<id>. */
(function () {
  var D = window.TAH_CATALOG; var root = document.getElementById('tahc');
  if (!D || !root) return;
  var WA = root.getAttribute('data-wa') || '79668889299';
  var TEL = root.getAttribute('data-tel') || '+79187441441';
  var IMG = window.TAH_IMG || null; // в самодостаточных файлах картинки встроены
  var imgDir = root.getAttribute('data-img') || '../media/catalog/img/';
  var PAGE = 12;
  var LOGO = { bashinkom: 'bashinkom.png', uralchem: 'uralchem.png', eurochem: 'eurochem.svg', polyfeed: 'polyfeed.svg', biogrow: 'biogrow.png', bui: 'bui.png', acron: 'acron.png', daymsa: 'daymsa.png', pharmbiomed: 'pharmbiomed.png', agrosintez: 'agrosintez.png', nestm: 'nestm.png', mcfp: 'mcfp.png', biolchim: 'biolchim.png', ikar: 'ikar.svg', himagromarketing: 'himagromarketing.png', fertika: 'fertika.png', agrohimsintez: 'agrohimsintez.png' };
  var logoDir = root.getAttribute('data-logos') || '../media/partners/';
  var logoSrc = function (id) { var f = LOGO[id]; if (!f) return ''; return (window.TAH_LOGO && window.TAH_LOGO[f]) || logoDir + f; };

  var css = '' +
  '.tahc{--r:var(--c-radius,14px);color:var(--c-text,#1d2a18);font-size:15px}' +
  '.tahc *{box-sizing:border-box}' +
  '.tahc .tc-bar{display:grid;grid-template-columns:minmax(0,1.4fr) minmax(0,1fr) auto;gap:10px;align-items:end;margin-bottom:14px}' +
  '.tahc label{display:block;font-size:12.5px;font-weight:600;color:var(--c-muted,#5d6a55);margin-bottom:6px}' +
  '.tahc input[type="search"],.tahc select{width:100%;min-height:48px;padding:0 14px;border-radius:calc(var(--r) - 4px);border:1px solid var(--c-line,#dcdcd2);background:var(--c-card,#fff);color:inherit;font:inherit;font-size:15px}' +
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
  '.tahc .tc-types[hidden]{display:none}' +
  '.tahc .tc-leaf{padding-left:14px;border-left:2px solid var(--c-acc,#3c6b2a);margin-left:2px}' +
  '.tahc .tc-makers{margin:6px 0 14px;padding:14px 16px 12px;border:1px solid var(--c-line,#dcdcd2);border-radius:var(--r);background:var(--c-card,#fff)}' +
  '.tahc .tc-makers[hidden]{display:none}' +
  '.tahc .tc-makers h4{margin:0 0 10px;font-size:13px;font-weight:700;letter-spacing:.02em;color:var(--c-muted,#5d6a55)}' +
  '.tahc .tc-makers h4 b{color:var(--c-text,#1d2a18)}' +
  '.tahc .tc-mlist{display:flex;gap:8px;overflow-x:auto;padding:2px 2px 6px;scrollbar-width:thin;scroll-snap-type:x proximity}' +
  '.tahc .tc-maker{flex:none;scroll-snap-align:start;display:flex;align-items:center;gap:10px;min-height:56px;padding:8px 14px 8px 8px;border-radius:calc(var(--r) + 6px);border:1px solid var(--c-line,#dcdcd2);background:var(--c-card,#fff);color:inherit;font:inherit;cursor:pointer;text-align:left;transition:border-color .2s,box-shadow .2s,transform .25s cubic-bezier(.16,1,.3,1)}' +
  '.tahc .tc-maker:hover{border-color:var(--c-acc,#3c6b2a)}.tahc .tc-maker:active{transform:scale(.97)}' +
  '.tahc .tc-maker[aria-pressed="true"]{border-color:var(--c-acc,#3c6b2a);box-shadow:inset 0 0 0 1px var(--c-acc,#3c6b2a)}' +
  '.tahc .tc-maker .ml{display:grid;place-items:center;width:64px;height:40px;background:#fff;border-radius:calc(var(--r) - 2px);flex:none}' +
  '.tahc .tc-maker .ml img{max-width:56px;max-height:30px;object-fit:contain}' +
  '.tahc .tc-maker .ml i{font-style:normal;font-weight:800;font-size:15px}' +
  '.tahc .tc-maker b{display:block;font-size:14px;font-weight:700;line-height:1.2;white-space:nowrap}' +
  '.tahc .tc-maker small{display:block;font-size:12.5px;color:var(--c-muted,#5d6a55)}' +
  '.tahc .tc-maker.all{padding:8px 16px}' +
  '@media (prefers-reduced-motion:reduce){.tahc .tc-maker{transition:none}.tahc .tc-maker:active{transform:none}}' +
  '.tahc .tc-types{display:flex;align-items:center;gap:10px;margin:2px 0 6px}.tahc .tc-types>span{flex:none;font-size:13px;font-weight:700;color:var(--c-muted,#5d6a55)}.tahc .tc-types .tc-chips{min-width:0;padding-bottom:4px}' +
  '.tahc .tc-layout{display:grid;gap:16px;margin-top:14px}' +
  '.tahc .tc-sidebar,.tahc .tc-results,.tahc .tc-body{min-width:0}' +
  '.tahc .tc-sidebar{align-self:start;border:1px solid var(--c-line,#dcdcd2);border-radius:var(--r);padding:14px;background:var(--c-card,#fff)}' +
  '.tahc .tc-sidebar h3{font-family:var(--c-head,inherit);font-size:20px;line-height:1.2;margin:0 0 10px}' +
  '.tahc .tc-btn.tc-sidebar-toggle{justify-content:space-between;text-align:left}' +
  '.tahc .tc-sidebar-toggle::after,.tahc .tc-node[aria-expanded]::before{content:"";width:7px;height:7px;border:solid currentColor;border-width:0 1px 1px 0;transform:rotate(-45deg);flex:none}' +
  '.tahc [aria-expanded="true"].tc-sidebar-toggle::after,.tahc .tc-node[aria-expanded="true"]::before{transform:rotate(45deg)}' +
  '.tahc .tc-tree{max-height:min(55vh,440px);overflow-y:auto;padding:3px 4px;scrollbar-width:thin}' +
  '.tahc .tc-tree ul,.tahc .tc-crumbs ol{margin:0;padding:0;list-style:none}' +
  '.tahc .tc-tree ul ul{margin-left:9px;padding-left:8px;border-left:1px solid var(--c-line,#dcdcd2)}' +
  '.tahc .tc-node,.tahc .tc-crumbs button{border:0;background:transparent;color:inherit;font:inherit;cursor:pointer}' +
  '.tahc .tc-node{display:flex;align-items:center;gap:8px;width:100%;min-height:38px;padding:6px;border-radius:var(--r);font-size:13.5px;line-height:1.3;text-align:left}' +
  '.tahc .tc-node span{flex:1;overflow-wrap:anywhere}' +
  '.tahc .tc-node small,.tahc .tc-mark small{color:var(--c-muted,#5d6a55);font-variant-numeric:tabular-nums;font-size:12px}' +
  '.tahc .tc-node:hover,.tahc .tc-crumbs button:hover{text-decoration:underline;text-underline-offset:3px}' +
  '.tahc .tc-node[aria-current]{box-shadow:inset 0 0 0 1px var(--c-acc,#3c6b2a);font-weight:700}' +
  '.tahc .tc-marks{margin-top:16px;padding-top:14px;border-top:1px solid var(--c-line,#dcdcd2)}' +
  '.tahc .tc-marks fieldset{min-width:0;margin:0;padding:0;border:0}' +
  '.tahc .tc-marks fieldset+fieldset{margin-top:10px}' +
  '.tahc .tc-marks legend{padding:0;font-size:13px;font-weight:700}' +
  '.tahc .tc-mark-list{max-height:232px;overflow-y:auto;padding:3px 4px;scrollbar-width:thin}' +
  '.tahc .tc-mark{display:flex;align-items:center;gap:8px;min-height:36px;margin:0;color:inherit;cursor:pointer}' +
  '.tahc .tc-mark span{flex:1;overflow-wrap:anywhere}' +
  '.tahc .tc-mark input{margin:0;width:17px;height:17px;flex:none;accent-color:var(--c-acc,#3c6b2a)}' +
  '.tahc .tc-crumbs ol{display:flex;align-items:baseline;flex-wrap:wrap;gap:4px 8px;font-size:13px;color:var(--c-muted,#5d6a55)}' +
  '.tahc .tc-crumbs li+li::before{content:"/";margin-right:8px}' +
  '.tahc .tc-crumbs button{padding:0;min-height:28px;text-decoration:underline;text-underline-offset:3px}' +
  '.tahc .tc-crumbs [aria-current]{color:inherit;font-weight:700}' +
  '.tahc .tc-result-title{font-family:var(--c-head,inherit);font-size:clamp(24px,3vw,34px);line-height:1.15;margin:4px 0 6px;overflow-wrap:anywhere}' +
  '.tahc .tc-count{font-size:13.5px;color:var(--c-muted,#5d6a55);margin:4px 0 12px}' +
  '.tahc .tc-grid{border-top:1px solid var(--c-line,#dcdcd2)}' +
  '.tahc .tc-card{display:grid;grid-template-columns:110px minmax(0,1fr);gap:16px;align-items:start;padding:14px 0;border-bottom:1px solid var(--c-line,#dcdcd2);background:var(--c-card,#fff)}' +
  '.tahc .tc-pic{background:#fff;cursor:pointer;border:0;padding:0;width:100%;aspect-ratio:1}' +
  '.tahc .tc-pic img{display:block;width:100%;height:100%;object-fit:contain}' +
  '.tahc .tc-body{display:flex;flex-direction:column;gap:4px;overflow-wrap:anywhere}' +
  '.tahc .tc-brand,.tahc .tc-pack{font-size:12.5px;color:var(--c-muted,#5d6a55)}' +
  '.tahc .tc-name{font-family:var(--c-head,inherit);font-size:19px;font-weight:600;line-height:1.25;margin:0}' +
  '.tahc .tc-sum{margin:0;font-size:13.5px;color:var(--c-muted,#5d6a55);line-height:1.45;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}' +
  '.tahc .tc-acts{margin-top:4px;display:flex;flex-wrap:wrap;gap:8px}' +
  '.tahc .tc-btn,.tahc-dlg .tc-btn{flex:1;display:inline-flex;align-items:center;justify-content:center;gap:6px;min-height:44px;padding:0 10px;border-radius:calc(var(--r) - 4px);font:inherit;font-size:13.5px;font-weight:700;text-decoration:none;cursor:pointer;border:1px solid var(--c-line,#dcdcd2);background:transparent;color:inherit;white-space:nowrap}' +
  '.tahc .tc-btn.wa,.tahc-dlg .tc-btn.wa{background:var(--c-acc,#3c6b2a);border-color:var(--c-acc,#3c6b2a);color:var(--c-acc-ink,#fff)}' +
  '.tahc .tc-acts .tc-btn{flex:none}' +
  '.tahc .tc-btn:hover,.tahc-dlg .tc-btn:hover{filter:brightness(1.08)}' +
  '.tahc .tc-more{display:flex;justify-content:center;margin-top:22px}' +
  '.tahc .tc-more[hidden],.tahc .tc-chip[hidden]{display:none}' +
  '.tahc .tc-else{border:0;background:none;padding:4px 0;font:inherit;font-weight:700;color:var(--c-acc,#3c6b2a);text-decoration:underline;text-underline-offset:3px;cursor:pointer}' +
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
  '.tahc-dlg .share-status{margin:0}.tahc-dlg .share-status:empty{position:absolute}' +
  '.tahc-dlg .share-link{width:100%;border:1px solid var(--c-line,#dcdcd2);border-radius:6px;padding:8px;color:inherit;background:var(--c-card,#fff);font:inherit}' +
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
  '@media (min-width:900px){.tahc .tc-layout{grid-template-columns:clamp(220px,24%,276px) minmax(0,1fr);gap:24px}.tahc .tc-sidebar-toggle{display:none}.tahc .tc-show{display:none}}' +
  '@media (max-width:899px){.tahc .tc-sidebar-toggle[aria-expanded="false"]+.tc-sidebar{display:none}.tahc .tc-node{min-height:44px}' +
    '.tahc .tc-show{position:sticky;bottom:12px;width:100%;margin-top:14px;justify-content:center;background:var(--c-acc,#3c6b2a);color:#fff;border-color:transparent}' +
    '.tahc .tc-results{scroll-margin-top:96px}}' +
  '@media (max-width:760px){.tahc .tc-plist{grid-template-columns:1fr 1fr;gap:8px}.tahc .tc-pcard{min-height:0;padding:10px 12px}.tahc .tc-pcard span:not(.lg){display:none}.tahc .tc-pcard b{font-size:14px}.tahc .tc-pcard .lg{height:48px}.tahc .tc-pcard .lg img{max-height:38px}}' +
  '@media (max-width:760px){.tahc .tc-bar{grid-template-columns:minmax(0,1fr) auto}.tahc .tc-bar .tc-q{grid-column:1/-1}.tahc .tc-card{grid-template-columns:80px minmax(0,1fr);gap:10px}.tahc .tc-name{font-size:17px}.tahc-dlg .dl{grid-template-columns:1fr}.tahc-dlg .dl-pic{min-height:200px}.tahc-dlg dl{grid-template-columns:1fr;gap:2px}.tahc-dlg dd{margin-bottom:6px}}';
  css += '#catalog{scroll-margin-top:84px}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  var FIX = { 'Buyskiy himicheskiy zavod': 'Буйский химический завод' };
  var nm = function (s) { return FIX[s] || s; };
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var tops = D.groups.filter(function (g) { return !g.parent; });
  var subsOf = function (id) { return D.groups.filter(function (g) { return g.parent === id; }); };
  var gName = {}; D.groups.forEach(function (g) { gName[g.id] = g.name; });
  var GROUP_LABELS = {
    fertilizers: 'Удобрения',
    'ws-npk': 'Водорастворимые NPK',
    'ws-salts': 'Водорастворимые соли',
    'ws-micro': 'Водорастворимые микроэлементы',
    fertigation: 'Для капельного полива',
    'gr-nitrogen': 'Гранулы: азотные (селитра, карбамид)',
    'gr-npk': 'Гранулы: NPK, NP, NPS',
    'gr-potash': 'Гранулы: калийные и магниевые',
    'gr-organo': 'Органоминеральные',
    'lq-nitrogen': 'Жидкие: азотные и КАС',
    'lq-micro': 'Жидкие: микроэлементы',
    'lq-humic': 'Жидкие: гуминовые',
    'lq-bio': 'Жидкие: биостимуляторы',
    micronutrients: 'Микроудобрения'
  };
  var groupLabel = function (id) { return GROUP_LABELS[id] || gName[id]; };
  var MARK_TYPES = [
    ['Нитроаммофоска', /нитроаммофоск/iu],
    ['Азофоска', /азофоск/iu],
    ['Диаммофоска', /диаммофоск/iu],
    ['Сульфоаммофос', /сульфоаммофос/iu],
    ['Аммофос', /(?:^|[^а-яё])аммофос/iu],
    ['Селитра известково-аммиачная', /селитра\s+известково[- ]аммиачная|известково[- ]аммиачная\s+селитра/iu],
    ['Аммиачная селитра', /аммиачная\s+селитра|селитра\s+аммиачная|аммиачно[- ]нитратное/iu],
    ['Кальциевая селитра', /кальциевая\s+селитра|селитра\s+кальциевая|нитрат\s+кальция/iu],
    ['Калиевая селитра', /калиевая\s+селитра|селитра\s+калиевая|нитрат\s+калия/iu],
    ['Магниевая селитра', /магниевая\s+селитра|селитра\s+магниевая|нитрат\s+магния/iu],
    ['Аммиак безводный', /аммиак\s+безводный/iu],
    ['КАС', /(?:^|[^а-яёa-z])кас(?![а-яёa-z])|карбамидно[- ]аммиачная\s+смесь/iu],
    ['Карбамид', /карбамид|мочевин/iu],
    ['Сульфат аммония', /сульфат\s+аммония|аммоний\s+сернокислый/iu],
    ['Сульфат калия', /сульфат\s+калия|калий\s+сернокислый/iu],
    ['Сульфат магния', /сульфат\s+магния|магний\s+сернокислый/iu],
    ['Хлористый калий', /хлористый\s+калий|калий\s+хлористый|\bkcl\b/iu],
    ['Калимагнезия', /калимагнези/iu],
    ['Монокалийфосфат', /монокалий\s*фосфат/iu],
    ['Моноаммонийфосфат', /моноаммоний\s*фосфат/iu],
    ['Азотофосфат', /азотофосфат/iu],
    ['Сульфонитрат', /сульфонитрат/iu],
    ['ОМУ', /(?:^|[^а-яёa-z])ому(?![а-яёa-z])|органоминеральн/iu],
    ['Хелатные микроудобрения', /хелатные\s+микроудобрения|микроудобрения\s+в\s+хелатной\s+форме/iu],
    ['Гуминовые удобрения', /гуминовые\s+удобрения/iu]
  ];
  var markType = function (value) {
    return MARK_TYPES.find(function (entry) { return entry[1].test(value); });
  };
  var markFormula = function (value) {
    if (!value) return '';
    // Без lookbehind (?<!…): старый Safari (iOS < 16.4) на нём падает и ломает весь каталог.
    var ratios = /(^|[^\d,.])(\d{1,3}(?:,\d+)?\s*([:.\-–—])\s*\d{1,3}(?:,\d+)?(?:\s*\3\s*\d{1,3}(?:,\d+)?){0,2})(?![\d,])/g;
    var match;
    while ((match = ratios.exec(value))) {
      var numbers = match[2].split(/\s*[:.\-–—]\s*/);
      if (numbers.some(function (n) { return Number(n.replace(',', '.')) > 100; })) continue;
      var prefix = value.slice(0, match.index + match[1].length);
      if (numbers.length === 2 &&
        (/(?:^|[^\p{L}])(?:PK|РК|NK|NS|NCa|азотно[- ]калийн\p{L}*)\s*$/iu.test(prefix) ||
         (match[3] === '.' && !/\bNPS?\s*$/i.test(prefix)))) continue;
      return (numbers.length === 2 ? 'NP ' : 'NPK ') + numbers.slice(0, 3).join(':');
    }
    return '';
  };
  var productMarks = new Map(D.items.map(function (p) {
    var type = markType(p.name) || markType(p.category || '');
    var formula = markFormula(p.name) || markFormula(p.category);
    return [p.id, [type && type[0], formula]];
  }));
  var TYPES = ['water-soluble', 'granular', 'liquid', 'micronutrients', 'fertigation', 'fungicides', 'insecticides', 'herbicides', 'acaricides', 'seed-treatments', 'adjuvants', 'bio', 'stimulants', 'substrates'];
  var count = function (id) { return D.items.filter(function (p) { return p.groups.indexOf(id) >= 0; }).length; };
  var state = { top: '', sub: '', leaf: '', partner: '', q: '', marks: new Set(), shown: PAGE };
  var gById = {}; D.groups.forEach(function (g) { gById[g.id] = g; });
  // Цепочка раздела: [направление, раздел, подраздел]
  var chain = function (id) { var c = []; var g = gById[id]; while (g) { c.unshift(g.id); g = gById[g.parent]; } return c; };
  var selectGroup = function (id) { var c = chain(id); state.top = c[0] || ''; state.sub = c[1] || ''; state.leaf = c[2] || ''; };
  var deepest = function () { return state.leaf || state.sub || state.top; };
  var src = function (p) { return IMG && IMG[p.img] ? IMG[p.img] : imgDir + p.img; };
  var waLink = function (p) { return 'https://wa.me/' + WA + '?text=' + encodeURIComponent('Здравствуйте! Интересует: ' + p.name + (p.brand ? ' (' + nm(p.brand) + ')' : '') + '. Подскажите цену и наличие.'); };

  var pCount = {}; D.items.forEach(function (p) { pCount[p.partnerId] = (pCount[p.partnerId] || 0) + 1; });
  var partners = D.partners.filter(function (p) { return pCount[p.id]; }).sort(function (a, b) { return pCount[b.id] - pCount[a.id]; });
  // У части удобрений производитель указан только в brand, без карточки партнёра.
  var makerId = function (p) {
    return p.partnerId || (p.brand && p.groups.indexOf('fertilizers') >= 0 ? 'brand-' + encodeURIComponent(p.brand) : '');
  };
  var catalogMakers = new Map(D.partners.map(function (p) { return [p.id, nm(p.name)]; }));
  D.items.forEach(function (p) {
    var id = makerId(p);
    if (id && !catalogMakers.has(id)) catalogMakers.set(id, nm(p.brand));
  });
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
        Array.from(catalogMakers).map(function (p) { return '<option value="' + esc(p[0]) + '">' + esc(p[1]) + '</option>'; }).join('') + '</select></div>' +
      '<button class="tc-reset" type="button">Сбросить</button>' +
    '</div>' +
    '<div class="tc-chips" role="group" aria-label="Направление">' +
      '<button class="tc-chip" type="button" data-top="" aria-pressed="true">Вся продукция<small>' + D.items.length + '</small></button>' +
      tops.map(function (g) { return '<button class="tc-chip" type="button" data-top="' + g.id + '" aria-pressed="false">' + esc(g.name) + '<small>' + count(g.id) + '</small></button>'; }).join('') +
    '</div>' +
    '<div class="tc-chips tc-sub" role="group" aria-label="Подгруппа" hidden></div>' +
    '<div class="tc-chips tc-sub tc-leaf" role="group" aria-label="Вид внутри раздела" hidden></div>' +
    '<div class="tc-types"><span>По виду:</span><div class="tc-chips" role="group" aria-label="Вид продукции">' + TYPES.filter(function (id) { return count(id); }).map(function (id) { return '<button class="tc-chip" type="button" data-type="' + id + '" aria-pressed="false">' + esc(gName[id]) + '<small>' + count(id) + '</small></button>'; }).join('') + '</div></div>' +
    '<div class="tc-makers" hidden><h4></h4><div class="tc-mlist" role="group" aria-label="Производители в разделе"></div></div>' +
    '<div class="tc-layout">' +
      '<button class="tc-btn tc-sidebar-toggle" type="button" aria-controls="tc-sidebar" aria-expanded="false">Каталог и фильтры</button>' +
      '<aside class="tc-sidebar" id="tc-sidebar" aria-label="Каталог и фильтры">' +
        '<nav aria-labelledby="tc-tree-title"><h3 id="tc-tree-title">Каталог</h3><div class="tc-tree"></div></nav>' +
        '<div class="tc-marks" hidden></div>' +
        '<button class="tc-btn tc-show" type="button">Показать товары</button>' +
      '</aside>' +
      '<div class="tc-results">' +
        '<nav class="tc-crumbs" aria-label="Текущий раздел"></nav>' +
        '<h3 class="tc-result-title" tabindex="-1"></h3>' +
        '<p class="tc-count" aria-live="polite"></p>' +
        '<div class="tc-grid"></div>' +
        '<div class="tc-more"><button type="button">Показать ещё</button></div>' +
      '</div>' +
    '</div>';

  var $ = function (s) { return root.querySelector(s); };
  var grid = $('.tc-grid'), cnt = $('.tc-count'), more = $('.tc-more'), subBox = $('.tc-sub'), leafBox = $('.tc-leaf'), makers = $('.tc-makers');

  var dlg = document.createElement('dialog'); dlg.className = 'tahc-dlg'; (root.closest('section') || root.parentNode).appendChild(dlg);
  dlg.setAttribute('aria-labelledby', 'tahc-product-title');
  var productId = '', catalogHash = '', productOpener;
  var productHash = function (id) { return '#product-' + encodeURIComponent(id); };
  var closeDialog = function () { if (dlg.close) dlg.close(); else dlg.removeAttribute('open'); };
  var closeProduct = function () {
    if (!dlg.hasAttribute('open')) return;
    closeDialog();
    if (history.state && history.state.tahcProduct === productId) {
      history.back();
      return;
    }
    var toCatalog = !catalogHash;
    history.replaceState(history.state, '', catalogHash || '#catalog');
    fromHash();
    if (toCatalog) {
      var section = document.getElementById('catalog') || root;
      if (!section.hasAttribute('tabindex')) section.setAttribute('tabindex', '-1');
      section.focus({ preventScroll: true });
      section.scrollIntoView();
    }
  };
  dlg.addEventListener('click', function (e) { if (e.target === dlg) closeProduct(); });
  dlg.addEventListener('cancel', function (e) { e.preventDefault(); closeProduct(); });

  var belongsTo = function (p, group, partner) {
    return (!group || p.groups.indexOf(group) >= 0) && (!partner || makerId(p) === partner);
  };
  var within = function (items, group, partner) {
    return items.filter(function (p) { return belongsTo(p, group, partner); });
  };
  var searchedItems = function () {
    var q = state.q.trim().toLowerCase();
    if (!q) return D.items;
    return D.items.filter(function (p) {
      var hay = [p.name, p.brand, p.category, p.composition, p.summary, p.use].join(' ').toLowerCase();
      return hay.indexOf(q) >= 0;
    });
  };

  // При обновлении выбранной ветки или её счётчиков сохраняем клавиатурный фокус.
  var updateMarkup = function (box, html, keyAttribute) {
    if (box.innerHTML === html) return;
    var active = document.activeElement;
    var key = box.contains(active) ? active.getAttribute(keyAttribute) : null;
    var scrollTop = box.scrollTop, scrollLeft = box.scrollLeft;
    box.innerHTML = html;
    box.scrollTop = scrollTop;
    box.scrollLeft = scrollLeft;
    if (key === null) return;
    var next = Array.from(box.querySelectorAll('[' + keyAttribute + ']')).find(function (el) {
      return el.getAttribute(keyAttribute) === key;
    });
    if (next) next.focus({ preventScroll: true });
  };

  var markOptions = function (items) {
    var counts = [new Map(), new Map()];
    items.forEach(function (p) {
      productMarks.get(p.id).forEach(function (mark, i) {
        if (mark) counts[i].set(mark, (counts[i].get(mark) || 0) + 1);
      });
    });
    return counts;
  };
  var renderMarks = function (options) {
    var panel = $('.tc-marks');
    panel.hidden = options[0].size + options[1].size < 2;
    var available = [].concat(Array.from(options[0].keys()), Array.from(options[1].keys()));
    state.marks.forEach(function (mark) {
      if (panel.hidden || available.indexOf(mark) < 0) state.marks.delete(mark);
    });
    if (panel.hidden) {
      panel.replaceChildren();
      return;
    }
    var titles = ['Вид', 'Формула NPK'];
    updateMarkup(panel, '<h3>Марка</h3>' + options.map(function (counts, i) {
      if (!counts.size) return '';
      var labels = Array.from(counts).sort(function (a, b) { return b[1] - a[1] || a[0].localeCompare(b[0], 'ru', { numeric: true }); });
      return '<fieldset><legend>' + titles[i] + '</legend><div class="tc-mark-list">' + labels.map(function (entry) {
        return '<label class="tc-mark"><input type="checkbox" data-mark="' + esc(entry[0]) + '"><span>' + esc(entry[0]) + '</span><small>' + entry[1] + '</small></label>';
      }).join('') + '</div></fieldset>';
    }).join(''), 'data-mark');
    panel.querySelectorAll('[data-mark]').forEach(function (input) {
      input.checked = state.marks.has(input.getAttribute('data-mark'));
    });
  };

  var navKey = function (group, partner) { return group + '/' + partner; };
  var makerCounts = function (items) {
    var counts = new Map();
    items.forEach(function (p) {
      var id = makerId(p);
      if (id) counts.set(id, (counts.get(id) || 0) + 1);
    });
    return counts;
  };
  var fertilizerGroups = D.groups.filter(function (g) {
    return g.id !== 'fertilizers' && chain(g.id)[0] === 'fertilizers' && !subsOf(g.id).length;
  });
  var fertilizerCounts = makerCounts(within(D.items, 'fertilizers', ''));
  var revealTreeSelection = function () {
    var tree = $('.tc-tree'), active = tree.querySelector('[aria-current]');
    if (!active || !tree.clientHeight) return;
    var offset = active.getBoundingClientRect().top - tree.getBoundingClientRect().top;
    if (offset < 0) tree.scrollTop += offset - 3;
    if (offset + active.offsetHeight > tree.clientHeight) tree.scrollTop += offset + active.offsetHeight - tree.clientHeight + 3;
  };

  var renderTree = function (searched, visibleCount) {
    var activeGroup = deepest(), activePartner = state.partner;
    var node = function (group, partner, label, expandable, children) {
      var current = group === activeGroup && partner === activePartner;
      var n = current ? visibleCount : !group && !partner ? D.items.length : within(searched, group, partner).length;
      return '<li><button class="tc-node" type="button" data-nav="' + esc(navKey(group, partner)) + '"' +
        (current ? ' aria-current="true"' : '') + (expandable ? ' aria-expanded="' + !!children + '"' : '') +
        '><span>' + esc(label) + '</span><small>' + n + '</small></button>' + (children ? '<ul>' + children + '</ul>' : '') + '</li>';
    };
    var activeGroups = chain(activeGroup);
    var regularGroup = function (g) {
      var subs = subsOf(g.id).filter(function (sub) { return count(sub.id); });
      var children = activeGroups.indexOf(g.id) >= 0 ? subs.map(regularGroup).join('') : '';
      if (g.id === activeGroup && activePartner) children += node(g.id, activePartner, catalogMakers.get(activePartner));
      return node(g.id, '', groupLabel(g.id), !!(subs.length || children), children);
    };
    var fertilizers = function () {
      var children = '';
      if (state.top === 'fertilizers') {
        if (!activePartner && activeGroup !== 'fertilizers') children = node(activeGroup, '', groupLabel(activeGroup));
        var searchedCounts = makerCounts(within(searched, 'fertilizers', ''));
        var makerTotal = function (id) {
          return activeGroup === 'fertilizers' && id === activePartner ? visibleCount : searchedCounts.get(id) || 0;
        };
        children += Array.from(fertilizerCounts.keys()).sort(function (a, b) {
          return makerTotal(b) - makerTotal(a) || fertilizerCounts.get(b) - fertilizerCounts.get(a);
        }).map(function (id) {
          var kinds = '';
          if (id === activePartner) {
            var leaves = fertilizerGroups.filter(function (g) { return within(D.items, g.id, id).length; });
            if (activeGroup !== 'fertilizers' && !leaves.some(function (g) { return g.id === activeGroup; })) {
              kinds = node(activeGroup, id, groupLabel(activeGroup));
            }
            kinds += leaves.map(function (g) { return node(g.id, id, groupLabel(g.id)); }).join('');
          }
          return node('fertilizers', id, catalogMakers.get(id), true, kinds);
        }).join('');
      }
      return node('fertilizers', '', groupLabel('fertilizers'), true, children);
    };
    var rows = node('', '', 'Все товары');
    if (!activeGroup && activePartner) rows += node('', activePartner, catalogMakers.get(activePartner));
    rows += tops.filter(function (g) { return count(g.id); }).map(function (g) {
      return g.id === 'fertilizers' ? fertilizers() : regularGroup(g);
    }).join('');
    updateMarkup($('.tc-tree'), '<ul>' + rows + '</ul>', 'data-nav');
    revealTreeSelection();
  };

  var renderHeading = function () {
    var group = deepest(), partner = state.partner;
    var maker = catalogMakers.get(partner);
    var crumbs = [['Каталог', '', '']];
    if (state.top) crumbs.push([groupLabel(state.top), state.top, '']);
    if (maker) crumbs.push([maker, state.top, partner]);
    (state.top === 'fertilizers' && group !== state.top ? [group] : chain(group).slice(1)).forEach(function (id) {
      crumbs.push([groupLabel(id), id, partner]);
    });
    updateMarkup($('.tc-crumbs'), '<ol>' + crumbs.map(function (crumb, i) {
      return '<li>' + (i === crumbs.length - 1 ? '<span aria-current="page">' + esc(crumb[0]) + '</span>' :
        '<button type="button" data-nav="' + esc(navKey(crumb[1], crumb[2])) + '">' + esc(crumb[0]) + '</button>') + '</li>';
    }).join('') + '</ol>', 'data-nav');
    $('.tc-result-title').textContent = maker && group ? maker + ' — ' + groupLabel(group) : maker || groupLabel(group) || 'Все товары';
  };

  var card = function (p) {
    var pack = [p.form, p.packaging].filter(Boolean).join(' · ');
    return '<article class="tc-card">' +
      '<button class="tc-pic" type="button" data-id="' + esc(p.id) + '" aria-label="Подробнее: ' + esc(p.name) + '"><img src="' + src(p) + '" alt="" loading="lazy" decoding="async" width="110" height="110"></button>' +
      '<div class="tc-body"><h4 class="tc-name">' + esc(p.name) + '</h4><span class="tc-brand">' + esc(catalogMakers.get(makerId(p)) || nm(p.brand || '')) + '</span>' +
      (p.summary ? '<p class="tc-sum" title="' + esc(p.summary) + '">' + esc(p.summary) + '</p>' : '') +
      (pack ? '<span class="tc-pack">' + esc(pack) + '</span>' : '') +
      '<div class="tc-acts"><button class="tc-btn" type="button" data-id="' + esc(p.id) + '">Подробнее</button><a class="tc-btn wa" href="' + waLink(p) + '" target="_blank" rel="noopener" aria-label="Спросить цену в WhatsApp: ' + esc(p.name) + '">WhatsApp</a></div></div></article>';
  };

  var render = function () {
    var searched = searchedItems();
    var scoped = within(searched, deepest(), state.partner);
    renderMarks(markOptions(scoped));
    var list = state.marks.size ? scoped.filter(function (p) {
      return productMarks.get(p.id).some(function (mark) { return state.marks.has(mark); });
    }) : scoped;
    var otherHits = state.q.trim() ? searched.length - scoped.length : 0;
    renderTree(searched, list.length);
    renderHeading();
    $('.tc-show').textContent = 'Показать товары (' + list.length + ')';
    cnt.innerHTML = 'Найдено позиций: ' + list.length +
      (otherHits > 0 ? ' <button class="tc-else" type="button" data-all>Ещё ' + otherHits + ' в других разделах — искать везде</button>' : '');
    grid.innerHTML = list.length ? list.slice(0, state.shown).map(card).join('') :
      '<div class="tc-empty">Ничего не нашлось. Измените запрос или сбросьте фильтры.</div>';
    more.hidden = list.length <= state.shown;
    if (!more.hidden) more.firstChild.textContent = 'Показать ещё ' + Math.min(PAGE, list.length - state.shown) + ' из ' + (list.length - state.shown);
    $('#tc-p').value = state.partner;
    root.querySelectorAll('.tc-pcard').forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-partner') === state.partner ? 'true' : 'false'); });
    root.querySelectorAll('.tc-chips:not(.tc-sub) .tc-chip').forEach(function (b) { var on = b.getAttribute('data-top') === state.top; b.setAttribute('aria-pressed', on ? 'true' : 'false'); if (on) b.parentNode.scrollLeft = Math.max(0, b.offsetLeft - b.parentNode.offsetLeft - 16); });
    // счётчики видов и направлений — в пределах выбранного производителя; пустые прячем
    var inP = within(D.items, '', state.partner);
    root.querySelectorAll('[data-type],.tc-chips:not(.tc-sub) [data-top]:not([data-top=""])').forEach(function (b) { var id = b.getAttribute('data-type') || b.getAttribute('data-top'); var n = inP.filter(function (p) { return p.groups.indexOf(id) >= 0; }).length; b.querySelector('small').textContent = n; b.hidden = !n; });
    root.querySelectorAll('[data-type]').forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-type') === deepest() ? 'true' : 'false'); });
    var nIn = function (id) { return inP.filter(function (p) { return p.groups.indexOf(id) >= 0; }).length; };
    var subs = state.top ? subsOf(state.top).filter(function (g) { return nIn(g.id); }) : [];
    subBox.hidden = !subs.length;
    updateMarkup(subBox, subs.length ? '<button class="tc-chip" type="button" data-sub="" aria-pressed="' + (!state.sub) + '">Все в группе</button>' + subs.map(function (g) { return '<button class="tc-chip" type="button" data-sub="' + g.id + '" aria-pressed="' + (state.sub === g.id) + '">' + esc(g.name) + '<small>' + nIn(g.id) + '</small></button>'; }).join('') : '', 'data-sub');
    var leaves = state.sub ? subsOf(state.sub).filter(function (g) { return nIn(g.id); }) : [];
    leafBox.hidden = !leaves.length;
    updateMarkup(leafBox, leaves.length ? '<button class="tc-chip" type="button" data-leaf="" aria-pressed="' + (!state.leaf) + '">Все: ' + esc(gName[state.sub].toLowerCase()) + '</button>' + leaves.map(function (g) { return '<button class="tc-chip" type="button" data-leaf="' + g.id + '" aria-pressed="' + (state.leaf === g.id) + '">' + esc(g.name) + '<small>' + nIn(g.id) + '</small></button>'; }).join('') : '', 'data-leaf');
    // «По виду» — быстрый вход с верхнего уровня; внутри направления хватает строк разделов
    root.querySelector('.tc-types').hidden = !!state.top;
    renderMakers();
  };

  // Производители внутри выбранного раздела: нажатие показывает линейку производителя в этом разделе
  var renderMakers = function () {
    var g = deepest();
    if (!g) { makers.hidden = true; return; }
    var inG = within(D.items, g, '');
    var n = makerCounts(inG);
    var list = Array.from(n.keys()).sort(function (a, b) { return n.get(b) - n.get(a); });
    if (list.length < 2 && !state.partner) { makers.hidden = true; return; }
    makers.hidden = false;
    makers.querySelector('h4').innerHTML = 'Производители в разделе <b>«' + esc(gName[g]) + '»</b>';
    updateMarkup(makers.querySelector('.tc-mlist'), '<button class="tc-maker all" type="button" data-maker="" aria-pressed="' + (!state.partner) + '"><span><b>Все</b><small>' + pos(inG.length) + '</small></span></button>' +
      list.map(function (id) {
        var lg = logoSrc(id), name = catalogMakers.get(id);
        return '<button class="tc-maker" type="button" data-maker="' + esc(id) + '" aria-pressed="' + (state.partner === id) + '"><span class="ml">' + (lg ? '<img src="' + lg + '" alt="" loading="lazy">' : '<i>' + esc(name.slice(0, 2)) + '</i>') + '</span><span><b>' + esc(name) + '</b><small>' + pos(n.get(id)) + '</small></span></button>';
      }).join(''), 'data-maker');
  };

  var shareProduct = async function (p) {
    var local = !/^https?:$/.test(location.protocol) || /(^|\.)localhost$|^127\.|^\[::1\]$/.test(location.hostname);
    var base = local ? 'https://armanved-source.github.io/torgagrohim/' : location.origin + location.pathname;
    var url = base + productHash(p.id);
    var status = dlg.querySelector('.share-status'), link = dlg.querySelector('.share-link');
    status.textContent = '';
    link.hidden = true;

    if (navigator.share) {
      try {
        await navigator.share({ title: p.name, url: url });
        return;
      } catch (error) {
        if (error.name === 'AbortError') return;
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      status.textContent = 'Ссылка скопирована.';
    } catch (error) {
      status.textContent = 'Скопируйте ссылку на товар вручную.';
      link.value = url;
      link.hidden = false;
      // Пока открывалось системное меню, человек мог закрыть или сменить карточку.
      if (dlg.hasAttribute('open') && dlg.contains(link)) { link.focus(); link.select(); }
    }
  };

  var open = function (p) {
    var row = function (k, v) { return v ? '<dt>' + k + '</dt><dd>' + esc(Array.isArray(v) ? v.join(', ') : v) + '</dd>' : ''; };
    dlg.innerHTML = '<button class="x" type="button" aria-label="Закрыть" autofocus>×</button><div class="dl"><div class="dl-pic"><img src="' + src(p) + '" alt="' + esc(p.name) + '"></div><div class="dl-txt">' +
      '<span class="tc-brand" style="font-size:12px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;color:var(--c-muted,#5d6a55)">' + esc(nm(p.brand || '')) + '</span><h3 id="tahc-product-title">' + esc(p.name) + '</h3>' +
      (p.description ? '<p>' + esc(p.description) + '</p>' : (p.summary ? '<p>' + esc(p.summary) + '</p>' : '')) +
      '<dl>' + row('Категория', p.category) + row('Состав', p.composition) + row('Форма', p.form) + row('Фасовка', p.packaging) + row('Культуры', p.crops) + row('Применение', p.use) + '</dl>' +
      '<p class="note">Характеристики, фасовку и наличие уточнит менеджер. Регламент применения проверяйте по этикетке поставляемой продукции.</p>' +
      '<div class="acts"><a class="tc-btn wa" style="flex:none;padding:0 18px" href="' + waLink(p) + '" target="_blank" rel="noopener">Цена в WhatsApp</a><a class="tc-btn" style="flex:none;padding:0 18px" href="tel:' + TEL + '">Позвонить</a><button class="tc-btn" type="button" data-share>Поделиться</button></div>' +
      '<p class="note share-status" role="status"></p><input class="share-link" aria-label="Ссылка на товар" readonly hidden>' +
      '</div></div>';
    dlg.querySelector('.x').addEventListener('click', closeProduct);
    dlg.querySelector('[data-share]').addEventListener('click', function () { shareProduct(p); });
    if (dlg.hasAttribute('open')) dlg.querySelector('.x').focus();
    else if (dlg.showModal) dlg.showModal();
    else dlg.setAttribute('open', '');
  };

  var select = function (group, partner) {
    if (group !== deepest() || partner !== state.partner) state.marks.clear();
    selectGroup(group);
    state.partner = partner;
    state.shown = PAGE;
    render();
  };
  var hasProducts = function (group, partner) {
    return D.items.some(function (p) { return belongsTo(p, group, partner); });
  };
  // При смене раздела сохраняем производителя, если он представлен в новом разделе.
  var changeGroup = function (group) {
    select(group, hasProducts(group, state.partner) ? state.partner : '');
  };
  var timer;
  var reset = function (partner) {
    clearTimeout(timer);
    state.q = '';
    state.marks.clear();
    $('#tc-q').value = '';
    select('', partner);
  };

  // На телефоне панель стоит над списком: после выбора закрываем её и ведём к товарам.
  var showResults = function () {
    if (!window.matchMedia('(max-width:899px)').matches) return;
    $('.tc-sidebar-toggle').setAttribute('aria-expanded', 'false');
    $('.tc-results').scrollIntoView({ block: 'start' });
    $('.tc-result-title').focus({ preventScroll: true });
  };

  root.addEventListener('click', function (e) {
    var t = e.target.closest('button,a'); if (!t || !root.contains(t)) return;
    if (t.hasAttribute('data-partner')) { showPartner(state.partner === t.getAttribute('data-partner') ? '' : t.getAttribute('data-partner')); }
    else if (t.hasAttribute('data-type')) { var tid = t.getAttribute('data-type'); changeGroup(deepest() === tid ? '' : tid); }
    else if (t.hasAttribute('data-top')) changeGroup(t.getAttribute('data-top'));
    else if (t.hasAttribute('data-sub')) changeGroup(t.getAttribute('data-sub') || state.top);
    else if (t.hasAttribute('data-leaf')) changeGroup(t.getAttribute('data-leaf') || state.sub);
    else if (t.hasAttribute('data-maker')) { var mid = t.getAttribute('data-maker'); select(deepest(), state.partner === mid ? '' : mid); }
    else if (t.hasAttribute('data-nav')) {
      var nav = t.getAttribute('data-nav').split('/');
      var crumb = t.closest('.tc-crumbs');
      if (nav[0] || nav[1]) select(nav[0], nav[1]); else reset('');
      if (crumb) $('.tc-result-title').focus({ preventScroll: true });
      else if (t.classList.contains('tc-node') && !t.hasAttribute('aria-expanded')) showResults();
    }
    else if (t.classList.contains('tc-show')) showResults();
    else if (t.hasAttribute('data-all')) select('', '');
    else if (t.classList.contains('tc-reset')) reset('');
    else if (t.classList.contains('tc-sidebar-toggle')) {
      t.setAttribute('aria-expanded', t.getAttribute('aria-expanded') !== 'true');
      revealTreeSelection();
    }
    else if (t.parentNode === more) { state.shown += PAGE; render(); }
    else if (t.hasAttribute('data-id')) {
      var id = t.getAttribute('data-id');
      productOpener = t;
      history.pushState({ tahcProduct: id }, '', productHash(id));
      fromHash();
    }
  });
  $('#tc-q').addEventListener('input', function (e) {
    state.q = e.target.value;
    clearTimeout(timer);
    timer = setTimeout(function () { state.shown = PAGE; render(); }, 180);
  });
  $('.tc-marks').addEventListener('change', function (e) {
    var mark = e.target.getAttribute('data-mark');
    if (!mark) return;
    if (e.target.checked) state.marks.add(mark); else state.marks.delete(mark);
    state.shown = PAGE;
    render();
  });
  // Список «Производитель»: если у выбранного производителя нет товаров в открытом разделе,
  // раздел сбрасываем и показываем всю его продукцию, а не пустой список
  $('#tc-p').addEventListener('change', function (e) {
    var partner = e.target.value, group = deepest();
    select(!partner || hasProducts(group, partner) ? group : '', partner);
  });

  // Карточка партнёра: вся его продукция без других фильтров, прокрутка к списку
  var showPartner = function (id) {
    reset(id);
    if (!id) return;
    var bar = $('.tc-bar'); bar.style.scrollMarginTop = '84px';
    bar.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  };

  var fromHash = function (applyFilter) {
    var hash = location.hash;
    if (hash.indexOf('#product-') === 0) {
      var p = D.items.find(function (x) { return productHash(x.id) === hash; });
      if (p) {
        if (productId !== p.id || !dlg.hasAttribute('open')) {
          if (!productId && !productOpener && root.contains(document.activeElement)) productOpener = document.activeElement;
          productId = p.id;
          open(p);
        }
        return;
      }
    }
    if (productId) {
      productId = '';
      closeDialog();
      if (productOpener && root.contains(productOpener)) productOpener.focus({ preventScroll: true });
      productOpener = null;
      // Возврат к каталогу сохраняет поиск, выбранные фильтры и раскрытые позиции.
      if (!applyFilter && hash === catalogHash) return;
    }
    catalogHash = hash;

    // Ссылки с карточек направлений и партнёров открывают каталог с фильтром.
    var pm = /^#partner-([a-z0-9-]+)$/.exec(hash);
    if (pm && pCount[pm[1]]) { showPartner(pm[1]); return; }
    var m = /^#catalog-([a-z-]+)$/.exec(hash); if (!m) return;
    var g = D.groups.filter(function (x) { return x.id === m[1]; })[0]; if (!g) return;
    changeGroup(g.id);
    var sec = document.getElementById('catalog') || root; if (!sec.style.scrollMarginTop) sec.style.scrollMarginTop = '84px'; sec.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  };
  window.addEventListener('hashchange', function () { fromHash(); });
  // Плитки направлений и логотипы партнёров на странице: открываем каталог на каждое нажатие,
  // а не только при смене адреса (повторное нажатие той же плитки hashchange не вызывает)
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href^="#catalog-"],a[href^="#partner-"]');
    if (!a || root.contains(a)) return;
    e.preventDefault();
    if (history.replaceState) history.replaceState(null, '', a.getAttribute('href')); else location.hash = a.getAttribute('href');
    fromHash(true);
  });
  // iOS Safari включает :active (увеличение логотипа при нажатии) только при наличии обработчика touchstart
  document.addEventListener('touchstart', function () {}, { passive: true });
  render(); fromHash();
})();
