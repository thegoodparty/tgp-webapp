/* utils/ga.js */

import Router from 'next/router';
import GA4React from 'ga-4-react';

let ga4react;
const G = 'GTM-K2HCFR7';

export async function initGA4() {
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
  ga4react.pageview(window.location.pathname);
}

function logPageViews() {
  logPageView();

  Router.events.on('routeChangeComplete', () => {
    logPageView();
  });
}

export function logEvent(action, label, category) {
  ga4react.event(action, label, category);
}
