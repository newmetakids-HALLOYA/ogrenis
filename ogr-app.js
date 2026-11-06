(function(){var O=window.OGR=window.OGR||{},VER='0.5.0';
var info={orman:['Kelime Ormanı','#6fcf7d'],istasyon:['Tren İstasyonu','#5aa9e6'],firin:['Fırın','#ff9b54'],ev:['Evim','#ff8a5b'],gorev:['Görev panosu','#ffcf4a']};
function $(id){return document.getElementById(id);}
function banner(t){try{var d=document.createElement('div');d.style.cssText='position:fixed;left:8px;right:8px;top:8px;z-index:99;background:#fff3d6;border:3px solid #35506b;border-radius:16px;padding:10px 12px;font:700 14px system-ui,sans-serif;color:#35506b;white-space:pre-wrap';d.textContent=t;document.body.appendChild(d);}catch(e){}}
function problems(){var n={errors:'ogr-errors.js',state:'ogr-state.js',audio:'ogr-audio.js',learning:'ogr-learning.js',nav:'ogr-nav.js',player:'ogr-player.js',world:'ogr-world.js',garden:'ogr-garden.js',bakery:'ogr-bakery.js'},m=[];
for(var k in n)if(!O[k])m.push(n[k]+' (yüklenmemiş)');
if(!(O.data&&O.data.math))m.push('ogr-math-data.js (yüklenmemiş)');
if(O.state&&!Array.isArray(O.state.get().found))m.push('ogr-state.js (eski sürüm)');
if(!$('walker'))m.push('index.html (eski sürüm)');return m;}
function safe(f){try{f();}catch(e){if(O.errors)O.errors.add(e);banner('Hata: '+(e&&e.message));}}
function renderLog(){var l=O.errors.list();$('logBox').textContent=l.length?l.join('\n'):'Kayıtlı hata yok.';}
function paint(d){$('starCount').textContent=d.stars;var b=$('soundBtn');b.textContent=d.settings.sound?'Ses açık':'Ses kapalı';b.setAttribute('aria-pressed',String(d.settings.sound));}
function init(){
if(!O.state){banner('Eksik dosya: ogr-state.js\nGitHub\'a yüklenmemiş olabilir.');return;}
O.state.init();
var p=problems();if(p.length){banner('Sorun var, şu dosyaları yeniden yükle:\n'+p.join('\n'));return;}
try{history.replaceState({s:'home'},'');}catch(e){}
O.state.update(function(d){d.sessions+=1;});
O.state.subscribe(paint);paint(O.state.get());
document.addEventListener('click',function(e){
var t=e.target.closest('[data-place]');
if(t){var k=t.getAttribute('data-place');t.classList.remove('pop');void t.getBoundingClientRect();t.classList.add('pop');O.audio.play('tap');
if(k==='ayar')O.nav.go('settings');else if(info[k])O.world.visit(k,function(){var sc={ev:'garden',firin:'bakery'};O.nav.go(sc[k]||'soon',{key:k});});return;}
var b=e.target.closest('[data-act]');if(!b)return;var a=b.getAttribute('data-act');
if(a==='back'){O.audio.play('back');O.nav.back();}
else if(a==='sound'){O.state.update(function(d){d.settings.sound=!d.settings.sound;});O.audio.play('ok');}
else if(a==='log'){O.nav.go('log');}
else if(a==='clearlog'){O.errors.clear();renderLog();}
else if(a==='copylog'){try{navigator.clipboard.writeText(O.errors.list().join('\n'));b.textContent='Kopyalandı';}catch(x){b.textContent='Kopyalanamadı';}}
});
document.addEventListener('keydown',function(e){if(e.key!=='Enter'&&e.key!==' ')return;var t=e.target.closest&&e.target.closest('[data-place]');
if(t&&t.tagName!=='BUTTON'){e.preventDefault();t.dispatchEvent(new MouseEvent('click',{bubbles:true}));}});
O.nav.on('soon',function(q){var d=info[q.key]||['Alan','#ffcf4a'];$('soonTitle').textContent=d[0];$('soonIcon').style.setProperty('--c',d[1]);});
O.nav.on('log',renderLog);
O.nav.on('settings',function(){$('ver').textContent='Sürüm '+VER;});
safe(O.player.init);safe(O.world.init);safe(O.garden.init);safe(O.bakery.init);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();})();
