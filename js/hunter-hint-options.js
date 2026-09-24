// Optional teaching hints for the subtraction practice screen.
(function () {
  'use strict';
  var key = 'hikizan_hunter_hint_options';
  var defaults = { dots:true, steps:true, soroban:true, sakura:true };
  var enabled = Object.assign({}, defaults);
  try {
    var saved = JSON.parse(localStorage.getItem(key));
    if (saved && typeof saved === 'object') Object.keys(defaults).forEach(function (name) {
      if (typeof saved[name] === 'boolean') enabled[name] = saved[name];
    });
  } catch (e) { /* Use defaults. */ }

  var area = document.getElementById('hint-area');
  var box = document.getElementById('hint-static-box');
  var dotsButton = document.getElementById('hint-btn-dots');
  var sakuraButton = document.getElementById('hint-btn-sakura');
  var stepsButton = document.getElementById('hint-btn1');
  var sorobanButton = document.getElementById('hint-btn2');
  var originalSetProblem = hintSetProblem;
  var method = 'sakura';

  function noBorrow(p) { return p && p.a < 10 && p.a >= p.b; }
  function closeStatic() { box.hidden = true; }
  function sync() {
    var p = hintP;
    var simple = noBorrow(p);
    dotsButton.hidden = !p || !simple || !enabled.dots;
    stepsButton.hidden = !p || simple || !enabled.steps;
    sorobanButton.hidden = !p || simple || !enabled.soroban;
    sakuraButton.hidden = !p || simple || !enabled.sakura;
    area.style.display = p && (simple ? enabled.dots : enabled.steps || enabled.soroban || enabled.sakura) ? 'block' : 'none';
  }
  function openStatic(type) {
    if (!hintP || (type === 'dots' ? !noBorrow(hintP) || !enabled.dots : noBorrow(hintP) || !enabled.sakura)) return;
    var wasOpen = !box.hidden && box.dataset.type === type;
    clearHunterHintTimers();
    document.getElementById('hint-box').style.display = 'none';
    document.getElementById('hint-soroban-box').style.display = 'none';
    hintVisible = false;
    box.hidden = wasOpen;
    if (wasOpen) return;
    box.dataset.type = type;
    if (type === 'dots') renderDots(); else renderMethod();
  }
  function renderDots() {
    var p = hintP;
    var grid = '';
    // All dots stay in place. Red identifies the number being taken away.
    for (var i = 0; i < 10; i++) grid += '<span class="hunter-dot' + (i >= p.a ? ' empty' : i >= p.a - p.b ? ' subtracted' : '') + '"></span>';
    box.innerHTML = '<div class="hunter-static-title"><span class="minuend">' + p.a + '</span> － <span class="subtrahend">' + p.b + '</span> ＝ ？</div>' +
      '<div class="hunter-dot-legend"><span>● ひかれる数 ' + p.a + '</span><span>● ひく数 ' + p.b + '</span></div>' +
      '<div class="hunter-dot-grid" role="img" aria-label="ひかれる数' + p.a + 'このうち、ひく数' + p.b + 'こを赤くした、5こずつ2だんのドット">' + grid + '</div>' +
      '<div class="hunter-static-caption">あおい ドットが いくつ のこるか かぞえてみよう。</div>';
  }
  function tree(top, left, right, banana) {
    return '<svg class="hunter-tree" viewBox="0 0 340 145" role="img" aria-label="' + top + 'を' + left + 'と' + right + 'にわける">' +
      '<text x="170" y="31" font-size="30">' + top + '</text><path class="branch" d="M170 42 L105 91 M170 42 L235 91"/>' +
      '<circle class="' + (banana ? 'ten' : 'fruit') + '" cx="105" cy="109" r="31"/><circle class="fruit" cx="235" cy="109" r="31"/>' +
      '<text x="105" y="119" font-size="27">' + left + '</text><text x="235" y="119" font-size="27">' + right + '</text></svg>';
  }
  function renderMethod() {
    var p = hintP, ones = p.a - 10, need = p.b - ones;
    var cherry = method === 'sakura';
    var diagram = cherry ? tree(p.b, ones, need, false) : tree(p.a, 10, ones, true);
    var expression = cherry ?
      p.a + ' － ' + ones + ' ＝ 10<br>10 － ' + need + ' ＝ ' + p.ans :
      '10 － ' + p.b + ' ＝ ' + (10 - p.b) + '<br>' + (10 - p.b) + ' ＋ ' + ones + ' ＝ ' + p.ans;
    box.innerHTML = '<div class="hunter-static-title"><span class="minuend">' + p.a + '</span> － <span class="subtrahend">' + p.b + '</span> ＝ ？</div>' +
      '<div class="hunter-methods"><button type="button" data-method="sakura" aria-pressed="' + cherry + '">さくらんぼ</button>' +
      '<button type="button" data-method="banana" aria-pressed="' + !cherry + '">バナナ計算</button></div>' + diagram +
      '<div class="hunter-static-caption">' + (cherry ? p.b + 'を ' + ones + 'と ' + need + 'に わけるよ。' : p.a + 'を 10と ' + ones + 'に わけるよ。') + '</div>' +
      '<div class="hunter-formula">' + expression + '</div>';
    box.querySelectorAll('[data-method]').forEach(function (button) {
      button.addEventListener('click', function () { method = button.dataset.method; renderMethod(); });
    });
  }
  dotsButton.addEventListener('click', function () { openStatic('dots'); });
  sakuraButton.addEventListener('click', function () { openStatic('sakura'); });
  stepsButton.addEventListener('click', closeStatic, true);
  sorobanButton.addEventListener('click', closeStatic, true);
  hintSetProblem = function (p) { closeStatic(); originalSetProblem(p); sync(); };
  document.querySelectorAll('[data-hunter-hint]').forEach(function (input) {
    input.checked = enabled[input.dataset.hunterHint];
    input.addEventListener('change', function () {
      enabled[input.dataset.hunterHint] = input.checked;
      try { localStorage.setItem(key, JSON.stringify(enabled)); } catch (e) { /* Keep this session's choice. */ }
      if (hintP) hintSetProblem(hintP);
      else sync();
    });
  });
  sync();
})();
