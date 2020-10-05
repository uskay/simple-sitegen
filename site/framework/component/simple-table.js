const {h} = require('preact');
const htm = require('htm');
const html = htm.bind(h);
const SimpleUI = require('./simple-ui.js');

module.exports = class SimpleTable extends SimpleUI {
  componentName() {
    return 'SimpleTable';
  }
  style(props) {
    const gridItem = [];
    let columnCount = 0;
    const rows = props.data.split('||');
    rows.map((row) => {
      const columns = row.split('|');
      columnCount = columns.length;
      if (rows.length === 1) {
        columnCount--;
      }
      columns.map((column) => {
        const value = column.trim();
        if (value) {
          gridItem.push(value);
        }
      });
    });
    this.columnCount = columnCount;
    this.gridItem = gridItem;
    let columnWidth = '';
    for (let i = 1; i < columnCount - 1; i++) {
      columnWidth = columnWidth + ' 1fr ';
    }
    const lastRowSelector = [];
    for (let i = 0; i < columnCount - 1; i++) {
      lastRowSelector
        .push(`:host#${this.uniqueId} div:nth-last-child(${i + 1})`);
    }
    const firstColumnSelector = [];
    for (let i = 0; i < gridItem.length;) {
      firstColumnSelector
        .push(`:host#${this.uniqueId} div:nth-child(${i + 1})`);
      i = i + columnCount - 1;
    }
    const rowCount = rows.length - 2;
    const msGridRows = [];
    const rowHeight = 'auto';
    for (let i = 0; i < rowCount; i++) {
      msGridRows.push(rowHeight);
    }

    return /* css*/`
      :host#${this.uniqueId} {
        width: 100%;
        display: grid;
        display: -ms-grid;
        grid-template-columns: 25% ${columnWidth};
        -ms-grid-columns:  25% ${columnWidth};
        -ms-grid-rows: ${msGridRows.join(' ')};
        grid-column-gap: 0px;
      }
      :host div {
        border-bottom: 1px solid #dadce0;
        padding: 5px 10px 5px 10px;
      }
      ${lastRowSelector.join(',')} {
        border-bottom: none;
      }
      ${firstColumnSelector.join(',')} {
        font-weight: 700;
      }
      `;
  }

  template(props) {
    const columnCount = this.columnCount - 1;
    return html`
      ${this.gridItem.map((item, index) => {
      const column = (index % columnCount) + 1;
      const row = parseInt(index / columnCount) + 1;
      return html`
          <div style="-ms-grid-column: ${column}; -ms-grid-row: ${row}">
            ${item}
          </div>`;
    })}
     `;
  }
};
