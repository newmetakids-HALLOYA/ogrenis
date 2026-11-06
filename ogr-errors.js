(function(){var O=window.OGR=window.OGR||{};var K='ogrenis_hatalar',list=[];
try{list=JSON.parse(localStorage.getItem(K))||[];}catch(e){list=[];}
function add(m){var t=new Date().toLocaleString('tr-TR');list.push(t+' – '+String(m).slice(0,300));if(list.length>30)list.shift();try{localStorage.setItem(K,JSON.stringify(list));}catch(e){}}
window.addEventListener('error',function(e){add((e.message||'Hata')+' ('+String(e.filename||'').split('/').pop()+':'+e.lineno+')');});
window.addEventListener('unhandledrejection',function(e){add('Söz hatası: '+(e.reason&&e.reason.message||e.reason));});
O.errors={add:add,list:function(){return list.slice();},clear:function(){list=[];try{localStorage.removeItem(K);}catch(e){}}};})();
