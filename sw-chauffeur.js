// Service Worker MaliTaxi Chauffeur Pro
// Permet d'afficher des notifications meme quand l'app est en arriere-plan

importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyDdM8PcwhNnfCjaLmqwV5gLgLe9UUsgnZU",
  authDomain: "malitaxi.firebaseapp.com",
  databaseURL: "https://malitaxi-default-rtdb.firebaseio.com",
  projectId: "malitaxi",
  storageBucket: "malitaxi.firebasestorage.app",
  messagingSenderId: "505754219310",
  appId: "1:505754219310:web:1098a82ac81ee10eec00bf"
});

var messaging = firebase.messaging();

// Quand une notification push arrive alors que l'app est fermee/en arriere-plan
messaging.onBackgroundMessage(function(payload){
  var title = (payload.notification && payload.notification.title) || 'MaliTaxi Chauffeur Pro';
  var options = {
    body: (payload.notification && payload.notification.body) || '',
    icon: 'icon-192-6.png',
    badge: 'icon-192-6.png',
    vibrate: [300,100,300,100,300],
    requireInteraction: true,
    data: payload.data || {}
  };
  self.registration.showNotification(title, options);
});

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
