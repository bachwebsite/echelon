importScripts('https://cdn.jsdelivr.net/gh/bachwebsite/echelon/public/uv/uv.bundle.js');
importScripts('https://cdn.jsdelivr.net/gh/bachwebsite/echelon/public/uv/uv.config.js');
importScripts(__uv$config.sw || 'https://cdn.jsdelivr.net/gh/bachwebsite/echelon/public/uv/uv.sw.js');

const sw = new UVServiceWorker();

self.addEventListener('fetch', (event) => event.respondWith(sw.fetch(event)));
