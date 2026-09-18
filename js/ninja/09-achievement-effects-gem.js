// 09-achievement-effects-gem.js
// ======================================================
// 宝石ゲット演出 / 宝石名
// ======================================================

var GEM_UNLOCK_TEXTS = {};

function getGemUnlockTextByIndex(idx) {
  return GEM_UNLOCK_TEXTS[idx] || ('メダル' + idx + '\nゲット！');
}

function showGemUnlockEffect(gemImg, gemName, onDone) {
  var parts = buildAchievementOverlay();
  bindAchievementOverlayClose(parts, onDone);

  parts.card.style.maxWidth = 'min(94vw, 760px)';
  parts.card.style.width = 'min(94vw, 760px)';
  parts.card.style.padding = '28px 36px 24px';

  var img = document.createElement('img');
  img.className = 'gem-burst-img';
  img.src = gemImg;
  img.alt = gemName;
  img.onerror = function(){ this.style.display='none'; };
  parts.card.appendChild(img);

  var title = document.createElement('div');
  title.className = 'gem-burst-title';

  var text = String(gemName || '');
  var lines = text.indexOf('\n') >= 0 ? text.split('\n') : [text, 'ゲット！'];
  var line1 = document.createElement('div');
  line1.className = 'gem-burst-title-main';
  line1.textContent = lines[0] || '';
  title.appendChild(line1);

  var line2 = document.createElement('div');
  line2.className = 'gem-burst-title-sub';
  line2.textContent = lines.slice(1).join('\n') || '';
  title.appendChild(line2);

  parts.card.appendChild(title);

  document.body.appendChild(parts.overlay);
  try {
    playAchievementTone([[0,523],[0.1,659],[0.2,784],[0.3,1047]],0.22,0.22);
  } catch (e) {}
}
