const cacheName = "cache-students";

// When browser reads this, caches all files mentioned in array
self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(cacheName).then(function (cache) {
      return cache.addAll([
        "/studentsDownloadable/",
        "/studentsDownloadable/index.html",
        "/studentsDownloadable/members.json",
        "/studentsDownloadable/javascript.js",
        "/studentsDownloadable/morten.png",
        "/studentsDownloadable/nina.png",
        "/studentsDownloadable/olivia.png",
      ]);
    })
  );
});

// If the user request ressource (file, html, image etc) then look for it online
// If not available online, get file from cache
self.addEventListener("fetch", function (event) {
  event.respondWith(
    fetch(event.request).catch(() =>
      caches.open(cacheName).then((cache) => cache.match(event.request))
    )
  );
});
