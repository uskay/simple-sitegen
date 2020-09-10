const {h} = require('preact');
const htm = require('htm');
const html = htm.bind(h);
const SimpleUI = require('./simple-ui.js');
const SimpleImg = require('./simple-img.js');

module.exports = class SimpleResponsiveCard extends SimpleUI {
  componentName() {
    return 'SimpleResponsiveCard';
  }
  commonStyle(props) {
    return /* css*/`
      :host {
        height: 100%;
        font-size: 0.9em;
        border-radius: 5px;
        box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
        position: relative;
        overflow: hidden;
        color: inherit;
      }
      :host .thumbnail {
        width: 100%;
        height: 15vh;
        background-color: gray;
      }
      @media only screen and (min-width: 801px) {
        :host .thumbnail {
          height: 20vh;
        } 
      }
      :host .title {
        box-sizing: border-box;
        padding: 10px;
        text-align: left !important;
      }
      :host .description {
        box-sizing: border-box;
        padding: 10px;
        text-align: left !important;
        padding-bottom: 50px;
      }
      :host .meta {
        position: absolute;
        right: 10px;
        bottom: 10px;
      }
    `;
  }

  template(props) {
    return html`
        <div class="thumbnail">
          <${SimpleImg} src="${props.src}" srcset="${props.srcset}" 
                     width="${props.width}" height="${props.height}" 
                     layout="cover"
                     alt="image in a card" 
                     />  
        </div>
        ${props.contentTitle ?
        html`<div class="title">${props.contentTitle}</div>` : ''
      }
        ${props.description ?
        html`<div class="description">${props.description}</div>` : ''
      }
        ${props.meta ?
        html`<div class="meta">${props.meta}</div>` : ''
      }  
     `;
  }
};
