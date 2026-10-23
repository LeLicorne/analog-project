/*
 * Service worker de Quizz du jour (JavaScript classique : aucune importation externe, compatible avec la CSP
 * `script-src 'self'`).
 *
 * Stratégies :
 * - /assets/*  (fichiers au hash, immuables)  : cache d'abord ; tous précachés d'après /asset-manifest.json.
 * - pages HTML                               : réseau d'abord (contenu frais), cache si le réseau échoue, sinon /offline.html.
 * - autres fichiers du site                  : cache d'abord avec revalidation en arrière-plan.
 * - Firebase, robots.txt, sitemap, llms.txt  : jamais interceptés.
 */
const VERSION = 'v1';
const STATIC_CACHE = `quizz-static-${VERSION}`;
const PAGES_CACHE = `quizz-pages-${VERSION}`;
const PRECACHE = ['/offline.html', '/offline.css', '/icons/icon-192.png', '/favicon.ico'];
const NETWORK_TIMEOUT_MS = 4000;
const MAX_ENTRIES = 200;
const NEVER_INTERCEPT = [
  '/sw.js',
  '/asset-manifest.json',
  '/robots.txt',
  '/sitemap.xml',
  '/llms.txt',
  '/api/',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => cache.addAll(PRECACHE))
      .then(refreshPrecache),
  );
});

/**
 * Précharge tous les fichiers du build listés dans /asset-manifest.json (voir vite.config.ts) : hors ligne, n'importe
 * quelle page déjà connue doit pouvoir démarrer, même si son code n'a jamais été visité. Ne télécharge que ce qui manque.
 */
async function refreshPrecache() {
  try {
    const response = await fetch('/asset-manifest.json', { cache: 'no-store' });
    if (!response.ok) return;
    const { core } = await response.json();
    const cache = await caches.open(STATIC_CACHE);
    for (const file of core) {
      const url = '/' + file;
      if (!(await cache.match(url))) await cache.add(url);
    }
  } catch {
    // Hors ligne ou manifeste absent (développement) : le cache se remplit à l'usage.
  }
}

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keep = new Set([STATIC_CACHE, PAGES_CACHE]);
      const names = await caches.keys();
      await Promise.all(names.filter((name) => !keep.has(name)).map((name) => caches.delete(name)));
      await self.clients.claim();
    })(),
  );
});

self.addEventListener('message', (event) => {
  if (!event.data) return;
  if (event.data.type === 'SKIP_WAITING') void self.skipWaiting();
  if (event.data.type === 'REFRESH_PRECACHE') event.waitUntil(refreshPrecache());
  if (event.data.type === 'SHOW_TEST_NOTIFICATION') {
    event.waitUntil(
      showNotificationFrom({
        data: {
          title: 'Quizz du jour',
          body: 'Notification de test : voilà à quoi ressemblera votre rappel quotidien.',
          url: '/',
          tag: 'test-notification',
        },
      }),
    );
  }
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  if (NEVER_INTERCEPT.some((path) => url.pathname.startsWith(path))) return;

  if (url.pathname.startsWith('/assets/')) {
    event.respondWith(cacheFirst(request, STATIC_CACHE));
  } else if (isPage(request)) {
    event.respondWith(networkFirstPage(request));
  } else {
    event.respondWith(staleWhileRevalidate(request, STATIC_CACHE));
  }
});

function isPage(request) {
  return request.mode === 'navigate' || (request.headers.get('accept') || '').includes('text/html');
}

function isCacheable(response) {
  return response.ok && response.type === 'basic';
}

async function put(cacheName, request, response) {
  const cache = await caches.open(cacheName);
  await cache.put(request, response);
  const keys = await cache.keys();
  if (keys.length > MAX_ENTRIES)
    await Promise.all(keys.slice(0, keys.length - MAX_ENTRIES).map((key) => cache.delete(key)));
}

async function cacheFirst(request, cacheName) {
  const cached = await caches.match(request);
  if (cached) return cached;
  const response = await fetch(request);
  if (isCacheable(response)) await put(cacheName, request, response.clone());
  return response;
}

async function staleWhileRevalidate(request, cacheName) {
  const cached = await caches.match(request);
  const refresh = fetch(request)
    .then(async (response) => {
      if (isCacheable(response)) await put(cacheName, request, response.clone());
      return response;
    })
    .catch(() => undefined);
  return cached || (await refresh) || Response.error();
}

function fetchWithTimeout(request, timeoutMs) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  return fetch(request, { signal: controller.signal }).finally(() => clearTimeout(timer));
}

async function networkFirstPage(request) {
  try {
    const response = await fetchWithTimeout(request, NETWORK_TIMEOUT_MS);
    if (isCacheable(response)) await put(PAGES_CACHE, request, response.clone());
    return response;
  } catch {
    const pages = await caches.open(PAGES_CACHE);
    const cached = await pages.match(request, { ignoreSearch: true });
    if (cached) return cached;
    const offline = await caches.match('/offline.html');
    return offline || Response.error();
  }
}

/* Notifications : le même code affiche un push réel (FCM) et la notification de test du bouton de démonstration. */
function showNotificationFrom(payload) {
  const notification = payload.notification || {};
  const data = payload.data || {};
  return self.registration.showNotification(notification.title || data.title || 'Quizz du jour', {
    body: notification.body || data.body || 'Ton quiz du jour est prêt.',
    lang: 'fr',
    icon: '/icons/icon-192.png',
    badge: '/icons/badge-96.png',
    tag: data.tag || 'daily-quiz',
    data: { url: data.url || '/' },
  });
}

self.addEventListener('push', (event) => {
  let payload = {};
  try {
    payload = event.data ? event.data.json() : {};
  } catch {
    payload = { data: { body: event.data ? event.data.text() : '' } };
  }
  event.waitUntil(showNotificationFrom(payload));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  // Seules les adresses du site sont ouvertes : une charge utile ne peut pas rediriger ailleurs.
  let target = new URL('/', self.location.origin);
  try {
    const requested = new URL(
      (event.notification.data && event.notification.data.url) || '/',
      self.location.origin,
    );
    if (requested.origin === self.location.origin) target = requested;
  } catch {
    // Adresse invalide : on garde l'accueil.
  }
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windows) => {
      for (const client of windows) {
        if ('focus' in client) {
          if ('navigate' in client) void client.navigate(target.href);
          return client.focus();
        }
      }
      return self.clients.openWindow(target.href);
    }),
  );
});
