const {h} = require('preact');
const htm = require('htm');
const html = htm.bind(h);
const SimpleUI = require('../simple-ui.js');
const SimpleImg = require('../simple-img.js');

module.exports = class SimpleHeroSection extends SimpleUI {
  componentName() {
    return 'SimpleHeroSection';
  }
  commonStyle(props) {
    return /* css*/`
      :host {
        width: 100%;
        height: 70vh;
        overflow: hidden;
        position: relative;
        margin-top: 60px;
        box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
        z-index: 2;
      }
      :host .reveal {
        transition: opacity 2s;
        opacity: 1 !important;
      }
      :host .reveal-now {
        opacity: 1 !important;
      }
      :host .progressBar {
        width: 100%;
        height: 3px;
        background-color: white;
        position: absolute;
        top: 0px;
        z-index:3;
        transform: translateX(-100%);
        box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
      }
      :host .overlay {
        width:100%;
        height: 100%;
        position: absolute;
        top: 0px;
        left: 0px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background: linear-gradient(
          0deg, rgba(0, 0, 0, .1), rgba(0, 0, 0, .5), rgba(0, 0, 0, .1));
      }
      :host .overlay .logo {
        width: 200px;
      }
      @media only screen and (max-width: 800px) {
        :host h1 {
          font-size: 1.5em
        }
        :host .overlay .text-title .subtitle {
          font-size: 1.0em
        } 
      }
      :host .overlay .text-title {
        width: 90%;
        text-align: center;
        color: white;
        margin: 0 auto;
      }
      :host .overlay .text-title .subtitle {
        font-size: 1.2em;
      }
      :host .container {
        height: 100%;
      }
    `;
  }
  style(props) {
    const route = props.route;
    if (this.feed[route].slide.length < 2) {
      return '';
    }
    return /* css*/`
      .progress_${this.uniqueId} {
        transform: translateX(0%) !important;
        transition: transform ${this.feed[route].duration}s linear;
      }
      .slide_${this.uniqueId} {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0px;
        opacity: 0;
      }
    `;
  }
  template(props) {
    const route = props.route;
    return html`
      <div class="container">
        <div class="progressBar"></div>
        ${this.feed[route].slide.map((item) => {
      return html`
            <${SimpleImg} class="slide_${this.uniqueId}" src="${item.src}" 
                       srcset="${item.srcset}" width="${item.width}" 
                       height="${item.height}" layout="cover"
                       alt="hero slider image" 
                       />  
          `;
        })}
        <div class="overlay">
          ${this.feed[route].title.type === 'img' ?
        html`
              <div class="logo">
                <${SimpleImg} src="${this.feed[route].title.src}" 
                           width="${this.feed[route].title.width}" 
                           height="${this.feed[route].title.height}" 
                           layout="responsive"
                           alt="hero image" 
                           />
              </div>
            ` :
        html`
              <div class="text-title">
                <h1>${this.feed[route].title.title}</h1>
                <div class="subtitle">${this.feed[route].title.subtitle}</div>
              </div>
            `
      }          
        </div>
     </div>
     `;
  }
  script(props) {
    const route = props.route;
    if (this.feed[route].slide.length < 2) {
      return '';
    }
    return /* javascript*/`
      const slides = 
        Array.from(document.querySelectorAll('.slide_${this.uniqueId}'));
      const progressBar = document.querySelector('.progressBar');
      let index = 0;
      setTimeout( _ => {
        slides[index].classList.add('reveal-now');
        progressBar.classList.add('progress_${this.uniqueId}');
        index++;
      }, 0);
      progressBar.addEventListener('transitionend', _ => {
        progressBar.classList.remove('progress_${this.uniqueId}');
        setTimeout( _ => {
          slides[index].classList.add('reveal');
          progressBar.classList.add('progress_${this.uniqueId}');
          slides.filter((elm, i) => i !== index).map(elm => { 
            elm.classList.remove('reveal-now');
            elm.classList.remove('reveal');
          });
          if(index + 1 === slides.length) {
            index = 0;
          } else {
            index++;
          }
        }, 0);
      });
    `;
  }
};
