// sw-chauffeur.js — Service Worker MaliTaxi VIP Chauffeur
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyDdM8PcwhNnfCjaLmqwV5gLgLe9UUsgnZU",
  authDomain: "malitaxi.firebaseapp.com",
  databaseURL: "https://malitaxi-default-rtdb.firebaseio.com",
  projectId: "malitaxi",
  storageBucket: "malitaxi.firebasestorage.app",
  messagingSenderId: "505754219310",
  appId: "1:505754219310:web:1098a82ac81ee10eec00bf"
});

const messaging = firebase.messaging();

// Notification en arriere-plan
messaging.onBackgroundMessage(function(payload) {
  console.log('[SW] Message recu en arriere-plan:', payload);

  const data = payload.data || {};
  const type = data.type || 'course';
  const estLivraison = type === 'livraison';

  const titre = payload.notification && payload.notification.title
    ? payload.notification.title
    : (estLivraison ? '📦 Nouvelle livraison !' : '🚖 Nouvelle course !');

  const corps = payload.notification && payload.notification.body
    ? payload.notification.body
    : (estLivraison
        ? (data.depart + ' → ' + data.arrivee)
        : (data.depart + ' → ' + data.arrivee + ' · ' + data.prix + ' FCFA'));

  const options = {
    body: corps,
    icon: 'https://mikailou33-collab.github.io/malitaxi-vip/icon-192-6.png',
    badge: 'https://mikailou33-collab.github.io/malitaxi-vip/icon-192-6.png',
    requireInteraction: true,
    vibrate: estLivraison ? [300, 100, 300, 100, 600] : [500, 200, 500, 200, 500],
    tag: (estLivraison ? 'livraison-' : 'course-') + (data.courseId || data.livraisonId || Date.now()),
    renotify: true,
    data: data,
    actions: estLivraison
      ? [
          { action: 'accepter_livraison', title: '✅ ACCEPTER' },
          { action: 'refuser_livraison', title: '❌ REFUSER' }
        ]
      : [
          { action: 'accepter', title: '✅ ACCEPTER' },
          { action: 'refuser', title: '❌ REFUSER' }
        ]
  };

  self.registration.showNotification(titre, options);
});

// Gestion du clic sur les boutons de la notification
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  const action = event.action;
  const data = event.notification.data || {};

  if (action === 'accepter' || action === 'accepter_livraison') {
    // Ouvrir l'app et transmettre l'action d'acceptation
    event.waitUntil(
      clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clientList) {
        if (clientList.length > 0) {
          const client = clientList[0];
          client.focus();
          client.postMessage({
            type: 'NOTIFICATION_ACTION',
            action: action,
            data: data
          });
        } else {
          clients.openWindow('https://malitaxi.web.app');
        }
      })
    );
  } else if (action === 'refuser' || action === 'refuser_livraison') {
    // Juste fermer la notification (refus silencieux)
    event.waitUntil(
      clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clientList) {
        if (clientList.length > 0) {
          const client = clientList[0];
          client.postMessage({
            type: 'NOTIFICATION_ACTION',
            action: action,
            data: data
          });
        }
      })
    );
  } else {
    // Clic sur la notification elle-meme (pas un bouton)
    event.waitUntil(
      clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clientList) {
        if (clientList.length > 0) {
          clientList[0].focus();
        } else {
          clients.openWindow('https://malitaxi.web.app');
        }
      })
    );
  }
});
