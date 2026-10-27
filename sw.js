// 葡萄牙素食地圖 離線快取（產出網站.py 自動產生，不要手改）
const CACHE = "pvm-b78cb4008b";
const FILES = ["./", "./index.html", "./manifest.webmanifest", "./icon-180.png", "./icon-512.png", "./trip-img.bin", "./sights/S01.jpg", "./sights/S02.jpg", "./sights/S03.jpg", "./sights/S04.jpg", "./sights/S05.jpg", "./sights/S06.jpg", "./sights/S07.jpg", "./sights/S08.jpg", "./sights/S09.jpg", "./sights/S10.jpg", "./sights/S11.jpg", "./sights/S12.jpg", "./sights/S13.jpg", "./sights/S14.jpg", "./sights/S15.jpg", "./sights/S16.jpg", "./sights/S17.jpg", "./sights/S18.jpg", "./sights/S19.jpg", "./sights/S20.jpg", "./sights/S22.jpg", "./sights/S23.jpg", "./sights/S24.jpg", "./sights/S25.jpg", "./sights/S26.jpg", "./sights/S27.jpg", "./sights/S28.jpg", "./sights/S29.jpg", "./sights/S30.jpg", "./sights/S31.jpg", "./sights/S32.jpg", "./sights/S33.jpg", "./sights/S34.jpg", "./sights/S35.jpg", "./sights/S36.jpg", "./sights/S37.jpg", "./sights/S38.jpg", "./sights/S39.jpg", "./sights/S40.jpg", "./sights/S41.jpg", "./sights/S42.jpg", "./sights/S43.jpg", "./sights/S44.jpg", "./sights/S45.jpg", "./sights/S46.jpg", "./sights/S47.jpg", "./sights/S48.jpg", "./sights/S49.jpg", "./sights/S50.jpg", "./sights/S51.jpg", "./sights/S52.jpg", "./sights/S53.jpg", "./sights/S54.jpg", "./sights/S55.jpg", "./sights/S56.jpg", "./sights/S57.jpg", "./sights/S58.jpg", "./sights/S59.jpg", "./sights/S60.jpg", "./sights/S61.jpg", "./sights/S62.jpg", "./sights/S63.jpg", "./sights/S64.jpg", "./sights/S65.jpg", "./sights/S66.jpg", "./sights/S67.jpg", "./sights/S68.jpg", "./sights/S69.jpg", "./sights/S70.jpg", "./sights/S71.jpg", "./sights/S72.jpg", "./sights/S73.jpg", "./sights/S74.jpg", "./sights/S75.jpg", "./sights/S76.jpg", "./sights/S77.jpg", "./sights/S78.jpg", "./sights/S79.jpg", "./sights/S80.jpg", "./sights/S81.jpg", "./sights/S82.jpg", "./sights/S83.jpg", "./sights/S84.jpg", "./sights/S85.jpg", "./sights/S86.jpg", "./sights/S87.jpg", "./sights/S88.jpg", "./sights/S90.jpg", "./sights/S91.jpg", "./sights/S92.jpg", "./sights/S93.jpg", "./sights/S94.jpg", "./sights/S95.jpg", "./sights/S96.jpg"];
self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k.startsWith("pvm-") && k !== CACHE).map((k) => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener("fetch", (e) => {
  const req = e.request, url = new URL(req.url);
  if (req.method !== "GET" || url.origin !== location.origin) return;
  if (req.mode === "navigate") {
    // 頁面：有網路先拿新的（最多等 4 秒），失敗就用手機裡存的
    e.respondWith((async () => {
      const cache = await caches.open(CACHE);
      try {
        const ctl = new AbortController(), t = setTimeout(() => ctl.abort(), 4000);
        const res = await fetch(req, { signal: ctl.signal }); clearTimeout(t);
        if (res.ok) cache.put("./index.html", res.clone());
        return res;
      } catch (err) {
        return (await cache.match("./index.html")) || (await cache.match("./")) || Response.error();
      }
    })());
    return;
  }
  e.respondWith(caches.match(req).then((hit) => hit || fetch(req).then((res) => {
    if (res.ok) caches.open(CACHE).then((c) => c.put(req, res.clone()));
    return res;
  })));
});
