// 01-problem-helpers.js
// ======================================================
// 問題生成の共通ヘルパー（引き算版）
// ======================================================
function buildKP_for_no(n) {
  return buildKPRange(n, 1, 9, 0, 9);
}
function buildKP_for_carry(n) {
  return buildKPRange(n, 11, 18, 2, 18);
}
