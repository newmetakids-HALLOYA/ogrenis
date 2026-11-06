(function(){var O=window.OGR=window.OGR||{};O.data=O.data||{};
var ALPHA='ABCÇDEFGĞHIİJKLMNOÖPRSŞTUÜVYZ'.split(''),K='#35506b',S=' stroke="'+K+'" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"';
function p(x){return '<svg viewBox="0 0 80 80" aria-hidden="true">'+x+'</svg>';}
var C=function(x,y,r,f){return '<circle cx="'+x+'" cy="'+y+'" r="'+r+'" fill="'+f+'"'+S+'/>';};
var D=function(x,y){return '<circle cx="'+x+'" cy="'+y+'" r="3" fill="'+K+'"/>';};
var W=[
{w:'AY',s:['AY'],pic:p('<path d="M40 8A32 32 0 1 0 40 72A24 24 0 1 1 40 8Z" fill="#ffcf4a"'+S+'/>')},
{w:'EV',s:['EV'],pic:p('<rect x="16" y="38" width="48" height="34" rx="4" fill="#fff3d6"'+S+'/><path d="M10 40L40 12L70 40Z" fill="#ff8a5b"'+S+'/><rect x="34" y="50" width="14" height="22" rx="6" fill="#8a5a3c"'+S+'/>')},
{w:'TOP',s:['TOP'],pic:p(C(40,40,28,'#ff7a6b')+'<path d="M14 30Q40 50 66 30" fill="none" stroke="#fff" stroke-width="5"/>')},
{w:'SU',s:['SU'],pic:p('<path d="M40 8Q60 34 60 50A20 20 0 0 1 20 50Q20 34 40 8Z" fill="#7ccbff"'+S+'/>')},
{w:'ELMA',s:['EL','MA'],pic:p(C(40,46,26,'#ff7a6b')+'<path d="M40 22Q40 12 46 8" fill="none"'+S+'/><path d="M44 16Q58 8 62 20Q50 24 44 16Z" fill="#6fcf7d"'+S+'/>')},
{w:'KEDİ',s:['KE','Dİ'],pic:p('<path d="M16 34L18 8L36 22Z" fill="#ffb347"'+S+'/><path d="M64 34L62 8L44 22Z" fill="#ffb347"'+S+'/>'+C(40,46,26,'#ffb347')+D(30,44)+D(50,44)+'<path d="M34 54Q40 60 46 54" fill="none"'+S+'/>')},
{w:'KALEM',s:['KA','LEM'],pic:p('<g transform="rotate(-40 40 40)"><rect x="10" y="30" width="46" height="20" fill="#ffcf4a"'+S+'/><path d="M56 30L72 40L56 50Z" fill="#fff3d6"'+S+'/><path d="M66 36L72 40L66 44Z" fill="'+K+'"/></g>')},
{w:'BALIK',s:['BA','LIK'],pic:p('<path d="M54 40L74 24L74 56Z" fill="#5aa9e6"'+S+'/><ellipse cx="34" cy="40" rx="26" ry="17" fill="#5aa9e6"'+S+'/>'+D(22,36))},
{w:'ÇİÇEK',s:['Çİ','ÇEK'],pic:p('<path d="M40 44V74" fill="none"'+S+'/>'+[[40,18],[58,30],[52,50],[28,50],[22,30]].map(function(q){return C(q[0],q[1]-4,11,'#ff9bd0');}).join('')+C(40,34,9,'#ffcf4a'))},
{w:'ARABA',s:['A','RA','BA'],pic:p('<path d="M22 40L30 22H52L60 40Z" fill="#bfe7ff"'+S+'/><rect x="8" y="38" width="64" height="22" rx="9" fill="#5aa9e6"'+S+'/>'+C(24,62,8,'#fff3d6')+C(56,62,8,'#fff3d6'))},
{w:'KUŞ',s:['KUŞ'],pic:p('<path d="M58 38L74 44L58 50Z" fill="#ff9b54"'+S+'/>'+C(38,44,22,'#7ccbff')+D(48,38)+'<path d="M22 46Q32 62 44 52" fill="none"'+S+'/>')},
{w:'DAĞ',s:['DAĞ'],pic:p('<path d="M6 66L30 24L46 50L58 34L76 66Z" fill="#8fcf8a"'+S+'/><path d="M30 24L22 38L30 34L36 40Z" fill="#fff"'+S+'/>')},
{w:'AĞAÇ',s:['A','ĞAÇ'],pic:p('<rect x="35" y="44" width="10" height="28" rx="3" fill="#b9824f"'+S+'/>'+C(40,32,24,'#4aaa6b'))}];
function r(a,b){return a+Math.floor(Math.random()*(b-a+1));}
function sh(a){return a.slice().sort(function(){return Math.random()-.5;});}
var TOP={m:{topic:'harf',objective:'Kelimedeki eksik harfi bulur'},h:{topic:'hece',objective:'Heceleri sıralayarak kelime oluşturur'},k:{topic:'kelime',objective:'Harfleri sıralayarak kelime oluşturur'}};
var L={1:['m'],2:['m','h','h'],3:['h','k','k']};
function pool(k){return W.filter(function(x){return k==='m'?x.w.length>=3:k==='h'?x.s.length>=2:true;});}
O.data.tr={words:W,topics:TOP,levels:L,maxLevel:3,
make:function(level,prev,used){var l=L[level]||L[1],k=l[r(0,l.length-1)],t=0;while(k===prev&&t++<4)k=l[r(0,l.length-1)];
var pl=pool(k),fr=pl.filter(function(x){return used.indexOf(x.w)<0;});if(fr.length)pl=fr;var e=pl[r(0,pl.length-1)],ch=e.w.split(''),o={k:k,word:e.w,syl:e.s,pic:e.pic};
if(k==='m'){var i=r(0,ch.length-1),c=ch[i],ds=sh(ALPHA.filter(function(x){return x!==c;})).slice(0,3);o.idx=i;o.letter=c;o.tiles=sh([c].concat(ds));}
else if(k==='h'){var ot=[];W.forEach(function(x){x.s.forEach(function(s){if(e.s.indexOf(s)<0&&ot.indexOf(s)<0&&s.length>1)ot.push(s);});});o.tiles=sh(e.s.concat(sh(ot).slice(0,e.s.length<3?2:1)));}
else{var ex=sh(ALPHA.filter(function(x){return ch.indexOf(x)<0;})).slice(0,2);o.tiles=sh(ch.concat(ex));}
o.topic=TOP[k].topic;o.objective=TOP[k].objective;return o;}};})();
