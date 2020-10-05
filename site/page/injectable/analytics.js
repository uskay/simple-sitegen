const Injectable = require('../../../build/injection/Injectable.js');
module.exports = class Analytics extends Injectable {
  getHTML() {
    return /* html */`
    <script
      async
      src="https://www.googletagmanager.com/gtag/js?id=UA-174487998-1">
    </script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'UA-174487998-1');
    </script>
    `;
  }
};
