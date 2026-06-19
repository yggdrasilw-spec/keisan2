// 09-achievement-effects-gem.js
// ======================================================
// メダルゲット演出 / メダル名
// ======================================================

var GEM_UNLOCK_TEXTS = {
  1: "１をひくげんじゅう！\n金剛石（ダイヤモンド）ゲット！",
  2: "２をひくげんじゅう！\n紅玉（ルビー）ゲット！",
  3: "３をひくげんじゅう！\n青玉（サファイア）ゲット！",
  4: "４をひくげんじゅう！\n翠玉（エメラルド）ゲット！",
  5: "５をひくげんじゅう！\n紫水晶（アメジスト）ゲット！",
  6: "６をひくげんじゅう！\n黄玉（トパーズ）ゲット！",
  7: "７をひくげんじゅう！\n柘榴石（ガーネット）ゲット！",
  8: "８をひくげんじゅう！\n橄欖石（ペリドット）ゲット！",
  9: "9をひくげんじゅう！\n蛋白石（オパール）ゲット！",
  10: "すべてをげんじゅう！\n電気石（トルマリン）ゲット！",
  11: "２をひくげんじゅう（くりあがり）！\n翡翠（ヒスイ）ゲット！",
  12: "３をひくげんじゅう（くりあがり）！\n瑠璃（ラピスラズリ）ゲット！",
  13: "４をひくげんじゅう（くりあがり）！\n真珠（パール）ゲット！",
  14: "５をひくげんじゅう（くりあがり）！\n琥珀（コハク）ゲット！",
  15: "６をひくげんじゅう（くりあがり）！\n風信子石（ジルコン）ゲット！",
  16: "７をひくげんじゅう（くりあがり）！\n尖晶石（スピネル）ゲット！",
  17: "８をひくげんじゅう（くりあがり）！\n月長石（ムーンストーン）ゲット！",
  18: "9をひくげんじゅう（くりあがり）！\n金緑石（アレキサンドライト）ゲット！"
};

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
