const {chromium}=require('playwright');
const assert=require('node:assert/strict');
(async()=>{const browser=await chromium.launch({headless:true,channel:'msedge'});try{
const page=await browser.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.route('https://**/*',r=>r.abort());await page.goto('http://127.0.0.1:8874/hikizan_hunter.html');
await page.evaluate(()=>{document.getElementById('start-screen').remove();sfxOn=false;voiceOn=false;});
assert.equal(await page.locator('#settings').getByText('マスター判定（秒未満）').count(),0);
assert.equal(await page.locator('#debug-panel-overlay input[min="0.1"]').count(),1);
assert.equal(await page.getByText('先生向け：下のマーク', {exact:false}).count(),0);
for(let i=0;i<2;i++){await page.evaluate(()=>startSession([{a:8,b:3,ans:5}],1));assert.equal(await page.locator('.practice-hint-panel').isVisible(),false);}
await page.evaluate(()=>startSession([{a:13,b:8,ans:5}],1));assert.equal(await page.locator('.practice-hint-panel').isVisible(),true);
await page.evaluate(()=>{show('achievements');openAchKotsuPreview(KOTSU_IMG_DEFS.find(d=>d.key==='borrow_bottom_02'));});
assert.equal(await page.locator('#ach-preview-title-main').innerText(),'メドゥーサ');await page.waitForTimeout(2100);assert(await page.locator('#ach-preview-overlay').isVisible());await page.locator('#ach-preview-img').click();assert.equal(await page.locator('#ach-preview-overlay').isVisible(),false);
const award=await page.evaluate(()=>{badgeData={};hunterRawKotsuProgress=()=>({allMaster:true});return collectHunterAwards().find(a=>a.title==='メドゥーサ');});assert(award.master.includes('2をひく'));
const tones=await page.evaluate(()=>{let n=0;sfxOn=true;getAC=()=>({currentTime:0,destination:{},createOscillator:()=>{n++;return {connect(){},frequency:{setValueAtTime(){},exponentialRampToValueAtTime(){}},start(){},stop(){}}},createGain:()=>({connect(){},gain:{setValueAtTime(){},exponentialRampToValueAtTime(){}}})});sndHunterPerfect();return n;});assert.equal(tones,27);assert.deepEqual(errors,[]);console.log('Requested changes regression passed');
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exit(1)});
