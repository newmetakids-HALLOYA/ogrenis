(function(){var O=window.OGR=window.OGR||{};var N=5,st=null,visit=0;
function $(i){return document.getElementById(i);}
function rnd(a,b){return a+Math.floor(Math.random()*(b-a+1));}
function lower(s){return s.toLocaleLowerCase('tr-TR');}
function speak(t){try{speechSynthesis.cancel();var u=new SpeechSynthesisUtterance(t);u.lang='tr-TR';u.rate=.85;speechSynthesis.speak(u);}catch(e){O.errors.add(e);}}
var COL=['#ffcf4a','#7ccbff','#6fcf7d','#ff9bd0','#ffb347'],K='#35506b';
var ENG='<div class="eng" aria-hidden="true"><svg viewBox="0 0 70 64"><rect x="10" y="6" width="10" height="18" rx="3" fill="'+K+'"/><rect x="4" y="22" width="44" height="28" rx="8" fill="#ff9b54" stroke="'+K+'" stroke-width="3"/><rect x="40" y="10" width="24" height="40" rx="6" fill="#5aa9e6" stroke="'+K+'" stroke-width="3"/><rect x="46" y="16" width="12" height="12" rx="3" fill="#bfe7ff"/><g fill="#fff3d6" stroke="'+K+'" stroke-width="3"><circle cx="16" cy="54" r="8"/><circle cx="38" cy="54" r="8"/><circle cx="58" cy="54" r="8"/></g></svg></div>';
var SAY={e:'Eksik vagonu bul!',s:'Vagonları küçükten büyüğe sırala!',t:'Yolcu bu resmin durağına gitmek istiyor. Doğru tabelayı bul!'};
function wg(n,c,i){return '<div class="wg '+c+'"'+(i!==undefined?' data-i="'+i+'"':'')+' style="--c:'+COL[(+n||0)%5]+'">'+n+'</div>';}
function track(){var o=st.order,h=ENG;
if(o.k==='e')o.seq.forEach(function(n,i){h+=i===o.b?(st.filled?wg(n,'f'):'<div class="wg gap"></div>'):wg(n,'');});
else if(o.k==='s')st.wag.forEach(function(n,i){h+=wg(n,'mv'+(st.sel===i?' sel':''),i);});
else h+=wg('','')+wg('','')+wg('','');
$('trTrack').innerHTML=h;}
function panel(){var o=st.order,h='';
if(o.k==='e')o.choices.forEach(function(v){h+='<div class="wg dep" data-v="'+v+'" style="--c:'+COL[v%5]+'">'+v+'</div>';});
if(o.k==='t')o.choices.forEach(function(w){h+='<button class="sign" data-w="'+w+'">'+w+'</button>';});
$('trPanel').innerHTML=h;}
function dots(){var h='';for(var i=0;i<N;i++)h+='<i class="'+(i<st.done?'on':i===st.done?'now':'')+'"></i>';$('trDots').innerHTML=h;}
function next(){if(st.done>=N)return;var o=O.data.train.make(st.level,st.prev,st.used);st.prev=o.k;if(o.word)st.used.push(o.word);
st.order=o;st.attempts=0;st.moves=0;st.sel=null;st.filled=false;st.lock=false;st.wag=o.nums?o.nums.slice():[];
$('trHint').textContent=SAY[o.k];$('trPass').hidden=o.k!=='t';
if(o.k==='t'){$('trPic').innerHTML=o.pic;$('trWho').innerHTML=O.player.render({hair:rnd(0,3),hairColor:rnd(0,5),skin:rnd(0,5),outfit:rnd(0,3),face:rnd(0,2),acc:rnd(0,3)});}
dots();track();panel();}
function rec(ok){var o=st.order,t=O.data.train.topics[o.k];O.learning.record({subject:t.subject,topic:t.topic,objective:t.objective,difficulty:st.level,type:o.k,correct:ok});}
function good(){st.lock=true;rec(true);if(o2().k==='s'?st.moves<st.wag.length+3:st.attempts===0)st.first++;O.audio.play('ok');st.done++;dots();
$('trHint').textContent='Harika!';$('trStage').style.backgroundPositionX=(-st.done*70)+'px, 0px';var id=st.id;
if(st.done>=N){setTimeout(function(){if(st&&st.id===id){$('trTrack').classList.add('go');O.audio.play('ok');}},500);setTimeout(function(){if(st&&st.id===id)finish();},2400);}
else setTimeout(function(){if(st&&st.id===id)next();},1300);}
function o2(){return st.order;}
function wrongHint(){st.attempts++;rec(false);O.audio.play('back');}
function place(v){var o=st.order;if(v===o.miss){st.filled=true;track();$('trPanel').innerHTML='';good();return;}
wrongHint();var ds=document.querySelectorAll('#trPanel .dep');for(var i=0;i<ds.length;i++){if(+ds[i].dataset.v===v){ds[i].classList.add('no');(function(d){setTimeout(function(){d.classList.remove('no');},450);})(ds[i]);}
else if(st.attempts>=2&&+ds[i].dataset.v===o.miss)ds[i].classList.add('glow');}
if(st.attempts===1)$('trHint').textContent='Sayarak bul: '+o.seq.map(function(n,j){return j===o.b?'?':n;}).join(', ');}
function sorted(){for(var i=1;i<st.wag.length;i++)if(st.wag[i]<st.wag[i-1])return false;return true;}
function swap(i,j){var t=st.wag[i];st.wag[i]=st.wag[j];st.wag[j]=t;st.sel=null;st.moves++;O.audio.play('tap');track();
if(sorted())good();else if(st.moves===8)$('trHint').textContent='Küçük sayı öne, büyük sayı arkaya!';}
function tapSel(i){if(st.sel===null)st.sel=i;else if(st.sel===i)st.sel=null;else{swap(st.sel,i);return;}track();}
function sign(w,b){if(!st||st.lock)return;var o=st.order;if(w===o.word){b.classList.add('glow');good();return;}
wrongHint();b.classList.add('no');setTimeout(function(){b.classList.remove('no');},450);
if(st.attempts===1)speak(lower(o.word));else{var bs=document.querySelectorAll('#trPanel .sign');for(var i=0;i<bs.length;i++)if(bs[i].dataset.w===o.word)bs[i].classList.add('glow');}}
function drag(e,src,cb){var cl=src.cloneNode(true);cl.className=src.className.replace(' sel','')+' drag2';document.body.appendChild(cl);var sx=e.clientX,sy=e.clientY,mv=false;
function pos(x,y){cl.style.left=x+'px';cl.style.top=y+'px';}pos(sx,sy);
function mo(ev){pos(ev.clientX,ev.clientY);if(Math.abs(ev.clientX-sx)+Math.abs(ev.clientY-sy)>10)mv=true;}
function fin(ev,ok){window.removeEventListener('pointermove',mo);window.removeEventListener('pointerup',up);window.removeEventListener('pointercancel',cn);cl.remove();if(ok&&st&&!st.lock)cb(mv,ev.clientX,ev.clientY);}
function up(ev){fin(ev,true);}function cn(ev){fin(ev,false);}
window.addEventListener('pointermove',mo);window.addEventListener('pointerup',up);window.addEventListener('pointercancel',cn);}
function finish(){var up=st.first>=4&&st.level<O.data.train.maxLevel,nl=up?st.level+1:st.level;visit++;
O.state.update(function(d){d.stars+=1;d.train.plays+=1;d.train.level=nl;});
$('trEndT').textContent='Tren istasyona vardı!';
$('trEndS').textContent=(up?'Yeni görevler açıldı! ':'')+'+1 yıldız kazandın.'+(visit>=3?' Biraz mola verip dinlenebilirsin.':'');
$('trEnd').hidden=false;}
function open(){var t=O.state.get().train,lv=t&&t.level>=1&&t.level<=O.data.train.maxLevel?t.level:1;
st={id:(st?st.id:0)+1,level:lv,done:0,first:0,prev:null,used:[]};$('trEnd').hidden=true;$('trTrack').classList.remove('go');$('trStage').style.backgroundPositionX='0px, 0px';next();}
function init(){
$('trTrack').addEventListener('pointerdown',function(e){var s=e.target.closest('.wg.mv');if(!s||!st||st.lock||st.order.k!=='s')return;e.preventDefault();var i=+s.dataset.i;
drag(e,s,function(mv,x,y){var el=document.elementFromPoint(x,y),tg=el&&el.closest?el.closest('#trTrack .wg.mv'):null;if(!mv)tapSel(i);else if(tg&&+tg.dataset.i!==i)swap(i,+tg.dataset.i);});});
$('trPanel').addEventListener('pointerdown',function(e){var s=e.target.closest('.dep');if(!s||!st||st.lock||st.order.k!=='e')return;e.preventDefault();var v=+s.dataset.v;
drag(e,s,function(mv,x,y){var g=document.querySelector('#trTrack .gap');if(!g)return;var r=g.getBoundingClientRect();if(!mv||(x>=r.left-16&&x<=r.right+16&&y>=r.top-34&&y<=r.bottom+34))place(v);});});
$('trPanel').addEventListener('click',function(e){var b=e.target.closest('.sign');if(b)sign(b.dataset.w,b);});
$('trSpk').addEventListener('click',function(){if(st)speak(SAY[st.order.k]);});
$('trAgain').addEventListener('click',function(){O.audio.play('tap');open();});
O.nav.on('train',open);}
O.train={init:init,peek:function(){return st;}};})();
