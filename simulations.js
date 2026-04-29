// ── UTILITIES ──────────────────────────────────────────────
function arrow(ctx, x1,y1,x2,y2,color='#4f8ef7',w=2){
  ctx.save();ctx.strokeStyle=color;ctx.lineWidth=w;
  ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.stroke();
  const a=Math.atan2(y2-y1,x2-x1);const s=10;
  ctx.beginPath();ctx.moveTo(x2,y2);
  ctx.lineTo(x2-s*Math.cos(a-0.4),y2-s*Math.sin(a-0.4));
  ctx.lineTo(x2-s*Math.cos(a+0.4),y2-s*Math.sin(a+0.4));
  ctx.closePath();ctx.fillStyle=color;ctx.fill();ctx.restore();
}
function dashed(ctx,x1,y1,x2,y2,color='#475569'){
  ctx.save();ctx.setLineDash([6,4]);ctx.strokeStyle=color;ctx.lineWidth=1.5;
  ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.stroke();
  ctx.setLineDash([]);ctx.restore();
}
function label(ctx,txt,x,y,color='#94a3b8',size=13){
  ctx.save();ctx.fillStyle=color;ctx.font=`600 ${size}px Inter,sans-serif`;
  ctx.fillText(txt,x,y);ctx.restore();
}
function clear(ctx,w,h){ctx.clearRect(0,0,w,h);}

// ── S1: REFLECTION ─────────────────────────────────────────
function drawReflection(){
  const canvas=document.getElementById('canvas-reflection');
  if(!canvas)return;
  const ctx=canvas.getContext('2d');
  const W=canvas.width,H=canvas.height;
  const angle=parseInt(document.getElementById('reflection-angle').value);
  document.getElementById('reflection-angle-val').textContent=angle;
  document.getElementById('r-i-val').textContent=angle+'°';
  document.getElementById('r-r-val').textContent=angle+'°';

  clear(ctx,W,H);
  const mx=W/2,my=H/2+40;

  // Mirror
  ctx.save();ctx.strokeStyle='#4f8ef7';ctx.lineWidth=4;
  ctx.beginPath();ctx.moveTo(mx-160,my);ctx.lineTo(mx+160,my);ctx.stroke();
  ctx.restore();
  // Mirror ticks
  for(let x=mx-160;x<=mx+160;x+=18){
    ctx.save();ctx.strokeStyle='#1e3a5f';ctx.lineWidth=2;
    ctx.beginPath();ctx.moveTo(x,my);ctx.lineTo(x+8,my+12);ctx.stroke();ctx.restore();
  }

  // Normal
  dashed(ctx,mx,my-160,mx,my+60,'#64748b');
  label(ctx,'Normal',mx+6,my-130,'#64748b');

  const rad=angle*Math.PI/180;
  const len=160;
  // Incident ray (from top-left to mirror)
  const ix=mx-len*Math.sin(rad);
  const iy=my-len*Math.cos(rad);
  arrow(ctx,ix,iy,mx,my,'#22d3ee',2.5);
  // Reflected ray
  const rx=mx+len*Math.sin(rad);
  const ry=my-len*Math.cos(rad);
  arrow(ctx,mx,my,rx,ry,'#34d399',2.5);

  // Angle arcs
  ctx.save();ctx.strokeStyle='#fbbf24';ctx.lineWidth=1.5;
  ctx.beginPath();ctx.arc(mx,my,50,-Math.PI/2,-Math.PI/2+rad,false);ctx.stroke();
  ctx.beginPath();ctx.arc(mx,my,50,-Math.PI/2,-Math.PI/2-rad,true);ctx.stroke();
  ctx.restore();

  const ar=45*Math.PI/180;
  label(ctx,'∠i='+angle+'°',mx-80,my-55,'#fbbf24');
  label(ctx,'∠r='+angle+'°',mx+20,my-55,'#fbbf24');
  label(ctx,'Incident Ray',ix-90,iy+10,'#22d3ee');
  label(ctx,'Reflected Ray',rx+6,ry+10,'#34d399');
  label(ctx,'Mirror',mx+168,my+4,'#4f8ef7',12);
}

