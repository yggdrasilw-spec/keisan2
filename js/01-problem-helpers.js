// 01-problem-helpers.js
// ======================================================
// 問題生成の共通ヘルパー（引き算版）
// ======================================================
function buildKP_for_no(n) {
  var p = [];
  for (var a = n; a <= 9; a++) {
    if (a >= n) p.push({ a: a, b: n, ans: a - n });
  }
  return p;
}

function buildKP_for_carry(n) {
  var p = [];
  for (var a = 11; a <= 18; a++) {
    if ((a % 10) < n) p.push({ a: a, b: n, ans: a - n });
  }
  return p;
}

function buildKTopNo(a) {
  var p = [];
  for (var b = 1; b <= a; b++) {
    p.push({ a: a, b: b, ans: a - b });
  }
  return p;
}

function buildKTopCarry(a) {
  var p = [];
  if (a < 11 || a > 18) return p;
  var onesA = a % 10;
  for (var b = 1; b <= 9; b++) {
    if (onesA < b) p.push({ a: a, b: b, ans: a - b });
  }
  return p;
}
