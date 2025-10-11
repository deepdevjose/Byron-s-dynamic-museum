// Service Worker para cacheo optimizado del Museo Digital Byron
const CACHE_NAME = 'byron-museum-v1';
const CRITICAL_ASSETS = [
    '/',
    '/index.html',
    '/museum.html',
    '/src/css/main.css',
    '/src/css/style.css',
    '/src/js/main.js',
    '/src/js/app.js',
    '/src/assets/images/Byron.png',
    '/src/assets/images/Musicos - Byron.jpg',
    '/src/assets/images/Bailarina - Byron.jpg',
    '/src/assets/audio/main.mp3'
];

// Instalar Service Worker y cachear recursos críticos
self.addEventListener('install', (event) => {
    console.log('🔧 Service Worker instalando...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('📦 Cacheando recursos críticos');
                return cache.addAll(CRITICAL_ASSETS);
            })
            .then(() => {
                console.log('✅ Service Worker instalado exitosamente');
                return self.skipWaiting();
            })
    );
});

// Activar Service Worker y limpiar cachés antiguos
self.addEventListener('activate', (event) => {
    console.log('🚀 Service Worker activando...');
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('🗑️ Eliminando caché antiguo:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            console.log('✅ Service Worker activado');
            return self.clients.claim();
        })
    );
});

// Interceptar requests y servir desde caché cuando sea posible
self.addEventListener('fetch', (event) => {
    // Solo manejar requests GET
    if (event.request.method !== 'GET') return;
    
    // Estrategia: Cache First para assets estáticos, Network First para HTML
    if (event.request.destination === 'document') {
        // Network First para HTML (para contenido fresco)
        event.respondWith(
            fetch(event.request)
                .then((response) => {
                    // Cachear la respuesta para futuras requests
                    const responseClone = response.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseClone);
                    });
                    return response;
                })
                .catch(() => {
                    // Fallback al caché si no hay red
                    return caches.match(event.request);
                })
        );
    } else {
        // Cache First para assets (CSS, JS, imágenes, videos)
        event.respondWith(
            caches.match(event.request)
                .then((response) => {
                    if (response) {
                        return response;
                    }
                    
                    // Si no está en caché, fetch y cachear
                    return fetch(event.request)
                        .then((response) => {
                            // Solo cachear respuestas exitosas
                            if (!response || response.status !== 200 || response.type !== 'basic') {
                                return response;
                            }
                            
                            const responseClone = response.clone();
                            caches.open(CACHE_NAME).then((cache) => {
                                cache.put(event.request, responseClone);
                            });
                            
                            return response;
                        });
                })
        );
    }
});

// Manejo de mensajes desde el cliente
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});