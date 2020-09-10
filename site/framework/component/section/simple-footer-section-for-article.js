const SimpleFooterSection = require('./simple-footer-section.js');

module.exports =
class SimpleFooterSectionForArticle extends SimpleFooterSection {
  componentName() {
    return 'SimpleFooterSectionForArticle';
  }

  commonStyle(props) {
    const style = super.commonStyle(props);
    return style + /* css*/`
      :host .title {
        font-size: 1.1em !important;
      }
    `;
  }
};
