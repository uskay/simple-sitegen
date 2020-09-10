
      /* eslint-disable */
      // ServiceWorker revision: revZ1sPr6J
      importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');
      workbox.setConfig({ debug: false });
      workbox.core.skipWaiting();
      workbox.core.clientsClaim();
      workbox.precaching.cleanupOutdatedCaches(true);
      workbox.precaching.precacheAndRoute([{"url":"/?launch=homescreen","revision":"revZ1sPr6J"},{"url":"/","revision":"revZ1sPr6J"},{"url":"/article/sample-1","revision":"revZ1sPr6J"},{"url":"/article/sample-2","revision":"revZ1sPr6J"},{"url":"/article/sample-3","revision":"revZ1sPr6J"},{"url":"/article/about","revision":"revZ1sPr6J"},{"url":"/article","revision":"revZ1sPr6J"},{"url":"/staff","revision":"revZ1sPr6J"}]);
      workbox.routing.registerRoute(
        ({url}) => url.pathname.includes('/img/'),
        new workbox.strategies.StaleWhileRevalidate(),
      );
      workbox.routing.registerRoute(
        ({url}) => url.pathname.includes('/img/'),
        new workbox.strategies.StaleWhileRevalidate(),
      );
    