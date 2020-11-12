import App from 'next/app';
import { ThemeProvider } from 'styled-components';
import { ThemeProvider as UiThemeProvider } from '@material-ui/styles';
import GlobalStyles from './shared/GlobalStyles';
import store from '../redux/store';

import theme from '../theme';

/**
 * @param {object} initialState The store's initial state (on the client side, the state of the server-side store is passed here)
 * @param {boolean} options.isServer Indicates whether makeStore is executed on the server or the client side
 * @param {Request} options.req Node.js `Request` object (only set before `getInitialProps` on the server side)
 * @param {Response} options.res Node.js `Response` object (only set before `getInitialProps` on the server side)
 * @param {boolean} options.debug User-defined debug flag
 * @param {string} options.storeKey The key that will be used to persist the store in the browser's `window` object for safe HMR
 */

function MyApp({ Component, pageProps }) {
  return (
    <UiThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </UiThemeProvider>
  );
}

export default store.withRedux(MyApp);
