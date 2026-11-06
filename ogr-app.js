(function(){var O=window.OGR,VER='0.2.0';
var info={orman:['Kelime Ormanı','#6fcf7d'],istasyon:['Tren İstasyonu','#5aa9e6'],firin:['Fırın','#ff9b54'],ev:['Evim','#ff8a5b'],gorev:['Görev panosu','#ffcf4a']};
function $(id){return document.getElementById(id);}
function renderLog(){var l=O.errors.list();$('logBox').textContent=l.length?l.join('\n'):'Kayıtlı hata yok.';}
function paint(d){$('starCount').textContent=d.stars;var b=$('soundBtn');b.textContent=d.settings.sound?'Ses açık':'Ses kapalı';b.setAttribute('aria-pressed',String(d.settings.sound));}
function init(){
O.state.init();try{history.replaceState({s:'home'},'');}catch(e){}
O.state.update(function(d){d.sessions+=1;});
O.state.subscribe(paint);paint(O.state.get());
document.addEventListener('click',function(e){
var t=e.target.closest('[data-place]');
if(t){var k=t.getAttribute('data-place');t.classList.remove('pop');void t.getBoundingClientRect();t.classList.add('pop');O.audio.play('tap');
if(k==='ayar')O.nav.go('settings');else if(info[k])O.nav.go('soon',{key:k});return;}
var b=e.target.closest('[data-act]');if(!b)return;var a=b.getAttribute('data-act');
if(a==='back'){O.audio.play('back');O.nav.back();}
else if(a==='sound'){O.state.update(function(d){d.settings.sound=!d.settings.sound;});O.audio.play('ok');}
else if(a==='log'){O.nav.go('log');}
else if(a==='clearlog'){O.errors.clear();renderLog();}
else if(a==='copylog'){try{navigator.clipboard.writeText(O.errors.list().join('\n'));b.textContent='Kopyalandı';}catch(x){b.textContent='Kopyalanamadı';}}
});
document.addEventListener('keydown',function(e){if(e.key!=='Enter'&&e.key!==' ')return;var t=e.target.closest&&e.target.closest('[data-place]');
if(t&&t.tagName!=='BUTTON'){e.preventDefault();t.dispatchEvent(new MouseEvent('click',{bubbles:true}));}});
O.nav.on('soon',function(p){var d=info[p.key]||['Alan','#ffcf4a'];$('soonTitle').textContent=d[0];$('soonIcon').style.setProperty('--c',d[1]);});
O.nav.on('log',renderLog);
O.nav.on('settings',function(){$('ver').textContent='Sürüm '+VER;});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();})();
