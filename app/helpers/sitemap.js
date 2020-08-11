import React from 'react';
import ReactDomServer from 'react-dom/server';
import { candidateRoute } from 'helpers/electionsHelper';
import { all } from 'redux-saga/effects';

const baseUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://thegoodparty.org'
    : 'https://dev.thegoodparty.org';
const currentDate = new Date().toISOString().split('T')[0];
const Animal = props => React.createElement('Animal', props);
const UrlSet = props => React.createElement('urlset', props);
const Url = props => React.createElement('url', props);
const Loc = props => React.createElement('loc', props);
const LastMod = props => React.createElement('lastmod', props);
const ChangeFreq = props => React.createElement('changefreq', props);
const Priority = props => React.createElement('priority', props);
const basicLinks = [
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

const getSitemap = candidates => {
  let allCandidates = [];
  Object.keys(candidates).forEach(key => {
    allCandidates = [...allCandidates, ...candidates[key]];
  });
  const BasicLinks = props => (
    <>
      {basicLinks.map((link, index) => (
        <Url key={index}>
          <Loc>{`${baseUrl}${link}`}</Loc>
          <LastMod>{currentDate}</LastMod>
          <ChangeFreq>daily</ChangeFreq>
        </Url>
      ))}
      {allCandidates.map((candidate, index) => (
        <Url key={index}>
          <Loc>{`${baseUrl}${candidateRoute(candidate)}`}</Loc>
          <LastMod>{currentDate}</LastMod>
          <ChangeFreq>weekly</ChangeFreq>
        </Url>
      ))}
    </>
  );
  const elementXML = ReactDomServer.renderToStaticMarkup(
    <UrlSet xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <BasicLinks />
    </UrlSet>,
  );
  return elementXML;
}

export default getSitemap;
