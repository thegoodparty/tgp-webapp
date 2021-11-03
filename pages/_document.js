import React from 'react';
import NextDocument, { Head, Html, Main, NextScript } from 'next/document';
import { ServerStyleSheet as StyledComponentSheets } from 'styled-components';
import { ServerStyleSheets as MaterialUiServerStyleSheets } from '@material-ui/core/styles';

class CustomDocument extends NextDocument {
  static async getInitialProps(ctx) {
    const styledComponentSheet = new StyledComponentSheets();
    const materialUiSheets = new MaterialUiServerStyleSheets();
    const originalRenderPage = ctx.renderPage;
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props =>
            styledComponentSheet.collectStyles(
              materialUiSheets.collect(<App {...props} />),
            ),
        });
      const initialProps = await NextDocument.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: [
          <React.Fragment key="styles">
            {initialProps.styles}
            {materialUiSheets.getStyleElement()}
            {styledComponentSheet.getStyleElement()}
          </React.Fragment>,
        ],
      };
    } finally {
      styledComponentSheet.seal();
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
          <meta charSet="utf-8" />
          <meta name="mobile-web-app-capable" content="yes" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link rel="preconnect" href="https://connect.facebook.net" />

          <meta property="og:site_name" content="THE GOOD PARTY" />
          <meta property="og:type" content="website" />

          <meta property="twitter:card" content="summary_large_image" />
          <meta name="theme-color" content="#ffffff" />
          <meta property="fb:app_id" content="241239336921963" />
          <meta
            name="google-signin-client_id"
            content="28351607421-c9m6ig3vmto6hpke4g96ukgfl3vvko7g.apps.googleusercontent.com"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Libre+Franklin:wght@400;500;600;700&display=swap"
            rel="stylesheet"
          />
          <link rel="manifest" href="/manifest.json" />

          <link rel="icon" href="/favicon.ico" />
          <link
            rel="apple-touch-icon"
            sizes="57x57"
            href="https://assets.goodparty.org/favicon/apple-icon-57x57.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="60x60"
            href="https://assets.goodparty.org/favicon/apple-icon-60x60.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="72x72"
            href="https://assets.goodparty.org/favicon/apple-icon-72x72.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="76x76"
            href="https://assets.goodparty.org/favicon/apple-icon-76x76.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="114x114"
            href="https://assets.goodparty.org/favicon/apple-icon-114x114.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="120x120"
            href="https://assets.goodparty.org/favicon/apple-icon-120x120.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="144x144"
            href="https://assets.goodparty.org/favicon/apple-icon-144x144.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="152x152"
            href="https://assets.goodparty.org/favicon/apple-icon-152x152.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="https://assets.goodparty.org/favicon/apple-icon-180x180.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="192x192"
            href="https://assets.goodparty.org/favicon/android-icon-192x192.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="512x512"
            href="https://assets.goodparty.org/favicon/favicon-512x512.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="https://assets.goodparty.org/favicon/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="96x96"
            href="https://assets.goodparty.org/favicon/favicon-96x96.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="https://assets.goodparty.org/favicon/favicon-16x16.png"
          />
          {this.props.styles}
          {/*<script*/}
          {/*  async*/}
          {/*  src="https://www.googletagmanager.com/gtag/js?id=UA-146762622-1"*/}
          {/*/>*/}

          {/*<script*/}
          {/*  type="text/javascript"*/}
          {/*  dangerouslySetInnerHTML={{*/}
          {/*    __html: `*/}
          {/* window.dataLayer = window.dataLayer || [];*/}
          {/*  function gtag(){dataLayer.push(arguments);}*/}
          {/*  gtag('js', new Date());*/}

          {/*  gtag('config', 'UA-146762622-1');`,*/}
          {/*  }}*/}
          {/*/>*/}

          {/*<script src="https://www.googleoptimize.com/optimize.js?id=OPT-TTWCN3W" />*/}
        </Head>
        <body>
          <Main />
          <NextScript />
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `
          if(window.location.hostname === 'goodparty.org'){
          window['_fs_debug'] = false;
          window['_fs_host'] = 'fullstory.com';
          window['_fs_script'] = 'edge.fullstory.com/s/fs.js';
          window['_fs_org'] = 'TBEDP';
          window['_fs_namespace'] = 'FS';
          (function(m,n,e,t,l,o,g,y){
          if (e in m) {if(m.console && m.console.log) {m.console.log('FullStory namespace conflict. Please set window["_fs_namespace"].');} return;}
          g=m[e]=function(a,b,s){g.q?g.q.push([a,b,s]):g._api(a,b,s);};g.q=[];
          o=n.createElement(t);o.async=1;o.crossOrigin='anonymous';o.src='https://'+_fs_script;
          y=n.getElementsByTagName(t)[0];y.parentNode.insertBefore(o,y);
          g.identify=function(i,v,s){g(l,{uid:i},s);if(v)g(l,v,s)};g.setUserVars=function(v,s){g(l,v,s)};g.event=function(i,v,s){g('event',{n:i,p:v},s)};
          g.anonymize=function(){g.identify(!!0)};
          g.shutdown=function(){g('rec',!1)};g.restart=function(){g('rec',!0)};
          g.log = function(a,b){g('log',[a,b])};
          g.consent=function(a){g('consent',!arguments.length||a)};
          g.identifyAccount=function(i,v){o='account';v=v||{};v.acctId=i;g(o,v)};
          g.clearUserCookie=function(){};
          g._w={};y='XMLHttpRequest';g._w[y]=m[y];y='fetch';g._w[y]=m[y];
          if(m[y])m[y]=function(){return g._w[y].apply(this,arguments)};
          g._v='1.2.0';
        })(window,document,window['_fs_namespace'],'script','user');

          // fb pixel
        //   !function(f,b,e,v,n,t,s)
        // {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        //   n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        //   if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        //   n.queue=[];t=b.createElement(e);t.async=!0;
        //   t.src=v;s=b.getElementsByTagName(e)[0];
        //   s.parentNode.insertBefore(t,s)}(window, document,'script',
        //   'https://connect.facebook.net/en_US/fbevents.js');
        //   fbq('init', '1530862867115121');
        }
        `,
            }}
          />
{/*          <noscript*/}
{/*            dangerouslySetInnerHTML={{*/}
{/*              __html: `*/}
{/*            <img*/}
{/*              height="1"*/}
{/*              width="1"*/}
{/*              style="display:none"*/}
{/*              src="https://www.facebook.com/tr?id=1530862867115121&ev=PageView&noscript=1"*/}
{/*            />*/}
{/*          `,*/}
{/*            }}*/}
{/*          />*/}

          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `
          window.fbAsyncInit = function() {
          FB.init({
            appId: '241239336921963',
            cookie: true,
            xfbml: true,
            version: 'v7.0',
          });

          FB.AppEvents.logPageView();

        };

          (function(d, s, id){
          var js, fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) {return;}
          js = d.createElement(s); js.id = id;
          js.src = 'https://connect.facebook.net/en_US/sdk.js';
          fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
        `,
            }}
          />
        </body>
      </Html>
    );
  }
}

export default CustomDocument;
