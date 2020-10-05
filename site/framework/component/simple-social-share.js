const {h} = require('preact');
const htm = require('htm');
const html = htm.bind(h);
const SimpleUI = require('./simple-ui.js');
const SimpleImg = require('./simple-img.js');

module.exports = class SimpleSocialShare extends SimpleUI {
    componentName() {
        return 'SimpleSocialShare';
    }
    commonStyle(props) {
        let backgroundColor = '';
        Object.keys(this.feed).map((key) => {
            backgroundColor = backgroundColor + `
            :host .share-button.share-${key} {
                background-color: ${this.feed[key].backgroundColor}
            }
        `;
        });
        return /* css*/`
        :host {
            width: max-content;
            float: right;
            margin-bottom: 50px;
        }
        
        :host .share-button {
            display: block;
            position: relative;
            width: 50px;
            height: 50px;
            cursor: pointer;
            border-radius: 2px;
            box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
            float: left;
            margin-right: 5px;
            display: none;
        }
        ${backgroundColor}
        :host .share-button .social-share-icon {
            width:30px;
            height:30px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
        }
    `;
    }

    template(props) {
        return html`
        ${Object.keys(this.feed).map((key) => {
            const url = this.feed[key].urlTemplate;
            const textPlaceholder = this.feed[key].textPlaceholder;
            const urlPlaceholder = this.feed[key].urlPlaceholder;
            return html`
    <div class="share-button share-${key}" 
            data-url-template="${url}"
            data-text-placeholder="${textPlaceholder}"
            data-url-placeholder="${urlPlaceholder}">
        <div class="social-share-icon">
            <${SimpleImg} width="30" height="30" 
                        src="${this.feed[key].img}" 
                        layout="cover"
                        alt="share button" 
                        />
        </div>
    </div>
            `;
        })}
    `;
    }
    script(prop) {
        return /* javascript*/`
          const title = document.title;
          let description =
            document.getElementsByName('description')[0].content;
          const siteName =
            document.querySelector('#meta-site-name')
            .getAttribute('content');
          if (description.length > 50) {
            description = description.substring(0, 50) + '...';
          }
          description = description + ' | ' + siteName;
          Array.from(document.querySelectorAll('.share-button')).map(elm => {
            if (navigator.share) {
                if (elm.classList.contains('share-webshare')) {
                    elm.style.display = 'block';
                    elm.addEventListener('click', evt => {
                        navigator.share({
                            title: title,
                            text: description,
                            url: location.href,
                        })
                    });
                    return;
                }
                elm.style.display = 'none';
                return;
                
            } else {
                if (elm.classList.contains('share-webshare')) {
                    elm.style.display = 'none';
                    return;
                }
                elm.style.display = 'block';
                elm.addEventListener('click', evt => {
                    const elm = evt.currentTarget;
                    let url = elm.getAttribute('data-url-template');
                    const textPlaceholder =
                      elm.getAttribute('data-text-placeholder');
                    const urlPlaceholder =
                      elm.getAttribute('data-url-placeholder');
                    const text = title + ' - ' + description;
                    url = url
                    .replace(urlPlaceholder, encodeURIComponent(location.href))
                    .replace(textPlaceholder, encodeURIComponent(text));
                    window.open(
                        url, 
                        'newwindow', 
                        'location=yes,height=570,width=520,' +
                        'scrollbars=yes,status=yes');
                });
            }
        })
    `;
    }
};
