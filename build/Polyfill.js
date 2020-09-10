module.exports = class Polyfill {
  fill(html) {
    html = this._addHead(html);
    return html;
  }
  _addHead(html) {
    let polyfill = /* css */`
      <style polyfill>
          .ms-grid-item {
              margin-right: 10px;
          }
          @media only screen and (min-width: 801px) {
            .SimpleHeaderSection .section {
              width: 800px !important;
            }
          }
      </style>
      <script src="/res/common/polyfill.js"></script>
    `;
    polyfill = polyfill.replace(/\s+/g, ' ');
    polyfill = polyfill.split('\n').join(' ');
    return html.replace('</head>', `${polyfill}</head>`);
  }
};
