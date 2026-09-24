const {chromium}=require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({headless:true,channel:'msedge'});
 try {
 const page=await browser.newPage({viewport:{width:1280,height:720}});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.route('https://**/*',r=>r.abort());
 await page.goto('http://127.0.0.1:8874/hikizan_hunter.html');
 await page.evaluate(()=>{document.getElementById('start-screen')?.remove();voiceOn=false;sfxOn=false;showPerfectEffect=done=>done();showImg=()=>{};});
 const start=async(count=2,problem={a:13,b:8,ans:5})=>{
  await page.evaluate(({count,problem})=>{clearNextQuestionTimer();if(tIv)clearInterval(tIv);sess={queue:Array.from({length:count},()=>({...problem})),idx:0,results:[],streak:0,startTime:0};sessMode='normal';gSt.mode=problem.a===10?'ten':problem.a>10?'borrow':'no';show('practice');showP();},{count,problem});
 };
 assert.deepEqual(await page.evaluate(()=>['no','ten','borrow'].map(m=>buildP(m).length)),[36,9,45]);
 assert(await page.evaluate(()=>['no','ten','borrow'].every(m=>buildP(m).every(p=>p.ans===p.a-p.b))));
 assert.equal(await page.evaluate(()=>document.getElementById('practice').parentElement.id),'app');
 assert.equal(await page.evaluate(()=>document.getElementById('result').parentElement.id),'app');
 for(const [width,height] of [[960,540],[1280,720],[1366,768],[1920,1080],[390,844]]){
  await page.setViewportSize({width,height});
  for(const mode of ['random','calc','hw']){
   await page.evaluate(mode=>{answerMode=mode;},mode);await start();
   for(const hint of [1,2]){
    await page.evaluate(hint=>{if(hint===1)toggleHint1();else toggleHint2();},hint);
    await page.waitForTimeout(150);
    const dims=await page.evaluate(()=>({width:innerWidth,height:innerHeight,scroll:document.documentElement.scrollWidth,rects:['pcard',answerMode==='random'?'agrid':answerMode==='calc'?'calcgrid':'hw-area','hint-area'].map(id=>({id,...document.getElementById(id).getBoundingClientRect().toJSON()}))}));
    assert(dims.scroll<=width+1,JSON.stringify({mode,hint,dims}));
    for(const r of dims.rects){assert(r.left>=0&&r.right<=width+1,JSON.stringify({mode,hint,dims}));if(width>=800)assert(r.top>=0&&r.bottom<=height+1,JSON.stringify({mode,hint,dims}));}
   }
  }
  await page.screenshot({path:`tests/practice-${width}.png`,fullPage:true});
 }
 console.log('PASS: subtraction problems, screen structure, 5 sizes × 3 inputs × 2 hints');
 await page.setViewportSize({width:1280,height:720});
 for(const when of ['off','immediate','end','both']){
  await page.evaluate(when=>{learningPrefs.recite=when;learningPrefs.count=5;answerMode='random';},when);await start();
  await page.evaluate(()=>{const p=sess.queue[0];chk(0,null,p);chk(5,null,p);showP();});
  assert.equal(await page.evaluate(()=>sess.results.length),1);
  if(when==='immediate'||when==='both'){
   assert(await page.evaluate(()=>recitationActive()));
   assert((await page.locator('#recitation-equation').innerText()).includes('13 － 8 ＝ 5'));
   await page.evaluate(()=>{advanceRecitation();advanceRecitation();advanceRecitation();});
   assert((await page.locator('#recitation-equation').innerText()).includes('？'));
   await page.locator('#recitation-peek').click();await page.locator('#recitation-next').click();
   assert((await page.locator('#recitation-equation').innerText()).includes('？'));
   await page.evaluate(()=>{advanceRecitation();advanceRecitation();});
  }
  await page.waitForFunction(()=>sess.idx===1);
  await page.evaluate(()=>chk(5,null,sess.queue[1]));
  if(when==='end'||when==='both'){
   await page.waitForFunction(()=>recitationActive());
   assert.equal(await page.evaluate(()=>recitationState.problems.length),1);
   await page.evaluate(()=>{for(let i=0;i<5;i++)advanceRecitation();});
  }
  await page.waitForFunction(()=>document.getElementById('result').classList.contains('on'));
  assert.deepEqual(await page.evaluate(()=>sess.results.map(r=>r.ok)),[false,true]);
 }
 console.log('PASS: all recitation settings, hidden answers, peek retry, deduplication, scores');
 await page.evaluate(()=>{learningPrefs.recite='end';learningPrefs.count=10;});await start();
 await page.evaluate(()=>{chk(0,null,sess.queue[0]);endSess();});
 assert(await page.evaluate(()=>recitationActive()));
 await page.evaluate(()=>{for(let i=0;i<9;i++)advanceRecitation();});assert(await page.evaluate(()=>recitationActive()));
 await page.evaluate(()=>advanceRecitation());await page.waitForTimeout(1600);
 assert.equal(await page.evaluate(()=>sess.idx),0);assert.equal(await page.evaluate(()=>sess.results.length),1);
 assert(await page.evaluate(()=>document.getElementById('result').classList.contains('on')));
 console.log('PASS: early finish cancels pending next question and reviews 10 times');
 await page.evaluate(()=>{learningPrefs.recite='immediate';learningPrefs.count=5;answerMode='hw';});await start(1);
 await page.evaluate(()=>hwCheckAnswer(null));assert.equal(await page.evaluate(()=>sess.results.length),0);
 await page.evaluate(()=>hwCheckAnswer(0));assert(await page.evaluate(()=>recitationActive()));
 await page.evaluate(()=>{for(let i=0;i<5;i++)advanceRecitation();});await page.waitForFunction(()=>sess._finishRendered);
 console.log('PASS: handwriting unreadable vs recognized wrong answer');
 const mastery=await page.evaluate(()=>{learningPrefs.masterSeconds=3;const initial=[isMasterTime(2999),isMasterTime(3000)];learningPrefs.masterSeconds=10;const long=getSt({att:1,last:{ok:true,el:9000}});return {initial,long};});
 assert.deepEqual(mastery,{initial:[true,false],long:'master'});
 await page.evaluate(()=>{show('settings');document.getElementById('debug-panel-overlay').classList.add('show');});
 const input=page.locator('#debug-panel-overlay input[min="0.1"]');await input.fill('4.1');await input.dispatchEvent('change');
 assert.equal(await page.evaluate(()=>getMasterMs()),4100);
 await page.evaluate(()=>document.getElementById('debug-panel-overlay').classList.remove('show'));
 await page.locator('#recite-enabled').check();await page.locator('#recite-when').selectOption('both');await page.locator('#recite-count').selectOption('10');
 await page.screenshot({path:'tests/settings.png',fullPage:true});
 await page.reload();assert.equal(await page.evaluate(()=>getMasterMs()),4100);assert.equal(await page.evaluate(()=>learningPrefs.recite),'both');
 assert.equal(await page.evaluate(()=>localStorage.getItem('tashizan_learning_v1')),null);
 assert.deepEqual(errors,[]);console.log('PASS: mastery settings, persistence, isolated storage, no JavaScript errors');
 } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exit(1)});
