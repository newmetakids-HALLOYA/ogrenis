(function(){var O=window.OGR=window.OGR||{};var ctx=null;
function ensure(){if(!ctx){var C=window.AudioContext||window.webkitAudioContext;if(!C)return null;try{ctx=new C();}catch(e){return null;}}if(ctx.state==='suspended')ctx.resume();return ctx;}
var S={tap:[[660,0,.09]],ok:[[523,0,.12],[659,.1,.12],[784,.2,.18]],back:[[440,0,.1],[330,.08,.12]]};
function play(n){try{if(!O.state.get().settings.sound||!S[n])return;var c=ensure();if(!c)return;var t=c.currentTime;
S[n].forEach(function(x){var o=c.createOscillator(),g=c.createGain(),s=t+x[1];o.type='sine';o.frequency.value=x[0];
g.gain.setValueAtTime(0.0001,s);g.gain.exponentialRampToValueAtTime(0.06,s+.02);g.gain.exponentialRampToValueAtTime(0.0001,s+x[2]);
o.connect(g);g.connect(c.destination);o.start(s);o.stop(s+x[2]+.05);});}catch(e){O.errors.add(e);}}
O.audio={play:play,unlock:ensure};})();
