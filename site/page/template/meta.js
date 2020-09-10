const {h} = require('preact');
const htm = require('htm');
const html = htm.bind(h);
const settings = require('../../../settings.json');

module.exports = class Meta {
  build(route) {
    const isArticle = route.includes('/article/');
    const canonicalUrl = `${settings.siteOrigin}${route}`;
    const favicon = `${settings.siteOrigin}/res/common/img/favicon.png`;
    const locale = settings.locale;
    const siteName = settings.siteName;
    const routeItem = settings.route[route];
    const title = routeItem.title;
    const description = routeItem.description;
    const routeImg = route === '/' ? '/index' : route;
    const ogpImage =
      `${settings.siteOrigin}${settings.ogpDirectory}${routeImg}_2x1.jpg`;
    const type = isArticle ? 'article' : 'website';
    const facebookAppId = settings.facebookAppId;
    const facebookAppPages = settings.facebookAppPages;
    const getStructuredData = (_) => {
      if (!isArticle) {
        return '';
      }
      const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'NewsArticle',
        'headline': `${title}`,
        'image': [
          `${settings.siteOrigin}${settings.ogpDirectory}${routeImg}_1x1.jpg`,
          `${settings.siteOrigin}${settings.ogpDirectory}${routeImg}_4x3.jpg`,
          `${settings.siteOrigin}${settings.ogpDirectory}${routeImg}_16x9.jpg`,
        ],
        'datePublished': `${(new Date()).toISOString()}`,
        'dateModified': `${(new Date()).toISOString()}`,
      };
      return JSON.stringify(jsonLd);
    };
    return html`
      <title>${title}</title>
      <meta name="theme-color" content="#253239" />
      <link href="${favicon}" rel="shortcut icon" />
      <meta charSet="utf-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link href="${canonicalUrl}" rel="canonical"/>
      <meta content="${description}" name="description"/>
      <meta content="${locale}" property="og:locale"/>
      <meta content="${siteName}" property="og:site_name"/>
      <meta content="${title}" property="og:title"/>
      <meta content="${canonicalUrl}" property="og:url"/>
      <meta content="${description}" property="og:description"/>
      <meta content="${ogpImage}" property="og:image"/>
      <meta content="${type}" property="og:type"/>
      <meta content="summary_large_image" name="twitter:card"/>
      <meta content="${title}" name="twitter:title"/>
      <meta content="${description}" name="twitter:description"/>
      <meta content="${ogpImage}" name="twitter:image"/>
      <meta content="${facebookAppId}" property="fb:app_id"/>
      <meta content="${facebookAppPages}" property="fb:pages"/>
      <link rel="apple-touch-icon" href="/res/img/common/icon-192.png" />
      <link rel="manifest" href="/res/common/manifest.json" />
      <structured-data content="${getStructuredData()}"></structured-data>
    `;
  }
};

