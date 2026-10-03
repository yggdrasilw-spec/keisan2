// Optional, generated transparent PNGs; artwork never gates a learning session.
(function () {
  'use strict';
  var poses=['idle','slash','throw','clone','hurt','win','smoke','bow','defeat'];
  var sheets={},loading={},cuts={};
  var assetRoot=new URL('../img/battle/',document.currentScript.src).href;
  function partition(counts,parts){
    var edges=[0],size=counts.length/parts;
    for(var part=1;part<parts;part++){
      var target=part*size,start=Math.floor(target-size*.44),end=Math.ceil(target+size*.44),best=-1,distance=Infinity;
      // A cut belongs in the transparent gutter, even when an attack is wider.
      for(var at=start;at<=end;at++)if(counts[at]===0){
        var left=at,right=at;while(left>start&&counts[left-1]===0)left--;while(right<end&&counts[right+1]===0)right++;
        var middle=Math.round((left+right)/2),d=Math.abs(middle-target);if(d<distance){best=middle;distance=d;}at=right;
      }
      if(best<0){
        // Glow can join neighbouring frames: choose its thinnest neck rather
        // than cutting a head, weapon or wing at the nominal grid position.
        var minimum=Infinity;
        for(var at=start;at<=end;at++){var cost=counts[at];if(cost<minimum||(cost===minimum&&Math.abs(at-target)<Math.abs(best-target))){minimum=cost;best=at;}}
      }
      edges.push(best);
    }
    edges.push(counts.length);return edges;
  }
  function key(kind,stage){return kind==='hero'?'hero-'+stage:kind;}
  function sheet(kind,stage){
    var id=key(kind,stage);
    if(loading[id])return sheets[id]||null;
    loading[id]='loading';
    var image=new Image();
    image.onload=function(){
      try {
        var rows=kind==='hero'?poses.slice(0,7):['idle','slash','hurt','defeat','bow'];
        var source=document.createElement('canvas');source.width=image.naturalWidth;source.height=image.naturalHeight;
        var sc=source.getContext('2d',{willReadFrequently:true});sc.drawImage(image,0,0);
        var pixelsAll=sc.getImageData(0,0,source.width,source.height).data,rowCounts=new Array(source.height).fill(0);
        for(var py=0;py<source.height;py++)for(var px=0;px<source.width;px++)if(pixelsAll[(py*source.width+px)*4+3]>32)rowCounts[py]++;
        var rowEdges=partition(rowCounts,rows.length),columnEdges=[],unsafe=[];
        rowEdges.slice(1,-1).forEach(function(y){if(rowCounts[y])unsafe.push('row/'+y);});
        rows.forEach(function(pose,row){
          var cols=new Array(source.width).fill(0);
          for(var y=rowEdges[row];y<rowEdges[row+1];y++)for(var x=0;x<source.width;x++)if(pixelsAll[(y*source.width+x)*4+3]>32)cols[x]++;
          var edges=partition(cols,4);columnEdges.push(edges);edges.slice(1,-1).forEach(function(x){if(cols[x])unsafe.push(pose+'/'+x);});
        });
        cuts[id]={rows:rowEdges,columns:columnEdges,unsafe:unsafe,width:source.width,height:source.height};
        var frames=[],mw=0,mh=0;
        rows.forEach(function(pose,row){for(var f=0;f<4;f++){
          var sx=columnEdges[row][f],sy=rowEdges[row],cw=columnEdges[row][f+1]-sx,ch=rowEdges[row+1]-sy;
          var pixels=sc.getImageData(sx,sy,cw,ch).data,x0=cw,y0=ch,x1=-1,y1=-1;
          for(var y=0;y<ch;y++)for(var x=0;x<cw;x++)if(pixels[(y*cw+x)*4+3]>32){x0=Math.min(x0,x);y0=Math.min(y0,y);x1=Math.max(x1,x);y1=Math.max(y1,y);}
          var box=x1<0?null:{x:sx+x0,y:sy+y0,w:x1-x0+1,h:y1-y0+1};
          frames.push({pose:pose,f:f,box:box});if(box){mw=Math.max(mw,box.w);mh=Math.max(mh,box.h);}
        }});
        if(!mw||!mh)throw Error('Empty sprite sheet');
        var atlas=document.createElement('canvas');atlas.width=256;atlas.height=poses.length*64;
        var c=atlas.getContext('2d');c.imageSmoothingEnabled=false;var scale=Math.min(60/mw,56/mh);
        frames.forEach(function(frame){if(!frame.box)return;var b=frame.box,dw=Math.max(1,Math.round(b.w*scale)),dh=Math.max(1,Math.round(b.h*scale));
          c.drawImage(source,b.x,b.y,b.w,b.h,frame.f*64+Math.round((64-dw)/2),poses.indexOf(frame.pose)*64+58-dh,dw,dh);
        });
        sheets[id]=atlas;loading[id]='ready';
      }catch(error){loading[id]='failed';console.warn('Hunter sprite unavailable:',id,error);}
      window.dispatchEvent(new Event('hunter-battle-art-ready'));
    };
    image.onerror=function(){loading[id]='failed';window.dispatchEvent(new Event('hunter-battle-art-ready'));};
    image.src=assetRoot+id+'.png';return null;
  }
  function draw(c,kind,stage,pose,frame,x,y,scale,flip){
    var atlas=sheet(kind,stage);if(!atlas)return;
    c.save();c.imageSmoothingEnabled=false;c.translate(Math.round(x),Math.round(y));
    if(flip){c.translate(64*scale,0);c.scale(-1,1);}
    c.drawImage(atlas,frame*64,Math.max(0,poses.indexOf(pose))*64,64,64,0,0,64*scale,64*scale);c.restore();
  }
  function rect(c,color,x,y,w,h){c.fillStyle=color;c.fillRect(Math.round(x),Math.round(y),w,h);}
  function poly(c,color,points){c.fillStyle=color;c.beginPath();points.forEach(function(p,i){if(i)c.lineTo(p[0],p[1]);else c.moveTo(p[0],p[1]);});c.closePath();c.fill();}
  function star(c,x,y,color){poly(c,color,[[x,y-5],[x+2,y-2],[x+5,y],[x+2,y+2],[x,y+5],[x-2,y+2],[x-5,y],[x-2,y-2]]);}
  window.HunterBattleArt={sheet:sheet,draw:draw,rect:rect,poly:poly,star:star,poses:poses,status:function(){return Object.assign({},loading);},cuts:function(){return cuts;}};
})();
