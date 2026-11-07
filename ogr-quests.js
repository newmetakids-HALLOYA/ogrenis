(function(){var O=window.OGR=window.OGR||{};var msgT=null;
function $(i){return document.getElementById(i);}
function Q(){return O.data.quests;}
function today(){var t=new Date();return t.getFullYear()+'-'+(t.getMonth()+1)+'-'+t.getDate();}
function ensure(){O.state.update(function(d){var q=d.quests,C=Q();
if(!q.chain.done&&q.chain.base===null)q.chain.base=C.counter(d,C.chain[q.chain.step].c);
if(q.daily.date!==today()){var v=C.daily.filter(function(x){return !x.ok||x.ok(d);}).sort(function(){return Math.random()-.5;}).slice(0,3);
q.daily={date:today(),items:v.map(function(x){return{id:x.id,base:C.counter(d,x.c),claimed:false};})};}});}
function msg(t){var m=$('qMsg');m.textContent=t;clearTimeout(msgT);msgT=setTimeout(function(){m.textContent='';},4000);}
function card(tag,text,p,n,id,claimed){var ready=!claimed&&p>=n;
return '<div class="qc'+(ready?' ready':'')+(claimed?' done':'')+'"><div class="qt"><b>'+tag+'</b><span>'+text+'</span><div class="bar"><i style="width:'+Math.round(100*Math.min(p,n)/n)+'%"></i></div><small>'+Math.min(p,n)+' / '+n+'</small></div>'+
(ready?'<button class="big q-claim" data-q="'+id+'">Al</button>':claimed?'<span class="chk">✓</span>':'')+'</div>';}
function render(){ensure();var d=O.state.get(),C=Q(),q=d.quests,h='';
if(!q.chain.done){var s=C.chain[q.chain.step];h+=card('Macera: Kayıp Tren '+(q.chain.step+1)+'/'+C.chain.length,s.t,C.counter(d,s.c)-q.chain.base,s.n,'chain',false);}
q.daily.items.forEach(function(it,i){var def=C.daily.filter(function(x){return x.id===it.id;})[0];if(def)h+=card('Bugün · '+def.tag,def.t,C.counter(d,def.c)-it.base,def.n,'daily:'+i,it.claimed);});
C.once.forEach(function(o){var cl=q.claimed.indexOf(o.id)>=0;h+=card(o.tag,o.t,C.counter(d,o.c),o.n,'once:'+o.id,cl);});
$('qList').innerHTML=h;}
function claim(id){var ok=false,done=false;
O.state.update(function(d){var q=d.quests,C=Q();
if(id==='chain'&&!q.chain.done){var s=C.chain[q.chain.step];if(C.counter(d,s.c)-q.chain.base<s.n)return;ok=true;d.stars+=1;q.chain.step++;
if(q.chain.step>=C.chain.length){q.chain.done=true;q.claimed.push('chain');d.gardenSize=9;while(d.garden.length<9)d.garden.push(0);done=true;}else q.chain.base=C.counter(d,C.chain[q.chain.step].c);}
else if(id.indexOf('daily:')===0){var it=q.daily.items[+id.slice(6)],def=it&&C.daily.filter(function(x){return x.id===it.id;})[0];if(!def||it.claimed||C.counter(d,def.c)-it.base<def.n)return;it.claimed=true;d.stars+=1;ok=true;}
else if(id.indexOf('once:')===0){var o=C.once.filter(function(x){return x.id===id.slice(5);})[0];if(!o||q.claimed.indexOf(o.id)>=0||C.counter(d,o.c)<o.n)return;q.claimed.push(o.id);d.stars+=1;ok=true;}});
if(!ok)return;O.audio.play('ok');
if(done)msg('Kayıp Tren yola çıktı! Bahçen büyüdü, 3 yeni parsel açıldı.');else msg('+1 yıldız kazandın!');render();}
function rewards(){var d=O.state.get(),C=Q(),h='';$('rwStars').textContent='Yıldızlarım: '+d.stars;
C.items.forEach(function(it){var un=it.stars?d.stars>=it.stars:d.quests.claimed.indexOf(it.quest)>=0,on=d.placed.indexOf(it.id)>=0;
h+='<button class="it'+(un?'':' lock')+(on?' on':'')+'" data-it="'+it.id+'"'+(un?'':' disabled')+'>'+it.icon+'<span>'+it.name+'</span><small>'+(un?(on?'Evde':'Evime koy'):(it.stars?it.stars+' yıldız':it.hint))+'</small></button>';});
$('rwGrid').innerHTML=h;}
function init(){
$('qList').addEventListener('click',function(e){var b=e.target.closest('.q-claim');if(b)claim(b.dataset.q);});
$('rwGrid').addEventListener('click',function(e){var b=e.target.closest('.it');if(!b||b.disabled)return;var id=b.dataset.it;
O.state.update(function(d){var i=d.placed.indexOf(id);if(i>=0)d.placed.splice(i,1);else{d.placed.push(id);if(d.placed.length>4)d.placed.shift();}});O.audio.play('tap');rewards();});
O.nav.on('quests',function(){$('qMsg').textContent='';render();});O.nav.on('rewards',rewards);}
O.quests={init:init};})();
