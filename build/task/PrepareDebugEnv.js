const Task = require('../task');
const {execSync} = require('child_process');
const settings = require('../../settings.json');

module.exports = class PrepareDebugEnv extends Task {
  run() {
    // TODO: change to Node based procedure for portability
    if (settings.hostingOnly) {
      execSync(
    '(cd ./prod; tar --exclude raw -cf - ./) | (cd ./debug; tar -xf -)');
    } else {
      execSync('(cd ./prod/_html; tar -cf - ./) | (cd ./debug; tar -xf -)');
      execSync('tar --exclude raw -cf - ./res | (cd ./debug; tar -xf -)');
    }

    this.log('PREPARE DEBUG ENV - COMPLETE');
  }
};
