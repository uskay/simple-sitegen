const {h} = require('preact');
const htm = require('htm');
const html = htm.bind(h);
const SimpleUI = require('./simple-ui.js');

module.exports = class SimpleBanner extends SimpleUI {
  componentName() {
    return 'SimpleBanner';
  }
  commonStyle(props) {
    if (!this.feed.isOn) {
      return '';
    }
    return /* css*/`
      :host {
        width: 90%;
        position: relative;
        box-shadow: 0 2px 4px -1px rgba(0,0,0,0.2), 
        0 4px 5px 0 rgba(0,0,0,0.14), 0 1px 10px 0 rgba(0,0,0,0.12);
        border-radius: 10px;
        margin: 30px auto 0px auto;
        padding: 20px 0px 1px 0px;
        line-height: 25px;
        background-color: ${this.feed.backgroundColor};
        color: ${this.feed.fontColor};
        clear: both;
      }
      :host .banner-title {
        width: 100%;
        text-align: center;
        font-size: 1.2em;
        font-weight: 700;
        margin-top: 5px;
      }
      :host .banner-description {
        width: 80%;
        margin: 20px auto;
        font-size: 0.9em;
        position: relative;
        padding-bottom: 30px;
      }
      :host .banner-meta {
        position: absolute;
        bottom: 0px;
        right: 0px;
        font-size: 0.9em;
      }
      :host .banner-meta span {
        box-shadow: inset 0 -5px 0 rgba(255, 255, 0, 0.3)
      }
      :host a, :link :visited {
        text-decoration: none;
        color: inherit;
      }
    `;
  }

  template(props) {
    if (!this.feed.isOn) {
      return '';
    }
    return html`
      <a href="${this.feed.href}">
        <div class="banner-title">${this.feed.title}</div>
        <div class="banner-description">
          ${this.feed.description}
          <div class="banner-meta"><span>${this.feed.button}</span></div>
        </div>
      </a>
     `;
  }
};
