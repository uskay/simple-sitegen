const {h} = require('preact');
const htm = require('htm');
const html = htm.bind(h);
const SimpleUI = require('../simple-ui.js');
const SimpleImg = require('../simple-img.js');
const SimpleSidebar = require('../simple-sidebar.js');

module.exports = class SimpleHeaderSection extends SimpleUI {
  componentName() {
    return 'SimpleHeaderSection';
  }
  commonStyle(props) {
    return /* css*/`
      :host {
        width: 100%;
        height: 60px;
        background-color: #253239;
        position: fixed;
        top: 0px;
        left: 0px;
        z-index: 3;
        box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
        color: white;
        letter-spacing: 0;
      }
      :host .section {
        margin: 0px auto;
        width: max-content;
      }
      :host .menu-item {
        float: left;
        line-height: 60px;
        margin-right: 25px;
        font-size: 0.9em;
        font-weight: 100;
      }
      :host .menu a:last-child .menu-item {
        margin-right: 0px;
      }
      :host .menu-item span {
        font-weight: 700;
      }
      :host .menu-item2 {
        margin-right: 0px !important;
      }
      :host .icon {
        width: 40px;
        height: 40px;
        margin-top: 10px;
      }
      :host .menu {
        float: left;
      }
      :host a, :link :visited {
        text-decoration: none;
        color: inherit;
      }
      @media only screen and (max-width: 800px) {
        :host .section {
          margin: 0px 10px;
        }
        :host .no-display-on-mobile {
          display: none;
        }
        :host .menu-item {
          line-height: 60px;
          margin-right: 10px;
          font-size: 0.7em;
          font-weight: 100;
        }
      }
      @media only screen and (min-width: 801px) {
        :host .no-display-on-desktop {
          display: none;
        }
      }
      #header-menu-button {
        position: absolute;
        right: 12px;
        top: 0px;
        width: 35px;
        height: 35px;
        margin-top: 12px;
      }
    `;
  }

  template(props) {
    let menu = html``;
    Object.keys(this.feed.link).map((linkKey) => {
      const link = this.feed.link[linkKey];
      if (link.hideOnMobile) {
        menu = html`
          ${menu}
          <a href="${link.href}" 
             class="no-display-on-mobile"
             target=${link.href.startsWith('http') ? '_blank' : '_self'}
             rel="noopener"
             >
            <div class="menu-item"><span>${link.text}</span></div>
          </a>
        `;
        return;
      }
      menu = html`
        ${menu}
        <a href="${link.href}" 
           class="no-display-on-mobile"
           target=${link.href.startsWith('http') ? '_blank' : '_self'}
           rel="noopener"
           >
          <div class="menu-item"><span>${link.text}</span></div>
        </a>
        <a href="${link.href}" 
           class="no-display-on-desktop"
           target=${link.href.startsWith('http') ? '_blank' : '_self'}
           rel="noopener"
        >
          <div class="menu-item"><span>${link.textMobile}</span></div>
        </a>
      `;
    });
    return html`
      <div class="section">
        <a href="${this.feed.link.top.href}">
          <div class="menu-item icon">
            <${SimpleImg} src="/res/common/img/logo-icon.svg" 
                       width="100" height="100" layout="responsive"
                       alt="logo" />   
          </div>
        </a>
        <div class="menu">
          ${menu}
        </div>
        <div id="header-menu-button" class="no-display-on-desktop">
          <${SimpleImg} src="/res/common/img/menu.svg" 
                     width="100" height="100" layout="responsive"
                     alt="menu button" />   
        </div>
      </div>
      <${SimpleSidebar} />
     `;
  }
  script(props) {
    return /* javascript */`
      const menuButton = document.querySelector('#header-menu-button');
      const slideBarElm = document.querySelector('#sidebar');
      const shadowElm = document.querySelector('#sidebar-shadow');
      const blurElm = document.querySelector('#sidebar-blur');
      menuButton.addEventListener('click', _ => {
        if(slideBarElm.classList.contains('reveal')){
          slideBarElm.classList.remove('reveal');
          shadowElm.style.display = 'none';
          blurElm.style.display = 'none';
          return;
        }
        slideBarElm.classList.add('reveal');
        shadowElm.style.display = 'block';
        blurElm.style.display = 'block';
      });
    `;
  }
};
