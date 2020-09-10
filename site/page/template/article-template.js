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
const SimpleArticleBodySection =
  require('../../framework/component/section/simple-article-body-section.js');
const SimpleFooterSectionForArticle =
  require(
    '../../framework/component/section/simple-footer-section-for-article.js',
  );


module.exports = class ArticleTemplate extends Page {
  template() {
    return html`
  <html lang="${settings.locale}">
      <head>
          <${SimpleCommonCSS} />
      </head>
      <body>
          <${SimpleHeaderSection} />    
          <${SimpleHeroSection} route="${this.route}" />
          <${SimpleArticleBodySection} route="${this.route}" />
          <${SimpleFooterSectionForArticle} route="${this.route}" />
      </body>
  </html>
        `;
  }
};