// ── S2: REFRACTION ─────────────────────────────────────────
function drawRefraction(){
  const canvas=document.getElementById('canvas-refraction');
  if(!canvas)return;
  const ctx=canvas.getContext('2d');
  const W=canvas.width,H=canvas.height;
  const angle=parseInt(document.getElementById('refraction-angle').value);
  const n2=parseFloat(document.getElementById('refraction-medium').value);
  const n1=1.0;
  document.getElementById('refraction-angle-val').textContent=angle;
  document.getElementById('ref-n2-val').textContent=n2.toFixed(3);
  document.getElementById('ref-t1-val').textContent=angle+'°';

  clear(ctx,W,H);
  const mx=W/2,iface=H/2;

  // Media backgrounds
  ctx.fillStyle='rgba(17,29,53,0.5)';ctx.fillRect(0,0,W,iface);
  ctx.fillStyle='rgba(30,58,100,0.4)';ctx.fillRect(0,iface,W,H-iface);
  label(ctx,'Air  (n₁ = 1.00)',10,24,'#94a3b8');
  label(ctx,'Medium  (n₂ = '+n2.toFixed(2)+')',10,iface+22,'#60a5fa');

  // Interface
  ctx.save();ctx.strokeStyle='rgba(79,142,247,0.5)';ctx.lineWidth=2;
  ctx.beginPath();ctx.moveTo(0,iface);ctx.lineTo(W,iface);ctx.stroke();ctx.restore();
  // Normal
  dashed(ctx,mx,iface-150,mx,iface+150,'#64748b');

  const rad1=angle*Math.PI/180;
  const sinR=n1*Math.sin(rad1)/n2;
  const tir=sinR>1;
  document.getElementById('ref-tir-row').style.display=tir?'flex':'none';

  const len=140;
  const ix=mx-len*Math.sin(rad1);
  const iy=iface-len*Math.cos(rad1);
  arrow(ctx,ix,iy,mx,iface,'#22d3ee',2.5);
  label(ctx,'Incident',ix-70,iy+14,'#22d3ee',12);

  if(tir){
    const rx=mx+len*Math.sin(rad1);
    const ry=iface-len*Math.cos(rad1);
    arrow(ctx,mx,iface,rx,ry,'#f87171',2.5);
    label(ctx,'Total Internal Reflection',mx+10,iface+30,'#f87171',12);
    document.getElementById('ref-t2-val').textContent='TIR';
  } else {
    const rad2=Math.asin(sinR);
    const rx=mx+len*Math.sin(rad2);
    const ry=iface+len*Math.cos(rad2);
    arrow(ctx,mx,iface,rx,ry,'#34d399',2.5);
    label(ctx,'Refracted',rx+6,ry-10,'#34d399',12);
    document.getElementById('ref-t2-val').textContent=(rad2*180/Math.PI).toFixed(1)+'°';
    // angle labels
    ctx.save();ctx.strokeStyle='#fbbf24';ctx.lineWidth=1.5;
    ctx.beginPath();ctx.arc(mx,iface,44,-Math.PI/2,-Math.PI/2+rad1,false);ctx.stroke();
    ctx.beginPath();ctx.arc(mx,iface,44,Math.PI/2,Math.PI/2-rad2,true);ctx.stroke();
    ctx.restore();
    label(ctx,'θ₁',mx-60,iface-28,'#fbbf24',13);
    label(ctx,'θ₂',mx+16,iface+46,'#fbbf24',13);
  }
}

