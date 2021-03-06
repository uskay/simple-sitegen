const Task = require('../task');
const fs = require('fs');
const HtmlRenderer = require('../html-renderer.js');
const Polyfill = require('../Polyfill.js');
const settings = require('../../settings.json');
const Inject = require('../injection/Inject.js');

module.exports = class GenerateHTML extends Task {
  run(index) {
    return new Promise((resolve, reject) => {
      const OUTPUT_DIRECTORY = './prod';
      let HTML_DIRECTORY = '/_html';
      if (settings.hostingOnly) {
        HTML_DIRECTORY = '/';
      }
      const route = settings.route;
      const option = {transpile: true, minify: true};
      const noPolyfill = settings.nopolyfill;
      const write = (fullPath, path, html) => {
        fs.writeFileSync(`${fullPath}.html`, html);
        const POLYFILL_SUFFIX = '_polyfill';
        let filledHTML = html;
        if (!noPolyfill[path]) {
          const polyfill = new Polyfill();
          filledHTML = polyfill.fill(html);
        }
        fs.writeFileSync(
          `${fullPath}${POLYFILL_SUFFIX}.html`, filledHTML);
      };
      Object.keys(route).forEach((path) => {
        const renderer = new HtmlRenderer(path, option);
        const html = (new Inject(renderer.render(), path))
          .rightAfterHead()
          .rightBeforeHeadClose()
          .rightAfterBody()
          .rightBeforeBodyClose()
          .custom()
          .toString();
        const pathMatchResult = path.match(/\/.+\//);
        const APP_DIRECTORY = pathMatchResult ? pathMatchResult[0] : '';
        const productionDir =
          `${OUTPUT_DIRECTORY}${HTML_DIRECTORY}${APP_DIRECTORY}`;
        this.mkdir(productionDir);
        const fullPath = path === '/' ? '/index' : path;
        const fullProductionPath =
          `${OUTPUT_DIRECTORY}${HTML_DIRECTORY}${fullPath}`;
        write(fullProductionPath, path, html);
      });
      this.log('GENERATE HTML - COMPLETE', index);
      resolve();
    });
  }
};
