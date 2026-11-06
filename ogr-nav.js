(function(){var O=window.OGR=window.OGR||{};var cur='home',hooks={};
function show(id,p){var els=document.querySelectorAll('.screen');
for(var i=0;i<els.length;i++){var on=els[i].id==='screen-'+id;els[i].classList.toggle('active',on);els[i].setAttribute('aria-hidden',on?'false':'true');els[i].inert=!on;}
cur=id;if(hooks[id]){try{hooks[id](p||{});}catch(e){O.errors.add(e);}}}
function go(id,p){if(id===cur)return;try{history.pushState({s:id,p:p||{}},'');}catch(e){}show(id,p);}
function back(){if(cur==='home')return;if(history.state&&history.state.s)history.back();else show('home');}
window.addEventListener('popstate',function(e){var s=e.state&&e.state.s||'home';show(s,e.state&&e.state.p);});
function replace(id){try{history.replaceState({s:id,p:{}},'');}catch(e){}show(id);}
O.nav={go:go,replace:replace,back:back,on:function(id,f){hooks[id]=f;},current:function(){return cur;}};})();
