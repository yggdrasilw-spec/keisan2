// Presentation only: retain the existing learning modes, records and reward keys.
(function () {
  var originalSelMode = selMode;
  selMode = function (mode) {
    originalSelMode(mode);
    syncCourse();
  };
  function syncCourse() {
    var modes = ['no', 'ten', 'borrow'];
    var labels = ['くりさがり なし', '10から ひく', 'くりさがり あり'];
    ['cn', 'ct', 'cc'].forEach(function (id, i) {
      document.getElementById(id).setAttribute('aria-pressed', String(gSt.mode === modes[i]));
    });
    document.getElementById('hunter-selected-course').textContent = labels[modes.indexOf(gSt.mode)];
  }
  document.addEventListener('DOMContentLoaded', function () {
    syncCourse();
    // Raid connection is optional; keep the main course selection in view.
    var raid = document.getElementById('raid-code').closest('.learning-settings');
    var details = document.createElement('details');
    details.className = 'hunter-raid-details';
    var summary = document.createElement('summary');
    summary.textContent = '⚔ みんなで ちょうせん ｜ レイドボス';
    raid.before(details);
    details.appendChild(summary);
    details.appendChild(raid);
    if (new URLSearchParams(location.search).get('code')) details.open = true;
    var stars = document.querySelector('#home .hunter-stars');
    var shopLink = document.createElement('div');
    shopLink.className = 'hunter-shop-link';
    shopLink.innerHTML = '<span>冒険のどうぐ屋<small>100この おたからを あつめよう</small></span>';
    stars.before(shopLink);
    shopLink.appendChild(stars);
    stars.setAttribute('aria-label', 'ためた星を確認して、かいものへ');
  });
  document.addEventListener('keydown', function (ev) {
    if (ev.key === 'Escape') {
      var overlay = document.querySelector('.ninja-levelup-overlay.is-open');
      if (overlay) overlay.click();
    }
  });
})();
