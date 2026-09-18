// 16-shop-debug.js
// ======================================================
// かいもの / デバッグモード / 追加報酬
// ======================================================
(function () {
  'use strict';

  var SHOP_KEY = APP_KEYS.SHOP;
  var DEBUG_UNLOCK_KEY = 'hikizan_v2_debug_unlocked';
  var DEBUG_AUTO_AWARD_KEY = 'hikizan_v2_debug_auto_award';
  var DEBUG_PASSWORD = '16801680';
  var HOLD_MS = 10000;
  var _origRenderAchievementCollections = typeof renderAchievementCollections === 'function' ? renderAchievementCollections : null;
  var _origCollectFinishUnlockRewards = typeof collectFinishUnlockRewards === 'function' ? collectFinishUnlockRewards : null;
  var _origRenderFinishOutcome = null;

  var DEBUG_GEM_OVERRIDES_KEY = 'hikizan_v2_debug_gem_overrides';

    var SHOP_ITEMS = [
  {
    "id": "field_bag",
    "ico": "🎒",
    "name": "探索バッグ",
    "price": 5,
    "desc": "道具をまとめて、幻獣のすむ森へ出発。"
  },
  {
    "id": "healing_herb",
    "ico": "🌿",
    "name": "いやしの薬草",
    "price": 6,
    "desc": "冒険の休憩に使う、森の薬草。"
  },
  {
    "id": "lantern",
    "ico": "🏮",
    "name": "星明かりのランタン",
    "price": 8,
    "desc": "暗い洞窟にやさしい光をともす。"
  },
  {
    "id": "compass",
    "ico": "🧭",
    "name": "幻獣コンパス",
    "price": 10,
    "desc": "幻獣の気配を感じる不思議な羅針盤。"
  },
  {
    "id": "boots",
    "ico": "🥾",
    "name": "風のブーツ",
    "price": 12,
    "desc": "草原を軽やかに歩く探索用の靴。"
  },
  {
    "id": "field_book",
    "ico": "📗",
    "name": "幻獣ずかん",
    "price": 15,
    "desc": "出会った幻獣のひみつを書きとめよう。"
  },
  {
    "id": "net",
    "ico": "🕸️",
    "name": "銀糸のあみ",
    "price": 18,
    "desc": "光る糸で編まれたハンターの道具。"
  },
  {
    "id": "cloak",
    "ico": "🧥",
    "name": "森かげのマント",
    "price": 20,
    "desc": "木々にとけこむ緑色のマント。"
  },
  {
    "id": "crystal",
    "ico": "🔮",
    "name": "召喚の水晶",
    "price": 25,
    "desc": "幻獣と心を通わせるための水晶。"
  },
  {
    "id": "shield",
    "ico": "🛡️",
    "name": "守りの盾",
    "price": 30,
    "desc": "冒険の仲間を守る丈夫な盾。"
  },
  {
    "id": "horn",
    "ico": "📯",
    "name": "呼び声の角笛",
    "price": 35,
    "desc": "遠くの仲間へ合図を送る角笛。"
  },
  {
    "id": "map",
    "ico": "🗺️",
    "name": "古代の地図",
    "price": 40,
    "desc": "まだ見ぬ幻獣のすみかを探そう。"
  },
  {
    "id": "water_charm",
    "ico": "💧",
    "name": "水のまもり",
    "price": 45,
    "desc": "清らかな泉の力を宿すお守り。"
  },
  {
    "id": "fire_charm",
    "ico": "🔥",
    "name": "火のまもり",
    "price": 50,
    "desc": "勇気をくれる小さな炎のお守り。"
  },
  {
    "id": "moon_bow",
    "ico": "🏹",
    "name": "月光の弓",
    "price": 60,
    "desc": "月の光をまとった伝説の弓。"
  },
  {
    "id": "staff",
    "ico": "🪄",
    "name": "星よみの杖",
    "price": 70,
    "desc": "星の道しるべを映し出す杖。"
  },
  {
    "id": "orthros",
    "ico": "🐺",
    "name": "オルトロス",
    "price": 80,
    "desc": "二つの頭で仲間を見守る、たのもしい幻獣。",
    "img": "img/オルトロス.png"
  },
  {
    "id": "manticore",
    "ico": "🦁",
    "name": "マンティコア",
    "price": 100,
    "desc": "大きな翼と鋭い尾をもつ、勇敢な幻獣。",
    "img": "img/マンティコア.png"
  },
  {
    "id": "unicorn",
    "ico": "🦄",
    "name": "ユニコーン",
    "price": 120,
    "desc": "一本の角に清らかな光を宿す幻獣。",
    "img": "img/ユニコーン.png"
  },
  {
    "id": "gozu_mezu",
    "ico": "🐂",
    "name": "牛頭馬頭",
    "price": 150,
    "desc": "力を合わせて道を切り開く、二人の守護者。",
    "img": "img/牛頭馬頭.png"
  },
  {
    "id": "dragon_scale",
    "ico": "🐉",
    "name": "竜のうろこ",
    "price": 180,
    "desc": "古い竜から授かったきらめくうろこ。"
  },
  {
    "id": "phoenix_feather",
    "ico": "🪶",
    "name": "不死鳥の羽",
    "price": 220,
    "desc": "新しい冒険への勇気をくれる羽。"
  },
  {
    "id": "hunter_crown",
    "ico": "👑",
    "name": "幻獣ハンターの冠",
    "price": 260,
    "desc": "たくさんの修行を重ねたハンターの証。"
  },
  {
    "id": "legend_mark",
    "ico": "🏅",
    "name": "伝説のハンターの証",
    "price": 300,
    "desc": "幻獣とともに歩んだ冒険の記念章。"
  }
];
  SHOP_ITEMS.forEach(function(item, index) {
    item.category = item.img ? 'creature' : index < 12 ? 'explore' : index < 16 ? 'relic' : 'legend';
  });
  SHOP_ITEMS = SHOP_ITEMS.concat(HUNTER_EXTRA_SHOP_ITEMS);
  var shopCategory = 'all';
  var shopCategories = [['all','すべて'],['explore','探索どうぐ'],['material','森のめぐみ'],['relic','魔法の道具'],['legend','伝説のおたから'],['creature','幻獣'],['owned','購入済み']];
  function getShopItemImagePath(index) { return SHOP_ITEMS[index].img || ''; }

  function trimJapanesePeriod(text) {
    return String(text || '').replace(/[。．\.]+$/g, '');
  }


  var SHOP_FLAVOR_TEXTS = [];

  function buildShopFlavor(item, index) {
    var name = String(item && item.name ? item.name : '');
    var desc = trimJapanesePeriod(item && item.desc ? item.desc : '');
    var price = item && typeof item.price === 'number' ? item.price : 0;
    var base = SHOP_FLAVOR_TEXTS[index] || '';
    if (!base) {
      base = '第' + (index + 1) + '番の探索道具。' + name + 'は' + desc + '。';
    }
    return base + ' 価格' + price + '★の品として、集める達成感も大きい。';
  }

  function ensureShopDetailOverlay() {
    if (document.getElementById('shop-detail-overlay')) return;

    var overlay = document.createElement('div');
    overlay.id = 'shop-detail-overlay';
    overlay.className = 'shop-detail-overlay';
    overlay.setAttribute('aria-hidden', 'true');
    overlay.innerHTML = ''
      + '<div class="shop-detail-dialog" role="dialog" aria-modal="true" aria-labelledby="shop-detail-title">'
      + '  <button type="button" class="shop-detail-close" id="shop-detail-close" aria-label="閉じる">×</button>'
      + '  <div class="shop-detail-top">'
      + '    <div class="shop-detail-media">'
      + '      <img id="shop-detail-img" class="shop-detail-img" alt="">'
      + '      <div id="shop-detail-img-fallback" class="shop-detail-img-fallback" style="display:none;"></div>'
      + '    </div>'
      + '    <div class="shop-detail-head">'
      + '      <div class="shop-detail-badge" id="shop-detail-badge"></div>'
      + '      <h3 id="shop-detail-title"></h3>'
      + '      <div class="shop-detail-meta" id="shop-detail-meta"></div>'
      + '    </div>'
      + '  </div>'
      + '  <p class="shop-detail-flavor" id="shop-detail-flavor"></p>'
      + '  <div class="shop-detail-desc" id="shop-detail-desc"></div>'
      + '</div>';
    document.body.appendChild(overlay);

    overlay.addEventListener('click', function (ev) {
      if (ev.target === overlay) closeShopDetailOverlay();
    });
    document.addEventListener('keydown', function (ev) {
      var node = document.getElementById('shop-detail-overlay');
      if (!node || !node.classList.contains('show')) return;
      if (ev.key === 'Escape') closeShopDetailOverlay();
    });

    var closeBtn = document.getElementById('shop-detail-close');
    if (closeBtn) closeBtn.addEventListener('click', closeShopDetailOverlay);
  }

  function closeShopDetailOverlay() {
    var overlay = document.getElementById('shop-detail-overlay');
    if (!overlay) return;
    overlay.classList.remove('show');
    overlay.setAttribute('aria-hidden', 'true');
  }

  function openShopDetailOverlay(item, index) {
    if (!item) return;
    ensureShopDetailOverlay();
    var overlay = document.getElementById('shop-detail-overlay');
    if (!overlay) return;

    var img = document.getElementById('shop-detail-img');
    var fallback = document.getElementById('shop-detail-img-fallback');
    var badge = document.getElementById('shop-detail-badge');
    var title = document.getElementById('shop-detail-title');
    var meta = document.getElementById('shop-detail-meta');
    var flavor = document.getElementById('shop-detail-flavor');
    var desc = document.getElementById('shop-detail-desc');

    if (badge) badge.textContent = '購入済み';
    if (title) title.textContent = item.name || '';
    if (meta) meta.textContent = '★' + item.price + ' / ' + (index + 1) + '番';
    if (flavor) flavor.textContent = buildShopFlavor(item, index);
    if (desc) desc.textContent = item.desc || '';

    if (img) {
      img.onload = null;
      img.onerror = null;
      img.alt = item.name || '';
      var imagePath = getShopItemImagePath(index);
      if (imagePath) img.src = imagePath; else img.removeAttribute('src');
      img.style.display = '';
      if (fallback) fallback.style.display = 'none';
      img.onerror = function () {
        img.style.display = 'none';
        if (fallback) {
          fallback.textContent = item.ico || '★';
          fallback.style.display = 'flex';
        }
      };
      img.onload = function () {
        if (fallback) fallback.style.display = 'none';
      };
    }

    if (img && !getShopItemImagePath(index)) { img.style.display = 'none'; fallback.textContent = item.ico; fallback.style.display = 'flex'; }
    overlay.classList.add('show');
    overlay.setAttribute('aria-hidden', 'false');
  }


  function safeGetText(key, fallback) {
    try {
      var v = sessionStorage.getItem(key);
      return v === null ? fallback : v;
    } catch (e) {
      return fallback;
    }
  }

  function safeSetText(key, value) {
    try { sessionStorage.setItem(key, String(value)); } catch (e) {}
  }

  function getShopData() {
    if (typeof shopData === 'object' && shopData) return shopData;
    shopData = storageLoadJSON(SHOP_KEY, {});
    return shopData;
  }

  function saveDebugGemOverrides() {
    try { sessionStorage.setItem(DEBUG_GEM_OVERRIDES_KEY, JSON.stringify(debugGemOverrides || {})); } catch (e) {}
  }

  var debugGemOverrides = (function () {
    try {
      var raw = sessionStorage.getItem(DEBUG_GEM_OVERRIDES_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  })();

  function getGemOverride(id) {
    if (!debugGemOverrides || !Object.prototype.hasOwnProperty.call(debugGemOverrides, id)) return null;
    return !!debugGemOverrides[id];
  }

  function setGemOverride(id, on) {
    if (!debugGemOverrides) debugGemOverrides = {};
    debugGemOverrides[id] = !!on;
    saveDebugGemOverrides();
  }

  function clearGemOverride(id) {
    if (!debugGemOverrides || !Object.prototype.hasOwnProperty.call(debugGemOverrides, id)) return;
    delete debugGemOverrides[id];
    saveDebugGemOverrides();
  }

  function hasGemOverride(id) {
    return !!(debugGemOverrides && Object.prototype.hasOwnProperty.call(debugGemOverrides, id));
  }

  function hasGemId(id) {
    return typeof id === 'string' && /^gem_/.test(id);
  }

  function wrapGemChecks() {
    if (!Array.isArray(ACH_GEMS)) return;
    ACH_GEMS.forEach(function (gem) {
      if (!gem || gem._origCheck) return;
      gem._origCheck = gem.check;
      gem.check = function () {
        var ov = getGemOverride(gem.id);
        if (ov !== null) return ov;
        try { return gem._origCheck ? gem._origCheck() : false; } catch (e) { return false; }
      };
    });
  }

  function saveShopData() {
    storageSaveJSON(SHOP_KEY, getShopData());
  }

  function hasShopItem(id) {
    var data = getShopData();
    return !!(data && data[id]);
  }

  function setShopItemOwned(id, owned) {
    var data = getShopData();
    if (owned) {
      data[id] = { date: new Date().toLocaleDateString('ja-JP') };
    } else {
      delete data[id];
    }
    saveShopData();
    return data;
  }

  function getStarCount() {
    if (window.HunterHud && typeof HunterHud.getStarCount === 'function') {
      try { return HunterHud.getStarCount(); } catch (e) {}
    }
    try {
      var v = localStorage.getItem('hikizan_stars_total');
      var n = parseInt(v, 10);
      return Number.isFinite(n) ? n : 0;
    } catch (e2) {
      return 0;
    }
  }

  function setStarCount(value, source) {
    if (window.HunterHud && typeof HunterHud.setStarCount === 'function') {
      try { return HunterHud.setStarCount(value, source || 'debug'); } catch (e) {}
    }
    var next = Math.max(0, parseInt(value, 10) || 0);
    try { localStorage.setItem('hikizan_stars_total', String(next)); } catch (e2) {}
    if (window.syncHunterStarsUI) {
      try { syncHunterStarsUI(next); } catch (e3) {}
    }
    return next;
  }

  function addStarCount(delta, source) {
    if (window.HunterHud && typeof HunterHud.addStarCount === 'function') {
      try { return HunterHud.addStarCount(delta, source || 'debug'); } catch (e) {}
    }
    return setStarCount(getStarCount() + (parseInt(delta, 10) || 0), source);
  }

  function isDebugUnlocked() {
    return safeGetText(DEBUG_UNLOCK_KEY, '0') === '1';
  }

  function setDebugUnlocked(on) {
    safeSetText(DEBUG_UNLOCK_KEY, on ? '1' : '0');
    if (!on) hideDebugPanel();
  }

  function isDebugAutoAwardOn() {
    return safeGetText(DEBUG_AUTO_AWARD_KEY, '1') !== '0';
  }

  function setDebugAutoAward(on) {
    safeSetText(DEBUG_AUTO_AWARD_KEY, on ? '1' : '0');
    syncDebugPanel();
  }

  function showToast(msg) {
    var id = 'shop-debug-toast';
    var el = document.getElementById(id);
    if (!el) {
      el = document.createElement('div');
      el.id = id;
      el.style.cssText = [
        'position:fixed',
        'left:50%',
        'bottom:18px',
        'transform:translateX(-50%)',
        'z-index:10050',
        'padding:10px 14px',
        'border-radius:999px',
        'background:rgba(35,28,18,.92)',
        'color:#fff',
        'font-size:13px',
        'font-weight:800',
        'box-shadow:0 8px 24px rgba(0,0,0,.24)',
        'pointer-events:none',
        'max-width:min(92vw,520px)',
        'text-align:center',
        'line-height:1.3'
      ].join(';');
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.style.opacity = '1';
    clearTimeout(el._tm);
    el._tm = setTimeout(function () {
      el.style.opacity = '0';
    }, 1800);
  }

  function ensureStyle() {
    if (document.getElementById('shop-debug-style')) return;
    var css = ''
      + '.ach-shop-head{display:flex;justify-content:space-between;align-items:flex-end;gap:12px;margin-bottom:12px;padding:12px 14px;border-radius:16px;background:linear-gradient(135deg,#FFF9E8,#F7F3FF);border:1.5px solid rgba(126,95,39,.14);}'
      + '.ach-shop-head .shop-title{font-size:15px;font-weight:900;color:#5a3a05;}'
      + '.ach-shop-head .shop-meta{font-size:12px;font-weight:800;color:#7b5c2e;text-align:right;}'
      + '.ach-shop-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:12px;}'
      + '.shop-card{background:#fff;border:1.5px solid #eadfc6;border-radius:18px;padding:12px;box-shadow:0 4px 14px rgba(0,0,0,.06);display:flex;flex-direction:column;gap:8px;min-height:176px;}'
      + '.shop-card.owned{border-color:#9ad8a0;background:linear-gradient(180deg,#ffffff,#f3fff4);}'
      + '.shop-card.owned{cursor:pointer;}'
      + '.shop-card.owned:focus{outline:3px solid rgba(245,166,35,.35);outline-offset:2px;}'
      + '.shop-detail-overlay{position:fixed;inset:0;z-index:10080;display:none;align-items:center;justify-content:center;background:rgba(15,23,42,.58);padding:16px;}'
      + '.shop-detail-overlay.show{display:flex;}'
      + '.shop-detail-dialog{width:min(1120px,96vw);max-height:min(92vh,1100px);overflow:auto;background:#fffdf7;border-radius:24px;box-shadow:0 30px 90px rgba(0,0,0,.38);border:2px solid rgba(140,108,50,.16);padding:24px;position:relative;}'
      + '.shop-detail-close{position:absolute;top:12px;right:12px;width:40px;height:40px;border:none;border-radius:999px;background:#f2ead9;color:#5a3a05;font-size:24px;font-weight:900;cursor:pointer;}'
      + '.shop-detail-top{display:flex;flex-direction:column;gap:18px;align-items:stretch;margin-bottom:16px;}'
      + '.shop-detail-media{width:min(100%,760px);aspect-ratio:1/1;margin:0 auto;border-radius:28px;background:linear-gradient(135deg,#fff2d5,#ffffff);border:1.5px solid #eadfc6;display:flex;align-items:center;justify-content:center;overflow:hidden;}'
      + '.shop-detail-img{width:100%;height:100%;object-fit:contain;display:block;padding:10px;box-sizing:border-box;}'
      + '.shop-detail-img-fallback{width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:120px;}'
      + '.shop-detail-badge{display:inline-flex;align-items:center;justify-content:center;padding:6px 10px;border-radius:999px;background:#dff4e2;color:#26633a;font-size:11px;font-weight:900;margin-bottom:8px;}'
      + '.shop-detail-head{width:100%;text-align:center;}'
      + '.shop-detail-head h3{margin:0;font-size:24px;line-height:1.2;color:#3a2a00;font-weight:900;}'
      + '.shop-detail-meta{margin-top:6px;font-size:13px;font-weight:800;color:#8a5b14;}'
      + '.shop-detail-flavor{font-size:15px;font-weight:800;line-height:1.8;color:#5f4a2a;margin:10px 0 12px;}'
      + '.shop-detail-desc{padding:12px 14px;border-radius:18px;background:#faf6ed;border:1px solid #eadfc6;font-size:14px;font-weight:700;line-height:1.8;color:#6e5835;}'
      + '.shop-ico{width:48px;height:48px;display:flex;align-items:center;justify-content:center;border-radius:14px;background:linear-gradient(135deg,#fff0d4,#fff);font-size:28px;flex-shrink:0;}'
      + '.shop-name{font-size:15px;font-weight:900;color:#3a2a00;line-height:1.2;}'
      + '.shop-desc{font-size:11px;font-weight:700;color:#7d6a51;line-height:1.45;min-height:2.8em;}'
      + '.shop-price{font-size:13px;font-weight:900;color:#8a5b14;display:flex;justify-content:space-between;align-items:center;}'
      + '.shop-price small{font-size:11px;color:#9a7c52;font-weight:800;}'
      + '.shop-buy{border:none;border-radius:14px;padding:10px 12px;font-size:13px;font-weight:900;cursor:pointer;background:#f5a623;color:#2d2100;box-shadow:0 2px 0 rgba(120,80,0,.18);}'
      + '.shop-buy:disabled{background:#d8d8d8;color:#7a7a7a;cursor:not-allowed;box-shadow:none;opacity:.92;}'
      + '.shop-owned-tag{display:inline-flex;align-items:center;justify-content:center;padding:6px 10px;border-radius:999px;background:#dff4e2;color:#26633a;font-size:11px;font-weight:900;}'
      + '.shop-count-line{font-size:12px;font-weight:800;color:#6b4a18;margin-top:2px;}'
      + '.shop-panel-tools{display:flex;flex-wrap:wrap;gap:8px;margin-top:10px;}'
      + '.dbg-chip,.dbg-btn{border:none;border-radius:12px;padding:8px 10px;font-size:12px;font-weight:900;cursor:pointer;box-shadow:0 2px 0 rgba(0,0,0,.08);}'
      + '.dbg-btn{background:#ece6ff;color:#3d2d7d;}'
      + '.dbg-chip.on{background:#dff4e2;color:#1f5f35;}'
      + '.dbg-chip.off{background:#f0f0f0;color:#6b7280;}'
      + '.dbg-overlay{position:fixed;inset:0;z-index:10040;display:none;align-items:center;justify-content:center;background:rgba(17,24,39,.55);padding:16px;}'
      + '.dbg-overlay.show{display:flex;}'
      + '.dbg-dialog{width:min(940px,94vw);max-height:min(86vh,920px);overflow:auto;background:#fff;border-radius:22px;box-shadow:0 28px 80px rgba(0,0,0,.35);padding:16px;border:2px solid rgba(140,108,50,.16);}'
      + '.dbg-dialog h3{margin:0 0 8px;font-size:18px;color:#3a2a00;}'
      + '.dbg-dialog p{margin:0;font-size:12px;color:#7b5c2e;font-weight:700;line-height:1.5;}'
      + '.dbg-row{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin:10px 0;}'
      + '.dbg-row input{border:2px solid #e7d9bf;border-radius:12px;padding:8px 10px;font-size:14px;font-weight:800;min-width:120px;}'
      + '.dbg-section{margin-top:14px;padding-top:12px;border-top:1px solid #eee2c7;}'
      + '.dbg-section-title{font-size:13px;font-weight:900;color:#5a3a05;margin-bottom:8px;}'
      + '.dbg-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(190px,1fr));gap:8px;}'
      + '.dbg-mini{display:flex;justify-content:space-between;align-items:center;gap:8px;background:#faf7ef;border:1px solid #eadfc6;border-radius:14px;padding:8px 10px;font-size:12px;font-weight:800;color:#3a2a00;}'
      + '.dbg-mini button{margin-left:auto;border:none;border-radius:10px;padding:6px 8px;font-size:11px;font-weight:900;cursor:pointer;background:#efefef;color:#3a2a00;}'
      + '.dbg-close{background:#f5a623;color:#2d2100;}'
      + '.debug-launch-wrap{margin-top:18px;padding:18px 12px;border-radius:18px;background:#fff7e8;border:2px dashed #f0c66b;display:flex;align-items:center;justify-content:center;min-height:96px;}'
      + '.debug-shuriken{width:62px;height:62px;border:none;border-radius:18px;background:linear-gradient(135deg,#fff,#ffe8b6);color:#5a3a05;font-size:30px;font-weight:900;cursor:pointer;box-shadow:0 5px 14px rgba(0,0,0,.12);display:block;margin:0 auto;}'
      + '.debug-shuriken:active{transform:scale(.98);}'
      + '.debug-password-mask{display:none;position:fixed;inset:0;z-index:10060;background:rgba(0,0,0,.56);align-items:center;justify-content:center;padding:16px;}'
      + '.debug-password-mask.show{display:flex;}'
      + '.debug-password-card{width:min(420px,92vw);background:#fff;border-radius:20px;padding:16px;border:2px solid rgba(140,108,50,.16);box-shadow:0 24px 70px rgba(0,0,0,.32);}'
      + '.debug-password-card h4{margin:0 0 8px;font-size:18px;color:#3a2a00;}'
      + '.debug-password-card .tip{font-size:12px;color:#7b5c2e;font-weight:700;margin-bottom:12px;}'
      + '.debug-password-card input{width:100%;box-sizing:border-box;border:2px solid #e7d9bf;border-radius:12px;padding:10px 12px;font-size:18px;font-weight:900;letter-spacing:.12em;text-align:center;}'
      + '.debug-password-card .actions{display:flex;gap:8px;margin-top:12px;}'
      + '.debug-password-card .actions button{flex:1;border:none;border-radius:12px;padding:10px 12px;font-size:13px;font-weight:900;cursor:pointer;}'
      + '.debug-password-card .actions .ok{background:#f5a623;color:#2d2100;}'
      + '.debug-password-card .actions .cancel{background:#efefef;color:#3a2a00;}'
      + '.shop-empty{padding:18px;border-radius:16px;background:#fff; border:1.5px dashed #eadfc6;color:#7b5c2e;font-size:13px;font-weight:800;text-align:center;}';
    var style = document.createElement('style');
    style.id = 'shop-debug-style';
    style.textContent = css;
    document.head.appendChild(style);
  }

  function ensureAchievementShopDom() {
    var tabs = document.getElementById('ach-tabs');
    var ougiTab = tabs ? tabs.querySelector('.ach-tab[data-tab="ougi"]') : null;
    if (tabs && !document.querySelector('.ach-tab[data-tab="shop"]')) {
      var btn = document.createElement('button');
      btn.className = 'ach-tab';
      btn.dataset.tab = 'shop';
      btn.textContent = '🛒 ハンターどうぐ';
      if (ougiTab && ougiTab.parentNode === tabs) tabs.insertBefore(btn, ougiTab.nextSibling);
      else tabs.appendChild(btn);
    }

    var listWrap = document.querySelector('.ach-list-wrap');
    if (listWrap && !document.getElementById('ach-group-shop')) {
      var div = document.createElement('div');
      div.className = 'ach-group';
      div.dataset.tab = 'shop';
      div.id = 'ach-group-shop';
      div.style.display = 'none';
      var ref = document.getElementById('ach-group-ougi');
      if (ref && ref.parentNode === listWrap) {
        ref.parentNode.insertBefore(div, ref.nextSibling);
      } else {
        listWrap.appendChild(div);
      }
    }
  }

  function ensureDebugLauncherDom() {
    var adv = document.getElementById('advanced-settings');
    if (!adv || document.getElementById('debug-launch-wrap')) return;
    var wrap = document.createElement('div');
    wrap.id = 'debug-launch-wrap';
    wrap.className = 'debug-launch-wrap';
    wrap.innerHTML = ''
      + '<button type="button" id="debug-shuriken-btn" class="debug-shuriken" aria-label="デバッグモード">✸</button>';
    adv.appendChild(wrap);
    bindDebugLauncher();
  }

  function ensureDebugOverlays() {
    if (!document.getElementById('debug-password-mask')) {
      var m = document.createElement('div');
      m.id = 'debug-password-mask';
      m.className = 'debug-password-mask';
      m.innerHTML = ''
        + '<div class="debug-password-card">'
        + '<h4>デバッグモード</h4>'
        + '<input id="debug-password-input" type="password" autocomplete="off" maxlength="8">'
        + '<div class="actions"><button type="button" class="cancel" id="debug-password-cancel">キャンセル</button><button type="button" class="ok" id="debug-password-ok">OK</button></div>'
        + '</div>';
      document.body.appendChild(m);
    }

    if (!document.getElementById('debug-panel-overlay')) {
      var o = document.createElement('div');
      o.id = 'debug-panel-overlay';
      o.className = 'dbg-overlay';
      o.innerHTML = ''
        + '<div class="dbg-dialog">'
        + '<h3>デバッグモード</h3>'
        + '<p>★の増減、実績のON/OFF、商店購入データの確認ができます。</p>'
        + '<div class="dbg-section">'
        + '  <div class="dbg-section-title">★ の調整</div>'
        + '  <div class="dbg-row" id="dbg-star-controls"></div>'
        + '  <div class="dbg-row">'
        + '    <input id="dbg-star-input" type="number" min="0" step="1" value="0">'
        + '    <button type="button" class="dbg-btn" id="dbg-star-set">この数にする</button>'
        + '    <span id="dbg-star-current" style="font-size:13px;font-weight:900;color:#7b5c2e;"></span>'
        + '  </div>'
        + '</div>'
        + '<div class="dbg-section">'
        + '  <div class="dbg-section-title">実績の自動付与</div>'
        + '  <div class="dbg-row" id="dbg-auto-award-row"></div>'
        + '</div>'
        + '<div class="dbg-section">'
        + '  <div class="dbg-section-title">実績を手で切り替え</div>'
        + '  <div class="dbg-row">'
        + '    <button type="button" class="dbg-btn" id="dbg-all-ach-on">全部ON</button>'
        + '    <button type="button" class="dbg-btn" id="dbg-all-ach-off">全部OFF</button>'
        + '  </div>'
        + '  <div class="dbg-grid" id="dbg-achievement-grid"></div>'
        + '</div>'
        + '<div class="dbg-section">'
        + '  <div class="dbg-section-title">商店の購入データ</div>'
        + '  <div class="dbg-row">'
        + '    <button type="button" class="dbg-btn" id="dbg-all-shop-on">全部購入済みにする</button>'
        + '    <button type="button" class="dbg-btn" id="dbg-all-shop-off">購入データを消す</button>'
        + '  </div>'
        + '  <div class="dbg-grid" id="dbg-shop-grid"></div>'
        + '</div>'
        + '<div class="dbg-row" style="justify-content:flex-end;margin-top:16px;">'
        + '  <button type="button" class="dbg-btn dbg-close" id="dbg-close-panel">閉じる</button>'
        + '</div>'
        + '</div>';
      document.body.appendChild(o);
    }
  }

  function setHoldMeter(pct) {
    var bar = document.getElementById('debug-hold-bar');
    if (bar) bar.style.width = Math.max(0, Math.min(100, pct)) + '%';
  }

  function bindDebugLauncher() {
    var btn = document.getElementById('debug-shuriken-btn');
    if (!btn || btn._bound) return;
    btn._bound = true;
    var intervalId = 0;
    var timeoutId = 0;
    var startAt = 0;

    function cancelHold() {
      if (intervalId) clearInterval(intervalId);
      if (timeoutId) clearTimeout(timeoutId);
      intervalId = 0;
      timeoutId = 0;
      startAt = 0;
      setHoldMeter(0);
    }

    function beginHold(ev) {
      if (ev && typeof ev.preventDefault === 'function') ev.preventDefault();
      if (intervalId || timeoutId) return;
      startAt = Date.now();
      setHoldMeter(1);
      intervalId = setInterval(function () {
        var pct = ((Date.now() - startAt) / HOLD_MS) * 100;
        setHoldMeter(pct);
      }, 80);
      timeoutId = setTimeout(function () {
        cancelHold();
        openDebugPasswordModal();
      }, HOLD_MS);
      btn._holdCancel = cancelHold;
    }

    function onUp() {
      cancelHold();
    }

    btn.addEventListener('pointerdown', beginHold);
    btn.addEventListener('touchstart', beginHold, { passive: false });
    btn.addEventListener('mousedown', beginHold);
    ['pointerup', 'pointercancel', 'touchend', 'touchcancel', 'mouseup', 'mouseleave', 'blur'].forEach(function (evtName) {
      btn.addEventListener(evtName, onUp);
    });
  }

  function openDebugPasswordModal() {
    ensureDebugOverlays();
    var mask = document.getElementById('debug-password-mask');
    var input = document.getElementById('debug-password-input');
    if (!mask || !input) return;
    mask.classList.add('show');
    input.value = '';
    setTimeout(function () {
      try { input.focus(); input.select(); } catch (e) {}
    }, 20);

    var ok = function () {
      var value = (input.value || '').trim();
      if (value === DEBUG_PASSWORD) {
        setDebugUnlocked(true);
        mask.classList.remove('show');
        showDebugPanel();
        showToast('デバッグモードに入りました');
      } else {
        input.value = '';
        input.focus();
        showToast('パスワードが違います');
      }
    };

    var cancel = function () {
      mask.classList.remove('show');
    };

    document.getElementById('debug-password-ok').onclick = ok;
    document.getElementById('debug-password-cancel').onclick = cancel;
    mask.onclick = function (ev) {
      if (ev.target === mask) cancel();
    };
    input.onkeydown = function (ev) {
      if (ev.key === 'Enter') ok();
      else if (ev.key === 'Escape') cancel();
    };
  }

  function showDebugPanel() {
    ensureDebugOverlays();
    var overlay = document.getElementById('debug-panel-overlay');
    if (!overlay) return;
    overlay.classList.add('show');
    renderDebugPanel();
  }

  function hideDebugPanel() {
    var overlay = document.getElementById('debug-panel-overlay');
    if (overlay) overlay.classList.remove('show');
    safeSetText(DEBUG_UNLOCK_KEY, '0');
  }

  function updateBadgeRecord(id, on) {
    if (id.indexOf('gem:') === 0) {
      var gemId = id.slice(4);
      if (on) {
        if (!badgeData[gemId]) badgeData[gemId] = 1;
      } else {
        delete badgeData[gemId];
      }
      saveBadgeData();
      return;
    }
    if (on) {
      if (!badgeData[id]) badgeData[id] = { date: new Date().toLocaleDateString('ja-JP') };
    } else {
      delete badgeData[id];
    }
    saveBadgeData();
  }

  function setAllAchievements(on) {
    if (Array.isArray(ACH_GEMS)) {
      for (var i = 0; i < ACH_GEMS.length; i++) {
        var gem = ACH_GEMS[i];
        if (on) setGemOverride(gem.id, true);
        else setGemOverride(gem.id, false);
      }
    }
    if (Array.isArray(BADGES)) {
      for (var j = 0; j < BADGES.length; j++) {
        updateBadgeRecord(BADGES[j].id, !!on);
      }
    }
    refreshAfterDebugChange();
  }

  function setAllShop(on) {
    var data = getShopData();
    if (on) {
      SHOP_ITEMS.forEach(function (item) {
        data[item.id] = { date: new Date().toLocaleDateString('ja-JP') };
      });
    } else {
      shopData = {};
    }
    saveShopData();
    renderShopCollection();
    renderDebugPanel();
  }

  function renderDebugPanel() {
    var starCurrent = document.getElementById('dbg-star-current');
    var starInput = document.getElementById('dbg-star-input');
    if (starCurrent) starCurrent.textContent = '現在: ★×' + getStarCount();
    if (starInput) starInput.value = String(getStarCount());

    var autoRow = document.getElementById('dbg-auto-award-row');
    if (autoRow) {
      autoRow.innerHTML = '';
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'dbg-chip ' + (isDebugAutoAwardOn() ? 'on' : 'off');
      btn.textContent = isDebugAutoAwardOn() ? 'ON: 実績を自動付与' : 'OFF: 実績を自動付与';
      btn.onclick = function () {
        setDebugAutoAward(!isDebugAutoAwardOn());
        showToast('自動付与を ' + (isDebugAutoAwardOn() ? 'ON' : 'OFF') + ' にしました');
      };
      autoRow.appendChild(btn);
      renderMasterControl(autoRow);
    }

    var controls = document.getElementById('dbg-star-controls');
    if (controls) {
      controls.innerHTML = '';
      [
        -100, -10, -1, 1, 10, 100
      ].forEach(function (delta) {
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'dbg-btn';
        b.textContent = (delta > 0 ? '+' : '') + delta;
        b.onclick = function () {
          addStarCount(delta, 'debug');
          renderShopCollection();
          renderDebugPanel();
        };
        controls.appendChild(b);
      });
    }

    var starSet = document.getElementById('dbg-star-set');
    if (starSet && !starSet._bound) {
      starSet._bound = true;
      starSet.onclick = function () {
        var n = parseInt((document.getElementById('dbg-star-input') || {}).value, 10);
        if (!Number.isFinite(n)) n = 0;
        setStarCount(n, 'debug');
        renderShopCollection();
        renderDebugPanel();
      };
    }

    var closeBtn = document.getElementById('dbg-close-panel');
    if (closeBtn && !closeBtn._bound) {
      closeBtn._bound = true;
      closeBtn.onclick = hideDebugPanel;
    }

    var allOn = document.getElementById('dbg-all-ach-on');
    var allOff = document.getElementById('dbg-all-ach-off');
    if (allOn && !allOn._bound) {
      allOn._bound = true;
      allOn.onclick = function () { setAllAchievements(true); };
    }
    if (allOff && !allOff._bound) {
      allOff._bound = true;
      allOff.onclick = function () { setAllAchievements(false); };
    }

    var allShopOn = document.getElementById('dbg-all-shop-on');
    var allShopOff = document.getElementById('dbg-all-shop-off');
    if (allShopOn && !allShopOn._bound) {
      allShopOn._bound = true;
      allShopOn.onclick = function () { setAllShop(true); renderDebugPanel(); };
    }
    if (allShopOff && !allShopOff._bound) {
      allShopOff._bound = true;
      allShopOff.onclick = function () { setAllShop(false); renderDebugPanel(); };
    }

    var achGrid = document.getElementById('dbg-achievement-grid');
    if (achGrid) {
      achGrid.innerHTML = '';
      var items = [];
      if (Array.isArray(ACH_GEMS)) {
        ACH_GEMS.forEach(function (gem) {
          var key = gem.id || '';
          var ov = getGemOverride(key);
          items.push({
            type: 'gem',
            key: key,
            label: gem.label || gem.id,
            on: ov === null ? (typeof gem.check === 'function' ? !!gem.check() : false) : ov
          });
        });
      }
      if (Array.isArray(BADGES)) {
        BADGES.forEach(function (badge) {
          items.push({
            type: 'badge',
            key: badge.id,
            label: badge.name ? badge.name.replace(/\n/g, ' ') : badge.id,
            on: !!badgeData[badge.id]
          });
        });
      }
      items.forEach(function (item) {
        var row = document.createElement('div');
        row.className = 'dbg-mini';
        row.textContent = item.type === 'gem' ? '🏅 ' + item.label : '🏅 ' + item.label;
        var b = document.createElement('button');
        b.type = 'button';
        b.textContent = item.on ? 'ON' : 'OFF';
        b.className = item.on ? 'dbg-chip on' : 'dbg-chip off';
        b.onclick = function () {
          if (item.type === 'gem') {
            setGemOverride(item.key, !item.on);
          } else {
            updateBadgeRecord(item.key, !item.on);
          }
          refreshAfterDebugChange();
        };
        row.appendChild(b);
        achGrid.appendChild(row);
      });
    }

    var shopGrid = document.getElementById('dbg-shop-grid');
    if (shopGrid) {
      shopGrid.innerHTML = '';
      SHOP_ITEMS.forEach(function (item) {
        var row = document.createElement('div');
        row.className = 'dbg-mini';
        row.textContent = item.ico + ' ' + item.name + ' / ★' + item.price;
        var b = document.createElement('button');
        b.type = 'button';
        b.textContent = hasShopItem(item.id) ? '済' : '未';
        b.className = hasShopItem(item.id) ? 'dbg-chip on' : 'dbg-chip off';
        b.onclick = function () {
          setShopItemOwned(item.id, !hasShopItem(item.id));
          renderDebugPanel();
          renderShopCollection();
        };
        row.appendChild(b);
        shopGrid.appendChild(row);
      });
    }
  }

  function refreshAfterDebugChange() {
    saveBadgeData();
    if (typeof renderAchievement === 'function') {
      try { renderAchievement(); } catch (e) {}
    } else {
      if (typeof renderAchievementCollections === 'function') {
        try { renderAchievementCollections(); } catch (e2) {}
      }
      if (typeof renderAchievementOverview === 'function') {
        try { renderAchievementOverview(); } catch (e3) {}
      }
    }
    renderDebugPanel();
  }

  function renderShopCollection() {
    var el = document.getElementById('ach-group-shop');
    if (!el) return;
    el.innerHTML = '';

    var total = getStarCount();
    var ownedCount = 0;
    for (var i = 0; i < SHOP_ITEMS.length; i++) if (hasShopItem(SHOP_ITEMS[i].id)) ownedCount++;

    var head = document.createElement('div');
    head.className = 'ach-shop-head';
    head.innerHTML = ''
      + '<div><div class="shop-title">★ を つかって ハンターどうぐを かう</div>'
      + '<div class="shop-count-line">購入済み ' + ownedCount + ' / ' + SHOP_ITEMS.length + '</div></div>'
      + '<div class="shop-meta">ためた★: ★×' + total + '<br>購入済みの品はタップで詳細を見られる</div>';
    el.appendChild(head);
    var filters = document.createElement('div');
    filters.className = 'hunter-shop-filters';
    filters.setAttribute('aria-label', '商品の分類');
    shopCategories.forEach(function(category) {
      var button = document.createElement('button');
      button.type = 'button'; button.textContent = category[1];
      button.setAttribute('aria-pressed', String(shopCategory === category[0]));
      button.onclick = function() { shopCategory = category[0]; renderShopCollection(); };
      filters.appendChild(button);
    });
    el.appendChild(filters);

    if (!SHOP_ITEMS.length) {
      var empty = document.createElement('div');
      empty.className = 'shop-empty';
      empty.textContent = 'まだ商品がありません。';
      el.appendChild(empty);
      return;
    }

    var grid = document.createElement('div');
    grid.className = 'ach-shop-grid';
    SHOP_ITEMS.forEach(function (item, index) {
      var owned = hasShopItem(item.id);
      if (shopCategory === 'owned' ? !owned : shopCategory !== 'all' && item.category !== shopCategory) return;
      var card = document.createElement('div');
      card.className = 'shop-card' + (owned ? ' owned' : '');
      var title = owned ? '購入済み' : ('★' + item.price + 'で かう');
      var afford = total >= item.price;
      card.innerHTML = ''
        + '<div class="shop-ico">' + (item.img ? '<img src="' + item.img + '" alt="">' : item.ico) + '</div>'
        + '<div class="shop-name">' + item.name + '</div>'
        + '<div class="shop-desc">' + item.desc + '</div>'
        + '<div class="shop-price"><span>' + title + '</span><small>' + (owned ? '詳細を見る' : (afford ? '買える' : '★がたりない')) + '</small></div>';

      if (owned) {
        card.tabIndex = 0;
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', item.name + ' の詳細を見る');
        card.addEventListener('click', function () {
          openShopDetailOverlay(item, index);
        });
        card.addEventListener('keydown', function (ev) {
          if (ev.key === 'Enter' || ev.key === ' ') {
            ev.preventDefault();
            openShopDetailOverlay(item, index);
          }
        });

        var tag = document.createElement('div');
        tag.className = 'shop-owned-tag';
        tag.textContent = '購入済み';
        card.appendChild(tag);
      } else {
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'shop-buy';
        btn.textContent = '★' + item.price + ' で かう';
        btn.disabled = !afford;
        btn.onclick = function (ev) {
          if (ev && typeof ev.stopPropagation === 'function') ev.stopPropagation();
          purchaseShopItem(item.id);
        };
        card.appendChild(btn);
      }
      grid.appendChild(card);
    });
    if (!grid.children.length) { var empty = document.createElement('p'); empty.className = 'shop-empty'; empty.textContent = 'まだ購入した おたからは ありません。'; grid.appendChild(empty); }
    el.appendChild(grid);
  }

  function purchaseShopItem(id) {
    var item = null;
    for (var i = 0; i < SHOP_ITEMS.length; i++) {
      if (SHOP_ITEMS[i].id === id) { item = SHOP_ITEMS[i]; break; }
    }
    if (!item) return;
    if (hasShopItem(id)) {
      showToast('購入済みです');
      return;
    }
    var total = getStarCount();
    if (total < item.price) {
      showToast('★が足りません');
      return;
    }
    setStarCount(total - item.price, 'shop');
    setShopItemOwned(id, true);
    showToast(item.name + ' を購入しました');
    renderShopCollection();
    renderDebugPanel();
  }

  function calcNormalStarReward(summary, completed) {
    if (!summary || !summary.tot) return 0;
    if (completed === false) return 1;

    var base = Math.max(1, Math.ceil(summary.tot / 6));
    var courseBonus = 0;
    if (curCourse === '20') courseBonus = 6;
    else if (curCourse === 'all') courseBonus = 12;
    else courseBonus = 2;

    var accBonus = 0;
    if (summary.acc === 100) accBonus = 5;
    else if (summary.acc >= 90) accBonus = 3;
    else if (summary.acc >= 70) accBonus = 1;

    var sizeBonus = 0;
    if (summary.tot >= 20) sizeBonus = 2;
    if (summary.tot >= 40) sizeBonus = 5;

    return base + courseBonus + accBonus + sizeBonus;
  }

  function calcKotsuStarReward(summary, completed) {
    if (!summary || !summary.tot) return 0;
    if (completed === false) return 1;
    return Math.max(1, Math.ceil(summary.tot / 6));
  }

  function grantNormalStars(summary, completed) {
    if (sessMode !== 'normal' && sessMode.indexOf('kotsu') !== 0) return 0;
    if (!summary || !summary.tot) return 0;
    if (sess && sess._starsAwarded) return 0;
    var reward = (sessMode.indexOf('kotsu') === 0)
      ? calcKotsuStarReward(summary, completed)
      : calcNormalStarReward(summary, completed);
    if (reward <= 0) return 0;
    if (sess) sess._starsAwarded = true;
    addStarCount(reward, 'practice');
    renderShopCollection();
    syncDebugPanel();
    showToast('★' + reward + ' ふえました');
    return reward;
  }

  function maybeAwardNormalStars(summary, completed) {
    try {
      return grantNormalStars(summary, completed);
    } catch (e) {
      console.error('[shop-debug] star reward failed', e);
      return 0;
    }
  }

  function isGemBadgeId(id) {
    return typeof id === 'string' && /^gem_(no|carry)_/.test(id);
  }

  function getGemKeyFromBadgeId(id) {
    return id.replace(/^gem_/, '');
  }

  function updateAchievementToggle(id, on) {
    if (isGemBadgeId(id)) {
      if (on) badgeData[id] = 1;
      else delete badgeData[id];
      saveBadgeData();
      return;
    }
    if (on) badgeData[id] = { date: new Date().toLocaleDateString('ja-JP') };
    else delete badgeData[id];
    saveBadgeData();
  }

  function wrapFinishHooks() {
    if (typeof collectFinishUnlockRewards === 'function') {
      window.collectFinishUnlockRewards = function (completed) {
        if (!isDebugAutoAwardOn()) {
          var liveTotal = (typeof getUnlockedAchievementCount === 'function')
            ? getUnlockedAchievementCount().totalOn
            : 0;
          var beforeTotal = (sess && typeof sess.startAchievementCount === 'number')
            ? sess.startAchievementCount
            : liveTotal;
          return { gems: [], badge: null, beforeTotal: beforeTotal };
        }
        return _origCollectFinishUnlockRewards ? _origCollectFinishUnlockRewards(completed) : { gems: [], badge: null, beforeTotal: null };
      };
    }

    if (typeof renderFinishOutcome === 'function') {
      // Capture after special-mode hooks have been installed.
      _origRenderFinishOutcome = renderFinishOutcome;
      window.renderFinishOutcome = function (summary, completed) {
        var ret = _origRenderFinishOutcome ? _origRenderFinishOutcome(summary, completed) : undefined;
        maybeAwardNormalStars(summary, completed);
        return ret;
      };
    }
  }

  function wrapAchievementRender() {
    if (typeof renderAchievementCollections === 'function') {
      window.renderAchievementCollections = function () {
        ensureAchievementShopDom();
        var ret = _origRenderAchievementCollections ? _origRenderAchievementCollections() : undefined;
        renderShopCollection();
        return ret;
      };
    }
  }

  function init() {
    ensureStyle();
    wrapGemChecks();
    ensureAchievementShopDom();
    ensureDebugLauncherDom();
    ensureDebugOverlays();
    wrapAchievementRender();
    wrapFinishHooks();

    if (isDebugUnlocked()) {
      showDebugPanel();
    }

    if (typeof renderShopCollection === 'function') {
      renderShopCollection();
    }
  }

  function syncDebugPanel() {
    if (document.getElementById('debug-panel-overlay') && document.getElementById('debug-panel-overlay').classList.contains('show')) {
      renderDebugPanel();
    }
  }

  window.HUNTER_SHOP_ITEMS = SHOP_ITEMS;
  window.grantHunterStars = grantNormalStars;
  window.clearHunterDebugOverrides = function() { debugGemOverrides = {}; saveDebugGemOverrides(); };
  window.saveShopData = saveShopData;
  window.getShopData = getShopData;
  window.hasShopItem = hasShopItem;
  window.purchaseShopItem = purchaseShopItem;
  window.renderShopCollection = renderShopCollection;
  window.showDebugPanel = showDebugPanel;
  window.hideDebugPanel = hideDebugPanel;
  window.renderDebugPanel = renderDebugPanel;
  window.isDebugAutoAwardOn = isDebugAutoAwardOn;
  window.setDebugAutoAward = setDebugAutoAward;
  window.setDebugUnlocked = setDebugUnlocked;
  window.getStarCountDebug = getStarCount;
  window.addStarCountDebug = addStarCount;
  window.setStarCountDebug = setStarCount;

  document.addEventListener('DOMContentLoaded', init, { once: true });

})();