// ── MIRROR HELPER ──────────────────────────────────────────
function drawMirrorSim(canvasId, fSign, fSlider, objSlider, ids){
  const canvas=document.getElementById(canvasId);
  if(!canvas)return;
  const ctx=canvas.getContext('2d');
  const W=canvas.width,H=canvas.height;
  const SCALE=6; // px per cm
  const Px=W-80,Py=H/2; // Pole

  const fCm=parseInt(document.getElementById(fSlider).value);
  const uCm=parseInt(document.getElementById(objSlider).value);
  document.getElementById(ids.fval).textContent=fCm;
  document.getElementById(ids.uval).textContent=uCm;

  const f=fSign*fCm; // signed focal length in cm
  const u=-uCm;      // object is to the left: negative
  // Mirror formula: 1/v = 1/f - 1/u
  let v=1/(1/f - 1/u);
  const m=-v/u;
  const objH=40; // px height of object on canvas
  const imgH=m*objH;

  document.getElementById(ids.uInfo).textContent=u.toFixed(1)+' cm';
  document.getElementById(ids.vInfo).textContent=isFinite(v)?v.toFixed(1)+' cm':'∞';
  document.getElementById(ids.fInfo).textContent=f.toFixed(1)+' cm';
  document.getElementById(ids.mInfo).textContent=isFinite(m)?m.toFixed(2):'∞';

  let nature='';
  if(!isFinite(v)){nature='At Infinity';}
  else if(v<0){nature='Real · Inverted · '+(Math.abs(m)>1?'Enlarged':'Diminished');}
  else {nature='Virtual · Erect · '+(Math.abs(m)>1?'Enlarged':'Diminished');}
  document.getElementById(ids.nature).textContent=nature;

  clear(ctx,W,H);

  // Principal axis
  dashed(ctx,0,Py,W,Py,'#334155');

  // F and C markers
  const Fx=Px+f*SCALE; // f is negative for concave => Fx is to the left
  const Cx=Px+2*f*SCALE;
  function marker(x,lbl){
    ctx.save();ctx.strokeStyle='#475569';ctx.lineWidth=1.5;
    ctx.beginPath();ctx.moveTo(x,Py-8);ctx.lineTo(x,Py+8);ctx.stroke();ctx.restore();
    label(ctx,lbl,x-6,Py+22,'#64748b',12);
  }
  if(Fx>20&&Fx<W-20)marker(Fx,'F');
  if(Cx>20&&Cx<W-20)marker(Cx,'C');

  // Draw mirror (curved look)
  ctx.save();
  ctx.strokeStyle='#4f8ef7';ctx.lineWidth=4;
  ctx.beginPath();
  if(fSign<0){ // concave - opens left
    ctx.arc(Px-80,Py,100,Math.PI*0.75,Math.PI*1.25);
  } else { // convex - opens right
    ctx.arc(Px+80,Py,100,-Math.PI*0.25,Math.PI*0.25);
  }
  ctx.stroke();ctx.restore();
  label(ctx,'P',Px+6,Py+6,'#4f8ef7',12);

  // Object arrow
  const objX=Px+u*SCALE;
  if(objX>10&&objX<Px-10){
    arrow(ctx,objX,Py,objX,Py-objH,'#fbbf24',2.5);
    label(ctx,'Object',objX-24,Py-objH-8,'#fbbf24',11);
  }

  // Image arrow — real image is LEFT of pole (v<0), virtual is RIGHT (v>0, behind mirror)
  if(isFinite(v) && isFinite(imgH) && Math.abs(imgH) < H*2){
    const imgX = Px + v*SCALE;
    const imgTop = Py - imgH;
    if(v < 0){
      // Real image in front of mirror
      if(imgX > 10 && imgX < Px - 5){
        arrow(ctx, imgX, Py, imgX, imgTop, '#34d399', 2.5);
        label(ctx, 'Image', imgX+5, Math.min(imgTop,Py)-12, '#34d399', 11);
      }
    } else {
      // Virtual image behind the mirror (convex mirror / concave with obj inside F)
      if(imgX > Px + 5 && imgX < W - 10){
        ctx.save();
        ctx.setLineDash([5,4]);
        ctx.strokeStyle='#a78bfa'; ctx.lineWidth=2;
        ctx.beginPath(); ctx.moveTo(imgX,Py); ctx.lineTo(imgX,imgTop); ctx.stroke();
        ctx.setLineDash([]);
        const dir = imgTop < Py ? -1 : 1;
        ctx.beginPath();
        ctx.moveTo(imgX, imgTop);
        ctx.lineTo(imgX-6, imgTop+dir*10);
        ctx.lineTo(imgX+6, imgTop+dir*10);
        ctx.closePath();
        ctx.fillStyle='#a78bfa'; ctx.fill();
        ctx.restore();
        const lx = (imgX + 80 > W) ? imgX - 82 : imgX + 5;
        label(ctx, 'Virtual Image', lx, Math.min(imgTop,Py)-12, '#a78bfa', 11);
      }
    }
  }
}

