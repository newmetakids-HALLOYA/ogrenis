(function(){var O=window.OGR=window.OGR||{};var timer=null;
var G={bakery:{name:'Fırıncı (matematik)',topics:['sayma','toplama','cikarma'],max:function(){return O.data.math.maxLevel;}},
forest:{name:'Kelime Ormanı (Türkçe)',topics:['harf','hece','kelime'],max:function(){return O.data.tr.maxLevel;}},
train:{name:'Tren İstasyonu (karma)',topics:['eksik_sayi','sayi_siralama','kelime_okuma'],max:function(){return O.data.train.maxLevel;}}};
var LABEL={sayma:'Sayma',toplama:'Toplama',cikarma:'Çıkarma',harf:'Eksik harf bulma',hece:'Hece sıralama',kelime:'Kelime oluşturma',eksik_sayi:'Eksik sayıyı bulma',sayi_siralama:'Sayı sıralama',kelime_okuma:'Kelime okuma'};
var TXT={yeni:'Henüz az etkinlik',guclu:'Başarılı',gelisiyor:'Gelişiyor',zorlaniyor:'Biraz daha tekrar faydalı olabilir'};
function ev(d,topics,diff,n){return d.learning.filter(function(x){return topics.indexOf(x.k)>-1&&(diff===null||x.d===diff);}).slice(-n);}
function stat(a){var s={};a.forEach(function(x){s[x.n||0]=1;});var c=a.filter(function(x){return x.c;}).length;return{total:a.length,correct:c,rate:a.length?c/a.length:0,sessions:Object.keys(s).length};}
function status(s){if(s.total<10||s.sessions<2)return 'yeni';return s.rate>=.85?'guclu':s.rate<.6?'zorlaniyor':'gelisiyor';}
function topic(d,k){var s=stat(ev(d,[k],null,20));s.status=status(s);return s;}
function lvl(d,g){var L=d[g].level;return L>=1&&L<=G[g].max()?L:1;}
function review(d,g){return G[g].topics.filter(function(k){var s=topic(d,k);return s.status==='zorlaniyor'||(s.status==='gelisiyor'&&s.rate<.7);});}
function levelFor(g){var d=O.state.get(),L=lvl(d,g),r=stat(ev(d,G[g].topics,L,12));
return{level:L,support:r.total>=8&&r.sessions>=2&&r.rate<.5,prefer:review(d,g)};}
function afterSession(g){var up=false;O.state.update(function(d){var L=lvl(d,g),r=stat(ev(d,G[g].topics,L,30));
if(L<G[g].max()&&r.total>=10&&r.sessions>=2&&r.rate>=.8){d[g].level=L+1;up=true;}});return up;}
function today(){var t=new Date();return t.getFullYear()+'-'+(t.getMonth()+1)+'-'+t.getDate();}
function tick(){if(document.hidden)return;O.state.update(function(d){var k=today();d.time.total+=15;d.time.byDay[k]=(d.time.byDay[k]||0)+15;
var ks=Object.keys(d.time.byDay);if(ks.length>60)delete d.time.byDay[ks[0]];});}
function start(){clearInterval(timer);timer=setInterval(tick,15000);}
function min(s){return Math.round(s/60);}
function summary(){var d=O.state.get(),out=[];
Object.keys(G).forEach(function(g){var ts=G[g].topics.map(function(k){var s=topic(d,k);return{k:k,label:LABEL[k],total:s.total,correct:s.correct,status:s.status,text:TXT[s.status]};});out.push({key:g,name:G[g].name,level:lvl(d,g),topics:ts});});
return{games:out,todayMin:min(d.time.byDay[today()]||0),totalMin:min(d.time.total)};}
function render(){var s=summary(),h='<p class="note">Bu özet yalnızca uygulama içindeki etkinlik performansını gösterir.</p><div class="sm-t">Bugün: '+s.todayMin+' dk · Toplam: '+s.totalMin+' dk</div>';
s.games.forEach(function(g){h+='<div class="qc sm"><div class="qt"><b>'+g.name+' · Seviye '+g.level+'</b>';
g.topics.forEach(function(t){h+='<div class="sl2"><span>'+t.label+'</span><span>'+(t.total?t.correct+' / '+t.total+' doğru':'–')+'</span><em class="st-'+t.status+'">'+t.text+'</em></div>';});h+='</div></div>';});
document.getElementById('smList').innerHTML=h;}
function init(){O.nav.on('summary',render);start();}
O.engine={init:init,levelFor:levelFor,afterSession:afterSession,summary:summary,topic:topic,review:review};})();
