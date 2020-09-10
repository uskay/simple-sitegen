const {h} = require('preact');
const htm = require('htm');
const html = htm.bind(h);
const SimpleUI = require('../simple-ui.js');
const SimpleCarousel = require('../simple-carousel.js');

module.exports = class SimpleFooterSection extends SimpleUI {
  componentName() {
    return 'SimpleFooterSection';
  }
  commonStyle(props) {
    return /* css*/`
      :host {
        width: 100%;
        background-color: #253239;
        color: white;
        position: relative;
      }
      :host .section {
        max-width: 800px;
        margin: 0px auto;
        padding-top: 10px;
        padding-bottom: 20px;
      }
      :host .title {
        text-align: center;
      }
      :host .articles {
        width: 95%;
        margin: 0 auto;
      }
      :host .SimpleResponsiveCard {
        background-color: #364953;
      }
      :host .SimpleResponsiveCard .title {
        margin-top: 10px;
        font-size: 1.5em;
      }
      :host .SimpleResponsiveCard .description {
        font-size: 1.1em;
      }
      :host .SimpleResponsiveCard .meta {
        right: 15px;
        bottom: 15px;
      }
      @media only screen and (max-width: 800px) {
        :host .SimpleResponsiveCard .thumbnail {
          height: 20vh
        }
      }
      :host .tel {
        width: 100%;
        margin-top:50px;
        text-align: center;
        font-size: 1.8em;
        font-weight: 700;
      }
      :host .name {
        margin-top: 20px;
        width: 100%;
        text-align: center;
        font-size: 1.1em;
        font-weight: 700;
      }
      :host .address {
        margin-top: 10px;
        width: 100%;
        font-size: 0.9em;
        text-align: center;
      }
      :host .signature {
        margin-top: 70px;
        width: 100%;
        font-size: 0.7em;
        text-align: center;

      }
      :host .SimpleResponsiveCard .description {
        font-size: 0.9em;
      }
      :host a, :link :visited {
        text-decoration: none;
        color: inherit;
      }
    `;
  }

  template(props) {
    return html`
      <div class="section" id="news">
        <div class="title">
          <h2 class="dark"><span>${this.feed.title}</span></h2>
        </div>
        <div>
          <${SimpleCarousel} 
            content="${JSON.stringify(this.feed.carousel)}"
            route="${props.route}"
          />
        </div>
        <div>
          <div class="tel"><a href="tel:${this.feed.tel}">
            📞 ${this.feed.tel}
          </a></div>
          <div class="name">${this.feed.name}</div>
          <div class="address">${this.feed.address}</div>
          <div class="signature">
            ${this.feed.signature} | <a href="${this.feed.ghlink}">GitHub</a>
          </div>
        </div>
      </div>
     `;
  }
};
