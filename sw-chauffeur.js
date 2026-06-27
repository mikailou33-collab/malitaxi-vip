// Service Worker MaliTaxi Chauffeur Pro
// Permet d'afficher des notifications meme quand l'app est en arriere-plan

self.addEventListener('install', function(event){
  self.skipWaiting();
});

self.addEventListener('activate', function(event){
  event.waitUntil(self.clients.claim());
});

// Reception d'un message depuis la page principale pour afficher une notification
self.addEventListener('message', function(event){
  if(!event.data) return;
  if(event.data.type === 'SHOW_NOTIFICATION'){
    var title = event.data.title || 'MaliTaxi Chauffeur Pro';
    var options = event.data.options || {};
    self.registration.showNotification(title, options);
  }
});

// Quand le chauffeur clique sur la notification, on ramene l'app au premier plan
self.addEventListener('notificationclick', function(event){
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({type:'window', includeUncontrolled:true}).then(function(clientList){
      for(var i=0;i<clientList.length;i++){
        var client = clientList[i];
        if('focus' in client) return client.focus();
      }
      if(self.clients.openWindow) return self.clients.openWindow('./chauffeur-vip-pro-28.html');
    })
  );
});
