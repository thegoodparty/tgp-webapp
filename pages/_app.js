import { useEffect } from 'react';

import { ThemeProvider } from 'styled-components';
import { ThemeProvider as UiThemeProvider } from '@material-ui/styles';
import { ConnectedRouter } from 'connected-next-router';
import SnackbarContainer from '/containers/shared/SnackbarContainer';

import GlobalStyles from '/theme/GlobalStyles';
import store from '/redux/store';
import QueryRoutes from '/containers/App/QueryRoutes';
import { initGA4 } from '/services/AnalyticsService';

import theme from '/theme';

/**
 * @param {object} initialState The store's initial state (on the client side, the state of the server-side store is passed here)
 * @param {boolean} options.isServer Indicates whether makeStore is executed on the server or the client side
 * @param {Request} options.req Node.js `Request` object (only set before `getInitialProps` on the server side)
 * @param {Response} options.res Node.js `Response` object (only set before `getInitialProps` on the server side)
 * @param {boolean} options.debug User-defined debug flag
 * @param {string} options.storeKey The key that will be used to persist the store in the browser's `window` object for safe HMR
 */
if (typeof window !== 'undefined' && navigator && navigator.serviceWorker) {
  navigator.serviceWorker.getRegistrations().then(function(registrations) {
    for (let registration of registrations) {
      registration.unregister();
    }
  });
}

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    initGA4();
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }, []);

  return (
    <ConnectedRouter>
      <UiThemeProvider theme={theme}>
        <GlobalStyles />
        <ThemeProvider theme={theme}>
          <QueryRoutes />
        </ThemeProvider>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
        <SnackbarContainer />
      </UiThemeProvider>
    </ConnectedRouter>
  );
}

export default store.withRedux(MyApp);
