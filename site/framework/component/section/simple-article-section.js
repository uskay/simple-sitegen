const {h} = require('preact');
const htm = require('htm');
const html = htm.bind(h);
const SimpleUI = require('../simple-ui.js');
const SimpleResponsiveCard = require('../simple-responsive-card.js');

module.exports = class SimpleArticleSection extends SimpleUI {
  componentName() {
    return 'SimpleArticleSection';
  }
  commonStyle(props) {
    return /* css*/`
      :host {
        width: 100%;
        background-color: #253239;
        color: white;
        position: relative;
        overflow: hidden;
      }
      :host .section {
        max-width: 800px;
        margin: 0px auto;
        padding-top: 10px;
        padding-bottom: 100px;
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
        margin-bottom: 30px;
        height: inherit;
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
      :host .SimpleResponsiveCard .thumbnail {
        height: 30vh;
      }
      @media only screen and (min-width: 801px) {
        :host .thumbnail {
          height: 45vh !important; 
        } 
      }
      :host a, :link :visited {
        text-decoration: none;
        color: inherit;
      }
      :host .meta {
        box-shadow: inset 0 -5px 0 rgba(255, 255, 0, 0.3);
      }
    `;
  }

  template(props) {
    return html`
      <div class="section" id="article">
        <div class="title">
          <h2 class="dark"><span>${this.feed.title}</span></h2>
        </div>
        <div class="articles">
          ${this.feed.articles.map((item) => {
      return html`
              <a href="${item.href}">
                <${SimpleResponsiveCard} 
                  contentTitle="${item.title}" 
                  description="${item.description}" 
                  meta="${item.meta}" 
                  src="${item.img.src}" 
                  srcset="${item.img.srcset}" 
                  width="${item.img.width}" 
                  height="${item.img.height}"
                />
              </a>
            `;
    })}
        </div>
      </div>
     `;
  }
};
