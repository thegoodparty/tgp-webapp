import { candidateRoute } from '/helpers/electionsHelper';
import apiHelper from '/helpers/apiHelper';
import api from '/api/tgpApi';
import tgpApi from '../../api/tgpApi';

const { default: Axios } = require('axios');

let yourDate = new Date();
const currentDate = yourDate.toISOString().split('T')[0];
const { base } = apiHelper;

const staticUrls = [
  '/',
  '/about',
  '/run',
  '/team',
  '/candidates',
  '/login',
  '/register',
  '/faqs',
  '/manifesto',
  '/privacy',
  '/work-with-us',
  '/contact',
  '/pricing',
];

export default async function sitemap(req, res) {
  try {
    let response = await Axios.get(api.content.url);
    const { faqArticles } = response.data;
    response = await Axios.get(tgpApi.newCandidate.list.url);
    const candidates = response.data?.candidates || [];

    let xmlString = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    `;
    staticUrls.forEach((link) => {
      xmlString += `
        <url>
          <loc>${base}${link}</loc>
          <lastmod>${currentDate}</lastmod>
          <changefreq>weekly</changefreq>
        </url>
      `;
    });
    faqArticles.forEach((article) => {
      xmlString += `
        <url>
          <loc>${base}/faqs?article=${article.id}</loc>
          <lastmod>${currentDate}</lastmod>
          <changefreq>monthly</changefreq>
        </url>
      `;
    });
    candidates.forEach((candidate) => {
      xmlString += `
        <url>
          <loc>${base}${candidateRoute(candidate)}</loc>
          <lastmod>${currentDate}</lastmod>
          <changefreq>daily</changefreq>
        </url>
      `;

      xmlString += `
        <url>
          <loc>${base}${candidateRoute(candidate)}/Campaign</loc>
          <lastmod>${currentDate}</lastmod>
          <changefreq>daily</changefreq>
        </url>`;

      xmlString += `
        <url>
          <loc>${base}${candidateRoute(candidate)}/Bio</loc>
          <lastmod>${currentDate}</lastmod>
          <changefreq>daily</changefreq>
        </url>
      `;
    });
    xmlString += '</urlset>';

    res.writeHead(200, {
      'Content-Type': 'application/xml',
    });
    return res.end(xmlString);
  } catch (e) {
    console.log('error at generateSiteMapXML', e);
    return '';
  }
}
