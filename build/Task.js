const fs = require('fs');
module.exports = class Task {
  constructor() {
    this.taskList = [];
  }
  log(message) {
    console.log('\x1b[36m%s\x1b[0m', message);
  }
  mkdir(dir) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(
        dir, {recursive: true}, (err) => {
          if (err) throw err;
        });
    }
  }
  add(task) {
    this.taskList.push(task);
  }
  async run() {
    // Override this to execute individual task
  }
  runAll() {
    this.taskList.forEach(async (task) => {
      await task.run();
    });
  }
};
