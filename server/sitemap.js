// import { candidateRoute } from '../app/helpers/electionsHelper';
// import apiHelper from '../app/helpers/apiHelper';
const { default: Axios } = require('axios');
const moment = require('moment');
const path = require('path');
const fs = require('fs');
const { candidateRoute } = require('../helpers/electionsHelper');
const apiHelper = require('../helpers/apiHelper').default;
const api = require('../api/tgpApi').default;
const currentDate = moment().format('YYYY-MM-DD');
const { base } = apiHelper;

const staticUrls = [
  '/',
  '/home',
  '/intro/splash',
  '/intro/zip-finder',
  '/you/register-email',
  '/login',
  '/party',
  '/faqs',
  '/party/events',
  '/privacy',
  '/creators',
];

const generateSiteMapXML = async () => {
  try {
    let response = await Axios.get(api.content.url);
    const { faqArticles } = response.data;

    let xmlString = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    `;
    staticUrls.forEach(link => {
      xmlString += `
        <url>
          <loc>${base}${link}</loc>
          <lastmod>${currentDate}</lastmod>
          <changefreq>weekly</changefreq>
        </url>
      `;
    });
    faqArticles.forEach(article => {
      xmlString += `
        <url>
          <loc>${base}/faqs?article=${article.id}</loc>
          <lastmod>${currentDate}</lastmod>
          <changefreq>monthly</changefreq>
        </url>
      `;
    });

    xmlString += '</urlset>';
    fs.writeFileSync(path.join(__dirname, 'sitemaps/sitemap.xml'), xmlString, {
      encoding: 'utf8',
      flag: 'w',
    });

    return xmlString;
  } catch (e) {
    console.log('error at generateSiteMapXML', e);
    return '';
  }
};

module.exports = generateSiteMapXML;
