const {h} = require('preact');
const htm = require('htm');
const html = htm.bind(h);
const SimpleUI = require('./simple-ui.js');

module.exports = class SimpleSidebar extends SimpleUI {
  componentName() {
    return 'SimpleSidebar';
  }
  commonStyle(props) {
    return /* css*/`
      :host #sidebar {
        position: fixed;
        height: 100vh;
        width: 80vw;
        z-index: 11;
        background-color: white;
        box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
        top: 0px;
        right: -80vw;
        transition: transform 0.5s;
      }
      :host #sidebar-shadow {
        position: fixed;
        top: 0px;
        left: 0px;
        height: 100vh;
        width: 100vw;
        z-index: 10;
        background-color: black;
        opacity: 0.5;
        display: none;
      }
      :host #sidebar-blur {
        content: '';
        position: fixed;
        top: 0px;
        left: 0px;
        height: 100vh;
        width: 100vw;
        z-index: 10;
        background-color: transparent;
        backdrop-filter: blur(3px);
        display: none;
      }
      :host .reveal {
        transform: translateX(-80vw);
      }
      :host #sidebar .sidebar-menu-item {
        color: #222;
        font-size: 1.2em;
        font-weight: 700;
        border-bottom: 1px solid #dadce0; 
      }
      :host #sidebar .sidebar-menu-item-content {
        width: 90%;
        margin: 10px auto;
      }
      :host #sidebar .a2hs {
        display: inline-table;
        background-color: #364953;
        color: white;
        width: 100%;
      }
      :host #sidebar .a2hs-title {
        font-size: 1.0em;
        margin-bottom: 10px;
      }
      :host #sidebar .a2hs-description {
        font-size: 0.7em;
        font-weight: 300;
      }
      :host #sidebar .a2hs-button {
        margin: 10px 0px 5px 0px;
        width: max-content;
        background-color: #253239;
        padding: 5px 10px;
        box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
      }
      :host #sidebar .topBannerA2HS {
        display: none;
      }
      :host a, :link :visited {
        text-decoration: none;
        color: inherit;
      }
    `;
  }

  template(props) {
    let menu = html``;
    Object.keys(this.feed.link).map((linkKey) => {
      const link = this.feed.link[linkKey];
      menu = html`
        ${menu}
        <a href="${link.href}"
           class="${link.href.includes('#') ? 'inner-link' : ''}"
           target="${link.href.startsWith('http') ? '_blank' : '_self'}"
           rel="noopener"
           >
          <div class="sidebar-menu-item">
            <div class="sidebar-menu-item-content">
              <span>${link.text}</span>
            </div>
          </div>
        </a>
      `;
    });
    const genTopBanner = (data) => {
      const genBannerContent = (data) => {
        return html`
          <div class="sidebar-menu-item a2hs">
            <div class="sidebar-menu-item-content">
              <div class="a2hs-title">${data.title}</div>
              <div class="a2hs-description">${data.description}</div>
              <div class="a2hs-button">${data.cta}</div>
            </div>
          </div>
        `;
      };
      if (data.href) {
        return html`
          <a class="topBannerGeneral 
             ${data.href.includes('#') ? 'inner-link' : ''}" 
             href="${data.href}" 
             target="${data.href.startsWith('http') ? '_blank' : '_self'}"
             rel="noopener"
             >
            ${genBannerContent(data)}
          </a>
        `;
      }
      return html`
        <a class="topBannerA2HS" >
          ${genBannerContent(data)}
        </a>
      `;
    };
    return html`
      <div id="sidebar">
        <div class="sidebar-menu">
          ${genTopBanner(this.feed.topBanner.general)}
          ${genTopBanner(this.feed.topBanner.a2hs)}
          ${menu}
        </div>
      </div>
      <div id="sidebar-shadow"></div>
      <div id="sidebar-blur"></div>
     `;
  }
  script(props) {
    return /* javascript*/`
      const blurElm = document.querySelector('#sidebar-blur');
      const slideBarElm = document.querySelector('#sidebar');
      const shadowElm = document.querySelector('#sidebar-shadow');
      const run = _ => {
        if(slideBarElm.classList.contains('reveal')){
          slideBarElm.classList.remove('reveal');
          shadowElm.style.display = 'none';
          blurElm.style.display = 'none';
          return;
        }
        slideBarElm.classList.add('reveal');
        shadowElm.style.display = 'block';
        blurElm.style.display = 'block';
      };
      blurElm.addEventListener('click', _ => {
        run();
      });
      Array.from(document.querySelectorAll('.inner-link')).forEach(link => {
        const noHashDestination = link.href.split('#')[0].split('?')[0];
        const noHashCurrentUrl = location.href.split('#')[0].split('?')[0];
        if(noHashDestination !== noHashCurrentUrl) {
          return;
        }
        link.addEventListener('click', _ => {
          run();
        });
      });
      let deferredPrompt = '';
      const showA2HSBanner = shouldShow => {
        document.querySelector('.topBannerGeneral')
          .style.display = shouldShow ? 'none' : 'block';
        document.querySelector('.topBannerA2HS')
          .style.display = shouldShow ? 'block' : 'none';
      };
      window.addEventListener('beforeinstallprompt', evt => {
        evt.preventDefault();
        deferredPrompt = evt;
        showA2HSBanner(true);
      });
      document.querySelector('.topBannerA2HS')
        .addEventListener('click', evt => {
        evt.preventDefault();
        showA2HSBanner(false);
        deferredPrompt.prompt();
      })
    `;
  }
};
