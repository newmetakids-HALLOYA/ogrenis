(function(){var O=window.OGR=window.OGR||{};O.data=O.data||{};
var K='#35506b',S=' stroke="'+K+'" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"';
function p(x){return '<svg viewBox="0 0 60 60" aria-hidden="true">'+x+'</svg>';}
function arc(r,c,w){return '<path d="M'+(30-r)+' 46A'+r+' '+r+' 0 0 1 '+(30+r)+' 46" fill="none" stroke="'+c+'" stroke-width="'+w+'"/>';}
var ITEMS=[
{id:'mantar',name:'Mantar',stars:3,icon:p('<path d="M8 34Q8 10 30 10Q52 10 52 34Z" fill="#ff7a6b"'+S+'/><rect x="22" y="34" width="16" height="18" rx="6" fill="#fff3d6"'+S+'/><circle cx="22" cy="24" r="4" fill="#fff"/><circle cx="38" cy="20" r="3.5" fill="#fff"/>')},
{id:'bayrak',name:'Bayrak',stars:6,icon:p('<path d="M16 8V54" fill="none"'+S+'/><path d="M16 10L48 18L16 30Z" fill="#ffcf4a"'+S+'/>')},
{id:'fener',name:'Fener',stars:10,icon:p('<rect x="20" y="16" width="20" height="30" rx="6" fill="#ffe27a"'+S+'/><path d="M18 16H42L36 8H24Z" fill="#5aa9e6"'+S+'/><rect x="22" y="46" width="16" height="6" rx="3" fill="#8a5a3c"'+S+'/>')},
{id:'gokkusagi',name:'Gökkuşağı',stars:15,icon:p(arc(16,K,25)+arc(22,'#ff7a6b',7)+arc(16,'#ffcf4a',7)+arc(10,'#7ccbff',7))},
{id:'kusevi',name:'Kuş evi',stars:20,icon:p('<rect x="14" y="24" width="32" height="28" rx="4" fill="#ffe2b0"'+S+'/><path d="M10 26L30 8L50 26Z" fill="#ff8a5b"'+S+'/><circle cx="30" cy="38" r="6" fill="#8a5a3c"/>')},
{id:'yildiz',name:'Yıldız',stars:30,icon:p('<path d="M30 6L38 22L55 24L42 36L46 54L30 45L14 54L18 36L5 24L22 22Z" fill="#ffcf4a"'+S+'/>')},
{id:'kelebek',name:'Kelebek',quest:'kesif3',hint:'Parıltıları bul',icon:p('<ellipse cx="20" cy="26" rx="14" ry="16" fill="#ff9bd0"'+S+'/><ellipse cx="40" cy="26" rx="14" ry="16" fill="#7ccbff"'+S+'/><rect x="27" y="14" width="6" height="34" rx="3" fill="'+K+'"/>')},
{id:'ari',name:'Arı',quest:'bahce3',hint:'3 çiçek aç',icon:p('<ellipse cx="22" cy="20" rx="9" ry="12" fill="#bfe7ff"'+S+'/><ellipse cx="38" cy="20" rx="9" ry="12" fill="#bfe7ff"'+S+'/><ellipse cx="30" cy="38" rx="18" ry="14" fill="#ffcf4a"'+S+'/><path d="M26 26V50M36 26V50" stroke="'+K+'" stroke-width="4"/>')},
{id:'tren',name:'Oyuncak tren',quest:'chain',hint:'Kayıp Tren',icon:p('<rect x="6" y="24" width="28" height="22" rx="6" fill="#ff9b54"'+S+'/><rect x="30" y="14" width="22" height="32" rx="5" fill="#5aa9e6"'+S+'/><circle cx="16" cy="50" r="6" fill="#fff3d6"'+S+'/><circle cx="42" cy="50" r="6" fill="#fff3d6"'+S+'/>')}];
var CHAIN=[{t:'Yolcular acıktı! Fırında 3 siparişi hazırla.',c:'bakery_ok',n:3},{t:'Eksik vagonları tamamla: İstasyonda 3 görev yap.',c:'train_ok',n:3},
{t:'İstasyondaki kelimeyi tamamla: Ormanda 3 doğru bul.',c:'forest_ok',n:3},{t:'Trenin rotasını bul: İstasyonda bir oyunu bitir.',c:'train_plays',n:1},{t:'Treni hareket ettir: herhangi bir oyunu bitir.',c:'any_plays',n:1}];
var ONCE=[{id:'kesif3',t:'Kasabadaki 3 parıltıyı bul.',c:'found',n:3,tag:'Keşif'},{id:'bahce3',t:'Bahçende 3 çiçek aç.',c:'blooms',n:3,tag:'Bahçe'}];
var DAILY=[{id:'d_bak2',t:'Fırında 2 sipariş hazırla.',c:'bakery_ok',n:2,tag:'Matematik'},{id:'d_for2',t:'Ormanda 2 doğru bul.',c:'forest_ok',n:2,tag:'Türkçe'},
{id:'d_tra2',t:'İstasyonda 2 görev yap.',c:'train_ok',n:2,tag:'Karma'},{id:'d_play',t:'Bir oyunu bitir.',c:'any_plays',n:1,tag:'Oyun'},
{id:'d_seed',t:'Bahçene 1 tohum ek.',c:'planted',n:1,tag:'Bahçe',ok:function(d){return d.garden.filter(function(s){return s>0;}).length<d.garden.length;}},
{id:'d_find',t:'Kasabada bir parıltı bul.',c:'found',n:1,tag:'Keşif',ok:function(d){return d.found.length<3;}}];
function counter(d,k){var c=d.counts||{},n=function(x){return c[x]||0;};
switch(k){case 'bakery_ok':return n('sayma')+n('toplama')+n('cikarma');case 'forest_ok':return n('harf')+n('hece')+n('kelime');
case 'train_ok':return n('eksik_sayi')+n('sayi_siralama')+n('kelime_okuma');case 'train_plays':return d.train.plays;
case 'any_plays':return d.bakery.plays+d.forest.plays+d.train.plays;case 'planted':return d.garden.filter(function(s){return s>0;}).length;
case 'blooms':return d.garden.filter(function(s){return s===3;}).length;case 'found':return d.found.length;}return 0;}
O.data.quests={items:ITEMS,chain:CHAIN,once:ONCE,daily:DAILY,counter:counter};})();
