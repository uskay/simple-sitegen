const {h} = require('preact');
const htm = require('htm');
const html = htm.bind(h);
const SimpleUI = require('../simple-ui.js');
const SimpleImg = require('../simple-img.js');

module.exports = class SimpleStaffSection extends SimpleUI {
  componentName() {
    return 'SimpleStaffSection';
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
      :host .item {
        background: linear-gradient(to right, #FFEB3B, #ECEFF1);
        border-radius: 50%;
        position: relative;
      }
      :host .name {
        position: absolute;
        bottom: -30px;
        width: 100%;
        text-align: center;
        font-size: 0.9em;
        color: #253239;
        font-weight: 700;
      }
      :host .container {
        display: grid;
        display: -ms-grid;
        width: 95%;
        grid-template-columns: 1fr 1fr 1fr;
        -ms-grid-columns: 1fr 1fr 1fr;
        grid-row-gap: 60px;
        -ms-grid-rows: 310px;
        margin: 100px auto;
        position: relative;
      }
      :host .staff-icon {
        border-radius: 50%;
        overflow: hidden;
        padding: 10px;
      }
      :host .staff-icon img {
        border-radius: 50%;
        border: 4px solid white;
        box-sizing: border-box;
      }
      :host a, :link :visited {
        text-decoration: none;
        color: inherit;
      }
      @media only screen and (max-width: 800px) {
        :host .container {
          grid-column-gap: 10px;
          margin: 50px auto;
        }
      }
      @media only screen and (min-width: 801px) {
        :host .container {
          grid-column-gap: 40px;
          margin: 100px auto;
        }
      }

    `;
  }

  template(props) {
    const createIcon = (staff, index) => {
      const columnNo = 3;
      const currentRow = parseInt(index/columnNo) + 1;
      const currentColumn = (index%columnNo) + 1;
      return html`
  <div style="-ms-grid-row: ${currentRow}; -ms-grid-column: ${currentColumn}">
  <a href=${staff.href} >
    <div class="item">
      <div class="staff-icon">
        <${SimpleImg} src="${staff.img.src}" 
                    width="${staff.img.width}" 
                    height="${staff.img.height}"
                    alt="staff image"
                    layout="responsive"/>
      </div>
      <div class="name">${staff.name}</div>
    </div>
  </a>
  </div>
      `;
    };

    return html`
      <div class="section" id="staff">
        <div class="title">
          <h2 class="light"><span>${this.feed.title}</span></h2>
        </div>
        <div class="container">
          ${this.feed.staff.map((item, index) => {
            return createIcon(item, index);
          })}
        </div>
      </div>
     `;
  }
};
