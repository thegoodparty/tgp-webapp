/* eslint consistent-return:0 import/order:0 */
const { resolve } = require('path');
const express = require('express');
const app = express();
const base = require('./base');
const logger = require('./logger');
const helmet = require('helmet');
const argv = require('./argv');
const port = require('./port');
const setup = require('./middlewares/frontendMiddleware');
const isDev = process.env.NODE_ENV !== 'production';
const generateSiteMapXML = require('./sitemap');
const ngrok =
  (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel
    ? require('ngrok')
    : false;
app.use(helmet());


// force non-www
const baseUrl = base();

app.get('/sitemap.xml', async (req, res) => {
  const xmlString = await generateSiteMapXML();
  res.set('Content-Type', 'text/xml');
  res.send(xmlString);
});
if (process.env.NODE_ENV === 'production') {
  app.all('*', function (req, res, next) {
    if (baseUrl === 'https://goodparty.org') {
      const str = 'www.';
      if (req.host.indexOf(str) === 0) {
        res.redirect(301, `https://goodparty.org${req.url}`);
      }
    }
    if (req.headers['x-forwarded-proto'] === 'https') {
      return next();
    }
    res.redirect(`https://${req.hostname}${req.url}`); // express 4.x
  });
}
const prerenderToken = process.env.PRERENDER_TOKEN;
if (
  typeof prerenderToken !== 'undefined' &&
  baseUrl === 'https://goodparty.org'
) {
  console.log('prerender is defined');
  app.use(require('prerender-node').set('prerenderToken', prerenderToken));
} else {
  console.log('prerender is not defined');
}

// If you need a backend, e.g. an API, add your custom backend-specific middleware here
// app.use('/api', myApi);

// In production we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/',
});

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';

// use the gzipped bundle
app.get('*.js', (req, res, next) => {
  req.url = req.url + '.gz'; // eslint-disable-line
  res.set('Content-Encoding', 'gzip');
  next();
});

// Start your app.
app.listen(port, host, async err => {
  generateSiteMapXML();
  // Connect to ngrok in dev mode
  if (ngrok) {
    let url;
    try {
      url = await ngrok.connect(port);
    } catch (e) {
      return logger.error(e);
    }
    logger.appStarted(port, prettyHost, url);
  } else {
    logger.appStarted(port, prettyHost);
  }
});
