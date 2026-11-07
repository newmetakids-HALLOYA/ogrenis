(function(){var O=window.OGR=window.OGR||{};var N=5,st=null,visit=0;
function $(i){return document.getElementById(i);}
function rnd(a,b){return a+Math.floor(Math.random()*(b-a+1));}
function lower(s){return s.toLocaleLowerCase('tr-TR');}
function speak(t){try{speechSynthesis.cancel();var u=new SpeechSynthesisUtterance(t);u.lang='tr-TR';u.rate=.85;speechSynthesis.speak(u);}catch(e){O.errors.add(e);}}
function slots(){var o=st.order,h='',n=o.k==='h'?o.syl.length:o.word.length;
for(var i=0;i<n;i++){var f=o.k==='m'?(i!==o.idx||st.filled):i<st.next;var tx=o.k==='h'?o.syl[i]:o.word[i];
h+='<span class="sl'+(f?' f':'')+(!f&&(o.k==='m'||i===st.next)?' cur':'')+'">'+(f?tx:'')+'</span>';}
$('fSlots').innerHTML=h;}
function tiles(){var h='';st.order.tiles.forEach(function(t,i){h+='<button class="tile'+(st.gone[i]?' gone':'')+'" data-i="'+i+'" style="--d:'+(rnd(0,20)/10)+'s;--x:'+rnd(-12,12)+'px;--y:'+rnd(-6,10)+'px">'+t+'</button>';});$('fTiles').innerHTML=h;}
function dots(){var h='';for(var i=0;i<N;i++)h+='<i class="'+(i<st.done?'on':i===st.done?'now':'')+'"></i>';$('fDots').innerHTML=h;}
function next(){if(st.done>=N){finish();return;}
st.tl=st.sup&&Math.random()<.5?Math.max(1,st.level-1):st.level;var o=O.data.tr.make(st.tl,st.prev,st.used,st.pf);st.prev=o.k;st.used.push(o.word);st.order=o;st.attempts=0;st.lock=false;st.next=0;st.filled=false;st.gone=[];
$('fPic').innerHTML=o.pic;$('fHint').textContent=o.k==='m'?'Eksik harfi bul!':o.k==='h'?'Heceleri sırayla bul!':'Harfleri sırayla bul!';
dots();slots();tiles();}
function rec(ok){var o=st.order;O.learning.record({subject:'turkce',topic:o.topic,objective:o.objective,difficulty:st.tl,type:o.k,correct:ok});}
function done(){st.lock=true;rec(true);if(st.attempts===0)st.first++;O.audio.play('ok');speak(lower(st.order.word));st.done++;var id=st.id;setTimeout(function(){if(st&&st.id===id)next();},1700);}
function want(){var o=st.order;return o.k==='m'?o.letter:o.k==='h'?o.syl[st.next]:o.word[st.next];}
function tap(i,b){if(!st||st.lock||st.gone[i])return;var o=st.order,t=o.tiles[i];
if(t===want()){st.gone[i]=true;b.classList.add('gone');O.audio.play('tap');
if(o.k==='m'){st.filled=true;slots();done();}else{st.next++;slots();if(st.next>=(o.k==='h'?o.syl.length:o.word.length))done();}return;}
st.attempts++;rec(false);O.audio.play('back');b.classList.add('no');setTimeout(function(){b.classList.remove('no');},450);
if(st.attempts===1)speak(lower(o.word));
else{var bs=document.querySelectorAll('#fTiles .tile');for(var k=0;k<bs.length;k++)if(o.tiles[k]===want()&&!st.gone[k])bs[k].classList.add('glow');}}
function finish(){visit++;O.state.update(function(d){d.stars+=1;d.forest.plays+=1;});var up=O.engine.afterSession('forest');
$('fEndT').textContent=N+' kelimeyi buldun!';
$('fEndS').textContent=(up?'Yeni oyunlar açıldı! ':'')+'+1 yıldız kazandın.'+(visit>=3?' Biraz mola verip dinlenebilirsin.':'');
$('fEnd').hidden=false;O.audio.play('ok');}
function open(){var lf=O.engine.levelFor('forest');st={id:(st?st.id:0)+1,level:lf.level,sup:lf.support,pf:lf.prefer,done:0,first:0,prev:null,used:[]};$('fEnd').hidden=true;next();}
function init(){
$('fTiles').addEventListener('click',function(e){var b=e.target.closest('.tile');if(b)tap(+b.dataset.i,b);});
$('fSpk').addEventListener('click',function(){if(st)speak(lower(st.order.word));});
$('fAgain').addEventListener('click',function(){O.audio.play('tap');open();});
O.nav.on('forest',open);}
O.forest={init:init,peek:function(){return st;}};})();
