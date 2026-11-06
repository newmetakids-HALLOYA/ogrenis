(function(){var O=window.OGR=window.OGR||{};
var pos={x:195,y:622},tok=0,tm=null;
var DOOR={orman:[225,472],istasyon:[100,505],firin:[300,585],ev:[86,768],gorev:[331,748]};
var SP={s1:[55,575],s2:[268,700],s3:[205,748]};
function $(i){return document.getElementById(i);}
function here(w){try{var m=new DOMMatrix(getComputedStyle(w).transform);return{x:m.m41,y:m.m42+62};}catch(e){return pos;}}
function walkTo(x,y,cb){var w=$('walker');if(!w){if(cb)cb();return;}
var c=here(w),dx=x-c.x,dy=y-c.y,dur=Math.max(.2,Math.sqrt(dx*dx+dy*dy)/150);
tok++;var my=tok;clearTimeout(tm);pos={x:x,y:y};
w.style.transition='transform '+dur+'s ease-in-out';w.style.transform='translate('+x+'px,'+(y-62)+'px)';w.classList.add('walking');
var b=$('bubble');if(b)b.style.opacity='0';
tm=setTimeout(function(){if(my!==tok)return;w.classList.remove('walking');if(cb)cb();},dur*1000+40);}
function collect(id,p){var d=O.state.get();if((d.found||[]).indexOf(id)>-1)return;
O.state.update(function(s){if(!Array.isArray(s.found))s.found=[];s.stars+=1;s.found.push(id);});O.audio.play('ok');
var n=document.querySelector('[data-spark="'+id+'"]');if(n)n.remove();
try{var t=document.createElementNS('http://www.w3.org/2000/svg','text');t.setAttribute('x',p[0]);t.setAttribute('y',p[1]-20);t.setAttribute('text-anchor','middle');t.setAttribute('class','float');t.textContent='+1 yıldız';
$('walker').parentNode.appendChild(t);setTimeout(function(){t.remove();},1200);}catch(e){O.errors.add(e);}}
function init(){var svg=document.querySelector('svg.world');if(!svg)return;
var f=O.state.get().found||[];f.forEach(function(id){var n=document.querySelector('[data-spark="'+id+'"]');if(n)n.remove();});
svg.addEventListener('click',function(e){
var sp=e.target.closest('[data-spark]');
if(sp){var id=sp.getAttribute('data-spark'),p=SP[id];if(p)walkTo(p[0],p[1],function(){collect(id,p);});return;}
if(e.target.closest('[data-place]'))return;
var pt=svg.createSVGPoint();pt.x=e.clientX;pt.y=e.clientY;var q=pt.matrixTransform(svg.getScreenCTM().inverse());
if(q.y<450)return;
walkTo(Math.min(366,Math.max(24,q.x)),Math.min(770,Math.max(470,q.y)));});}
O.world={init:init,visit:function(k,cb){var d=DOOR[k];if(d)walkTo(d[0],d[1],cb);else if(cb)cb();}};})();
