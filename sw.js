const cacheName = 'guide-free-v1';
const assets = [
  '/',
  '/index.html',
  '/article.html',
  '/main.js',
  '/firebase-config.js',
  'https://ui-avatars.com/api/?name=G&background=ffffff&color=9C27B0&size=144&bold=true'
];

// تثبيت الـ Service Worker وتخزين الملفات
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      cache.addAll(assets);
    })
  );
});

// استدعاء الملفات من الكاش عند فقدان الاتصال
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => {
      return res || fetch(e.request);
    })
  );
});
