(function(){var O=window.OGR=window.OGR||{};var KEY='ogrenis_save',VERSION=1,data=null,timer=null,subs=[];
function defaults(){return{version:VERSION,player:{name:'',look:null},stars:0,unlocked:['ev','firin','istasyon','orman','gorev'],completed:[],found:[],garden:[0,0,0,0,0,0],settings:{sound:true},learning:[],sessions:0};}
function merge(base,src){if(!src||typeof src!=='object')return base;for(var k in base){if(Object.prototype.hasOwnProperty.call(src,k)){var b=base[k];if(b&&typeof b==='object'&&!Array.isArray(b))base[k]=merge(b,src[k]);else if(b===null||typeof src[k]===typeof b)base[k]=src[k];}}return base;}
function load(){var raw=null;try{raw=localStorage.getItem(KEY);}catch(e){}var d=defaults();
if(raw){try{d=merge(d,JSON.parse(raw));d.version=VERSION;}catch(e){O.errors&&O.errors.add('Kayıt okunamadı, yeni kayıt açıldı');try{localStorage.setItem(KEY+'_bozuk',raw);}catch(x){}d=defaults();}}
data=d;return data;}
function flush(){clearTimeout(timer);try{localStorage.setItem(KEY,JSON.stringify(data));return true;}catch(e){O.errors&&O.errors.add('Kayıt yazılamadı');return false;}}
function emit(){subs.forEach(function(f){try{f(data);}catch(e){O.errors&&O.errors.add(e);}});}
O.state={init:load,get:function(){return data||load();},
update:function(fn){fn(this.get());clearTimeout(timer);timer=setTimeout(flush,300);emit();},
subscribe:function(f){subs.push(f);},flush:flush,reset:function(){data=defaults();flush();emit();}};
window.addEventListener('pagehide',flush);document.addEventListener('visibilitychange',function(){if(document.hidden&&data)flush();});})();
