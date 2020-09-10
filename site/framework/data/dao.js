module.exports = class DAO {
  constructor() {
    this.data = require('../../page/data/data.json');
  }
  queryAll() {
    return this.data;
  }
  queryComponentData(componentName) {
    return this.data[componentName];
  }
};
