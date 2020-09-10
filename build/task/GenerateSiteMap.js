const Task = require('../task');
const fs = require('fs');
const settings = require('../../settings.json');

module.exports = class GenerateSiteMap extends Task {
  run() {
    const urlList = [];
    Object.keys(settings.route).forEach((path) => {
      urlList.push(`${settings.siteOrigin}${path}`);
    });
    fs.writeFileSync(`.${settings.siteMapPath}`, urlList.join('\n'));
  }
};
