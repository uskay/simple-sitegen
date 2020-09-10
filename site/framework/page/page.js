const {render} = require('preact-render-to-string');
const Meta = require('../../../site/page/template/meta.js');
const babel = require('@babel/core');
const uglify = require('uglify-js');

module.exports = class Page {
  constructor(route, option) {
    this.route = route;
    this.option = option;
  }

  template(param) {
    return '';
  }

  build() {
    const htmHTML = this.template();
    let html = render(htmHTML).split('\n').join(' ');
    // dangerouslySetInnerHtml
    const result = html
      .match(/<dangerouslysetinnerhtml>(.*?)<\/dangerouslysetinnerhtml>/g);
    if (result) {
      result.map((escapedHTML) => {
        const dangerouslysetinnerhtml = escapedHTML
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/&quot;/g, '"');
        html = html
          .replace(/\<dangerouslysetinnerhtml>.*?<\/dangerouslysetinnerhtml>/,
            dangerouslysetinnerhtml);
      });
    }
    // Add doctype
    html = html.replace('<html', `<!DOCTYPE html><html`);
    // Add meta data
    const htmMetaData = (new Meta()).build(this.route);
    let metaData = render(htmMetaData);
    metaData = this._parseStructuredData(metaData);
    html = html.replace('</head>', `${metaData}</head>`);
    // Add style
    html = this._inject(/\<%style>(.*?)<\/%style>/g, html, 'style', '</head>');
    // Add script
    html =
      this._inject(/\<%script>(.*?)<\/%script>/g, html, 'script', '</body>');
    return html;
  }

  _parseStructuredData(metaData) {
    const matchResult =
      metaData.match(/<structured-data\s+content="(.+)"><\/structured-data>/);
    if (!matchResult || !matchResult[1]) {
      return metaData;
    }
    const jsonLd = matchResult[1].replace(/&quot;/g, '"');
    return metaData.replace(
      /<structured-data.+><\/structured-data>/,
      `<script type="application/ld+json">${jsonLd}</script>`);
  }

  _inject(regex, html, tag, target) {
    let matches; const set = new Set();
    while (matches = regex.exec(html)) {
      set.add(matches[1].replace(/&gt;/g, '>'));
    }
    html = html.replace(regex, '');
    let sanitizedValue = Array.from(set).join(' ');
    if (!sanitizedValue.trim()) {
      return html;
    }
    if (tag === 'script') {
      sanitizedValue = sanitizedValue + /* javascript */`
        if ('serviceWorker' in navigator) {
          window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js');
          });
        }
      `;
      if (this.option.transpile) {
        sanitizedValue = (babel.transformSync(sanitizedValue, {
          presets: [
            [
              '@babel/preset-env',
            ],
          ],
        })).code;
      }
      if (this.option.minify) {
        sanitizedValue = (uglify.minify(sanitizedValue)).code;
      }
    }
    if (sanitizedValue) {
      html = html.replace(target,
        `<${tag}>${sanitizedValue}</${tag}>${target}`);
    }
    return html;
  }
};

