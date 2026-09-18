const {chromium}=require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({headless:true,channel:'msedge'});
 try {
 const page=await browser.newPage();await page.route('https://**/*',r=>r.abort());
 await page.goto('http://127.0.0.1:8874/hikizan_hunter.html');
 await page.evaluate(()=>{
   localStorage.clear();
   const record={att:2,cor:2,lastOk:true,lastTime:1000};
   localStorage.setItem('tashizan_v2_gD',JSON.stringify({'carry:13-8':record,'no:8-3':record,'no:3+5':record}));
   localStorage.setItem('tashizan_kD',JSON.stringify({'k8:13-8':record,'n3:8-3':record,'n3:3+5':record}));
   localStorage.setItem('hikizan_gD',JSON.stringify({'no:8-3':{att:9,cor:8,lastOk:false,lastTime:9000}}));
   localStorage.setItem('hikizan_sfx_on','0');
 });
 await page.goto('http://127.0.0.1:8874/hikizan.html?test=import#home');
 await page.waitForURL('**/hikizan_hunter.html?test=import#home');
 assert.equal(await page.evaluate(()=>gD['borrow:13-8'].att),2);
 assert.equal(await page.evaluate(()=>gD['no:8-3'].att),9);
 assert.equal(await page.evaluate(()=>kD['kborrow_bottom_8:13-8'].att),2);
 assert.equal(await page.evaluate(()=>kD['kno_bottom_3:8-3'].att),2);
 assert.equal(await page.evaluate(()=>Object.keys(gD).some(k=>k.includes('+'))),false);
 assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem('tashizan_v2_gD'))['no:3+5'].att),2);
 assert.equal(await page.evaluate(()=>sfxOn),false);
 const before=await page.evaluate(()=>JSON.stringify(hunterBackupPayload()));
 for(const values of [{'tashizan_v2_gD':'{}'},{hikizan_gD:JSON.stringify({bad:{att:-1,cor:2}})},{hikizan_shop_v1:'[]'}]){
   assert(await page.evaluate(values=>{try{importHunterSave(JSON.stringify({schema:'hikizan-hunter-save',version:1,values}));return false;}catch(e){return true;}},values));
   assert.equal(await page.evaluate(()=>JSON.stringify(hunterBackupPayload())),before);
 }
 await page.reload();assert.equal(await page.evaluate(()=>gD['no:8-3'].att),9);
 console.log('PASS: legacy URL, subtraction-only migration, existing records/audio preserved, invalid backups rejected without mutation');
 } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exit(1)});
