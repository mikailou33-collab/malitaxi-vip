const fs = require('fs');
let h = fs.readFileSync('chauffeur-vip-pro-20.html', 'utf8');

// Chercher où insérer le module revenus
const lastScript = h.lastIndexOf('</script>');
console.log('dernier script:', lastScript);
console.log('taille:', h.length);

// Chercher la fonction revenus existante
const revIdx = h.indexOf('Revenus');
console.log('Revenus à:', revIdx);
console.log(h.substring(revIdx-50, revIdx+200));
