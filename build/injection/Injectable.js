module.exports = class Injectable {
  getHTML() {
    return '';
  }
  getMinifiedHTML() {
    if (!this.getHTML()) {
      return '';
    }
    let sanitizedValue = this.getHTML();
    sanitizedValue = sanitizedValue.replace(/\s\s+/g, ' ');
    sanitizedValue = sanitizedValue.split('\n').join(' ');
    return sanitizedValue;
  }
};
