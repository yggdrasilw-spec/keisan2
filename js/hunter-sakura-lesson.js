// Picture based subtraction: the two decompositions follow the addition ninja's
// narrated, automatically advancing hint flow.
window.HunterSakuraLesson = (function () {
  'use strict';
  var host = null, problem = null, method = 'genka';
  var generation = 0, timer = 0, speaking = false;

  function stop() {
    generation++;
    clearTimeout(timer);
    if (speaking && window.speechSynthesis) window.speechSynthesis.cancel();
    speaking = false;
  }
  function top(p) {
    return '<text class="top" x="198" y="145">' + p.a + '</text>' +
      '<text class="top" x="385" y="145">－</text>' +
      '<text class="top" x="525" y="145">' + p.b + '</text>' +
      '<text class="top" x="670" y="145">＝</text>';
  }
  function genkaSvg(p) {
    var ones = p.a - 10, rest = 10 - p.b;
    return '<svg class="hunter-sakura-svg" viewBox="0 0 920 560" role="img" aria-label="' + p.a + 'を10と' + ones + 'に分けて、10から' + p.b + 'を引き、残りを足す図">' + top(p) +
      '<g class="lesson-stage stage-1"><path class="branch draw" pathLength="1" d="M198 165 L132 267 M198 165 L274 267"/>' +
      '<circle class="fruit" cx="130" cy="315" r="49"/><circle class="fruit" cx="275" cy="315" r="49"/>' +
      '<text class="child" x="130" y="334">10</text><text class="child" x="275" y="334">' + ones + '</text></g>' +
      '<g class="lesson-stage stage-2"><path class="red-arrow draw" pathLength="1" d="M155 412 Q365 430 510 170"/>' +
      '<path class="red-head" d="M497 183 L516 155 L519 187 Z"/>' +
      '<text class="small-formula" x="35" y="475">10－' + p.b + '＝' + rest + '</text>' +
      '<path class="purple-arrow draw" pathLength="1" d="M390 465 L280 355"/>' +
      '<path class="purple-head" d="M276 351 L291 362 L281 367 Z"/>' +
      '<text class="bottom" x="85" y="535">' + rest + '</text><text class="bottom" x="235" y="535">＋</text>' +
      '<text class="bottom" x="385" y="535">' + ones + '</text><text class="bottom" x="535" y="535">＝</text>' +
      '<text class="bottom answer" x="685" y="535">' + p.ans + '</text></g></svg>';
  }
  function gengenSvg(p) {
    var ones = p.a - 10, rest = p.b - ones;
    return '<svg class="hunter-sakura-svg" viewBox="0 0 920 560" role="img" aria-label="' + p.b + 'を' + ones + 'と' + rest + 'に分けて、2回で引く図">' + top(p) +
      '<g class="lesson-stage stage-1"><path class="branch draw" pathLength="1" d="M528 165 L455 267 M528 165 L600 267"/>' +
      '<circle class="fruit" cx="455" cy="315" r="49"/><circle class="fruit" cx="600" cy="315" r="49"/>' +
      '<text class="child" x="455" y="334">' + ones + '</text><text class="child" x="600" y="334">' + rest + '</text></g>' +
      '<g class="lesson-stage stage-2"><ellipse class="banana draw" pathLength="1" cx="290" cy="198" rx="295" ry="102" transform="rotate(29 290 198)"/>' +
      '<path class="red-arrow draw" pathLength="1" d="M155 425 Q205 340 237 289"/>' +
      '<path class="red-head" d="M225 294 L242 278 L240 302 Z"/>' +
      '<rect class="ten-box" x="40" y="420" width="240" height="110"/>' +
      '<text class="bottom" x="83" y="505">10</text></g>' +
      '<g class="lesson-stage stage-3"><path class="purple-arrow draw" pathLength="1" d="M445 420 L570 350"/>' +
      '<path class="purple-head" d="M564 352 L583 342 L573 363 Z"/>' +
      '<text class="bottom" x="310" y="505">－</text><text class="bottom" x="445" y="505">' + rest + '</text>' +
      '<text class="bottom" x="565" y="505">＝</text><text class="bottom answer" x="700" y="505">' + p.ans + '</text></g></svg>';
  }
  function directSvg(p) {
    return '<svg class="hunter-sakura-svg" viewBox="0 0 920 360" role="img" aria-label="10から' + p.b + 'を引く図">' + top(p) +
      '<g class="lesson-stage stage-1"><rect class="ten-box" x="72" y="195" width="250" height="120"/>' +
      '<text class="bottom" x="135" y="282">10</text><text class="bottom" x="360" y="282">－</text>' +
      '<text class="bottom" x="495" y="282">' + p.b + '</text><text class="bottom" x="630" y="282">＝</text>' +
      '<text class="bottom answer" x="745" y="282">' + p.ans + '</text></g></svg>';
  }
  function lines(p) {
    if (p.a === 10) return ['10からひくよ。', '10から' + p.b + 'を引いて、こたえは' + p.ans + '。'];
    var ones = p.a - 10, rest = p.b - ones;
    if (method === 'genka') return [
      '10からひいて、たすよ。',
      p.a + 'を10と' + ones + 'に分けるよ。（さくらんぼ）',
      '10から' + p.b + 'を引いて、のこりの' + (10 - p.b) + 'と' + ones + 'を足すよ。'
    ];
    return [
      '2回に分けて、引くよ。',
      'まず、' + ones + 'をひくので、' + p.b + 'を' + ones + 'と' + rest + 'に分けます（さくらんぼ）',
      p.a + '－' + ones + '＝10ができる（バナナ）',
      'こんどは、' + rest + 'をひくよ。10－' + rest + '＝' + p.ans
    ];
  }
  function spokenLine(line) {
    return line.replace(/－/g, 'ひく').replace(/＝/g, 'は').replace(/（/g, '。').replace(/）/g, '。');
  }
  function playStage(stage, token) {
    if (token !== generation || !host || host.hidden) return;
    var steps = lines(problem), board = host.querySelector('.hunter-sakura-svg');
    var group = board.querySelector('.stage-' + stage);
    if (group) group.classList.add('shown');
    host.querySelector('.hunter-sakura-message').textContent = steps[stage];
    if (stage === steps.length - 1) {
      var replay = host.querySelector('.hunter-sakura-replay');
      replay.disabled = false;
      replay.textContent = '↺ もういちど';
      board.setAttribute('aria-busy', 'false');
    }
    var advanced = false;
    function advance() {
      if (advanced || token !== generation) return;
      advanced = true;
      clearTimeout(timer);
      speaking = false;
      if (stage < steps.length - 1) timer = setTimeout(function () { playStage(stage + 1, token); }, 400);
    }
    if (!voiceOn || !window.speechSynthesis) {
      if (stage < steps.length - 1) timer = setTimeout(advance, 1800);
      return;
    }
    var utterance = new SpeechSynthesisUtterance(spokenLine(steps[stage]));
    utterance.lang = 'ja-JP';
    utterance.rate = voiceCfg.rate;
    utterance.pitch = voiceCfg.pitch;
    if (typeof getSelectedVoice === 'function') {
      var voice = getSelectedVoice();
      if (voice) utterance.voice = voice;
    }
    utterance.onend = advance;
    utterance.onerror = advance;
    speaking = true;
    timer = setTimeout(advance, 8000);
    window.speechSynthesis.speak(utterance);
  }
  function start() {
    stop();
    var token = generation;
    var board = host.querySelector('.hunter-sakura-svg');
    board.querySelectorAll('.lesson-stage').forEach(function (group) { group.classList.remove('shown'); });
    board.setAttribute('aria-busy', 'true');
    var replay = host.querySelector('.hunter-sakura-replay');
    replay.disabled = true;
    replay.textContent = 'うごきを みよう';
    playStage(0, token);
  }
  function render() {
    var p = problem, direct = p.a === 10;
    host.innerHTML = '<div class="hunter-sakura-methods"' + (direct ? ' hidden' : '') + '>' +
      '<button type="button" data-method="genka" aria-label="10からひいて、たす（減加法）" aria-pressed="' + (method === 'genka') + '">減加法（10から）</button>' +
      '<button type="button" data-method="gengen" aria-label="2回に分けて、ひく（減減法）" aria-pressed="' + (method === 'gengen') + '">減減法（2回ひく）</button></div>' +
      (direct ? directSvg(p) : method === 'genka' ? genkaSvg(p) : gengenSvg(p)) +
      '<div class="hunter-sakura-message" role="status" aria-live="polite"></div>' +
      '<button type="button" class="hunter-sakura-replay" disabled>うごきを みよう</button>';
    host.querySelectorAll('[data-method]').forEach(function (button) {
      button.addEventListener('click', function () {
        if (method === button.dataset.method) return;
        method = button.dataset.method;
        stop(); render(); start();
      });
    });
    host.querySelector('.hunter-sakura-replay').addEventListener('click', start);
    start();
  }
  function mount(container, p) {
    stop(); host = container; problem = p; method = 'genka'; render();
  }
  var practice = document.getElementById('practice');
  if (practice && window.MutationObserver) {
    new MutationObserver(function () {
      if (!practice.classList.contains('on')) stop();
    }).observe(practice, { attributes:true, attributeFilter:['class'] });
  }
  return { mount:mount, stop:stop };
})();
