const fs=require('fs');
var c=fs.readFileSync('malitaxi-admin-10.html','utf8');
c=c.replace("const TITLES={","const TITLES={pub:'📢 Gestion Publicités',");
c=c.replace("const fns={dashboard:","const fns={pub:function(){document.getElementById('section-pub').style.display='block';},dashboard:");
c=c.replace("document.getElementById('pg-ttl').textContent=TITLES[p]||p;","document.querySelectorAll('[id^=\"section-\"]').forEach(s=>s.style.display='none');document.getElementById('pg-ttl').textContent=TITLES[p]||p;");
fs.writeFileSync('malitaxi-admin-10.html',c);
console.log('OK fait');