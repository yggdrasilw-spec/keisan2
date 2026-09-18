const {chromium}=require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({headless:true,channel:'msedge'});
 try {
  const page=await browser.newPage({viewport:{width:360,height:640}}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.route('https://**/*',r=>r.abort());
  await page.goto('http://127.0.0.1:8874/hikizan_hunter.html');
  await page.evaluate(()=>{document.getElementById('start-screen').remove();sfxOn=false;voiceOn=false;});
  const keys=await page.evaluate(()=>ACH_BADGE_DEFS.concat(KOTSU_IMG_DEFS).map(d=>d.key));
  const names=await page.evaluate(()=>HUNTER_CREATURE_NAMES);
  assert.equal(keys.length,40);
  assert.deepEqual(Object.keys(names).sort(),keys.sort());
  assert(Object.values(names).every(n=>n && !n.includes('メダル')));
  // Exercise both branches of the real award collector without altering saved records.
  const awards=await page.evaluate(()=>{
   const ready=hunterBadgeReady,progress=hunterRawKotsuProgress;
   hunterBadgeReady=()=>true;hunterRawKotsuProgress=()=>({allMaster:true});badgeData={};
   try{return collectHunterAwards();}finally{hunterBadgeReady=ready;hunterRawKotsuProgress=progress;}
  });
  assert.equal(awards.length,40);
  assert.deepEqual(awards.map(a=>a.title).sort(),Object.values(names).sort());
  await page.addStyleTag({content:'.gem-burst-card{animation:none!important}'});
  for(const award of awards){
   await page.evaluate(a=>showGemUnlockEffect(a.img,a.title+'\nゲット！'),award);
   assert.equal(await page.locator('.gem-burst-title-main').last().innerText(),award.title);
   assert(await page.locator('.gem-burst-overlay[role=dialog] .gem-burst-card').evaluate(el=>el.scrollWidth<=el.clientWidth),award.title);
   if(award.title==='九尾の狐（きゅうびのきつね）'){
    await page.locator('.gem-burst-overlay[role=dialog] img').evaluate(el=>el.decode());
    await page.screenshot({path:'tests/creature-long-name.png'});
   }
   await page.locator('.hunter-reward-close').click();
  }
  assert.deepEqual(errors,[]);
  console.log('PASS: all 40 official names match reward keys, award collector uses names, all titles fit 360px and close on tap');
 } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exit(1);});
