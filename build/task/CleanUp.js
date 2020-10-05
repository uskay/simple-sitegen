const Task = require('../task');
const {execSync} = require('child_process');

module.exports = class CleanUp extends Task {
  run(index) {
    return new Promise((resolve, reject) => {
      // TODO: change to Node based procedure for portability
      const OUTPUT_DIRECTORY = './prod';
      const DEBUG_DIRECTORY = './debug';
      execSync(`rm -rf ${OUTPUT_DIRECTORY}/*`);
      execSync(`rm -rf ${DEBUG_DIRECTORY}/*`);
      this.log('CLEAN UP - COMPLETE', index);
      resolve();
    });
  }
};