// ── LENS HELPER ────────────────────────────────────────────
function drawLensSim(canvasId, fSign, fSlider, objSlider, ids){
  const canvas=document.getElementById(canvasId);
  if(!canvas)return;
  const ctx=canvas.getContext('2d');
  const W=canvas.width,H=canvas.height;
  const SCALE=6;
  const Lx=W/2,Ly=H/2;

  const fCm=parseInt(document.getElementById(fSlider).value);
  const uCm=parseInt(document.getElementById(objSlider).value);
  document.getElementById(ids.fval).textContent=fCm;
  document.getElementById(ids.uval).textContent=uCm;

  const f=fSign*fCm;
  const u=-uCm;
  let v=1/(1/f + 1/u); // lens: 1/v - 1/u = 1/f => 1/v = 1/f + 1/u
  const m=v/u;
  const objH=40;
  const imgH=m*objH;

  document.getElementById(ids.uInfo).textContent=u.toFixed(1)+' cm';
  document.getElementById(ids.vInfo).textContent=isFinite(v)?v.toFixed(1)+' cm':'∞';
  document.getElementById(ids.fInfo).textContent=(fSign>0?'+':'')+f.toFixed(1)+' cm';
  document.getElementById(ids.mInfo).textContent=isFinite(m)?m.toFixed(2):'∞';

  let nature='';
  if(!isFinite(v)){nature='At Infinity';}
  else if(v>0){nature='Real · Inverted · '+(Math.abs(m)>1?'Enlarged':'Diminished');}
  else {nature='Virtual · Erect · '+(Math.abs(m)>1?'Enlarged':'Diminished');}
  document.getElementById(ids.nature).textContent=nature;

  clear(ctx,W,H);
  dashed(ctx,0,Ly,W,Ly,'#334155');

  // F markers
  const Fx=Lx+f*SCALE;
  const Fx2=Lx-f*SCALE;
  function lensMarker(x,lbl){
    ctx.save();ctx.strokeStyle='#475569';ctx.lineWidth=1.5;
    ctx.beginPath();ctx.moveTo(x,Ly-8);ctx.lineTo(x,Ly+8);ctx.stroke();ctx.restore();
    label(ctx,lbl,x-4,Ly+22,'#64748b',12);
  }
  lensMarker(Fx,'F');lensMarker(Fx2,"F'");

  // Draw lens
  ctx.save();ctx.strokeStyle='#4f8ef7';ctx.lineWidth=3;
  if(fSign>0){ // convex
    ctx.beginPath();
    ctx.moveTo(Lx,Ly-70);
    ctx.bezierCurveTo(Lx+30,Ly-40,Lx+30,Ly+40,Lx,Ly+70);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(Lx,Ly-70);
    ctx.bezierCurveTo(Lx-30,Ly-40,Lx-30,Ly+40,Lx,Ly+70);
    ctx.stroke();
  } else { // concave
    ctx.beginPath();
    ctx.moveTo(Lx,Ly-70);
    ctx.bezierCurveTo(Lx-20,Ly-40,Lx-20,Ly+40,Lx,Ly+70);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(Lx,Ly-70);
    ctx.bezierCurveTo(Lx+20,Ly-40,Lx+20,Ly+40,Lx,Ly+70);
    ctx.stroke();
  }
  ctx.restore();

  // Optical axis label
  label(ctx,'O',Lx+6,Ly+6,'#4f8ef7',12);

  // Object
  const objX=Lx+u*SCALE;
  if(objX>10&&objX<Lx-10){
    arrow(ctx,objX,Ly,objX,Ly-objH,'#fbbf24',2.5);
    label(ctx,'Object',objX-24,Ly-objH-8,'#fbbf24',11);
  }

  // Image
  if(isFinite(v)&&isFinite(imgH)){
    const imgX=Lx+v*SCALE;
    const imgTop=Ly-imgH;
    const isReal=v>0;
    const col=isReal?'#34d399':'#a78bfa';
    if(imgX>10&&imgX<W-10&&imgX!==Lx){
      if(isReal){arrow(ctx,imgX,Ly,imgX,imgTop,col,2.5);}
      else{dashed(ctx,imgX,Ly,imgX,imgTop,col);}
      label(ctx,isReal?'Image':'Virtual Image',imgX+5,Math.min(imgTop,Ly)-10,col,11);
    }
  }
}

