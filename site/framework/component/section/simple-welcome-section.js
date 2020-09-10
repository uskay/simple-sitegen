const {h} = require('preact');
const htm = require('htm');
const html = htm.bind(h);
const SimpleUI = require('../simple-ui.js');
const SimpleImg = require('../simple-img.js');
const SimpleCarousel = require('../simple-carousel.js');
const SimpleBannerApplication = require('./simple-banner-application.js');
const SimpleBannerHotTopics = require('./simple-banner-hot-topics.js');

module.exports = class SimpleWelcomeSection extends SimpleUI {
  componentName() {
    return 'SimpleWelcomeSection';
  }
  commonStyle(props) {
    return /* css*/`
      :host {
        width: 100%;
        background-color: white;
        position: relative;
      }
      :host .section {
        max-width: 800px;
        margin: 0px auto;
        padding-top: 30px;
        padding-bottom: 100px;
      }
      :host .title {
        text-align: center;
      }
      :host .text {
        font-size: 1.1em;
      }
      @media only screen and (max-width: 800px) {
        :host .container {
          width: 100%;
          margin: 50px auto 0px auto;
        }
        :host .container .icon {
          width: 200px;
          height: 200px;
          margin: 50px auto 40px auto;
        }
        :host .container .icon .welcome-icon {
          width: 90%;
          height: 90%;
          border-radius: 50%;
          overflow: hidden;
          margin: 0 auto;
        }
        :host .container .icon .welcome-meta {
          width: 100%;
          height: 10%;
          text-align: center;
          margin-top: 5px;
          font-size: 0.9em;
          color: #1E1E1E;

        }
        :host .container .text {
          max-width: 95%;
          margin: 0px auto;
        }
        :host .container .text p {
          margin: 0px;
        }
      }
      @media only screen and (min-width: 801px) {
        :host .container {
          display: grid;
          display: -ms-grid;
          grid-template-rows: 300px;
          -ms-grid-rows: 300px;
          grid-template-columns: 300px 1fr;
          -ms-grid-columns: 300px 1fr;
          grid-column-gap: 30px;
          margin-top: 50px;
          position: relative;
        }
        :host .container .icon {
          width: 300px;
          height: 300px;
          position: relative;
          -ms-grid-column: 1;
          -ms-grid-row: 1;
        }
        :host .container .icon .welcome-icon {
          width: 90%;
          height: 90%;
          border-radius: 50%;
          overflow: hidden;
          margin: 0 auto;
        }
        :host .container .icon .welcome-meta {
          width: 100%;
          height: 10%;
          text-align: center;
          margin-top: 5px;
          font-size: 0.9em;
        }
        :host .container .text {
          position: relative;
          -ms-grid-column: 2;
          -ms-grid-row: 1;
        }
        :host .container .text p {
          margin: 0px;
          position: absolute;
          top: 50%;
          transform: translate(0%, -50%);
        }
      }
      :host h3 {
        margin-top: 0px !important;
      }
      :host #media {
        width: 100%;
        height: 60px;
      }
      
    `;
  }

  template(props) {
    return html`
      <div class="section" id="welcome">
        <div class="title">
          <h2 class="light"><span>${this.feed.title}</span></h2>
        </div>
        <div class="container">
          <div class="icon ms-grid-item">
            <div class="welcome-icon">
              <${SimpleImg} src="${this.feed.icon.src}" 
                         width="${this.feed.icon.width}" 
                         height="${this.feed.icon.height}"
                         alt="welcome image" layout="cover"/>  
            </div>
            <div class="welcome-meta">${this.feed.meta}</div>
          </div>
          <div class="text ms-grid-item">
            <p>
              ${this.feed.description}
            </p>
          </div>
        </div>
        <${SimpleBannerHotTopics} />
        <${SimpleBannerApplication} />
        <div id="media"></div>
        <h3 class="light"><span>${this.feed.subtitle}</span></h3>
        <${SimpleCarousel} 
          content="${JSON.stringify(this.feed.media)}"
        />
      </div>
     `;
  }
};
