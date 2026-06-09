const fs=require('fs');
var c=fs.readFileSync('malitaxi-vip-final-12.html','utf8');
const fn='function planifierNotifBus(){try{const dep=busDep?.h||"00:00";const parts=dep.split(":");const now=new Date();const depart=new Date();depart.setHours(parseInt(parts[0]),parseInt(parts[1]),0,0);if(depart<now)depart.setDate(depart.getDate()+1);const delai=depart.getTime()-now.getTime()-(3*60*60*1000);const phone=window.busWhatsApp;const msg=encodeURIComponent("MaliTaxi Bus - Rappel: Votre bus part dans 3h! Destination: "+busDest+" Depart: "+dep+" Siege: "+busSiege+" Bon voyage!");const url="https://api.callmebot.com/whatsapp.php?phone="+phone+"&text="+msg+"&apikey=1518458";if(delai>0){setTimeout(()=>fetch(url),delai);}else{fetch(url);}}catch(e){}}';
c=c.replace('function demanderWhatsApp',fn+'\nfunction demanderWhatsApp');
fs.writeFileSync('malitaxi-vip-final-12.html',c);
console.log('OK fait');