const {h, Component} = require('preact');
const htm = require('htm');
const html = htm.bind(h);
const id = require('./gen-id.js');
const DAO = require('../data/dao.js');

module.exports = class SimpleUI extends Component {
  constructor() {
    super();
    this.uniqueId = id.unique(this.componentName());
    const data = (new DAO()).queryComponentData(this.componentName());
    this.feed = data;
  }
  componentName() {
    return 'SimpleUI';
  }
  commonStyle(props) {
    return '';
  }
  style(props) {
    return '';
  }
  styleIE(props) {
    return '';
  }
  template(props) {
    return '';
  }
  dangerouslySetInnerHTML(props) {
    return '';
  }
  script(props) {
    return '';
  }
  render(props) {
    const commonStyle = this._sanitize(this.commonStyle(props));
    const style = this._sanitize(this.style(props));
    const script = this._sanitize(this.script(props));
    const template = this.template(props);
    if (!template) {
      return html`
                <%style>${commonStyle}</%style>
                <%style>${style}</%style>
                <%script>(function(){${script}})();</%script>
            `;
    }
    if (this.componentName() === 'amp-story-page') {
      return html`${template}`;
    }
    const className =
      `${this.componentName()} ${props.class ? props.class : ''}`;
    return html`
            <div class="${className.trim()}" id="${this.uniqueId}" Simpleui>
                <%style>${commonStyle}</%style>
                <%style>${style}</%style>
                <%script>(function(){${script}})();</%script>
                ${template}
            </div>
        `;
  }
  _sanitize(value) {
    let sanitizedValue = value;
    sanitizedValue =
      sanitizedValue.replace(/:host/g, `.${this.componentName()}`);
    sanitizedValue = sanitizedValue.replace(/\s\s+/g, ' ');
    sanitizedValue = sanitizedValue.split('\n').join(' ');
    return sanitizedValue;
  }
};
