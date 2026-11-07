(function(){var O=window.OGR=window.OGR||{};O.data=O.data||{};
function r(a,b){return a+Math.floor(Math.random()*(b-a+1));}
function sh(a){return a.slice().sort(function(){return Math.random()-.5;});}
var TOP={e:{topic:'eksik_sayi',subject:'matematik',objective:'Ardışık sayılarda eksik sayıyı bulur',verified:false},
s:{topic:'sayi_siralama',subject:'matematik',objective:'Sayıları küçükten büyüğe sıralar',verified:false},
t:{topic:'kelime_okuma',subject:'turkce',objective:'Resimle eşleşen kelimeyi okuyup bulur',verified:false}};
var L={1:['e','t'],2:['e','s','t'],3:['s','e','t']},MX={1:10,2:10,3:20};
O.data.train={topics:TOP,levels:L,maxLevel:3,
make:function(level,prev,used,pf){var l=L[level]||L[1],k=l[r(0,l.length-1)],t=0,mx=MX[level]||10;while(k===prev&&t++<4)k=l[r(0,l.length-1)];var TM={e:'eksik_sayi',s:'sayi_siralama',t:'kelime_okuma'};if(pf&&pf.length&&Math.random()<.5){var cc=l.filter(function(x){return pf.indexOf(TM[x])>-1;});if(cc.length)k=cc[r(0,cc.length-1)];}
if(k==='e'){var s=r(1,mx-3),seq=[s,s+1,s+2,s+3],b=r(1,2),m=seq[b],pool=[];for(var i=1;i<=mx;i++)if(seq.indexOf(i)<0)pool.push(i);
var near=sh(pool.filter(function(x){return Math.abs(x-m)<=4;})),ds=near.concat(sh(pool.filter(function(x){return near.indexOf(x)<0;}))).slice(0,2);
return{k:k,seq:seq,b:b,miss:m,choices:sh([m].concat(ds))};}
if(k==='s'){var c=level===3?5:4,nums=[];while(nums.length<c){var x=r(1,mx);if(nums.indexOf(x)<0)nums.push(x);}
var sorted=nums.slice().sort(function(a,b){return a-b;}),g=0;do{nums=sh(nums);}while(nums.join()===sorted.join()&&g++<20);return{k:k,nums:nums};}
var W=O.data.tr.words,fr=W.filter(function(x){return used.indexOf(x.w)<0;});if(!fr.length)fr=W;var e=fr[r(0,fr.length-1)],ot=sh(W.filter(function(x){return x.w!==e.w;})).slice(0,2).map(function(x){return x.w;});
return{k:'t',word:e.w,pic:e.pic,choices:sh([e.w].concat(ot))};}};})();
