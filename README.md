# Simple Sitegen

🧨 Experiment building a static site generator. There should be many 🐞s.

## Concept
Trying to see how can a static website can be built w/o, using any existing frameworks as much as possible.
- Be simple and friendly integrating with other platforms e.g bots...
- so, SSR only. No JavaScript, including Web Components, as much as possible, in the frontend to render a page...
- while being able to build components as a "single file component" - having HTML, CSS and JavaScript (if needed) in a single file...
- but only using pure ES6 syntax, no jsx and such...
- with the ablity to have all scripts and styles inlined, route based chucked, treeshaked, minified...
- and adding optimization to the images...
- but for simplicity w/o using any bundlers...
- to achieve great peformance by default...
- while also being PWA ready with default ServiceWorker and having user friendly flow to install the site...
- which can be maitaned by injecting data and writing markdowns.

ha 😉

## Site
![sample screenshot of the site](https://cdn.glitch.com/98449704-33d8-49b2-88f2-aa6d2aeba5d3%2Ftop.png?v=1599699135771)
- Demo: https://simple-sitegen.web.app/

## Performance
Looking nice ⚡

![lighthouse score](https://cdn.glitch.com/98449704-33d8-49b2-88f2-aa6d2aeba5d3%2Flh.png?v=1599698926820)

## Components
It was not easy, with my skills, to build a library to handle the DOM model and its tree strucutres, the site uses [htm](https://github.com/developit/htm). Htm was great in the way that it works with just using the plain ES6 syntax; [template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals). 

Most of the components are currenly placed under `/site/component/`, all extending `simple-ui.js` which has a (very rough) feature of making a single file comonent (having HTMl, CSS and JavaScript all in a single file). 

## Page
The page tempates are all under `/site/page/template/`, which all extends `/site/framework/page/page.js` which has the (very rough) feature of building a raw HTML for the page: renderToString (using [preact-render-to-string](https://github.com/preactjs/preact-render-to-string)), treeshaking styles and scripts, minify, transpile and adding meta data including [structure data](https://developers.google.com/search/docs/guides/intro-structured-data).

## Build
The build processes are all under `/build/`, still very buggy, but tried to add stuff that needs to be added before geting distributed.
- Generates non-polyfilled and polyfilled HTML (to get it work in IE11)
- Generates Web App Manifest
- Generates Service Worker
- Generates the OGP images
- Generates Site Map
- Optimizes images
- Prepares debug environment

## PWA - Install flow
Will not show the default install banner but added the install button nice and simply in the side bar.

![install button](https://cdn.glitch.com/98449704-33d8-49b2-88f2-aa6d2aeba5d3%2Fah.png?v=1599700699662)

## Dynamic serving
Has an option to use Firebase Cloud Functions to dynamically serve polyfilled HTML. Currently anything below the broser versions below, will add `res/common/polyfill.js`. Need to swith the `settings.json`'s `hostingOnly` property to `false` and use `firebase_prod.json` to deploy to enabable dynamic serving. There could be a better way to work this out though and depends on the API being used.

```
const modern = {
        chrome: 45,
        firefox: 32,
        safari: 9,
        mobile_safari: 9,
        edge: 12,
      };
```
## Caveats
Many, for example, the site has 100 in LH acceciblity but in reality it doesn't mean it's, such as alt values, are actually useful.

## Licence
Codes are Apache 2.0 and the creatives are from [unsplash.com](https://unsplash.com). Thank you so much
- [Jezael Melgoza](https://unsplash.com/@jezael)
- [Ryo Yoshitake](https://unsplash.com/@yory)
- [Benjamin Wong](https://unsplash.com/@ben_wong_31)
- [Jean Vella](https://unsplash.com/@jean_vella)
- [Freeman Zhou](https://unsplash.com/@freeman_zhou)
- [Matteo Catanese](https://unsplash.com/@matteocatanese)
- [Andre Benz](https://unsplash.com/@trapnation)

All your photos are amazing!