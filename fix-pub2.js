const fs=require('fs');
var c=fs.readFileSync('malitaxi-admin-10.html','utf8');
var pubDiv=c.substring(c.indexOf('<div id="section-pub"'),c.indexOf('</div>',c.indexOf('</table>',c.indexOf('section-pub')))+6);
c=c.replace(pubDiv,'');
var mainEnd=c.indexOf('</div>',c.indexOf('<div class="main">'));
c=c.slice(0,mainEnd)+pubDiv+c.slice(mainEnd);
fs.writeFileSync('malitaxi-admin-10.html',c);
console.log('OK fait');