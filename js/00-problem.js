// 00-problem.js
// ======================================================
// 問題生成 / キー生成 / シャッフル（引き算版）
// ======================================================
function buildP(m) {
  var p = [];
  if (m === 'no') {
    for (var a = 1; a <= 9; a++) {
      for (var b = 1; b <= 9; b++) {
        if (a >= b) p.push({ a: a, b: b, ans: a - b });
      }
    }
  } else {
    for (var a = 11; a <= 18; a++) {
      for (var b = 1; b <= 9; b++) {
        if ((a % 10) < b) p.push({ a: a, b: b, ans: a - b });
      }
    }
  }
  return p;
}

function buildKP(mode, n) {
  return mode === 'no' ? buildKP_for_no(n) : buildKP_for_carry(n);
}

function gk(m,p)  { return m+':'+p.a+'-'+p.b; }
function kk(n,p)  { return (kSt.mode === 'no' ? 'n' : 'k') + n + ':' + p.a + '-' + p.b; }

function sh(a) {
  for (var i=a.length-1;i>0;i--) { var j=0|Math.random()*(i+1),t=a[i];a[i]=a[j];a[j]=t; }
  return a;
}

// mixモード用: easy + hard 全問
function buildPMix() {
  return buildP('no').concat(buildP('carry'));
}

// レベルに対応するbuildP
function buildPLevel(level) {
  if (level === 'easy')  return buildP('no');
  if (level === 'hard')  return buildP('carry');
  if (level === 'mix')   return buildPMix();
  return buildP('no');
}

// gkキー（レベル付き）
function gkLevel(level, p) {
  var m = (p.a <= 9) ? 'no' : 'carry';
  return m + ':' + p.a + '-' + p.b;
}