// ── S7: PRISM ──────────────────────────────────────────────
function drawPrism(){
  const canvas=document.getElementById('canvas-prism');
  if(!canvas)return;
  const ctx=canvas.getContext('2d');
  const W=canvas.width,H=canvas.height;
  const prismAngle=parseInt(document.getElementById('prism-angle').value);
  document.getElementById('prism-angle-val').textContent=prismAngle;

  clear(ctx,W,H);

  // Prism shape
  const cx=W/2,base=H*0.72,apex=H*0.18;
  const halfBase=100;
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(cx,apex);ctx.lineTo(cx+halfBase,base);ctx.lineTo(cx-halfBase,base);ctx.closePath();
  ctx.fillStyle='rgba(34,211,238,0.06)';ctx.fill();
  ctx.strokeStyle='rgba(34,211,238,0.6)';ctx.lineWidth=2.5;ctx.stroke();
  ctx.restore();
  label(ctx,'Glass Prism',cx-38,base+24,'#22d3ee',13);
  label(ctx,'A = '+prismAngle+'°',cx-16,apex-12,'#94a3b8',12);

  // Incoming white ray
  const inX=cx-halfBase-80,inY=(apex+base)/2+10;
  const hitX=cx-halfBase+10,hitY=(apex+base)/2+10;
  // White ray
  ctx.save();ctx.strokeStyle='#ffffff';ctx.lineWidth=3;
  ctx.beginPath();ctx.moveTo(inX,inY);ctx.lineTo(hitX,hitY);ctx.stroke();ctx.restore();
  label(ctx,'White Light',inX-4,inY-10,'#ffffff',12);

  // Spectrum rays out the right face
  const colors=['#ff0000','#ff7700','#ffff00','#00cc00','#0000ff','#4b0082','#8b00ff'];
  const names=['R','O','Y','G','B','I','V'];
  const deviation=(prismAngle-30)*0.3;
  const exitX=cx+halfBase-10,exitY=(apex+base)/2+10;
  colors.forEach((c,i)=>{
    const spread=(i-3)*12+deviation*(i-3)*0.4;
    const ex2=exitX+120;
    const ey2=exitY+(i-3)*18+spread;
    ctx.save();ctx.strokeStyle=c;ctx.lineWidth=2.5;
    ctx.beginPath();ctx.moveTo(hitX,hitY);ctx.lineTo(exitX,exitY);ctx.stroke();
    ctx.beginPath();ctx.moveTo(exitX,exitY);ctx.lineTo(ex2,ey2);ctx.stroke();
    ctx.restore();
    label(ctx,names[i],ex2+6,ey2+5,c,12);
  });

  // Labels
  label(ctx,'Dispersion →',exitX+10,exitY-32,'#94a3b8',12);
}

