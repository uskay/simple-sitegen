const SimpleUI = require('./simple-ui.js');

module.exports = class SimpleCommonCSS extends SimpleUI {
  componentName() {
    return 'SimpleCommonCSS';
  }
  commonStyle(props) {
    return /* css*/`
        html, body{
            height: 100%;
            width: 100%;
            margin: 0px;
            padding: 0px;
            font-family: 'Helvetica Neue', Arial, 
            'Hiragino Kaku Gothic ProN', 'Hiragino Sans', Meiryo, sans-serif;
            line-height: 1.6;
            letter-spacing: .04em;
        }
        h2.light {
            margin-top: 50px;
            text-align: center;
            font-size: 1.7em;
        }
        h2.light span {
            box-shadow: inset 0 -10px 0 yellow;
            font-weight: 700;
        }
        h3.light {
            margin-top: 30px;
            text-align: center;
        }
        h3.light span {
            box-shadow: inset 0 -10px 0 #DDD;
            font-weight: 700;
        }
        h2.dark {
            margin-top: 50px;
            margin-bottom: 50px;
            text-align: center;
            color:white;
            font-size: 1.7em;
        }
        h2.dark span {
            box-shadow: inset 0 -10px 0 rgba(255, 255, 0, 0.3);
            font-weight: 700;
        }
    `;
  }
  template(props) {
    return null;
  }
};
