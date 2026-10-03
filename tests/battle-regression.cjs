const {chromium}=require('playwright');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({headless:true,channel:'msedge'});
 try{
 const page=await browser.newPage({viewport:{width:1280,height:720}}),errors=[];
 page.on('pageerror',e=>errors.push(e.message));await page.route('https://**/*',r=>r.abort());
 await page.goto(`http://127.0.0.1:${process.env.QA_PORT||8874}/hikizan_hunter.html`);
 await page.evaluate(()=>{document.getElementById('start-screen').remove();sfxOn=false;voiceOn=false;getFx=()=>false;learningPrefs.missExplanation=false;});
 const snap=()=>page.evaluate(()=>HunterBattle.snapshot());
 async function start(count=20,course='no'){
  await page.evaluate(({count,course})=>{show('home');learningPrefs.recite='off';learningPrefs.battle='normal';gSt.mode=course;gSt.filt='all';startSession(Array.from({length:count},()=>({a:13,b:8,ans:5})),count);},{count,course});
  await page.waitForFunction(()=>HunterBattle.snapshot()?.visible);
 }
 const answer=ok=>page.evaluate(ok=>{const p=sess.queue[sess.idx];chk(ok?p.ans:-99,null,p);clearNextQuestionTimer();},ok);
 const next=()=>page.evaluate(()=>{sess.idx++;showP();});
 for(const [width,height]of [[960,540],[1280,720],[1366,768],[1920,1080]]){
  await page.setViewportSize({width,height});await start();
  for(const tab of ['random','calc','hw']){
   await page.evaluate(tab=>{setAnswerMode(tab);HunterBattle.sync();},tab);
   const geometry=await page.evaluate(()=>{
    const ids=['pcard',answerMode==='calc'?'calcgrid':answerMode==='hw'?'hw-area':'agrid'];
    const controls=ids.map(id=>document.getElementById(id).getBoundingClientRect().toJSON());
    const wings=[...document.querySelectorAll('.battle-wing')].map(el=>el.getBoundingClientRect().toJSON());
    const hit=controls.some(c=>wings.some(w=>c.left<w.right&&c.right>w.left&&c.top<w.bottom&&c.bottom>w.top));
    const on=controls.map(r=>({w:r.width,h:r.height}));learningPrefs.battle='off';HunterBattle.sync();
    const off=ids.map(id=>{const r=document.getElementById(id).getBoundingClientRect();return {w:r.width,h:r.height};});
    learningPrefs.battle='normal';HunterBattle.sync();return {hit,on,off,visible:HunterBattle.snapshot().visible};
   });
   assert(geometry.visible,`${width} ${tab}: ${JSON.stringify(geometry)}`);assert(!geometry.hit);
   geometry.on.forEach((r,i)=>{assert(Math.abs(r.w-geometry.off[i].w)<1);assert(Math.abs(r.h-geometry.off[i].h)<1);});
   for(const hint of ['hint-btn1','hint-btn2']){
    await page.locator('#'+hint).click();await page.waitForFunction(()=>!HunterBattle.snapshot().visible);
    await page.locator('#'+hint).click();await page.waitForTimeout(80);
    assert((await snap()).visible,`${width} ${tab} ${hint} reopen: ${JSON.stringify(await page.evaluate(()=>({s:HunterBattle.snapshot(),hint:hintVisible,static:document.getElementById('hint-static-box').hidden,pan:document.querySelector('.practice-answer-panel').getBoundingClientRect().toJSON(),hpan:document.querySelector('.practice-hint-panel').getBoundingClientRect().toJSON()})))}`);
   }
  }
  await page.evaluate(()=>setAnswerMode('random'));await page.screenshot({path:`tests/battle-${width}.png`});
 }
 console.log('PASS: 4 landscape sizes × 3 inputs × 2 hints, no overlap, unchanged learning dimensions');
 await page.setViewportSize({width:390,height:844});await page.waitForFunction(()=>!HunterBattle.snapshot().visible);
 await page.setViewportSize({width:1280,height:720});await start();await answer(true);
 assert.equal((await snap()).progress,1);assert.equal((await snap()).hp,95);
 await page.evaluate(()=>chk(5,null,sess.queue[0]));assert.equal((await snap()).progress,1);
 for(let i=1;i<5;i++){await next();await answer(true);}assert.equal((await snap()).action,'clone');
 await next();await answer(false);assert.equal((await snap()).streak,0);assert.equal((await snap()).progress,6);
 await next();await page.evaluate(()=>{setAnswerMode('hw');hwCheckAnswer(0);hwCheckAnswer(null);});assert.equal((await snap()).progress,6);
 await page.locator('#hint-btn1').click();await answer(true);await page.locator('#hint-btn1').click();await page.waitForTimeout(80);assert.equal((await snap()).action,'idle');
 console.log('PASS: accepted-answer deduplication, combos, miss reset, handwriting retry, hidden attacks discarded');
 for(const count of [1,7,20]){
  await start(count);for(let i=0;i<count;i++){if(i)await next();await answer(i%2===0);}
  await page.evaluate(()=>{sess.idx=sess.queue.length;showP();});assert.equal((await snap()).outcome,'win');assert((await snap()).finishing);
  await page.evaluate(()=>finish());assert((await snap()).finishing);
  await page.locator('#battle-skip').click();await page.waitForFunction(()=>document.getElementById('result').classList.contains('on'));
  assert.equal(await page.evaluate(()=>sess.results.length),count);
 }
 await start();await answer(true);await page.evaluate(()=>endSess());assert(await page.locator('#result').isVisible());
 await start(1);await answer(true);await page.evaluate(()=>{learningPrefs.battle='off';HunterBattle.sync();sess.idx=1;showP();});assert(await page.locator('#result').isVisible());
 await start(1);await answer(true);await page.evaluate(()=>{sess.idx=1;showP();show('home');});await page.waitForTimeout(1650);assert(await page.locator('#home').isVisible());
 await start(1);await answer(true);await page.evaluate(()=>{sess.idx=1;showP();});await page.waitForFunction(()=>document.getElementById('result').classList.contains('on'));
 console.log('PASS: variable question counts, imperfect completion, skip/watchdog, quit/off immediate, stale finish canceled');
 const roster=await page.evaluate(()=>Object.values(HunterBattleRoster.all).map(d=>({key:d.key,name:d.name,ref:d.reference})));
 assert.equal(roster.length,50);assert.equal(new Set(roster.map(r=>r.key)).size,50);
 for(const [course,key]of [['no','easy'],['borrow','hard'],['mix','mix'],['ten','ten']]){
  for(const scope of [20,'all']){
   await page.evaluate(({course,scope})=>{show('home');gSt.mode=course;startSession(buildP(course),scope);},{course,scope});
   assert.equal((await snap()).enemy[0],course==='ten'?'ten_all':key+'_'+(scope===20?'20':'all'));
  }
 }
 for(const d of await page.evaluate(()=>KOTSU_IMG_DEFS)){
  await page.evaluate(d=>{show('home');kSt.kind=d.kind;kSt.axis=d.axis;kSt.num=d.num;kStart();},d);
  assert.equal((await snap()).enemy[0],d.key);assert.equal((await snap()).enemy[1],roster.find(r=>r.key===d.key).name);
 }
 await page.evaluate(()=>{ACH_BADGE_DEFS.forEach(d=>badgeData[d.key]={date:'test'});['no','ten','borrow','mix'].forEach(c=>storageSaveText('hikizan_challenge_'+c+'_shinsoku_clear','1'));});
 for(const course of ['no','ten','borrow','mix'])for(const tier of ['shinsoku','super']){
  await page.evaluate(({course,tier})=>{show('home');gSt.mode=course;startHunterChallenge(tier);},{course,tier});assert.equal((await snap()).enemy[0],course+'_'+tier);
 }
 await page.evaluate(()=>{show('home');gSt.mode='no';startHunterChallenge('mugen');});await page.waitForFunction(()=>HunterBattle.snapshot().visible);
 for(let i=0;i<21;i++){if(i)await next();await answer(true);if(i===15)assert.equal((await snap()).enemy[0],'easy_all');}
 assert.equal((await snap()).kills,4);assert.equal((await snap()).hp,80);
 await next();await answer(false);assert.equal((await snap()).progress,21);assert.equal((await snap()).kills,4);assert.equal((await snap()).outcome,'retreat');
 await page.locator('#battle-skip').click();assert.match(await page.locator('#battle-result').innerText(),/4体/);
 const before=await page.evaluate(()=>JSON.stringify(gD));
 await page.evaluate(()=>{show('home');startHunterChallenge('shinsoku');sess.startTime=Date.now()-2500;});await page.waitForFunction(()=>document.getElementById('result').classList.contains('on'));assert.match(await page.locator('#rs2').innerText(),/時間ぎれ/);
 assert.equal(await page.evaluate(()=>JSON.stringify(gD)),before);
 console.log('PASS: 50 reward mappings, existing badge rematches, endless 5/20 cycle, timeout/terminal miss excludes unfinished enemy, challenge scores isolated');
 for(const [count,stage]of [[0,1],[8,2],[18,3],[28,4]]){
  await page.evaluate(count=>{show('home');badgeData={};const defs=ACH_BADGE_DEFS.concat(KOTSU_IMG_DEFS);defs.slice(0,count).forEach(d=>badgeData[d.axis?'kotsu_'+d.key:d.key]={date:'test'});gSt.mode='no';startSession([{a:13,b:8,ans:5}],1);},count);
  assert.equal((await snap()).stage,stage);await page.waitForFunction(()=>HunterBattle.snapshot().visible);
 }
 await page.evaluate(()=>{show('home');badgeData={};gD={};kD={};learningPrefs.battle='normal';gSt.mode='ten';startSession(buildP('ten'),'all');});
 await page.waitForFunction(()=>HunterBattle.snapshot().visible);
 for(let i=0;i<9;i++){if(i)await next();await page.evaluate(()=>{sess.startTime=Date.now()-100;});await answer(true);}
 await page.evaluate(()=>{sess.idx=sess.queue.length;showP();finish();});assert((await snap()).finishing);
 assert.equal(await page.evaluate(()=>!!badgeData.ten_all),false);await page.locator('#battle-skip').click();assert.equal(await page.evaluate(()=>!!badgeData.ten_all),true);
 const stars=await page.evaluate(()=>HunterHud.getStarCount());await page.evaluate(()=>finish());assert.equal(await page.evaluate(()=>HunterHud.getStarCount()),stars);
 await page.evaluate(()=>{show('home');badgeData={};gD={};kD={};gSt.mode='ten';startSession(buildP('ten'),'all');});await page.waitForFunction(()=>HunterBattle.snapshot().visible);
 for(let i=0;i<9;i++){if(i)await next();await answer(false);}await page.evaluate(()=>{sess.idx=sess.queue.length;showP();});assert.equal((await snap()).outcome,'win');await page.locator('#battle-skip').click();assert.equal(await page.evaluate(()=>!!badgeData.ten_all),false);
 console.log('PASS: four growth thresholds, conditional medals, result/reward runs once after animation');
 await start();await page.emulateMedia({reducedMotion:'reduce'});await page.waitForTimeout(80);
 const calm=await page.locator('.battle-wing-left canvas').evaluate(e=>e.toDataURL());await page.waitForTimeout(450);assert.equal(await page.locator('.battle-wing-left canvas').evaluate(e=>e.toDataURL()),calm);
 await page.evaluate(()=>show('settings'));await page.locator('#battle-mode').selectOption('quiet');
 assert.equal(await page.evaluate(()=>JSON.parse(hunterBackupPayload().values.hikizan_learning_v1).battle),'quiet');
 await page.reload();assert.equal(await page.evaluate(()=>learningPrefs.battle),'quiet');
 await page.evaluate(()=>{document.getElementById('start-screen').remove();sfxOn=false;voiceOn=false;getFx=()=>false;learningPrefs.missExplanation=false;HunterBattleArt.draw=()=>{throw Error('deliberate optional art failure');};});
 await page.evaluate(()=>{gSt.mode='no';startSession([{a:13,b:8,ans:5}],1);});await page.waitForTimeout(400);assert.equal((await snap()).visible,false);
 await answer(true);await page.evaluate(()=>{sess.idx=1;showP();});assert(await page.locator('#result').isVisible());assert.deepEqual(errors,[]);
 console.log('PASS: reduced motion, settings persist/backup, drawing failure preserves learning, zero page errors');
 const broken=await browser.newPage({viewport:{width:1280,height:720}});await broken.route('https://**/*',r=>r.abort());await broken.route('**/img/battle/*.png',r=>r.abort());
 await broken.goto(`http://127.0.0.1:${process.env.QA_PORT||8874}/hikizan_hunter.html`);await broken.evaluate(()=>{document.getElementById('start-screen').remove();sfxOn=false;voiceOn=false;getFx=()=>false;learningPrefs.missExplanation=false;startSession([{a:10,b:10,ans:0}],1);});
 await broken.waitForFunction(()=>Object.values(HunterBattleArt.status()).includes('failed'));
 assert.equal(await broken.evaluate(()=>HunterBattle.snapshot().visible),false);
 await broken.evaluate(()=>{chk(0,null,sess.queue[0]);clearNextQuestionTimer();sess.idx=1;showP();});assert(await broken.locator('#result').isVisible());await broken.close();
 console.log('PASS: PNG failure and answer zero leave learning/result usable');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
