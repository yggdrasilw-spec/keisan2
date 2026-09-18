// Bridge the Ninja learning modules to the original Hunter session loop.
function storageLoadJSON(key, fallback) {
  try { var raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : fallback; } catch (e) { return fallback; }
}
function storageSaveJSON(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) {} }
function storageLoadText(key, fallback) { try { var value = localStorage.getItem(key); return value === null ? fallback : value; } catch (e) { return fallback; } }
function storageSaveText(key, value) { try { localStorage.setItem(key, String(value)); } catch (e) {} }
var nextQuestionTimer = null;
var hunterHintTimers = [];
function clearHunterHintTimers() { hunterHintTimers.forEach(clearTimeout); hunterHintTimers=[]; }
function hunterHintLater(callback, delay) {
  var session=sess, problem=hintP;
  var id=setTimeout(function(){hunterHintTimers=hunterHintTimers.filter(function(t){return t!==id;});if(sess===session && hintP===problem && hintVisible && !sess._sessionEnding)callback();},delay);
  hunterHintTimers.push(id);return id;
}
function hunterClearWritingLater(delay) {
  var session=sess, index=sess.idx, serial=hwQuestionSerial;
  setTimeout(function(){if(sess===session && sess.idx===index && hwQuestionSerial===serial && !sess._answerSubmitted && !recitationActive())hwClear();},delay);
}
function clearNextQuestionTimer() { clearTimeout(nextQuestionTimer); nextQuestionTimer = null; }
function setQuitBarVisible(visible) { document.getElementById('quit-bar').classList.toggle('show', visible); }
function queueNextQuestion(delay) {
  clearNextQuestionTimer();
  var session = sess, index = sess.idx;
  nextQuestionTimer = setTimeout(function() {
    nextQuestionTimer = null;
    if (sess !== session || sess.idx !== index || sess._sessionEnding || recitationActive() || !document.getElementById('practice').classList.contains('on')) return;
    sess.idx++; showP();
  }, delay);
}
function refreshVisibleScreen() {
  updDots(); updQI(); updKotsuBanner();
  if (document.getElementById('records').classList.contains('on')) renR();
  if (document.getElementById('stats').classList.contains('on')) renSt();
  if (document.getElementById('achievements').classList.contains('on')) renderAchievements();
}
document.addEventListener('DOMContentLoaded', function() {
  var section = document.createElement('details'); section.className = 'learning-settings';
  var summary = document.createElement('summary'); summary.textContent = '先生・保護者向け：マスター判定の設定';
  section.appendChild(summary); renderMasterControl(section);
  document.getElementById('settings').appendChild(section);
});
