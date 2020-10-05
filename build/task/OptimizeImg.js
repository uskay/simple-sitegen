const Task = require('../task');
const ImgOptimizer = require('../img-optimizer.js');
const settings = require('../../settings.json');

module.exports = class OptimizeImg extends Task {
  run(index) {
    return new Promise((resolve, reject) => {
      this.logAppend(`Working on async task ${index}`);
      const optimizer = new ImgOptimizer();
      const targetAndDist = settings.img.optimize;
      const optimize = async (_) => {
        for (const dir of targetAndDist) {
          await optimizer.reize(dir.target, dir.dist);
          await optimizer.min(dir.target, dir.dist);
          this.logAppend('.');
        }
        this.log('');
        this.log('OPTIMIZE IMAGE - COMPLETE', index);
        resolve();
      };
      optimize();
    });
  }
};
