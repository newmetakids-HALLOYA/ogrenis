(function(){var O=window.OGR=window.OGR||{};var N=5,st=null,visit=0;
function $(i){return document.getElementById(i);}
function rnd(a,b){return a+Math.floor(Math.random()*(b-a+1));}
var SIM='<svg viewBox="0 0 60 60" aria-hidden="true"><circle cx="30" cy="30" r="20" fill="none" stroke="#35506b" stroke-width="17"/><circle cx="30" cy="30" r="20" fill="none" stroke="#e8a64f" stroke-width="11"/><g fill="#fff3d6"><circle cx="16" cy="22" r="1.6"/><circle cx="24" cy="12" r="1.6"/><circle cx="40" cy="13" r="1.6"/><circle cx="48" cy="26" r="1.6"/><circle cx="44" cy="44" r="1.6"/><circle cx="28" cy="49" r="1.6"/><circle cx="14" cy="38" r="1.6"/></g></svg>';
function cnt(s){return st.slots.filter(function(x){return x===s;}).length;}
function say(t){$('bkText').textContent=t;}
function render(){var tr='',pl='';st.slots.forEach(function(s,i){tr+='<div class="sim" data-i="'+i+'">'+(s==='tray'?SIM:'')+'</div>';if(s==='plate')pl+='<div class="sim pl" data-i="'+i+'">'+SIM+'</div>';});
$('bkTray').innerHTML=tr;$('bkItems').innerHTML=pl;}
function dots(){var h='';for(var i=0;i<N;i++)h+='<i class="'+(i<st.done?'on':i===st.done?'now':'')+'"></i>';$('bkDots').innerHTML=h;}
function next(){if(st.done>=N){finish();return;}
var o=O.data.math.make(st.level,st.prev);st.prev=o.k;st.order=o;st.attempts=0;st.lock=false;st.sub=o.k==='sub';
st.slots=[];for(var i=0;i<10;i++)st.slots.push(st.sub&&i<o.a?'plate':'tray');
say(o.text);$('bkQ').hidden=true;$('bkTray').classList.toggle('off',st.sub);
$('bkCust').innerHTML=O.player.render({hair:rnd(0,3),hairColor:rnd(0,5),skin:rnd(0,5),outfit:rnd(0,3),face:rnd(0,2),acc:rnd(0,3)});
dots();render();}
function rec(ok){var o=st.order,t=O.data.math.topics[o.topic];O.learning.record({subject:t.subject,topic:o.topic,objective:t.objective,difficulty:st.level,type:o.k,correct:ok});}
function good(){st.lock=true;rec(true);if(st.attempts===0)st.first++;O.audio.play('ok');say('Teşekkürler! Çok güzel!');st.done++;var id=st.id;setTimeout(function(){if(st&&st.id===id)next();},1100);}
function countAloud(){var c=$('bkItems').children;for(var i=0;i<c.length;i++)(function(k){setTimeout(function(){c[k].classList.add('hl');c[k].setAttribute('data-n',k+1);},k*350);})(i);}
function hint(msg){st.attempts++;rec(false);O.audio.play('back');var o=st.order;
say(msg+(st.attempts>=2&&!st.askMode?' Bu sefer '+o.target+' simit lazım.':''));if(!st.sub)countAloud();}
function ask(){var o=st.order,a=o.answer,c=[a],pool=[a-1,a+1,a-2,a+2].filter(function(x){return x>=0&&x<=10;});
while(c.length<3&&pool.length)c.push(pool.splice(rnd(0,pool.length-1),1)[0]);c.sort(function(){return Math.random()-.5;});
st.askMode=true;$('bkAsk').textContent=o.ask;$('bkChoices').innerHTML=c.map(function(x){return '<button class="big ch" data-v="'+x+'">'+x+'</button>';}).join('');$('bkQ').hidden=false;}
function serve(){if(!st||st.lock)return;var o=st.order,p=cnt('plate'),g=cnt('given');
if(o.k==='add'||!st.sub){if(p!==o.target)return hint('Birlikte sayalım! Tabakta '+p+' simit var.');if(o.k==='add')return ask();return good();}
if(g!==o.target)return hint('Birlikte sayalım! '+g+' simit verdin.');ask();}
function finish(){var up=st.first>=4&&st.level<O.data.math.maxLevel,nl=up?st.level+1:st.level;visit++;
O.state.update(function(d){d.stars+=1;d.bakery.plays+=1;d.bakery.level=nl;});
$('bkEndT').textContent=N+' siparişi tamamladın!';
$('bkEndS').textContent=(up?'Yeni siparişler açıldı! ':'')+'+1 yıldız kazandın.'+(visit>=3?' Biraz mola verip dinlenebilirsin.':'');
$('bkEnd').hidden=false;O.audio.play('ok');}
function open(){var b=O.state.get().bakery,lv=b&&b.level>=1&&b.level<=O.data.math.maxLevel?b.level:1;
st={id:(st?st.id:0)+1,level:lv,done:0,first:0,prev:null};$('bkEnd').hidden=true;next();}
function speak(){try{var t=st.order.text+(st.askMode&&!$('bkQ').hidden?' '+st.order.ask:'');speechSynthesis.cancel();var u=new SpeechSynthesisUtterance(t);u.lang='tr-TR';u.rate=.9;speechSynthesis.speak(u);}catch(e){O.errors.add(e);}}
function drag(e,i){var cl=document.createElement('div');cl.className='drag';cl.innerHTML=SIM;document.body.appendChild(cl);
var sx=e.clientX,sy=e.clientY,mv=false;function pos(x,y){cl.style.left=x+'px';cl.style.top=y+'px';}pos(sx,sy);
function mo(ev){pos(ev.clientX,ev.clientY);if(Math.abs(ev.clientX-sx)+Math.abs(ev.clientY-sy)>10)mv=true;}
function end(ev,drop){window.removeEventListener('pointermove',mo);window.removeEventListener('pointerup',up);window.removeEventListener('pointercancel',cn);cl.remove();
if(!drop||!st||st.lock)return;var r=$('bkPlate').getBoundingClientRect(),over=ev.clientX>=r.left&&ev.clientX<=r.right&&ev.clientY>=r.top&&ev.clientY<=r.bottom;
if(!mv||over){st.slots[i]='plate';O.audio.play('tap');render();}}
function up(ev){end(ev,true);}function cn(ev){end(ev,false);}
window.addEventListener('pointermove',mo);window.addEventListener('pointerup',up);window.addEventListener('pointercancel',cn);}
function init(){
$('bkTray').addEventListener('pointerdown',function(e){var s=e.target.closest('.sim');if(!s||!st||st.sub||st.lock)return;var i=+s.dataset.i;if(st.slots[i]!=='tray')return;e.preventDefault();drag(e,i);});
$('bkItems').addEventListener('click',function(e){var s=e.target.closest('.pl');if(!s||!st||st.lock)return;st.slots[+s.dataset.i]=st.sub?'given':'tray';O.audio.play('tap');render();});
$('bkGo').addEventListener('click',serve);$('bkSpk').addEventListener('click',speak);
$('bkAgain').addEventListener('click',function(){O.audio.play('tap');open();});
$('bkChoices').addEventListener('click',function(e){var b=e.target.closest('.ch');if(!b||st.lock)return;
if(+b.dataset.v===st.order.answer){$('bkQ').hidden=true;st.askMode=false;good();}else{b.disabled=true;hint('Bir daha deneyelim!');}});
O.nav.on('bakery',open);}
O.bakery={init:init};})();
