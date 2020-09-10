const {h} = require('preact');
const htm = require('htm');
const html = htm.bind(h);
const SimpleUI = require('./simple-ui.js');

module.exports = class SimpleImg extends SimpleUI {
  componentName() {
    return 'SimpleImg';
  }
  commonStyle(props) {
    switch (props.layout) {
      case 'cover':
        return /* css*/`
          :host {
            display: inline;
          }
          .${this.componentName()}-${props.layout}-layout {
            width:100%;
            height:100%;
          }
          .${this.componentName()}-${props.layout}-layout img {
            width:100%;
            height:100%;
            object-fit: cover;
          }
        `;
      case 'responsive':
        return /* css*/`
            .${this.componentName()}-${props.layout}-layout {
              width: 100%;
              position: relative;
              background-color: transparent;
              overflow: hidden;
            }
            .${this.componentName()}-${props.layout}-layout img {
              position: absolute;
              width: 100%;
              top: 50%;
              left: 50%;
              transform: translate(-50%,-50%);
            }
          `;
    }
    return '';
  }
  style(props) {
    if (props.layout !== 'responsive') {
      return '';
    }
    return /* css*/`
      #${this.uniqueId} .placeholder {
        padding-top: 
        ${Math.round((props.height / props.width * 100) * 10) / 10}%;
      }
    `;
  }
  template(props) {
    return html`
      <div class="placeholder ${this.componentName()}-${props.layout}-layout">
        <img src="${props.src}" 
             srcset="${props.srcset ? props.srcset : ''}" 
             sizes="50vw" loading="lazy" 
             alt="${props.alt}"
             />
      </div>
    `;
  }
};
