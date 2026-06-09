const fs=require('fs');
var html=fs.readFileSync('malitaxi-vip-final-12.html','utf8');
var badText='function demanderWhatsApp';
var idx=html.lastIndexOf(badText);
if(idx>-1){
  var start=html.lastIndexOf('\n',idx);
  var end=html.indexOf('\n',html.indexOf('}}',idx))+1;
  html=html.slice(0,start)+html.slice(end);
}
var script='<script>function demanderWhatsApp(){var num=prompt("Votre numero WhatsApp pour recevoir votre billet 3h avant le depart:");if(!num)return;window.busWhatsApp=num.replace(/[^0-9]/g,"");busStep=5;planifierNotifBus();renderContent();}function planifierNotifBus(){try{var dep=busDep&&busDep.h?busDep.h:"00:00";var parts=dep.split(":");var now=new Date();var depart=new Date();depart.setHours(parseInt(parts[0]),parseInt(parts[1]),0,0);if(depart<now)depart.setDate(depart.getDate()+1);var delai=depart.getTime()-now.getTime()-(3*60*60*1000);var phone=window.busWhatsApp;var msg=encodeURIComponent("MaliTaxi Bus - Rappel: Votre bus part dans 3h! Destination: "+busDest+" Depart: "+dep+" Siege: "+busSiege+" Bon voyage!");var url="https://api.callmebot.com/whatsapp.php?phone="+phone+"&text="+msg+"&apikey=1518458";if(delai>0){setTimeout(function(){fetch(url);},delai);}else{fetch(url);}}catch(e){}}<\/script>';
html=html.replace('</body>',script+'</body>');
fs.writeFileSync('malitaxi-vip-final-12.html',html);
console.log('OK fait');