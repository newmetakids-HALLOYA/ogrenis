(function(){var O=window.OGR=window.OGR||{};
var SKIN=['#fbd5b5','#f6c9a0','#e0a578','#c68642','#a0673c','#6e4326'];
var HAIRC=['#6b4430','#2d3047','#d9a441','#e07a3f','#f08ab0','#5aa9e6'];
var OUTC=['#ff7a6b','#5aa9e6','#6fcf7d','#ffcf4a'];
var CATS=[{k:'hair',t:'Saç',items:['Kısa','Uzun','Topuz','Kıvırcık']},{k:'hairColor',t:'Saç rengi',sw:HAIRC},{k:'skin',t:'Cilt',sw:SKIN},
{k:'outfit',t:'Kıyafet',sw:OUTC},{k:'face',t:'Yüz',items:['Gülen','Neşeli','Göz kırpan']},{k:'acc',t:'Süs',items:['Yok','Gözlük','Kurdele','Bere']}];
var MAX={hair:4,hairColor:6,skin:6,outfit:4,face:3,acc:4},INK='#35506b';
function def(){return{hair:0,hairColor:0,skin:1,outfit:0,face:0,acc:0};}
function norm(l){var d=def();if(l&&typeof l==='object')for(var k in MAX){var v=l[k];if(typeof v==='number'&&v>=0&&v<MAX[k]&&v%1===0)d[k]=v;}return d;}
function render(look){var l=norm(look),sk=SKIN[l.skin],hc=HAIRC[l.hairColor],oc=OUTC[l.outfit],back='',front='',h=l.hair;
var F=' fill="'+hc+'" class="o"';
if(h===1)back='<path d="M-28 -16Q-30 -46 0 -46Q30 -46 28 -16L31 24Q0 32 -31 24Z"'+F+'/>';
if(h===2)back='<circle cx="0" cy="-49" r="11"'+F+'/>';
if(h===3)back='<g class="o" fill="'+hc+'"><circle cx="-21" cy="-30" r="11"/><circle cx="-9" cy="-41" r="11"/><circle cx="6" cy="-43" r="11"/><circle cx="19" cy="-36" r="11"/><circle cx="-26" cy="-16" r="9"/><circle cx="26" cy="-16" r="9"/></g>';
front=h===3?'<path d="M-20 -24Q0 -38 20 -24Q8 -30 0 -29Q-10 -30 -20 -24Z" fill="'+hc+'"/>':'<path d="M-26 -14Q-27 -43 0 -43Q27 -43 26 -14Q14 -28 -2 -26Q-17 -24 -26 -14Z"'+F+'/>';
var legs='<rect x="-13" y="42" width="11" height="18" rx="5" fill="#4b5d8a" class="o"/><rect x="2" y="42" width="11" height="18" rx="5" fill="#4b5d8a" class="o"/>';
var body='<rect x="-21" y="8" width="42" height="40" rx="17" fill="'+oc+'" class="o"/>';
if(l.outfit===0)body+='<rect x="-19" y="26" width="38" height="7" fill="#ffcf4a"/>';
if(l.outfit===1)body+='<circle cx="0" cy="28" r="6" fill="#fff"/>';
if(l.outfit===2)body+='<rect x="-13" y="9" width="6" height="22" rx="3" fill="#2f8f5a"/><rect x="7" y="9" width="6" height="22" rx="3" fill="#2f8f5a"/>';
if(l.outfit===3)body+='<path d="M-9 9Q0 19 9 9" fill="none" stroke="'+INK+'" stroke-width="3" stroke-linecap="round"/>';
var arms='<circle cx="-23" cy="30" r="7" fill="'+sk+'" class="o"/><circle cx="23" cy="30" r="7" fill="'+sk+'" class="o"/>';
var head='<circle cx="0" cy="-14" r="25" fill="'+sk+'" class="o"/>';
var eyeL=l.face===2?'<path d="M-13 -10Q-9 -15 -5 -10" fill="none" stroke="'+INK+'" stroke-width="2.6" stroke-linecap="round"/>':'<circle cx="-9" cy="-10" r="3.2" fill="'+INK+'"/>';
var eyes=eyeL+'<circle cx="9" cy="-10" r="3.2" fill="'+INK+'"/><circle cx="-15" cy="-2" r="4.5" fill="#ff9aa2" opacity=".55"/><circle cx="15" cy="-2" r="4.5" fill="#ff9aa2" opacity=".55"/>';
var mouth=l.face===1?'<path d="M-6 -3Q0 8 6 -3Z" fill="#ff8a8a" stroke="'+INK+'" stroke-width="2.4" stroke-linejoin="round"/>':'<path d="M-6 -2Q0 4 6 -2" fill="none" stroke="'+INK+'" stroke-width="2.6" stroke-linecap="round"/>';
var acc='';
if(l.acc===1)acc='<g fill="#fff" fill-opacity=".35" stroke="'+INK+'" stroke-width="2.5"><circle cx="-9" cy="-10" r="8"/><circle cx="9" cy="-10" r="8"/><path d="M-1 -10H1"/></g>';
if(l.acc===2)acc='<g class="o" fill="#ff7a6b"><path d="M-17 -40L-29 -48L-27 -32Z"/><path d="M-17 -40L-5 -48L-7 -32Z"/><circle cx="-17" cy="-40" r="4" fill="#ffcf4a"/></g>';
if(l.acc===3)acc='<path d="M-26 -20Q-27 -49 0 -49Q27 -49 26 -20Q0 -26 -26 -20Z" fill="#5aa9e6" class="o"/><rect x="-27" y="-26" width="54" height="10" rx="5" fill="#fff3d6" class="o"/><circle cx="0" cy="-52" r="6" fill="#fff" class="o"/>';
return '<ellipse cx="0" cy="62" rx="24" ry="6" fill="#2f6f45" opacity=".3"/><g class="bob2">'+back+legs+body+arms+head+front+eyes+mouth+acc+'</g>';}
var draft=def(),first=false;
function $(id){return document.getElementById(id);}
function drawPreview(){$('prevSvg').innerHTML=render(draft);}
function mark(){var c=document.querySelectorAll('#opts .chip');for(var i=0;i<c.length;i++){var on=draft[c[i].dataset.k]===+c[i].dataset.i;c[i].classList.toggle('sel',on);c[i].setAttribute('aria-pressed',String(on));}}
function build(){var h='';CATS.forEach(function(c){h+='<div class="row"><b>'+c.t+'</b><div class="chips">';
if(c.sw)c.sw.forEach(function(col,i){h+='<button class="chip sw" data-k="'+c.k+'" data-i="'+i+'" style="--c:'+col+'" aria-label="'+c.t+' '+(i+1)+'"></button>';});
else c.items.forEach(function(t,i){h+='<button class="chip" data-k="'+c.k+'" data-i="'+i+'">'+t+'</button>';});
h+='</div></div>';});$('opts').innerHTML=h;}
function open(isFirst){first=isFirst;var p=O.state.get().player;draft=norm(p.look);$('nameIn').value=p.name||'';$('hint').textContent='Gerçek adını yazmak zorunda değilsin.';build();drawPreview();mark();}
function paintHome(){var p=O.state.get().player,s=$('playerSlot'),h=$('hello');if(s)s.innerHTML=render(p.look);if(h)h.textContent=p.name?'Merhaba, '+p.name+'!':'Merhaba!';}
function save(){var n=$('nameIn').value.trim();if(n.length<2){$('hint').textContent='Bir isim yaz, en az 2 harf olsun.';$('nameIn').focus();return;}
O.state.update(function(d){d.player={name:n,look:norm(draft)};});O.audio.play('ok');paintHome();if(first)O.nav.replace('home');else O.nav.back();}
function init(){
$('opts').addEventListener('click',function(e){var c=e.target.closest('.chip');if(!c)return;draft[c.dataset.k]=+c.dataset.i;drawPreview();mark();O.audio.play('tap');});
$('nameIn').addEventListener('input',function(){var v=this.value.replace(/[^A-Za-zÇĞİÖŞÜçğıöşüÂâÎîÛû ]/g,'').replace(/ +/g,' ').replace(/^ /,'');if(v!==this.value)this.value=v;});
$('saveBtn').addEventListener('click',save);
document.addEventListener('click',function(e){if(e.target.closest('[data-act="editchar"]')){open(false);O.audio.play('tap');O.nav.go('create');}});
paintHome();if(!O.state.get().player.name){open(true);O.nav.replace('create');}}
O.player={render:render,norm:norm,init:init};})();
