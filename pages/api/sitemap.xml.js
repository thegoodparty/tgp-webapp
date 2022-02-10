import { candidateRoute } from '/helpers/electionsHelper';
import apiHelper from '/helpers/apiHelper';
import api from '/api/tgpApi';

const { default: Axios } = require('axios');
const moment = require('moment');
const path = require('path');
const fs = require('fs');
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
    console.log(faqArticles)
    response = await Axios.get(api.directory.allCandidates.url);
    const candidates = response.data;
    console.log(candidates)
    let allCandidates = [];
    Object.keys(candidates).forEach(key => {
      allCandidates = [...allCandidates, ...candidates[key]];
    });

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
    allCandidates.forEach(candidate => {
      xmlString += `
        <url>
          <loc>${base}${candidateRoute(candidate)}</loc>
          <lastmod>${currentDate}</lastmod>
          <changefreq>weekly</changefreq>
        </url>
      `;
      if (candidate.campaignUpdates && candidate.campaignUpdates.length > 0) {
        xmlString += `
        <url>
          <loc>${base}${candidateRoute(candidate)}/info</loc>
          <lastmod>${currentDate}</lastmod>
          <changefreq>weekly</changefreq>
        </url>
      `;
      }
    });
    xmlString += '</urlset>';
    fs.writeFileSync('sitemaps/sitemap.xml', xmlString, {
      encoding: 'utf8',
      flag: 'w',
    });

    return xmlString;
  } catch (e) {
    console.log('error at generateSiteMapXML', e);
    return '';
  }
};

export default async (req, res) => {
  const xmlString = await generateSiteMapXML();
  res.send(xmlString);
};
