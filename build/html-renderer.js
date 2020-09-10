module.exports = class HtmlRenderer {
  constructor(route, option) {
    this.route = route;
    this.option = option;
  }
  render() {
    const pageTemplate = this._getTemplate(this.route, this.option);
    const html = pageTemplate.build();
    return html;
  }
  _getTemplate(route, option) {
    let PageTemplateClass = '';
    const checkDirectory = /\/(.+)\//;
    const templatePath = '../site/page/template/';
    if (route === '/') {
      PageTemplateClass = require(`${templatePath}index.js`);
    } else if (checkDirectory.test(route)) {
      const dir = route.match(checkDirectory)[1];
      PageTemplateClass = require(`${templatePath}${dir}-template.js`);
    } else {
      const id = route.replace('/', '');
      PageTemplateClass = require(`${templatePath}${id}.js`);
    }
    return new PageTemplateClass(route, option);
  }
};
