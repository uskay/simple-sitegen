const {h} = require('preact');
const htm = require('htm');
const html = htm.bind(h);
const settings = require('../../../settings.json');
const Page = require('../../framework/page/page.js');
const SimpleCommonCSS =
  require('../../framework/component/simple-common-css.js');
const SimpleHeaderSection =
  require('../../framework/component/section/simple-header-section.js');
const SimpleHeroSection =
  require('../../framework/component/section/simple-hero-section.js');
const SimpleArticleListSection =
  require('../../framework/component/section/simple-article-list-section.js');
const SimpleFooterSection =
  require('../../framework/component/section/simple-footer-section.js');


module.exports = class Article extends Page {
  template() {
    return html`
      <html lang="${settings.locale}">
          <head>
              <${SimpleCommonCSS} />
          </head>
          <body>
              <${SimpleHeaderSection} />    
              <${SimpleHeroSection} route="${this.route}" />
              <${SimpleArticleListSection} />
              <${SimpleFooterSection} />
          </body>
      </html>
    `;
  }
};

