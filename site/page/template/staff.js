/* eslint-disable max-len */
const {h} = require('preact');
const htm = require('htm');
const html = htm.bind(h);
const settings = require('../../../settings.json');
const Page = require('../../framework/page/page.js');
const SimpleStaffStorySection =
    require('../../framework/component/section/simple-staff-story-section.js');
const data = require('../data/data-staff-stories.json');

module.exports = class Stories extends Page {
    template() {
        return html`
      <html amp lang="${settings.locale}">
      <head>
          <meta charset="utf-8" />
          <script async src="https://cdn.ampproject.org/lts/v0.js"></script>
          <script async custom-element="amp-story" 
                  src="https://cdn.ampproject.org/lts/v0/amp-story-1.0.js">
          </script>
          <script async custom-element="amp-video" 
                  src="https://cdn.ampproject.org/lts/v0/amp-video-0.1.js">
          </script>
          <link rel="canonical" href="/" />
          <title>${data.title}</title>
          <meta name="viewport" 
                content="width=device-width,minimum-scale=1,initial-scale=1" />
          <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
          <style amp-custom>
              amp-story {
                  font-family: 'Noto Sans JP', sans-serif;
              }    
              .overlay {
                  width: 100%;
                  height: 100%;
                  position: absolute;
                  top: 0px;
                  background: linear-gradient(180deg, rgba(0, 0, 0, 0),
                    rgba(0, 0, 0, .1), rgba(0, 0, 0, 1));
                  color: white;
                  display: flex;
                  justify-content: center;
                  text-shadow: 1px 1px 1px black;
              }
              .header {
                  width: 100%;
                  position: absolute;
                  top: 0px;
                  z-index: 3;
              }
              .content {
                  position: absolute;
                  bottom: 30px;
                  max-width: 90%;
                  text-align: center;
              }
              #top_title .content {
                bottom: 50px;
              }
              .theme {
                  margin-top: 20px;
                  font-size: 1.1em;
                  font-weight: 700;
              }
              #top_title .theme {
                font-size: 2.0em;
              }
              .theme span {
                  box-shadow: inset 0 -10px 0 rgba(255, 255, 0, 0.3);
              }
              .description {
                  margin-top: 10px;
                  font-size: 0.8em;
                  font-weight: 200;
              }
              .logo {
                  width: 100px;
                  margin: 40px auto;
              }
              .logo amp-img {
                  filter: drop-shadow(3px 3px 5px black);
                  will-change: filter;
              }
              .hash-container {
                  width: max-content;
                  margin: 0 auto;
              }
              .hash {
                  width: max-content;
                  height: 30px;
                  padding: 0px 10px;
                  border-radius: 25px;
                  font-size: 0.7em;
                  line-height: 30px;
                  float: left;
              }
              .meal {
                  margin: 20px 0px 10px 0px;
                  background-color: rgba(255, 255, 0, 0.3);
              }
              .play {
                  margin: 20px 0px 10px 10px;
                  background-color: rgb(118, 226, 231, 0.3)
              }
              @media only screen and (max-width: 800px) {
                  .hash-container {
                      width: 100%;
                  }
                  .hash {
                      width: max-content;
                      height: 30px;
                      padding: 0px 10px;
                      border-radius: 25px;
                      font-size: 0.7em;
                      line-height: 30px;
                      margin: 0 auto;
                      float: none;
                  }
                  .meal {
                      margin-top: 20px;
                      background-color: rgba(255, 255, 0, 0.3);
                  }
                  .play {
                      margin-top: 10px;
                      background-color: rgb(118, 226, 231, 0.3)
                  }
              }
              @media only screen and (min-width: 801px) {
                  .logo {
                      width: 150px;
                  }
                  .content {
                      max-width: 50%;
                  }
              }
          </style>
      </head>
      <body>
          <amp-story standalone supports-landscape
              title="${data.title}"
              publisher="${data.publisher}"
              publisher-logo-src="/res/common/img/logo-icon.svg"
              poster-portrait-src="/res/page/img/stories_staff_portrait_poster-500w.jpg"
              poster-square-src="/res/page/img/stories_staff_square_poster-300w.jpg"
              poster-landscape-src="/res/page/img/stories_staff_landscape_poster-300w.jpg">
              ${data.stories.map((item) => {
                    if (!item.show) {
                        return;
                    }
                    return html`
                    <${SimpleStaffStorySection} 
                        id="${item.id}"
                        role="${item.role}"
                        name="${item.name}"
                        fullName="${item.fullName}"
                        meal="${item.meal}"
                        play="${item.play}"
                        like="${item.like}"
                        img="${item.img}"
                        title="${item.title}"
                        objectPosition='${item.objectPosition}'
                    />
                    `;
                },
              )}
              <amp-story-bookend src="/res/common/staff-bookend.json"
                                 layout="nodisplay"></amp-story-bookend>
          </amp-story>
      </body>
      </html>
    `;
    }
};

