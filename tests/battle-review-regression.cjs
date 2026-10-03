const {chromium}=require('playwright'),assert=require('node:assert/strict');
(async()=>{const browser=await chromium.launch({headless:true,channel:'msedge'});try{
 const page=await browser.newPage({viewport:{width:1280,height:720}}),errors=[];page.on('pageerror',e=>errors.push(e.message));await page.route('https://**/*',r=>r.abort());
 await page.goto(`http://127.0.0.1:${process.env.QA_PORT||8874}/hikizan_hunter.html`);
 await page.evaluate(()=>{document.getElementById('start-screen').remove();voiceOn=false;sfxOn=false;getFx=()=>false;learningPrefs.recite='off';});
 assert(await page.locator('#miss-explanation-on').isChecked());
 async function begin(p={a:13,b:8,ans:5},count=2){await page.evaluate(({p,count})=>{show('home');gSt.mode='no';startSession(Array.from({length:count},()=>({...p})),count);},{p,count});await page.waitForFunction(()=>HunterBattle.snapshot().visible);}
 await begin();await page.evaluate(()=>chk(-1,null,sess.queue[0]));
 assert.equal(await page.evaluate(()=>HunterBattle.snapshot().action),'hurt');await page.waitForTimeout(600);assert.equal(await page.evaluate(()=>sess.idx),0);assert(await page.locator('#hint-static-box').isHidden());
 await page.locator('#miss-review-next').waitFor();assert(await page.locator('#miss-review-next').isDisabled());assert.equal(await page.evaluate(()=>HunterBattle.snapshot().visible),false);
 await page.waitForFunction(()=>document.querySelector('.hunter-sakura-progress')?.textContent==='4 / 4');assert(await page.locator('#miss-review-next').isDisabled());
 await page.waitForFunction(()=>!document.getElementById('miss-review-next').disabled);assert.equal(await page.evaluate(()=>sess.idx),0);assert.equal(await page.evaluate(()=>sess.results.length),1);
 assert(await page.locator('[data-cue="sum-answer"]').evaluate(e=>e.classList.contains('shown')));await page.screenshot({path:'tests/battle-miss-explanation.png'});
 await page.locator('#miss-review-next').click();await page.waitForFunction(()=>sess.idx===1);assert(await page.locator('#hint-static-box').isHidden());
 console.log('PASS: miss damage visible first, all narrated diagram stages finish, final answer held until learner continues');
 await begin({a:5,b:5,ans:0});await page.evaluate(()=>chk(-1,null,sess.queue[0]));await page.locator('#miss-review-next').waitFor();assert.match(await page.locator('#hint-static-box').innerText(),/5 − 5 ＝ 0/);await page.waitForFunction(()=>!document.getElementById('miss-review-next').disabled);await page.evaluate(()=>show('home'));await page.waitForTimeout(1600);assert(await page.locator('#home').isVisible());assert.equal(await page.evaluate(()=>HunterAnswerReview.active()),false);
 await page.evaluate(()=>show('settings'));await page.locator('#miss-explanation-on').uncheck();assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem('hikizan_learning_v1')).missExplanation),false);
 await begin();await page.evaluate(()=>chk(-1,null,sess.queue[0]));await page.waitForFunction(()=>sess.idx===1);assert.equal(await page.locator('#miss-review-next').count(),0);
 await page.evaluate(()=>{show('home');hunterPresetTimeLimit=5;gSt.mode='no';startSession([{a:13,b:8,ans:5}],1);});
 assert.match(await page.locator('#ptimer').innerText(),/0\.\d びょう/);await page.evaluate(()=>{sess.startTime=Date.now()-1000;});await page.waitForTimeout(150);assert.match(await page.locator('#ptimer').innerText(),/1\.\d びょう/);assert.match(await page.locator('#ptimer').evaluate(e=>getComputedStyle(e).fontVariantNumeric),/tabular-nums/);
 await page.evaluate(()=>{hunterPresetTimeLimit=0;sess.startTime=Date.now();chk(5,null,sess.queue[0]);});await page.waitForTimeout(650);assert.equal(await page.evaluate(()=>sess.idx),0);assert.equal(await page.evaluate(()=>HunterBattle.snapshot().action),'slash');
 await page.waitForFunction(()=>HunterBattle.snapshot()?.finishing);await page.waitForTimeout(1700);assert(await page.locator('#practice').isVisible());await page.waitForFunction(()=>document.getElementById('result').classList.contains('on'));
 await page.evaluate(()=>{show('home');learningPrefs.missExplanation=true;ACH_BADGE_DEFS.forEach(d=>badgeData[d.key]={date:'test'});gSt.mode='ten';startHunterChallenge('shinsoku');chk(-1,null,sess.queue[0]);});
 await page.locator('#miss-review-next').waitFor();assert(await page.locator('#practice').isVisible());assert.equal(await page.evaluate(()=>sess.results.length),1);
 await page.waitForFunction(()=>!document.getElementById('miss-review-next').disabled);await page.locator('#miss-review-next').click();await page.waitForFunction(()=>document.getElementById('result').classList.contains('on'));assert.match(await page.locator('#rs2').innerText(),/こたえは/);
 assert.deepEqual(errors,[]);console.log('PASS: zero explanation, navigation cancellation, saved ON/OFF, fixed decimal timer, normal attack and clear stay visible, challenge miss explanation before retreat');
 }finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
