/* utils/ga.js */

import Router from 'next/router';
import GA4React from 'ga-4-react';

let ga4react;
const G = 'G-XN4N0QT5J5';

export async function initGA4() {
  if (!isProd) {
    return;
  }
  if (!GA4React.isInitialized() && G && process.browser) {
    ga4react = new GA4React(G, { debug_mode: !process.env.production });

    try {
      await ga4react.initialize();

      logPageViews();
    } catch (error) {
      console.error('Analytics service error:', error);
    }
  }
}

function logPageView() {
  if (!isProd || !GA4React.isInitialized()) {
    return;
  }
  if (window.location.pathname.startsWith('/share-image/')) {
    return;
  }
  ga4react?.pageview(window.location.pathname);
}

function logPageViews() {
  // logPageView();

  Router.events.on('routeChangeComplete', () => {
    logPageView();
  });
}

export function logEvent(action, label, category) {
  if (!isProd || !GA4React.isInitialized()) {
    return;
  }
  try {
    ga4react?.event(action, label, category);
    if (ga4react && ga4react.gtag) {
      ga4react?.gtag('event', action, { label, category });
    }
  } catch (e) {
    console.log('error at log event');
  }
}

const isProd = () =>
  typeof window !== 'undefined' && window.location.hostname === 'goodparty.org';
