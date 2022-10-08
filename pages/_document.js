import React from 'react';
import NextDocument, { Head, Html, Main, NextScript } from 'next/document';

import { ServerStyleSheet as StyledComponentSheets } from 'styled-components';
import { ServerStyleSheets as MaterialUiServerStyleSheets } from '@material-ui/core/styles';

const CleanCSS = require('clean-css');
/* eslint-enable global-require */
const cleanCSS = new CleanCSS();

class CustomDocument extends NextDocument {
  static async getInitialProps(ctx) {
    const styledComponentSheet = new StyledComponentSheets();
    const materialUiSheets = new MaterialUiServerStyleSheets();
    const originalRenderPage = ctx.renderPage;
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            styledComponentSheet.collectStyles(
              materialUiSheets.collect(<App {...props} />),
            ),
        });
      const initialProps = await NextDocument.getInitialProps(ctx);
      let css = styledComponentSheet.getStyleTags();
      if (css) {
        css
          .replace('<style data-styled="true" data-styled-version="5.3.3">', '')
          .replace('</style>', '');
      }
      let css2 = materialUiSheets.toString();
      let finalCSS = `${css} ${css2}`;
      if (finalCSS) {
        finalCSS = cleanCSS.minify(finalCSS).styles;
      }

      return {
        ...initialProps,
        styles: [
          <React.Fragment key="styles">
            {initialProps.styles}
            <style id="jss-server-side" key="jss-server-side">
              {finalCSS}
            </style>
          </React.Fragment>,
        ],
      };
    } finally {
      styledComponentSheet.seal();
    }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta name="mobile-web-app-capable" content="yes" />
          <link rel="preconnect" href="https://connect.facebook.net" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          />

          <meta property="og:site_name" content="GOOD PARTY" />
          <meta property="og:type" content="website" />

          <meta property="twitter:card" content="summary_large_image" />
          <meta name="theme-color" content="#ffffff" />
          <meta property="fb:app_id" content="241239336921963" />
          <meta
            name="facebook-domain-verification"
            content="i5q7j6fwuhlvi1o263gskurwzqqzbb"
          />
          <link
            rel="icon"
            type="image/png"
            href="https://assets.goodparty.org/favicon/favicon-512x512.png"
            sizes="512x512"
          />
          <link
            rel="apple-touch-icon"
            href="https://assets.goodparty.org/favicon/android-icon-192x192.png"
          />
          {/*<meta*/}
          {/*  name="google-signin-client_id"*/}
          {/*  content="28351607421-c9m6ig3vmto6hpke4g96ukgfl3vvko7g.apps.googleusercontent.com"*/}
          {/*/>*/}
          <link
            href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;600;900&display=swap"
            rel="stylesheet"
          />
          <link rel="manifest" href="/manifest.json" />
          {this.props.styles}
          {/*<script src="https://www.googleoptimize.com/optimize.js?id=OPT-WLTK9ST"></script>*/}
        </Head>
        <body>
          <Main />
          <NextScript />

          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-M53W2ZV"
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        </body>
      </Html>
    );
  }
}

export default CustomDocument;
