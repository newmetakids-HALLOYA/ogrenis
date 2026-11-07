(function(){var O=window.OGR=window.OGR||{};O.data=O.data||{};
function r(a,b){return a+Math.floor(Math.random()*(b-a+1));}
var T={sayma:{subject:'matematik',grade:1,label:'Sayma',objective:'Nesneleri 10\'a kadar sayar',verified:false},
toplama:{subject:'matematik',grade:1,label:'Toplama',objective:'Toplamı 10\'u geçmeyen iki sayıyı toplar',verified:false},
cikarma:{subject:'matematik',grade:1,label:'Çıkarma',objective:'10 içinde çıkarma yapar',verified:false}};
var L={1:['c5'],2:['c5','c10','c10'],3:['c10','add','add'],4:['add','sub','sub']};
O.data.math={topics:T,levels:L,maxLevel:4,
make:function(level,prev,pf){var l=L[level]||L[1],k=l[r(0,l.length-1)],t=0,n,a,b;while(k===prev&&t++<4)k=l[r(0,l.length-1)];var TM={c5:'sayma',c10:'sayma',add:'toplama',sub:'cikarma'};if(pf&&pf.length&&Math.random()<.5){var cc=l.filter(function(x){return pf.indexOf(TM[x])>-1;});if(cc.length)k=cc[r(0,cc.length-1)];}
if(k==='c5'||k==='c10'){n=k==='c5'?r(1,5):r(6,10);return{k:k,topic:'sayma',target:n,text:n+' simit istiyorum.'};}
if(k==='add'){a=r(1,5);b=r(1,Math.min(5,10-a));return{k:k,topic:'toplama',a:a,b:b,target:a+b,answer:a+b,text:a+' simit ve '+b+' simit daha istiyorum.',ask:'Hepsi kaç simit oldu?'};}
a=r(3,10);b=r(1,a-1);return{k:'sub',topic:'cikarma',a:a,b:b,target:b,answer:a-b,text:'Tabakta '+a+' simit var. '+b+' tanesini alabilir miyim?',ask:'Tabakta kaç simit kaldı?'};}};})();
