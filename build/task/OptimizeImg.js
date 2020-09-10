const Task = require('../task');
const ImgOptimizer = require('../img-optimizer.js');
const settings = require('../../settings.json');

module.exports = class OptimizeImg extends Task {
  async run() {
    const optimizer = new ImgOptimizer();
    const targetAndDist = settings.img.optimize;
    const optimize = async (_) => {
      targetAndDist.forEach(async (dir) => {
        await optimizer.reize(dir.target, dir.dist);
        await optimizer.min(dir.target, dir.dist);
      });
    };
    await optimize();
    this.log('OPTIMIZE IMAGE - COMPLETE');
  }
};
