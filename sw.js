// 🚀 NEON RUNNER - Service Worker
// Ultra-optimized PWA caching for maximum performance

const CACHE_NAME = 'neon-runner-v1.0.0';
const RUNTIME_CACHE = 'neon-runner-runtime-v1.0.0';

// Assets to cache immediately
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/manifest.json',
    '/robots.txt',
    '/sitemap.xml',
    '/ads.txt'
];

// Google Fonts and external resources to cache
const EXTERNAL_ASSETS = [
    'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap',
    'https://fonts.gstatic.com/s/orbitron/v29/yMJMMIlzdpvBhQQL_SC3X9yhF25-T1nyGy6BoWgz.woff2'
];

// Install event - cache static assets
self.addEventListener('install', event => {
    console.log('🚀 Service Worker: Installing...');
    
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('🚀 Service Worker: Caching static assets');
                return cache.addAll([...STATIC_ASSETS, ...EXTERNAL_ASSETS]);
            })
            .then(() => {
                console.log('🚀 Service Worker: Installation complete');
                return self.skipWaiting();
            })
            .catch(error => {
                console.error('🚀 Service Worker: Installation failed', error);
            })
    );
});

// Activate event - clean old caches
self.addEventListener('activate', event => {
    console.log('🚀 Service Worker: Activating...');
    
    event.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames
                        .filter(cacheName => {
                            return cacheName.startsWith('neon-runner-') && 
                                   cacheName !== CACHE_NAME && 
                                   cacheName !== RUNTIME_CACHE;
                        })
                        .map(cacheName => {
                            console.log('🚀 Service Worker: Deleting old cache', cacheName);
                            return caches.delete(cacheName);
                        })
                );
            })
            .then(() => {
                console.log('🚀 Service Worker: Activation complete');
                return self.clients.claim();
            })
    );
});

// Fetch event - network first, fallback to cache
self.addEventListener('fetch', event => {
    const { request } = event;
    const url = new URL(request.url);
    
    // Skip cross-origin requests (analytics, ads)
    if (url.origin !== location.origin) {
        // Cache external assets we control
        if (EXTERNAL_ASSETS.some(asset => request.url.includes(asset))) {
            event.respondWith(cacheFirst(request));
        }
        return;
    }
    
    // Strategy based on request type
    if (request.destination === 'document') {
        // HTML: Network first, fallback to cache
        event.respondWith(networkFirst(request));
    } else if (request.destination === 'script' || request.destination === 'style') {
        // JS/CSS: Cache first
        event.respondWith(cacheFirst(request));
    } else if (request.destination === 'image') {
        // Images: Cache first
        event.respondWith(cacheFirst(request));
    } else {
        // Everything else: Network first
        event.respondWith(networkFirst(request));
    }
});

// Network first strategy
async function networkFirst(request) {
    try {
        const networkResponse = await fetch(request);
        
        if (networkResponse.ok) {
            const cache = await caches.open(RUNTIME_CACHE);
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
    } catch (error) {
        console.log('🚀 Service Worker: Network failed, trying cache', request.url);
        
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        
        // Fallback for HTML requests
        if (request.destination === 'document') {
            return caches.match('/index.html');
        }
        
        throw error;
    }
}

// Cache first strategy
async function cacheFirst(request) {
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse) {
        return cachedResponse;
    }
    
    try {
        const networkResponse = await fetch(request);
        
        if (networkResponse.ok) {
            const cache = await caches.open(RUNTIME_CACHE);
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
    } catch (error) {
        console.error('🚀 Service Worker: Cache and network failed', request.url, error);
        throw error;
    }
}

// Handle background sync for analytics
self.addEventListener('sync', event => {
    if (event.tag === 'analytics-sync') {
        event.waitUntil(syncAnalytics());
    }
});

async function syncAnalytics() {
    console.log('🚀 Service Worker: Syncing offline analytics');
    // Analytics sync would be implemented here
}

// Handle push notifications (future feature)
self.addEventListener('push', event => {
    if (!event.data) return;
    
    const data = event.data.json();
    const options = {
        body: data.body,
        icon: '/icon-192.png',
        badge: '/icon-96.png',
        vibrate: [200, 100, 200],
        data: data,
        actions: [
            {
                action: 'play',
                title: 'Jugar Ahora',
                icon: '/icon-play.png'
            },
            {
                action: 'dismiss',
                title: 'Más Tarde'
            }
        ]
    };
    
    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});

// Handle notification clicks
self.addEventListener('notificationclick', event => {
    event.notification.close();
    
    if (event.action === 'play') {
        event.waitUntil(
            clients.matchAll({ type: 'window' })
                .then(clientList => {
                    if (clientList.length > 0) {
                        return clientList[0].focus();
                    }
                    return clients.openWindow('/');
                })
        );
    }
});

console.log('🚀 Service Worker: Loaded successfully');
