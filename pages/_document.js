import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

class CustomDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  // static async getInitialProps({ renderPage }) {
  //   const sheet = new ServerStyleSheet();
  //   const page = renderPage(App => props =>
  //     sheet.collectStyles(<App {...props} />),
  //   );
  //   return { ...page, styles: sheet.getStyleElement() };
  // }
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charset="utf-8" />

          <meta name="mobile-web-app-capable" content="yes" />

          <meta
            name="description"
            content="The Good Party is a way to take back our democracy from corrupt big-money politicians of both major parties, and to replace them with good capable indie or grass-roots candidates that wouldn't ordinarily have a chance."
            data-react-helmet="true"
          />
          <meta property="og:site_name" content="THE GOOD PARTY" />
          <meta property="og:type" content="website" />
          <meta
            property="og:title"
            content="THE GOOD PARTY"
            data-react-helmet="true"
          />
          <meta
            property="og:description"
            content="The Good Party is a way to take back our democracy from corrupt big-money politicians of both major parties, and to replace them with good capable indie or grass-roots candidates that wouldn't ordinarily have a chance."
            data-react-helmet="true"
          />
          <meta
            property="og:image"
            content="https://assets.thegoodparty.org/share.jpg?v=4"
            data-react-helmet="true"
          />
          <meta property="twitter:card" content="summary_large_image" />
          <meta name="theme-color" content="#ffffff" />
          <meta property="fb:app_id" content="241239336921963" />
          <meta
            name="google-signin-client_id"
            content="28351607421-c9m6ig3vmto6hpke4g96ukgfl3vvko7g.apps.googleusercontent.com"
          />

          <link rel="icon" href="/favicon.ico" />
          <title data-react-helmet="true">THE GOOD PARTY</title>

          {this.props.styles}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default CustomDocument;
