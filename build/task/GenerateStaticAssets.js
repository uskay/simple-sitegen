const Task = require('../task');
const {execSync} = require('child_process');

module.exports = class GenerateStaticAssets extends Task {
  run(index) {
    return new Promise((resolve, reject) => {
      // TODO: change to Node based procedure for portability
      execSync('tar --exclude raw -cf - ./res | (cd ./prod; tar -xf -)');
      this.log('STATIC ASSETS - COMPLETE', index);
      resolve();
    });
  }
};
