const {h} = require('preact');
const htm = require('htm');
const html = htm.bind(h);
const SimpleUI = require('./simple-ui.js');
const SimpleResponsiveCard = require('./simple-responsive-card.js');

module.exports = class SimpleCarousel extends SimpleUI {
  componentName() {
    return 'SimpleCarousel';
  }
  commonStyle(props) {
    return /* css*/`
      :host {
        width: 100%;
        margin-top: 30px;
      }
      :host .no-peek {
        width: 100%;
        display: grid;
        display: -ms-grid;
        grid-template-columns: 1fr 1fr;
        -ms-grid-columns: 1fr 1fr;
        -ms-grid-rows: auto;
        grid-column-gap: 10px;
        box-sizing: border-box;
        padding: 0px 10px 0px 10px;
      }
      :host .item {
        font-size: 0.9em;
        border-radius: 5px;
        box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
        position: relative;
        padding-bottom: 40px;
        overflow: hidden;
      }
      :host .title {
        box-sizing: border-box;
        padding: 10px;
        text-align: left;
      }
      :host .meta {
        position: absolute;
        right: 10px;
        bottom: 10px;
      }
      :host a, :link :visited {
        text-decoration: none;
        color: inherit;
      }
      .SimpleCarousel::-webkit-scrollbar {
        background: #253239;
      }    
      .SimpleCarousel::-webkit-scrollbar-thumb {
          background: #364953;
          border-radius: 1ex;
          box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.75);
      }
    `;
  }
  style(props) {
    const content = JSON.parse(props.content);
    if (content.items.length < 3) {
      return '';
    }
    let columnSizeDesktop = '';
    let columnSizeMobile = '';
    const route = props.route;
    content.items.map((item) => {
      if (item.href.includes(route)) {
        return;
      }
      columnSizeDesktop = columnSizeDesktop + ' 40%';
      columnSizeMobile = columnSizeMobile + ' 70%';
    });
    return /* css */`
      #${this.uniqueId} {
        overflow-x: scroll;
        overflow-y: hidden;
      }
      #${this.uniqueId} .peek {
        width: 100%;
        display: grid;
        display: -ms-grid;
        grid-column-gap: 2%;
        padding: 0px 10px 10px 10px;
      }
      @media only screen and (max-width: 550px) {
        #${this.uniqueId} .peek {
          grid-template-columns: ${columnSizeMobile};
          -ms-grid-columns: ${columnSizeMobile};
          -ms-grid-rows: auto;
        } 
      }
      @media only screen and (min-width: 551px) {
        #${this.uniqueId} .peek {
          grid-template-columns: ${columnSizeDesktop};
          -ms-grid-columns: ${columnSizeDesktop};
          -ms-grid-rows: auto;
        } 
      }
    `;
  }
  template(props) {
    const route = props.route;
    const content = JSON.parse(props.content);

    if (content.items.length < 3) {
      return html`
        <div class="no-peek">
        ${content.items.map((item, index) => {
        const msGridCompat = `-ms-grid-row: 1; -ms-grid-column: ${index + 1}`;
        return html`
          <div class="ms-grid-item" style="${msGridCompat}">
          <a href="${item.href}"  
              target="${item.href.startsWith('http') ? '_blank' : '_self'}" 
              rel="noopener">
            <${SimpleResponsiveCard} description="${item.description}" 
                                  meta="${item.meta}" src="${item.img.src}" 
                                  width="${item.img.width}" 
                                  width="${item.img.height}"/>    
          </a>
          </div>
          `;
      })}
        </div>  
     `;
    } else {
      let index = 0;
      return html`
        <div class="peek">
        ${content.items.map((item) => {
        if (item.href.includes(route)) {
          return;
        }
        index++;
        const msGridCompat = `-ms-grid-row: 1; -ms-grid-column: ${index}`;
        return html`
          <div class="ms-grid-item" style="${msGridCompat}">
            <a href="${item.href}" 
               target="${item.href.startsWith('http') ? '_blank' : '_self'}" 
               rel="noopener">
              <${SimpleResponsiveCard} contentTitle="${item.title}" 
                                    description="${item.description}" 
                                    meta="${item.meta}" src="${item.img.src}" 
                                    width="${item.img.width}" 
                                    height="${item.img.height}"/>    
            </a>
          </div>
          `;
      })}
        </div>  
     `;
    }
  }
};
