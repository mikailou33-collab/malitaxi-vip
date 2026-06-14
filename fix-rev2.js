const fs = require('fs');
let h = fs.readFileSync('chauffeur-vip-pro-20.html', 'utf8');

h = h.replace(
  "rgba(255,255,255,.5)';font-weight:${isPeak?'900':'400'}",
  "rgba(255,255,255,.5);font-weight:${isPeak?900:400}"
);

fs.writeFileSync('chauffeur-vip-pro-20.html', h, 'utf8');
console.log('OK');