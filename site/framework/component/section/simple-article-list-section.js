const {h} = require('preact');
const htm = require('htm');
const html = htm.bind(h);
const SimpleUI = require('../simple-ui.js');
const SimpleResponsiveCard = require('../simple-responsive-card.js');
const SimpleResponsiveCardSmall = require('../simple-responsive-card-small.js');
const SimpleCarousel = require('../simple-carousel.js');

module.exports = class SimpleArticleListSection extends SimpleUI {
  componentName() {
    return 'SimpleArticleListSection';
  }
  commonStyle(props) {
    return /* css*/`
      :host {
        width: 100%;
        background-color: white;
        color: black;
        position: relative;
        overflow: hidden;
      }
      :host .section {
        max-width: 800px;
        margin: 0px auto;
        padding-top: 10px;
        padding-bottom: 70px;
      }
      :host .title {
        text-align: center;
      }
      :host .articles {
        width: 95%;
        margin: 0 auto;
      }
      :host .all-articles .SimpleResponsiveCard {
        background-color: #364953;
        margin-bottom: 30px;
        height: inherit;
      }
      :host .SimpleResponsiveCard .description,
      :host .SimpleResponsiveCardSmall .description {
        font-size: 0.9em;
      }
      :host .SimpleResponsiveCard .meta {
        right: 15px;
        bottom: 15px;
      }
      :host .all-articles.SimpleResponsiveCard .thumbnail {
        height: 30vh;
      }
      :host .SimpleResponsiveCard, :host .SimpleResponsiveCardSmall  {
        background-color: #efefef;
        color: #253239;
      }
      :host .recommendation-carousel .SimpleResponsiveCard .title {
        font-size: 1.1em;
        font-weight: 700;
      }
      :host .recommendation-carousel .SimpleResponsiveCard .description {
        font-size: 0.9em;
      }
      .recommendation-carousel.SimpleCarousel::-webkit-scrollbar {
        background: white !important;
      }    
      .recommendation-carousel.SimpleCarousel::-webkit-scrollbar-thumb {
          background: gray;
          border-radius: 1ex;
          box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.75);
      }
      :host .meta {
        box-shadow: inset 0 -5px 0 rgba(255, 255, 0, 0.3);
      }
      :host .recommendation-carousel .thumbnail {
        height: 20vh !important;
      }
      :host .SimpleResponsiveCard .title {
        margin-top: 10px;
        font-size: 1.1em;
        font-weight: 700;
      }
      :host .SimpleResponsiveCardSmall .title {
        margin-top: 10px;
        font-size: 1.1em;
        font-weight: 700;
      }
      
      @media only screen and (min-width: 801px) {
        :host .all-articles.SimpleResponsiveCard .thumbnail {
          height: 45vh !important; 
        } 
        :host .SimpleResponsiveCard .description,
        :host .SimpleResponsiveCardSmall .description {
          font-size: 1.0em;
        }
        :host .SimpleResponsiveCard .title {
          margin-top: 10px;
          font-size: 1.5em;
          font-weight: 700;
        }
        :host .no-display-on-desktop {
          display: none;
        }
      }
      @media only screen and (max-width: 800px) {
        :host .no-display-on-mobile {
          display: none;
        }
        :host .SimpleResponsiveCard {
          margin-top: 10px;
        }
      }
      :host a, :link :visited {
        text-decoration: none;
        color: inherit;
      }
    `;
  }

  template(props) {
    return html`
      <div class="section" id="article">
        <div class="title"><h2 class="light"><span>おすすめ</span></h2></div>
        <div class="recommendation">
          <${SimpleCarousel} 
            content="${JSON.stringify(this.feed.carousel)}"
            route="${props.route}"
            class="recommendation-carousel"
          />
        </div>

        <div class="title"><h2 class="light"><span>新着記事</span></h2></div>

        <div class="articles">
          ${this.feed.articles.map((item, index) => {
    if (index === 0) {
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
                    class="all-articles"
                  />
                </a>
                `;
    }
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
                    class="all-articles no-display-on-desktop"
                />
                <${SimpleResponsiveCardSmall} 
                    contentTitle="${item.title}" 
                    description="${item.description}" 
                    meta="${item.meta}" 
                    src="${item.img.src}" 
                    srcset="${item.img.srcset}" 
                    width="${item.img.width}" 
                    height="${item.img.height}"
                    class="no-display-on-mobile"
                 />
              </a>
            `;
  })}
        </div>
      </div>
     `;
  }
};
