const Task = require('../task');
const fs = require('fs');
const settings = require('../../settings.json');
const ImgOptimizer = require('../img-optimizer.js');

module.exports = class GenerateManifest extends Task {
  run(index) {
    return new Promise((resolve, reject) => {
      const manifestDirectory = settings.manifestDirectory;
      const optimizer = new ImgOptimizer();
      const icons = [
        {
          'src': '/res/common/img/icon-192.png',
          'type': 'image/png',
          'sizes': '192x192',
        },
        {
          'src': '/res/common/img/icon-512.png',
          'type': 'image/png',
          'sizes': '512x512',
        },
        {
          'src': '/res/common/img/maskable_icon.png',
          'sizes': '196x196',
          'type': 'image/png',
          'purpose': 'any maskable',
        },
      ];
      icons.forEach(async (item) => {
        const width = parseInt(item.sizes.split('x')[0]);
        await optimizer.reizeSingle(
          './res/common/img/raw/icon.png', `.${item.src}`, width, width);
      });
      const manifest = {
        'short_name': settings.siteName,
        'name': settings.siteName,
        'icons': icons,
        'display': 'standalone',
        'theme_color': '#253239',
        'background_color': '#fff',
        'start_url': settings.startUrl,
      };
      this.mkdir(`.${manifestDirectory}`);
      fs.writeFileSync(
        `.${manifestDirectory}/manifest.json`, JSON.stringify(manifest));
      this.log('GENERATE MANIFEST - COMPLETE', index);
      resolve();
    });
  }
};
