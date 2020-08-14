import { candidateRoute } from '../app/helpers/electionsHelper';
const { default: Axios } = require('axios');
const moment = require('moment');
const fs = require('fs');
const { apiBase, base } = require('../app/helpers/apiHelper');

const currentDate = moment().format('YYYY-MM-DD');

const staticUrls = [
  '/',
  '/home',
  '/intro/splash',
  '/intro/zip-finder',
  '/you/register-email',
  '/login',
  '/party',
  '/party/faqs',
  '/party/events',
  '/privacy',
  '/creators',
  '/directory',
];

const generateSiteMapXML = async () => {
  const response = await Axios.get(`${apiBase}candidates/all`);
  const candidates = response.data;
  let allCandidates = [];
  Object.keys(candidates).forEach(key => {
    allCandidates = [...allCandidates, ...candidates[key]];
  });

  let xmlString = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlSet xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
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
  allCandidates.forEach(candidate => {
    xmlString += `
    <url>
      <loc>${base}${candidateRoute(candidate)}</loc>
      <lastmod>${currentDate}</lastmod>
      <changefreq>weekly</changefreq>
    </url>
    `;
  });
  xmlString += '</urlset>';
  fs.writeFileSync('sitemaps/sitemap.xml', xmlString, {
    encoding: 'utf8',
    flag: 'w',
  });
  return xmlString;
};

module.exports = generateSiteMapXML;
