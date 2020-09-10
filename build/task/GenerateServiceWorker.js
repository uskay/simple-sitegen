const Task = require('../task');
const fs = require('fs');
const sh = require('shorthash');
const settings = require('../../settings.json');

module.exports = class GenerateServiceWorker extends Task {
  run() {
    const timestamp = (new Date()).getTime();
    const revision = `rev${sh.unique(`${timestamp}`)}`;
    let outputDir = './prod/_html/';
    if (settings.hostingOnly) {
      outputDir = './prod/';
    }
    const precacheList = [];
    precacheList.push({
      url: settings.startUrl,
      revision: revision,
    });
    Object.keys(settings.route).forEach((key) => {
      const route = {
        url: key,
        revision: revision,
      };
      precacheList.push(route);
    });
    const serviceWorker = /* javascript */`
      /* eslint-disable */
      // ServiceWorker revision: ${revision}
      importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');
      workbox.setConfig({ debug: false });
      workbox.core.skipWaiting();
      workbox.core.clientsClaim();
      workbox.precaching.cleanupOutdatedCaches(true);
      workbox.precaching.precacheAndRoute(${JSON.stringify(precacheList)});
      workbox.routing.registerRoute(
        ({url}) => url.pathname.includes('/img/'),
        new workbox.strategies.StaleWhileRevalidate(),
      );
      workbox.routing.registerRoute(
        ({url}) => url.pathname.includes('/img/'),
        new workbox.strategies.StaleWhileRevalidate(),
      );
    `;
    this.mkdir(outputDir);
    fs.writeFileSync(`${outputDir}sw.js`, serviceWorker);
  }
};
