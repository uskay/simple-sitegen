const {h} = require('preact');
const htm = require('htm');
const html = htm.bind(h);
const SimpleUI = require('../simple-ui.js');
const fs = require('fs');
const MarkdownParser = require('../MarkdownParser.js');
const SimpleBannerApplication = require('./simple-banner-application.js');
const SimpleBannerHotTopics = require('./simple-banner-hot-topics.js');
const SimpleSocialShare = require('../simple-social-share.js');

module.exports = class SimpleArticleBodySection extends SimpleUI {
  componentName() {
    return 'SimpleArticleBodySection';
  }
  commonStyle(props) {
    return /* css*/`
      :host h2 {
        text-align: left !important;
        margin-bottom: 0px;
      }
      @media only screen and (max-width: 800px) {
        :host {
          font-size: 16px !important;
          line-height: 30px !important;
        }
        :host h2 {
          font-size: 1.4em !important;
        } 
      }
      :host {
        width: 100%;
        font-size: 18px;
        line-height: 36px;
        color: #222;
        font-weight: 300;
      }
      :host a, :link :visited {
        color: #253239;
      }
      :host .section {
        max-width: 800px;
        margin: 0px auto;
        padding-top: 30px;
        padding-bottom: 50px;
      }
      :host .section .content {
        max-width: 95%;
        margin: 0px auto;
      }
    `;
  }

  template(props) {
    let pageId = '';
    const regex = /[^\/]+$/;
    const result = props.route.match(regex);
    if (result) {
      pageId = result[0];
    }
    try {
      const data = fs.readFileSync(`./site/page/md/${pageId}.md`, 'utf8');
      const parser = new MarkdownParser(data);
      const markUp = parser.getMarkUp();
      return html`
        <div class="section">
          <div class="content">
            <dangerouslysetinnerhtml>${markUp}</dangerouslysetinnerhtml>
          </div>
          <${SimpleSocialShare} />
          <${SimpleBannerHotTopics} route="/article/${pageId}"/>
          <${SimpleBannerApplication} route="/article/${pageId}"/>
        </div>`;
    } catch (err) {
      console.error(err);
    }
  }
};
