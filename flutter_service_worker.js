'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "30801e5d93ccb6adfa37eae342f4cb02",
"assets/assets/aiops-icon.svg": "1a63e434415b336cdc5dbae52da64b34",
"assets/assets/aiops.jpg": "89b7254fc2a41279ac5e26a45f85113f",
"assets/assets/assetmanagement-icon.svg": "08f204941a7d272c8ca8f34397c596b6",
"assets/assets/complianceops.jpg": "9712ef049ff73b762b8b241d67461c04",
"assets/assets/contract-mangement-icon.svg": "20a3cf14e7ff983905475f1837096cfa",
"assets/assets/download.png": "6932a4938c40ad2d92b135f51b19f85c",
"assets/assets/download.svg": "450194779a2532cbeb899b54855fc7a2",
"assets/assets/download2.png": "64ecd74696535a17f82fcf05cf3b4f99",
"assets/assets/download2.svg": "c0eff687aa272a23c7831c77061bc0ee",
"assets/assets/ellipse-blue-mob.svg": "70133654abd20ebeadff7de0064e2f9b",
"assets/assets/ellipse-dark-blue-mob.svg": "74e71dc91b1dc9e7660fd5de6d06644c",
"assets/assets/ellipse-pink-mob.svg": "79699ad20c6edfe238ee6f11b3427123",
"assets/assets/ellipse-yellow-mob.svg": "d23aa5fa7a6419dfcc79b4982d34a72c",
"assets/assets/fbutton.svg": "d94db80f0d44a173c51d5e6e036f5dd7",
"assets/assets/intilligent-alerts-icon.svg": "643afea6da7da4d252037e8564632aaf",
"assets/assets/intilligent-invoice-icon.svg": "3eb8cc53d267d9d7daf4dfb56c14b17f",
"assets/assets/intilligent-ticket-icon.svg": "546b0ff5a6ed5ae9f63afd3e1279a9ac",
"assets/assets/itops.jpg": "f9eac4618e1efe51b290dbe4dec271b4",
"assets/assets/patch-icon.svg": "33e2612a4d052cbb93ff69bb1af23744",
"assets/assets/play-button.svg": "287e447e2ae6a980e8bc68e4afdf6cc2",
"assets/assets/policy-icon.svg": "28c98a16f3150536bce5c9e7089d19bd",
"assets/assets/project-management-icon.svg": "a56170be9bc34d18cf64786d84b9f4b6",
"assets/assets/prospect-icon.svg": "ae834cc5c876a6dfeb74791f96d6db59",
"assets/assets/revops.jpg": "3f32c6f6e8c3585e831d2d7f0f0952a4",
"assets/assets/runbook-icon.svg": "dce55745c4024c6fc783d8a4362f1a49",
"assets/assets/servicedesk-icon.svg": "68b99ef71ad04affc771817c31c9be32",
"assets/assets/sla-icon.svg": "99575b25ed0ce5502bfb28a194af9ead",
"assets/assets/titleIcon.svg": "3941f4d0bda6af951e5a3d758f392327",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/fonts/MaterialIcons-Regular.otf": "4e6447691c9509f7acdbf8a931a85ca1",
"assets/NOTICES": "ea21ca06a1527886d20d5d34e1c3c1ae",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/packages/flutter_inappwebview/t_rex_runner/t-rex.css": "5a8d0222407e388155d7d1395a75d5b9",
"assets/packages/flutter_inappwebview/t_rex_runner/t-rex.html": "16911fcc170c8af1c5457940bd0bf055",
"assets/packages/youtube_player_flutter/assets/speedometer.webp": "50448630e948b5b3998ae5a5d112622b",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "ee9659d472dc6845baf50ebbc00effa0",
"/": "ee9659d472dc6845baf50ebbc00effa0",
"main.dart.js": "ad9d3c576cac482343badd07031467ce",
"manifest.json": "c54f6f9e787c7540d871cb3781145cd4",
"version.json": "7e47ec12658a5ecadc1d1ff0b98d3bf7"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "/superopsclone",
"main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
