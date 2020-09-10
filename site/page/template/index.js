const {h} = require('preact');
const htm = require('htm');
const html = htm.bind(h);
const settings = require('../../../settings.json');
const Page = require('../../framework/page/page.js');
const SimpleCommonCSS =
  require('../../framework/component/simple-common-css.js');
const SimpleHeroSection =
  require('../../framework/component/section/simple-hero-section.js');
const SimpleWelcomeSection =
  require('../../framework/component/section/simple-welcome-section.js');
const SimpleArticleSection =
  require('../../framework/component/section/simple-article-section.js');
const SimpleStaffSection =
  require('../../framework/component/section/simple-staff-section.js');
const SimpleFooterSection =
  require('../../framework/component/section/simple-footer-section.js');
const SimpleHeaderSection =
  require('../../framework/component/section/simple-header-section.js');


module.exports = class Index extends Page {
  template() {
    return html`
            <html lang="${settings.locale}">
                <head>
                    <${SimpleCommonCSS} />
                </head>
                <body>
                    <${SimpleHeaderSection} />    
                    <${SimpleHeroSection} route="/" />
                    <${SimpleWelcomeSection} />
                    <${SimpleArticleSection} />
                    <${SimpleStaffSection} />
                    <${SimpleFooterSection} />
                </body>
            </html>
        `;
  }
};

