const Task = require('../task');
const data = require('../../site/page/data/data.json');
const settings = require('../../settings.json');
const ImgOptimizer = require('../img-optimizer.js');


module.exports = class GenerateOGPImage extends Task {
  run(index) {
    return new Promise((resolve, reject) => {
      this.logAppend(`Working on async task ${index}`);
      const heroImages = data['SimpleHeroSection'];
      const transformAllHeroImages = async (_) => {
        for (const route of Object.keys(heroImages)) {
          let src = heroImages[route].slide[0].src;
          // should be smarter than this
          src = src.replace('500w', '1200w');
          const routeImg = route === '/' ? '/index' : route;
          const ogpImages = [
            [
              `.${src}`,
              `.${settings.ogpDirectory}${routeImg}_2x1.jpg`,
              1200,
              600,
            ],
            [
              `.${src}`,
              `.${settings.ogpDirectory}${routeImg}_1x1.jpg`,
              1200,
              1200,
            ],
            [
              `.${src}`,
              `.${settings.ogpDirectory}${routeImg}_4x3.jpg`,
              1200,
              900,
            ],
            [
              `.${src}`,
              `.${settings.ogpDirectory}${routeImg}_16x9.jpg`,
              1200,
              675,
            ],
            [
              './res/common/img/raw/icon.png',
              './res/common/img/favicon.png',
              96,
              96,
            ],
          ];
          const pathMatchResult = ogpImages[0][0].match(/\/.+\//);
          this.mkdir(`.${pathMatchResult[0]}`);
          const optimizer = new ImgOptimizer();
          const exec = async (_) => {
            for (const item of ogpImages) {
              await optimizer.reizeSingle(item[0], item[1], item[2], item[3]);
              this.logAppend('.');
            }
          };
          await exec();
        };
        this.log('');
        this.log('GENERATE OGP IMAGE - COMPLETE', index);
        resolve();
      };
      transformAllHeroImages();
    });
  }
};
