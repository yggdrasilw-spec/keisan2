// Picture based subtraction: the two decompositions follow the addition ninja's
// narrated, automatically advancing hint flow.
window.HunterSakuraLesson = (function () {
  'use strict';
  var host = null, problem = null, method = 'genka';
  var generation = 0, timers = [], speaking = false;

  function later(fn, delay) { timers.push(setTimeout(fn, delay)); }

  function stop() {
    generation++;
    timers.forEach(clearTimeout);
    timers = [];
    if (speaking && window.speechSynthesis) window.speechSynthesis.cancel();
    speaking = false;
  }
  function top(p) {
    return '<text class="top minuend" x="198" y="145">' + p.a + '</text>' +
      '<text class="top" x="385" y="145">－</text>' +
      '<text class="top subtrahend" x="525" y="145">' + p.b + '</text>' +
      '<text class="top" x="670" y="145">＝</text>';
  }
  function genkaSvg(p) {
    var ones = p.a - 10, rest = 10 - p.b;
    return '<svg class="hunter-sakura-svg" viewBox="0 0 920 560" role="img" aria-label="' + p.a + 'を10と' + ones + 'に分けて、10から' + p.b + 'を引き、残りを足す図">' + top(p) +
      '<g class="lesson-cue" data-cue="split-branch"><path class="branch draw" pathLength="1" d="M198 165 L132 267 M198 165 L274 267"/></g>' +
      '<g class="lesson-cue" data-cue="split-circles"><circle class="fruit from-minuend" cx="130" cy="315" r="49"/><circle class="fruit from-minuend" cx="275" cy="315" r="49"/></g>' +
      '<g class="lesson-cue" data-cue="split-values"><text class="child minuend-value" x="130" y="334">10</text><text class="child minuend-value" x="275" y="334">' + ones + '</text></g>' +
      '<g class="lesson-cue" data-cue="ten-focus"><circle class="focus-ring" cx="130" cy="315" r="59"/></g>' +
      '<g class="lesson-cue" data-cue="subtract-arrow"><path class="red-arrow draw" pathLength="1" d="M155 412 Q365 430 510 170"/><path class="red-head" d="M497 183 L516 155 L519 187 Z"/></g>' +
      '<g class="lesson-cue" data-cue="subtract-fact"><text class="small-formula" x="35" y="475">10－' + p.b + '＝' + rest + '</text></g>' +
      '<g class="lesson-cue" data-cue="combine-arrow"><path class="purple-arrow draw" pathLength="1" d="M390 465 L280 355"/><path class="purple-head" d="M276 351 L291 362 L281 367 Z"/></g>' +
      '<g class="lesson-cue" data-cue="sum-first"><text class="bottom" x="85" y="535">' + rest + '</text></g>' +
      '<g class="lesson-cue" data-cue="sum-addend"><text class="bottom" x="235" y="535">＋</text><text class="bottom minuend-value" x="385" y="535">' + ones + '</text></g>' +
      '<g class="lesson-cue" data-cue="sum-answer"><text class="bottom" x="535" y="535">＝</text><text class="bottom answer" x="685" y="535">' + p.ans + '</text></g></svg>';
  }
  function gengenSvg(p) {
    var ones = p.a - 10, rest = p.b - ones;
    return '<svg class="hunter-sakura-svg" viewBox="0 0 920 560" role="img" aria-label="' + p.b + 'を' + ones + 'と' + rest + 'に分けて、2回で引く図">' +
      '<g class="lesson-cue" data-cue="banana-oval"><ellipse class="banana draw" pathLength="1" cx="290" cy="198" rx="295" ry="102" transform="rotate(29 290 198)"/></g>' + top(p) +
      '<g class="lesson-cue" data-cue="split-branch"><path class="branch draw" pathLength="1" d="M525 165 L455 267 M525 165 L600 267"/></g>' +
      '<g class="lesson-cue" data-cue="split-circles"><circle class="fruit from-subtrahend" cx="455" cy="315" r="49"/><circle class="fruit from-subtrahend" cx="600" cy="315" r="49"/></g>' +
      '<g class="lesson-cue" data-cue="split-values"><text class="child subtrahend-value" x="455" y="334">' + ones + '</text><text class="child subtrahend-value" x="600" y="334">' + rest + '</text></g>' +
      '<g class="lesson-cue" data-cue="banana-arrow"><path class="red-arrow draw" pathLength="1" d="M155 425 Q205 340 237 289"/><path class="red-head" d="M225 294 L242 278 L240 302 Z"/></g>' +
      '<g class="lesson-cue" data-cue="banana-fact"><text class="small-formula" x="610" y="405">' + p.a + '－' + ones + '＝10</text></g>' +
      '<g class="lesson-cue" data-cue="banana-box"><rect class="ten-box" x="40" y="420" width="240" height="110"/><text class="bottom" x="83" y="505">10</text></g>' +
      '<g class="lesson-cue" data-cue="subtract-more-arrow"><path class="purple-arrow draw" pathLength="1" d="M445 420 L570 350"/><path class="purple-head" d="M564 352 L583 342 L573 363 Z"/></g>' +
      '<g class="lesson-cue" data-cue="subtract-more-term"><text class="bottom" x="310" y="505">－</text><text class="bottom subtrahend-value" x="445" y="505">' + rest + '</text></g>' +
      '<g class="lesson-cue" data-cue="subtract-more-answer"><text class="bottom" x="565" y="505">＝</text><text class="bottom answer" x="700" y="505">' + p.ans + '</text></g></svg>';
  }
  function directSvg(p) {
    return '<svg class="hunter-sakura-svg" viewBox="0 0 920 360" role="img" aria-label="10から' + p.b + 'を引く図">' + top(p) +
      '<g class="lesson-cue" data-cue="direct-box"><rect class="ten-box" x="72" y="195" width="250" height="120"/>' +
      '<text class="bottom" x="135" y="282">10</text></g>' +
      '<g class="lesson-cue" data-cue="direct-answer"><text class="bottom" x="360" y="282">－</text>' +
      '<text class="bottom subtrahend-value" x="495" y="282">' + p.b + '</text><text class="bottom" x="630" y="282">＝</text>' +
      '<text class="bottom answer" x="745" y="282">' + p.ans + '</text></g></svg>';
  }
  function lessonSteps(p) {
    if (p.a === 10) return [
      {text:'10からひくよ。', cues:[], min:1300},
      {text:'10から' + p.b + 'を引いて、こたえは' + p.ans + '。', cues:[['direct-box',0],['direct-answer',850]], min:2100}
    ];
    var ones = p.a - 10, rest = p.b - ones;
    var split = [
      ['split-branch',100], ['split-circles',650], ['split-values',1100]
    ];
    if (method === 'genka') return [
      {text:'10からひいて、たすよ。', cues:[], min:1300},
      {text:p.a + 'を10と' + ones + 'に分けるよ。（さくらんぼ）', cues:split, min:2600},
      {text:'10から' + p.b + 'を引くと、' + (10 - p.b) + 'がのこるよ。', cues:[['ten-focus',0],['subtract-arrow',450],['subtract-fact',1250]], min:2700},
      {text:'のこりの' + (10 - p.b) + 'と' + ones + 'を足すよ。' + (10 - p.b) + 'たす' + ones + 'は' + p.ans + '。',
        cues:[['combine-arrow',0],['sum-first',450],['sum-addend',900],['sum-answer',1700]], min:3000}
    ];
    return [
      {text:'2回に分けて、引くよ。', cues:[], min:1300},
      {text:'まず、' + ones + 'をひくので、' + p.b + 'を' + ones + 'と' + rest + 'に分けます（さくらんぼ）', cues:split, min:2700},
      {text:p.a + '－' + ones + '＝10ができる（バナナ）',
        cues:[['banana-oval',0],['banana-arrow',550],['banana-fact',1100],['banana-box',1650]], min:2900},
      {text:'こんどは、' + rest + 'をひくよ。10－' + rest + '＝' + p.ans,
        cues:[['subtract-more-arrow',0],['subtract-more-term',650],['subtract-more-answer',1500]], min:2800}
    ];
  }
  function spokenLine(line) {
    return line.replace(/－/g, 'ひく').replace(/＝/g, 'は').replace(/（/g, '。').replace(/）/g, '。').replace(/。。/g, '。');
  }
  function playStage(stage, token) {
    if (token !== generation || !host || host.hidden) return;
    var steps = lessonSteps(problem), step = steps[stage], board = host.querySelector('.hunter-sakura-svg');
    host.querySelector('.hunter-sakura-message').textContent = step.text;
    host.querySelector('.hunter-sakura-progress').textContent = (stage + 1) + ' / ' + steps.length;
    step.cues.forEach(function (cue) {
      later(function () {
        if (token !== generation) return;
        var element = board.querySelector('[data-cue="' + cue[0] + '"]');
        if (element) element.classList.add('shown');
      }, cue[1]);
    });
    var visualReady = false, voiceReady = !voiceOn || !window.speechSynthesis, done = false;
    function advance() {
      if (done || !visualReady || !voiceReady || token !== generation) return;
      done = true;
      if (stage < steps.length - 1) {
        later(function () { playStage(stage + 1, token); }, 400);
      } else {
        var replay = host.querySelector('.hunter-sakura-replay');
        replay.disabled = false;
        replay.textContent = '↺ もういちど';
        board.setAttribute('aria-busy', 'false');
      }
    }
    later(function () { visualReady = true; advance(); }, step.min);
    if (voiceReady) return;
    var utterance = new SpeechSynthesisUtterance(spokenLine(step.text));
    utterance.lang = 'ja-JP';
    utterance.rate = voiceCfg.rate;
    utterance.pitch = voiceCfg.pitch;
    if (typeof getSelectedVoice === 'function') {
      var voice = getSelectedVoice();
      if (voice) utterance.voice = voice;
    }
    var audioTimeout;
    function voiceFinished() {
      if (voiceReady || token !== generation) return;
      clearTimeout(audioTimeout);
      speaking = false;
      voiceReady = true;
      advance();
    }
    utterance.onend = voiceFinished;
    utterance.onerror = voiceFinished;
    speaking = true;
    audioTimeout = setTimeout(function () {
      if (!voiceReady && token === generation) window.speechSynthesis.cancel();
      voiceFinished();
    }, 9000);
    timers.push(audioTimeout);
    try { window.speechSynthesis.speak(utterance); }
    catch (e) { voiceFinished(); }
  }
  function start() {
    stop();
    var token = generation;
    var board = host.querySelector('.hunter-sakura-svg');
    board.querySelectorAll('.lesson-cue').forEach(function (group) { group.classList.remove('shown'); });
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
      '<div class="hunter-sakura-progress" aria-label="ヒントの進み具合"></div>' +
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
