const cacheName = 'guide-free-v2'; // قمنا بتغيير الإصدار إلى v2 لنجبر المتصفح على التحديث
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
  self.skipWaiting(); // إجبار المتصفح على تثبيت التحديث فوراً وعدم الانتظار
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(assets);
    })
  );
});

// تفعيل الخدمة ومسح أي كاش قديم (مهم جداً لكي لا يعلق الموقع على نسخة قديمة)
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys
        .filter(key => key !== cacheName)
        .map(key => caches.delete(key))
      );
    })
  );
});

// استراتيجية الاستدعاء: "الشبكة أولاً، ثم الكاش" (Network First)
self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request)
      .then(res => {
        // إذا كان هناك إنترنت، اجلب النسخة الأحدث وقم بتحديث الكاش بها بصمت
        const resClone = res.clone();
        caches.open(cacheName).then(cache => {
          cache.put(e.request, resClone);
        });
        return res;
      })
      .catch(() => {
        // في حال انقطاع الإنترنت، استخدم النسخة المخزنة في الكاش
        return caches.match(e.request);
      })
  );
});
