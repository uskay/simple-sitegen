const {h} = require('preact');
const {render} = require('preact-render-to-string');
const htm = require('htm');
const html = htm.bind(h);
const SimpleImg = require('./simple-img.js');
const SimpleTable = require('./simple-table.js');

/**
 * Parses markdown to innerHTML String
 */
module.exports = class MarkdownParser {
  constructor(md) {
    this.md = md.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    this.previouseRow;
    this.Row = class Row {
      constructor(row, isOl, isUl, isBlock, tableContent) {
        this.row = row;
        this.isOl = isOl === undefined ? false : isOl;
        this.isUl = isUl === undefined ? false : isUl;
        this.isBlock = isBlock;
        this.tableContent = tableContent === undefined ? false : tableContent;
      }
      getInnerHTML() {
        if (this.tableContent) {
          return '';
        }
        if (this.isOl === true || this.isUl === true || this.isBlock === true) {
          return this.row;
        }
        return `${this.row}<br>`;
      }
      createNewRow(regex, replace) {
        return new Row(this.row.replace(regex, replace),
          this.isOl, this.isUl, this.isBlock, this.tableContent);
      }

      // Block elements
      parseH1() {
        const regex = /^#\s(.+)/;
        const replace = `<h1>$1</h1>`;
        if (this.row.match(regex)) {
          this.isBlock = true;
          return this.createNewRow(regex, replace);
        }
        return this;
      }
      parseH2() {
        const regex = /^##\s(.+)/;
        const replace = `<h2 id="$1" class=light><span>$1</span></h2>`;
        if (this.row.match(regex)) {
          this.isBlock = true;
          return this.createNewRow(regex, replace);
        }
        return this;
      }
      parseH3() {
        const regex = /^###\s(.+)/;
        const replace = `<h3>$1</h3>`;
        if (this.row.match(regex)) {
          this.isBlock = true;
          return this.createNewRow(regex, replace);
        }
        return this;
      }
      parseHR() {
        const regex = /^----$/;
        const replace = `<hr>`;
        if (this.row.match(regex)) {
          this.isBlock = true;
          return this.createNewRow(regex, replace);
        }
        return this;
      }
      parseBlockQuote() {
        const regex = /^>(.+)/;
        const replace = `<blockquote>$1</blockquote>`;
        if (this.row.match(regex)) {
          this.isBlock = true;
          return this.createNewRow(regex, replace);
        }
        return this;
      }

      parseImg() {
        const regex = /^!\[(.+)\]\((.+)\s(\d+)x(\d+)\)$/;
        const result = this.row.match(regex);
        let replaceImg = '';
        if (result && result[1] && result[2] && result[3] && result[4]) {
          const alt = result[1];
          const url = result[2];
          const width = result[3];
          const height = result[4];
          replaceImg = render(html`<${SimpleImg} src=${url} width=${width} 
                          height=${height} layout="responsive" alt=${alt} />`);
        }
        if (this.row.match(regex)) {
          this.isBlock = true;
          if (this.row.match(regex)[0]
            .includes('https://www.youtube.com/embed/')) {
            return this.createNewRow(regex, replaceYouTube);
          }
          return this.createNewRow(regex, replaceImg);
        }
        return this;
      }

      parseMap() {
        const regex = /^!\[.+\]\((.+)\)$/;
        const result = this.row.match(regex);
        let replaceMap = '';
        if (result && result[1] && result[1]
          .includes('https://www.google.com/maps/embed')) {
          const url = result[1];
          replaceMap = render(html`<iframe src="${url}" 
                                   style="width:100%; height: 40vh; border: 0" 
                                   frameborder="0" allowfullscreen="" 
                                   aria-hidden="false" tabindex="0"></iframe>`);
          return this.createNewRow(regex, replaceMap);
        }
        return this;
      }

      // inline elements
      parseStrong() {
        return this.createNewRow(/\*\*(.+?)\*\*/g, `<b>$1</b>`);
      }
      parseEmphasis() {
        return this.createNewRow(/\*(.+?)\*/g, `<em>$1</em>`);
      }
      parseLink() {
        return this.createNewRow(/\[(.+?)\]\((https?:\/\/.+?)\)/g,
          `<a href="$2" target="_blank">$1</a>`);
      }
      parseCode() {
        return this.createNewRow(/`(.+?)`/g, `<code>$1</code>`);
      }
      parseLineThrough() {
        return this.createNewRow(/~(.+?)~/g,
          `<span style="text-decoration: line-through">$1</span>`);
      }

      // Ol / Ul lists
      parseList() {
        const regexOl = /^[00-99]\.\s(.+)$/;
        const regexUl = /^-\s(.+)$/;
        const replace = `<li>$1</li>`;
        if (this.row.match(regexOl)) {
          if (this.isOl === false) {
            this.isOl = true;
            return this.createNewRow(regexOl, `<ol>${replace}`);
          }
          return this.createNewRow(regexOl, replace);
        } else if (this.row.match(regexUl)) {
          if (this.isUl === false) {
            this.isUl = true;
            return this.createNewRow(regexUl, `<ul>${replace}`);
          }
          return this.createNewRow(regexUl, replace);
        } else {
          if (this.isOl === true) {
            this.isOl = false;
            return this.createNewRow(/^/, `</ol>`);
          } else if (this.isUl === true) {
            this.isUl = false;
            return this.createNewRow(/^/, `</ul>`);
          } else return this;
        }
      }

      // Table
      parseTable() {
        const regex = /^\|\s.+\|$/;
        const result = this.row.match(regex);
        if (result) {
          if (!this.tableContent) {
            this.tableContent = '';
          }
          this.tableContent = `${this.tableContent}${result[0].trim()}`;
          return this;
        } else {
          const content = this.tableContent;
          this.tableContent = '';
          if (content) {
            const replaceTable =
              render(html`<${SimpleTable} data=${content} />`);
            return this.createNewRow(/^/, replaceTable);
          }
          return this;
        }
      }
    };
  }

  getMarkUp() {
    const markUp = [];
    this.md.split('\n').forEach(
      (line) => {
        const row = this.createRow(line);
        markUp.push(row.getInnerHTML());
        this.previouseRow = row;
      },
    );
    return markUp.join('');
  }

  createRow(row) {
    let isOl = false;
    let isUl = false;
    let tableContent = '';
    const isBlock = false;
    if (this.previouseRow) {
      isOl = this.previouseRow.isOl;
      isUl = this.previouseRow.isUl;
      tableContent = this.previouseRow.tableContent;
    }
    return new this.Row(row, isOl, isUl, isBlock, tableContent)
      /** Try block elements first **/
      .parseH1()
      .parseH2()
      .parseH3()
      .parseHR()
      .parseBlockQuote()
      .parseImg()
      .parseMap()
      /** Try inline elements next **/
      .parseStrong()
      .parseLink()
      .parseEmphasis()
      .parseCode()
      .parseLineThrough()
      /** Lastly, parse Ol Ul lists **/
      .parseList()
      .parseTable();
  }
};
