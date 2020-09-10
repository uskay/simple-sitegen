const {h} = require('preact');
const htm = require('htm');
const html = htm.bind(h);
const SimpleUI = require('./simple-ui.js');
const SimpleImg = require('./simple-img.js');

module.exports = class SimpleResponsiveCardSmall extends SimpleUI {
  componentName() {
    return 'SimpleResponsiveCardSmall';
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
        display: grid;
        grid-template-columns: 200px 1fr;
        grid-template-rows: 1fr;
        grid-column-gap: 20px;
        margin-top: 20px;
      }
      :host .thumbnail {
        width: 100%;
        height: 100%;
        background-color: gray;
        overflow: hidden;
      }
      :host .content .title {
        font-size: 1.2em;
        font-weight: 700;
      }

      :host .title {
        box-sizing: border-box;
        padding: 20px 10px 10px 10px;
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
        <div class="content">
        ${props.contentTitle ?
        html`
                <div class="title">
                    ${props.contentTitle}
                </title>` :
        ''
      }
        ${props.description ?
        html`
                <div class="description">
                    ${props.description}
                </title>` :
        ''
      }
        ${props.meta ?
        html`
                <div class="meta">
                    ${props.meta}
                </title>` :
        ''
      }  
        </div>
     `;
  }
};
