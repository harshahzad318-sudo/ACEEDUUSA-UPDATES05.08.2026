// ACE Education USA - Enterprise Progressive Web App Service Worker (v1.0.0)
const CACHE_NAME = 'ace-edu-pwa-v1.0.0';
const DYNAMIC_CACHE_NAME = 'ace-edu-dynamic-v1.0.0';

const PRECACHE_ASSETS = [
  '/',
  '/portals/student',
  '/portals/parent',
  '/portals/tutor',
  '/portals/admin',
  '/manifest.json',
  '/favicon.ico',
  '/logo.jpg',
  '/logo.png',
  '/usa_students_hero.jpg'
];

// 1. Service Worker Install Phase
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Pre-caching Core Application Shell');
      return cache.addAll(PRECACHE_ASSETS).catch((err) => {
        console.warn('[SW] Non-critical precache failure:', err);
      });
    }).then(() => self.skipWaiting())
  );
});

// 2. Service Worker Activate Phase
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME && cache !== DYNAMIC_CACHE_NAME) {
            console.log('[SW] Removing Stale Cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 3. Fetch Event Handler with Stale-While-Revalidate Strategy
self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // Exclude API calls and webhooks from hard caching, use Network-First
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(req)
        .then((response) => {
          return response;
        })
        .catch(() => {
          return new Response(
            JSON.stringify({
              offline: true,
              message: 'You are currently offline. Displaying cached data where available.',
            }),
            { headers: { 'Content-Type': 'application/json' } }
          );
        })
    );
    return;
  }

  // HTML Page Navigation Strategy: Network-First with Cache Fallback
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then((networkResponse) => {
          if (networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(DYNAMIC_CACHE_NAME).then((cache) => {
              cache.put(req, responseClone);
            });
          }
          return networkResponse;
        })
        .catch(() => {
          return caches.match(req).then((cachedResponse) => {
            if (cachedResponse) return cachedResponse;
            return caches.match('/') || new Response('Offline - ACE Education Platform', {
              headers: { 'Content-Type': 'text/html' }
            });
          });
        })
    );
    return;
  }

  // Static Assets Strategy: Cache-First with Network Backup
  event.respondWith(
    caches.match(req).then((cachedResponse) => {
      if (cachedResponse) return cachedResponse;

      return fetch(req)
        .then((networkResponse) => {
          if (
            networkResponse &&
            networkResponse.status === 200 &&
            req.method === 'GET'
          ) {
            const responseClone = networkResponse.clone();
            caches.open(DYNAMIC_CACHE_NAME).then((cache) => {
              cache.put(req, responseClone);
            });
          }
          return networkResponse;
        })
        .catch(() => {
          // Fallback for missing static images or assets
          if (req.headers.get('accept')?.includes('image')) {
            return caches.match('/logo.jpg');
          }
        });
    })
  );
});

// 4. Push Notification Handler
self.addEventListener('push', (event) => {
  let data = {
    title: 'ACE Education USA',
    body: 'You have a new update in your portal.',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-72x72.png',
    url: '/portals/student',
  };

  if (event.data) {
    try {
      data = { ...data, ...event.data.json() };
    } catch (e) {
      data.body = event.data.text();
    }
  }

  const options = {
    body: data.body,
    icon: data.icon || '/icons/icon-192x192.png',
    badge: data.badge || '/icons/icon-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      url: data.url || '/',
      timestamp: Date.now(),
    },
    actions: [
      { action: 'open', title: 'Open Portal' },
      { action: 'dismiss', title: 'Dismiss' },
    ],
  };

  event.waitUntil(self.registration.showNotification(data.title, options));
});

// 5. Notification Click Listener
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'dismiss') return;

  const targetUrl = event.notification.data?.url || '/';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
      for (const client of windowClients) {
        if (client.url.includes(targetUrl) && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});

// 6. Background Sync Listener for Offline Queued Items
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-offline-forms') {
    console.log('[SW] Executing Background Sync for offline queued data');
  }
});
