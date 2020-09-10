const Task = require('../task');
const data = require('../../site/page/data/data.json');
const settings = require('../../settings.json');
const ImgOptimizer = require('../img-optimizer.js');


module.exports = class GenerateOGPImage extends Task {
  async run() {
    const heroImages = data['SimpleHeroSection'];
    Object.keys(heroImages).forEach(async (route) => {
      let src = heroImages[route].slide[0].src;
      // should be smarter than this
      src = src.replace('500w', '1000w');
      const routeImg = route === '/' ? '/index' : route;
      const ogpImages = [
        [`.${settings.ogpDirectory}${routeImg}_2x1.jpg`, 800, 400],
        [`.${settings.ogpDirectory}${routeImg}_1x1.jpg`, 400, 400],
        [`.${settings.ogpDirectory}${routeImg}_4x3.jpg`, 400, 300],
        [`.${settings.ogpDirectory}${routeImg}_16x9.jpg`, 640, 360],
      ];
      const pathMatchResult = ogpImages[0][0].match(/\/.+\//);
      this.mkdir(`.${pathMatchResult[0]}`);
      const optimizer = new ImgOptimizer();
      ogpImages.forEach(async (item) => {
        await optimizer.reizeSingle(`.${src}`, item[0], item[1], item[2]);
      });
      // favicon
      await optimizer.reizeSingle(
        './res/common/img/raw/icon.png',
        `./res/common/img/favicon.png`, 32, 32);
    });
  }
};