// ── ANIMATE HERO PARTICLES ─────────────────────────────────
function initHero(){
  const canvas=document.getElementById('hero-canvas');
  if(!canvas)return;
  const ctx=canvas.getContext('2d');
  canvas.width=window.innerWidth;
  canvas.height=window.innerHeight;
  const dots=Array.from({length:60},()=>({
    x:Math.random()*canvas.width, y:Math.random()*canvas.height,
    vx:(Math.random()-0.5)*0.4, vy:(Math.random()-0.5)*0.4,
    r:Math.random()*2+1, a:Math.random()
  }));
  function frame(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    dots.forEach(d=>{
      d.x+=d.vx;d.y+=d.vy;
      if(d.x<0||d.x>canvas.width)d.vx*=-1;
      if(d.y<0||d.y>canvas.height)d.vy*=-1;
      ctx.beginPath();ctx.arc(d.x,d.y,d.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(79,142,247,${d.a*0.5})`;ctx.fill();
    });
    requestAnimationFrame(frame);
  }
  frame();
}

// ── REDRAW ALL (called on tab switch) ──────────────────────
function redrawAll(){
  drawReflection();
  drawRefraction();
  const cmIds={fval:'cm-f-val',uval:'cm-u-val',uInfo:'cm-u-info',vInfo:'cm-v-info',fInfo:'cm-f-info',mInfo:'cm-m-info',nature:'cm-nature'};
  const xmIds={fval:'xm-f-val',uval:'xm-u-val',uInfo:'xm-u-info',vInfo:'xm-v-info',fInfo:'xm-f-info',mInfo:'xm-m-info',nature:'xm-nature'};
  const clIds={fval:'cl-f-val',uval:'cl-u-val',uInfo:'cl-u-info',vInfo:'cl-v-info',fInfo:'cl-f-info',mInfo:'cl-m-info',nature:'cl-nature'};
  const xlIds={fval:'xl-f-val',uval:'xl-u-val',uInfo:'xl-u-info',vInfo:'xl-v-info',fInfo:'xl-f-info',mInfo:'xl-m-info',nature:'xl-nature'};
  drawMirrorSim('canvas-concave-mirror',-1,'cm-focal','cm-obj',cmIds);
  drawMirrorSim('canvas-convex-mirror',1,'xm-focal','xm-obj',xmIds);
  drawLensSim('canvas-convex-lens',1,'cl-focal','cl-obj',clIds);
  drawLensSim('canvas-concave-lens',-1,'xl-focal','xl-obj',xlIds);
  drawPrism();
}

// ── INIT ALL SIMS ──────────────────────────────────────────
function initSims(){
  const cmIds={fval:'cm-f-val',uval:'cm-u-val',uInfo:'cm-u-info',vInfo:'cm-v-info',fInfo:'cm-f-info',mInfo:'cm-m-info',nature:'cm-nature'};
  const xmIds={fval:'xm-f-val',uval:'xm-u-val',uInfo:'xm-u-info',vInfo:'xm-v-info',fInfo:'xm-f-info',mInfo:'xm-m-info',nature:'xm-nature'};
  const clIds={fval:'cl-f-val',uval:'cl-u-val',uInfo:'cl-u-info',vInfo:'cl-v-info',fInfo:'cl-f-info',mInfo:'cl-m-info',nature:'cl-nature'};
  const xlIds={fval:'xl-f-val',uval:'xl-u-val',uInfo:'xl-u-info',vInfo:'xl-v-info',fInfo:'xl-f-info',mInfo:'xl-m-info',nature:'xl-nature'};

  // Reflection
  const ra=document.getElementById('reflection-angle');
  if(ra){ra.oninput=drawReflection; drawReflection();}

  // Refraction
  const refA=document.getElementById('refraction-angle');
  const refM=document.getElementById('refraction-medium');
  if(refA){refA.oninput=drawRefraction;}
  if(refM){refM.onchange=drawRefraction;}
  drawRefraction();

  // Concave Mirror
  const cmf=document.getElementById('cm-focal'),cmo=document.getElementById('cm-obj');
  if(cmf)cmf.oninput=()=>drawMirrorSim('canvas-concave-mirror',-1,'cm-focal','cm-obj',cmIds);
  if(cmo)cmo.oninput=()=>drawMirrorSim('canvas-concave-mirror',-1,'cm-focal','cm-obj',cmIds);
  drawMirrorSim('canvas-concave-mirror',-1,'cm-focal','cm-obj',cmIds);

  // Convex Mirror
  const xmf=document.getElementById('xm-focal'),xmo=document.getElementById('xm-obj');
  if(xmf)xmf.oninput=()=>drawMirrorSim('canvas-convex-mirror',1,'xm-focal','xm-obj',xmIds);
  if(xmo)xmo.oninput=()=>drawMirrorSim('canvas-convex-mirror',1,'xm-focal','xm-obj',xmIds);
  drawMirrorSim('canvas-convex-mirror',1,'xm-focal','xm-obj',xmIds);

  // Convex Lens
  const clf=document.getElementById('cl-focal'),clo=document.getElementById('cl-obj');
  if(clf)clf.oninput=()=>drawLensSim('canvas-convex-lens',1,'cl-focal','cl-obj',clIds);
  if(clo)clo.oninput=()=>drawLensSim('canvas-convex-lens',1,'cl-focal','cl-obj',clIds);
  drawLensSim('canvas-convex-lens',1,'cl-focal','cl-obj',clIds);

  // Concave Lens
  const xlf=document.getElementById('xl-focal'),xlo=document.getElementById('xl-obj');
  if(xlf)xlf.oninput=()=>drawLensSim('canvas-concave-lens',-1,'xl-focal','xl-obj',xlIds);
  if(xlo)xlo.oninput=()=>drawLensSim('canvas-concave-lens',-1,'xl-focal','xl-obj',xlIds);
  drawLensSim('canvas-concave-lens',-1,'xl-focal','xl-obj',xlIds);

  // Prism
  const pa=document.getElementById('prism-angle');
  if(pa){pa.oninput=drawPrism; drawPrism();}
}

document.addEventListener('DOMContentLoaded',function(){
  initHero();
  initSims();
});
