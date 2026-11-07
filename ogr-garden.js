(function(){var O=window.OGR=window.OGR||{};
var FC=['#ff7a6b','#ffcf4a','#ff9bd0','#7ccbff','#ff9b54','#c5a3ff'],IK='#35506b';
function plot(st,i){var s='<svg viewBox="0 0 100 100" aria-hidden="true"><ellipse cx="50" cy="78" rx="34" ry="14" fill="#9a6a45" stroke="'+IK+'" stroke-width="3"/>';
if(st===1)s+='<ellipse cx="50" cy="71" rx="7" ry="5" fill="#d9a441" stroke="'+IK+'" stroke-width="2.5"/>';
if(st>=2){s+='<path d="M50 74V44" stroke="'+IK+'" stroke-width="9" stroke-linecap="round"/><path d="M50 74V44" stroke="#4aaa6b" stroke-width="4.5" stroke-linecap="round"/>';
s+='<path d="M50 64Q34 60 32 48Q46 48 50 64Z" fill="#6fcf7d" stroke="'+IK+'" stroke-width="2.5" stroke-linejoin="round"/>';
if(st===2)s+='<path d="M50 58Q66 54 68 42Q54 42 50 58Z" fill="#6fcf7d" stroke="'+IK+'" stroke-width="2.5" stroke-linejoin="round"/>';}
if(st===3){for(var k=0;k<5;k++){var a=k*1.2566-1.5708;s+='<circle cx="'+(50+13*Math.cos(a)).toFixed(1)+'" cy="'+(36+13*Math.sin(a)).toFixed(1)+'" r="9" fill="'+FC[i%6]+'" stroke="'+IK+'" stroke-width="2.5"/>';}
s+='<circle cx="50" cy="36" r="8" fill="#ffcf4a" stroke="'+IK+'" stroke-width="2.5"/>';}
return s+'</svg>';}
function size(d){return d.gardenSize===9?9:6;}
function plots(){var d=O.state.get(),n=size(d),g=Array.isArray(d.garden)?d.garden.slice(0,n):[];while(g.length<n)g.push(0);return g;}
var NAMES=['boş toprak','tohum','filiz','çiçek'];
function render(){var g=plots(),h='',n=0;g.forEach(function(s,i){if(s===3)n++;h+='<button class="plot" data-i="'+i+'" aria-label="Parsel '+(i+1)+', '+NAMES[s]+'">'+plot(s,i)+'</button>';});
var gd=document.getElementById('gGrid');gd.innerHTML=h;gd.classList.toggle('g9',g.length===9);
var dec=O.state.get().placed||[],it=O.data.quests?O.data.quests.items:[];document.getElementById('gDecor').innerHTML=dec.map(function(id){var x=it.filter(function(y){return y.id===id;})[0];return x?'<div class="dc">'+x.icon+'</div>':'';}).join('');
document.getElementById('gCount').textContent=n?n+' çiçek açtı':'Henüz çiçek yok';}
function init(){document.getElementById('gGrid').addEventListener('click',function(e){var b=e.target.closest('.plot');if(!b)return;var i=+b.dataset.i,bloom=false;
O.state.update(function(d){if(!Array.isArray(d.garden))d.garden=[];while(d.garden.length<size(d))d.garden.push(0);var s=d.garden[i];if(s<3){d.garden[i]=s+1;if(s===2){d.stars+=1;bloom=true;}}});
O.audio.play(bloom?'ok':'tap');render();var nb=document.querySelector('#gGrid .plot[data-i="'+i+'"]');if(nb){nb.classList.add('pop');}});
O.nav.on('garden',render);}
O.garden={init:init,plot:plot};})();
