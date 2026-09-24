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
  function noBorrow(p) { return p && p.a < 10 && p.a >= p.b; }
  function closeStatic() {
    if (box.dataset.type === 'sakura' && window.HunterSakuraLesson) HunterSakuraLesson.stop();
    box.hidden = true;
  }
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
    closeStatic();
    clearHunterHintTimers();
    document.getElementById('hint-box').style.display = 'none';
    document.getElementById('hint-soroban-box').style.display = 'none';
    hintVisible = false;
    box.hidden = wasOpen;
    if (wasOpen) return;
    box.dataset.type = type;
    if (type === 'dots') renderDots(); else HunterSakuraLesson.mount(box, hintP);
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
