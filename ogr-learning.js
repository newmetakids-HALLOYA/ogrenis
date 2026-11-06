(function(){var O=window.OGR=window.OGR||{};
O.learning={
record:function(r){try{O.state.update(function(d){d.learning.push({t:Date.now(),s:r.subject,k:r.topic,o:r.objective||'',d:r.difficulty||1,y:r.type||'',c:r.correct?1:0});
if(d.learning.length>3000)d.learning.splice(0,d.learning.length-3000);});}catch(e){O.errors.add(e);}},
summary:function(topic){var a=O.state.get().learning.filter(function(x){return !topic||x.k===topic;});
return{total:a.length,correct:a.filter(function(x){return x.c;}).length};}};})();
