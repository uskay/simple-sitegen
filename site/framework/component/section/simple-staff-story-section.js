const {h} = require('preact');
const htm = require('htm');
const html = htm.bind(h);
const SimpleUI = require('../simple-ui.js');

module.exports = class SimpleStaffStorySection extends SimpleUI {
  componentName() {
    return 'amp-story-page';
  }

  template(props) {
    const title = props.title;
    let autoAdvanceAfter = `${props.id}_video`;
    let media = html`
        <amp-video id="${props.id}_video" noaudio width="1"  height="1" 
            layout="responsive" loop autoplay crossOrigin="anonymous"
            poster="/res/page/img/stories_${props.id}_poster-500w.jpg">
            <source src="/res/page/video/stories_${props.id}-large.mp4" 
                    type="video/mp4" 
                    media="screen and (min-width:801px)"/>
            <source src="/res/page/video/stories_${props.id}-small.mp4" 
                    type="video/mp4" 
                    media="screen and (max-width:800px)"/>
        </amp-video>
    `;
    if (props.id === 'top') {
        media = html`
            <amp-img id="${props.id}_img" width="400"  height="300" 
                layout="responsive" src="${props.img}"
                object-position="${props.objectPosition}">
            </amp-img>
        `;
        autoAdvanceAfter = '5s';
    }


    return html`                
      <amp-story-page id="${props.id}" auto-advance-after="${autoAdvanceAfter}">
          <amp-story-grid-layer template="fill">${media}</amp-story-grid-layer>
          <amp-story-grid-layer template="vertical">
                <div class="header">
                    <a href="/">
                        <div class="logo">
                            <amp-img src="/res/common/img/logo-small.svg" 
                                    width="979" height="339" alt="" 
                                    layout="responsive"></amp-img>
                        </div>
                    </a>
                </div>
                <div class="overlay">
                    <div class="content" id="${props.id}_title">
                        <div class="role">${props.role}</div>
                        <h1>${props.name}</h1>
                        <div class="theme"><span>${title}</span></div>
                        <div class="description">${props.like}</div>
                        <div class="hash-container">
                            ${props.meal ? html`<div class="hash meal">
                                ${props.meal}
                                </div>` : ''}
                            ${props.play ? html`<div class="hash play">
                                ${props.play}
                                </div>` : ''}
                        </div>
                    </div>
                </div>
          </amp-story-grid-layer>
      </amp-story-page>
     `;
  }
};
