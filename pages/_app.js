import { useEffect } from 'react';
import Script from 'next/script';

import { ThemeProvider } from 'styled-components';
import { ThemeProvider as UiThemeProvider } from '@material-ui/styles';
import { ConnectedRouter } from 'connected-next-router';
import SnackbarContainer from '/containers/shared/SnackbarContainer';

import GlobalStyles from '/theme/GlobalStyles';
import store from '/redux/store';
import QueryRoutes from '/containers/App/QueryRoutes';
// import { initGA4 } from '/services/AnalyticsService';

import theme from '/theme';
import { getUserCookie, setCookie } from '../helpers/cookieHelper';

/**
 * @param {object} initialState The store's initial state (on the client side, the state of the server-side store is passed here)
 * @param {boolean} options.isServer Indicates whether makeStore is executed on the server or the client side
 * @param {Request} options.req Node.js `Request` object (only set before `getInitialProps` on the server side)
 * @param {Response} options.res Node.js `Response` object (only set before `getInitialProps` on the server side)
 * @param {boolean} options.debug User-defined debug flag
 * @param {string} options.storeKey The key that will be used to persist the store in the browser's `window` object for safe HMR
 */
if (typeof window !== 'undefined' && navigator && navigator.serviceWorker) {
  navigator.serviceWorker.getRegistrations().then(function (registrations) {
    for (let registration of registrations) {
      registration.unregister();
    }
  });
}

// empty
function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // initGA4();
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
    // const user = getUserCookie(true);
    // if (user) {
    //   try {
    //     if (user.email) {
    //       const domain = user.email.split('@')[1];
    //       if (domain === 'goodparty.org') {
    //         setCookie('gtm_internal_user', 'internal');
    //       }
    //     }
    //   } catch (e) {
    //     console.log('internal email error', e);
    //   }
    // }
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
        <Script
          src="https://www.googleoptimize.com/optimize.js?id=OPT-WLTK9ST"
          id="gtm"
        />
        <Script
          strategy="afterInteractive"
          type="text/javascript"
          id="fs"
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
        
        // twitter pixel
        !function(e,t,n,s,u,a){e.twq||(s=e.twq=function(){s.exe?s.exe.apply(s,arguments):s.queue.push(arguments);
        },s.version='1.1',s.queue=[],u=t.createElement(n),u.async=!0,u.src='//static.ads-twitter.com/uwt.js',
        a=t.getElementsByTagName(n)[0],a.parentNode.insertBefore(u,a))}(window,document,'script');
        // Insert Twitter Pixel ID and Standard Event data below
        twq('init','o8pqb');
        twq('track','PageView');
        }
        `,
          }}
        />
        <Script
          strategy="afterInteractive"
          type="text/javascript"
          id="fb"
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
        
        // GTM
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-M53W2ZV');
        `,
          }}
        />
        <Script
          type="text/javascript"
          id="hs-script-loader"
          async
          defer
          src="//js.hs-scripts.com/21589597.js"
        />
        <Script
          strategy="afterInteractive"
          type="text/javascript"
          id="hsq"
          dangerouslySetInnerHTML={{
            __html: `
              var _hsq = window._hsq = window._hsq || [];
              _hsq.push(['setContentType', 'standard-page']);
           `,
          }}
        />
      </UiThemeProvider>
    </ConnectedRouter>
  );
}

export default store.withRedux(MyApp);
