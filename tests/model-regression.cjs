const {chromium}=require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({headless:true,channel:'msedge'});
 try {
 const page=await browser.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.route('https://**/*',r=>r.abort());
 await page.goto('http://127.0.0.1:8874/hikizan_hunter.html');
 await page.evaluate(()=>hwLoadModel());await page.waitForFunction(()=>!!hwModel,{},{timeout:30000});
 const results=await page.evaluate(async()=>{
  const canvas=document.getElementById('hw-canvas'),ctx=canvas.getContext('2d');
  ctx.fillStyle='white';ctx.fillRect(0,0,500,220);ctx.strokeStyle='black';ctx.lineWidth=17;ctx.lineCap='round';ctx.beginPath();ctx.ellipse(250,110,43,72,0,0,Math.PI*2);ctx.stroke();
  const box={x:193,y:23,w:114,h:174};
  const zero=await hwPredict(box,canvas),before=tf.memory().numTensors;
  for(let i=0;i<5;i++)await hwPredict(box,canvas);
  return {version:tf.version.tfjs,zero,before,after:tf.memory().numTensors};
 });
 assert.equal(results.version,'4.22.0');assert.equal(results.zero,0);assert.equal(results.before,results.after);assert.deepEqual(errors,[]);
 console.log('PASS: local TensorFlow + copied graph model, drawn 0 recognized, inference tensors released',results);
 } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exit(1)});
