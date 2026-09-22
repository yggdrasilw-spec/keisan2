const {chromium}=require('playwright');const assert=require('node:assert/strict');
(async()=>{const browser=await chromium.launch({headless:true,channel:'msedge'});try{
 const page=await browser.newPage({reducedMotion:'reduce'});await page.route('https://**/*',r=>r.abort());await page.goto('http://127.0.0.1:8874/hikizan_hunter.html');
 await page.evaluate(()=>{document.getElementById('start-screen').remove();sfxOn=false;voiceOn=false;});
 for(const [width,height] of [[1280,720],[960,540],[360,640]]){
  await page.setViewportSize({width,height});await page.locator('#hunter-challenge-launch').click();
  const dims=await page.locator('#hunter-challenge-dialog').evaluate(d=>({w:d.scrollWidth,cw:d.clientWidth,h:d.scrollHeight,ch:d.clientHeight}));
  assert(dims.w<=dims.cw,JSON.stringify(dims));if(width>650)assert(dims.h<=dims.ch,JSON.stringify({width,...dims}));
  await page.screenshot({path:`tests/challenge-layout-${width}.png`});await page.keyboard.press('Escape');
  await page.evaluate(()=>openAchKotsuPreview(KOTSU_IMG_DEFS[0]));await page.locator('#hunter-lore-open').click();await page.locator('#hunter-lore-img').evaluate(i=>i.decode());
  await page.screenshot({path:`tests/lore-layout-${width}.png`});await page.keyboard.press('Escape');await page.evaluate(()=>closeAchPreview());
 }
 await page.evaluate(()=>{localStorage.setItem('hikizan_challenge_no_shinsoku','12');});await page.reload();
 await page.evaluate(()=>document.getElementById('start-screen').remove());await page.locator('#hunter-challenge-launch').click();assert.match(await page.locator('.mode-shinsoku').innerText(),/12もん/);await page.keyboard.press('Escape');
 await page.evaluate(()=>{window.confirm=()=>false;resetData();});assert.equal(await page.evaluate(()=>localStorage.getItem('hikizan_challenge_no_shinsoku')),'12');
 await page.evaluate(()=>{window.confirm=()=>true;resetData();});assert.equal(await page.evaluate(()=>localStorage.getItem('hikizan_challenge_no_shinsoku')),null);
 console.log('PASS: challenge drawer fits 1280x720 and 960x540, phone has no horizontal overflow, lore screenshots, saved best survives reload, reset confirmation respected');
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exit(1)});
