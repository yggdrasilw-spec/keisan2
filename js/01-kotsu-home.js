// 01-kotsu-home.js
// ======================================================
// コツ：ホーム・問題選択
// ======================================================
function renNumGrid() {
  var title = document.getElementById('kotsu-home-title');
  var desc  = document.getElementById('kotsu-home-desc');
  if (title) title.textContent = (kSt.mode === 'no' ? '🌿 ひきかた きほん コツをつかもう！' : '💥 くりさがり あり コツをつかもう！');
  if (desc)  desc.textContent  = kModeDesc(kSt.mode);

  var h = '';
  var start, end;
  if (kSt.axis === 'top') {
    if (kSt.mode === 'no') { start = 1; end = 9; }
    else { start = 11; end = 18; }
  } else {
    start = 1; end = 9;
  }

  for (var n = start; n <= end; n++) {
    var ps = kSt.axis === 'top'
      ? (kSt.mode === 'no' ? buildKTopNo(n) : buildKTopCarry(n))
      : (kSt.mode === 'no' ? buildKP_for_no(n) : buildKP_for_carry(n));
    var col = NUM_COLS[n] || { bd:'#E8D8B8', bg:'#fff', tc:'#3A2A00' }, dh = '';
    for (var i = 0; i < ps.length; i++) {
      var st = getSt(kD[kk(n, ps[i])]);
      dh += '<div class="ndot" style="background:' + ST_DOT[st] + '"></div>';
    }
    var lbl = kSt.axis === 'top' ? 'からひかれるもんだい' : 'をひくもんだい';
    h += '<div class="num-card" style="border-color:'+col.bd+';background:'+col.bg+'" data-action="showKotsuSub" data-value="'+n+'">'
      + '<div class="num-big" style="color:'+col.tc+'">'+n+'</div>'
      + '<div class="num-lbl">'+lbl+'</div>'
      + '<div class="num-dots">'+dh+'</div></div>';
  }
  document.getElementById('num-grid').innerHTML = h;

  var topBtn = document.getElementById('kaxis-top');
  var botBtn = document.getElementById('kaxis-bottom');
  if (topBtn) topBtn.className = 'fb ' + (kSt.axis === 'top' ? 'fb-a on' : 'fb-a');
  if (botBtn) botBtn.className = 'fb ' + (kSt.axis === 'bottom' ? 'fb-w on' : 'fb-w');
}

function showKotsuSub(n) {
  kSt.num = n;
  kSt.filt = 'all';
  syncLegacyStateAliases();
  document.getElementById('ksub-title').textContent = n + (kSt.axis === 'top' ? 'からひかれるもんだい' : 'をひくもんだい');
  var ps = kBuildP();
  document.getElementById('ksub-desc').textContent = (kSt.axis === 'top' ? 'ひかれる数ごとの れんしゅう。' : 'ひく数ごとの れんしゅう。') + ' ' + ps.length + 'もん。きろくは つけません。';
  document.getElementById('kfa').classList.add('on');
  document.getElementById('kfw').classList.remove('on');
  updKQI();
  show('kotsu-sub');
}
