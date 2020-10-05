const settings = require('../../settings.json');

module.exports = class Inject {
  constructor(html, path) {
    this.html = html;
    this.path = path;
  }
  rightAfterHead() {
    settings.injectable.afterHead.forEach((injectable) => {
      this._inject('<head>',
        `<head>${this._getMinifiedHTML(injectable)}`);
    });
    return this;
  }
  rightBeforeHeadClose() {
    settings.injectable.beforeHeadClose.forEach((injectable) => {
      this._inject('</head>',
        `${this._getMinifiedHTML(injectable)}</head>`);
    });
    return this;
  }
  rightAfterBody() {
    settings.injectable.afterBody.forEach((injectable) => {
      this._inject('<body>',
        `<body>${this._getMinifiedHTML(injectable)}`);
    });
    return this;
  }
  rightBeforeBodyClose() {
    settings.injectable.beforeBodyClose.forEach((injectable) => {
      this._inject('</body>',
        `${this._getMinifiedHTML(injectable)}</body>`);
    });
    return this;
  }
  custom() {
    settings.injectable.custom.forEach((injectable) => {
      this._inject(injectable.tag,
        injectable.beforeOrAfter === 'before' ?
        `${this._getMinifiedHTML(injectable)}${injectable.tag}` :
        `${injectable.tag}${this._getMinifiedHTML(injectable)}`);
    });
    return this;
  }
  toString() {
    return this.html;
  }
  _getMinifiedHTML(injectable) {
    let shouldExclude = false;
    if (injectable.exclude) {
      injectable.exclude.forEach((path) => {
        if (path === this.path) {
          shouldExclude = true;
        }
      });
    }
    if (injectable.include) {
      injectable.include.forEach((path) => {
        if (path !== this.path) {
          shouldExclude = true;
        }
      });
    }
    if (shouldExclude) {
      return '';
    }
    const injectablePath = '../../site/page/injectable/';
    const Injectable =
      require(`${injectablePath}${injectable.name}.js`);
    return (new Injectable()).getMinifiedHTML();
  }
  _inject(regex, replacement) {
    this.html = this.html.replace(regex, replacement);
  }
};
