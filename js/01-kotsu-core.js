// 01-kotsu-core.js
// ======================================================
// コツ（kotsu）共通
// ======================================================
function kModeLabel(mode) { return mode === 'no' ? 'ひきかた きほん' : 'くりさがり あり'; }
function kModeDesc(mode)  { return mode === 'no' ? '１〜９の ひきかたを ひとつずつ れんしゅうできるよ' : '10を またぐ ひきかたを れんしゅうできるよ'; }
function kAxisLabel(axis)  { return axis === 'top' ? 'ひかれる数ごと' : 'ひく数ごと'; }
function kAxisDesc(axis, mode) {
  return axis === 'top'
    ? (mode === 'no' ? 'ひかれる数ごとの れんしゅう。' : 'ひかれる数ごとの れんしゅう。')
    : 'ひく数ごとの れんしゅう。';
}

function setKotsuAxis(axis) {
  kSt.axis = axis === 'top' ? 'top' : 'bottom';
  syncLegacyStateAliases();
  var topBtn = document.getElementById('kaxis-top');
  var botBtn = document.getElementById('kaxis-bottom');
  if (topBtn) topBtn.className = 'fb ' + (kSt.axis === 'top' ? 'fb-a on' : 'fb-a');
  if (botBtn) botBtn.className = 'fb ' + (kSt.axis === 'bottom' ? 'fb-w on' : 'fb-w');
  renNumGrid();
}

function goKotsuFromCourse() {
  kSt.mode = (curLevel === 'hard') ? 'carry' : 'no';
  kSt.axis = 'bottom';
  syncLegacyStateAliases();
  renNumGrid();
  show('kotsu-home');
}

function kBuildP() {
  if (kSt.axis === 'top') {
    return kSt.mode === 'no' ? buildKTopNo(kSt.num) : buildKTopCarry(kSt.num);
  }
  return kSt.mode === 'no' ? buildKP_for_no(kSt.num) : buildKP_for_carry(kSt.num);
}

function kFiltP() {
  var ps = kBuildP(), out = [];
  for (var i = 0; i < ps.length; i++) {
    if (kSt.filt === 'weak') {
      var st = getSt(kD[kk(kSt.num, ps[i])]);
      if (st === 'weak' || st === 'unseen') out.push(ps[i]);
    } else {
      out.push(ps[i]);
    }
  }
  return out;
}

function updKQI() {
  var n = kFiltP().length;
  var el = document.getElementById('kqi');
  if (el) el.textContent = n ? n + 'もん あります' : 'がいとうするもんだいがありません';
}

function kSelFilt(f) {
  kSt.filt = f;
  syncLegacyStateAliases();
  document.getElementById('kfa').classList.toggle('on', f === 'all');
  document.getElementById('kfw').classList.toggle('on', f === 'weak');
  updKQI();
}
