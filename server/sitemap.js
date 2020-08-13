const { default: Axios } = require('axios');
const moment = require('moment');
const fs = require('fs');
const base = require('./base');
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
const API_ENV = process.env.API_ENV || 'prod';

let apiBase;
if (API_ENV === 'local') {
  apiBase = 'http://localhost:1337/api/v1/';
} else if (API_ENV === 'dev') {
  apiBase = 'https://api-dev.thegoodparty.org/api/v1/';
} else if (API_ENV === 'prod') {
  apiBase = 'https://api.thegoodparty.org/api/v1/';
}

const slugify = text => {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
};

const candidateRoute = candidate => {
  if (!candidate) {
    return '/';
  }
  const { isIncumbent, chamber } = candidate;
  const chamberLower = chamber ? chamber.toLowerCase() : 'presidential';
  const name = slugify(candidate.name);
  return `/elections/candidate/${chamberLower}${
    isIncumbent ? '-i' : ''
  }/${name}/${candidate.id}`;
};
const generateSiteMapXML = async () => {
  // const response = await Axios.get(`${apiBase}candidates/all`);
  // const candidates = response.data;
  // let allCandidates = [];
  // Object.keys(candidates).forEach(key => {
  //   allCandidates = [...allCandidates, ...candidates[key]];
  // });

  let xmlString =
    '<urlSet xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
  staticUrls.forEach(link => {
    xmlString += `
    <url>
      <loc>${base()}${link}</loc>
      <lastmod>${currentDate}</lastmod>
      <changefreq>weekly</changefreq>
    </url>
    `;
  });
  // allCandidates.forEach(candidate => {
  //   xmlString += `
  //   <url>
  //     <loc>${base()}${candidateRoute(candidate)}</loc>
  //     <lastmod>${currentDate}</lastmod>
  //     <changefreq>weekly</changefreq>
  //   </url>
  //   `;
  // });
  xmlString += '</urlset>';
  fs.writeFileSync('sitemaps/sitemap.xml', xmlString, {
    encoding: 'utf8',
    flag: 'w',
  });
  return xmlString;
};

module.exports = generateSiteMapXML;