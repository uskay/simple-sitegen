const sh = require('shorthash');

module.exports = class GenId {
  static unique(componentName) {
    const randomInt = parseInt(Math.random() * 10000);
    const timestamp = (new Date()).getTime();
    const unique = sh.unique(`${componentName}${randomInt}${timestamp}`);
    return `Simple${unique}`;
  }
};
