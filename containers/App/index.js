/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import history from 'utils/history';
// import ReactGA from 'react-ga';
import ENV from 'api/ENV';
import Head from 'next/head';

import GlobalStyle from 'global-styles';
import SnackbarContainer from 'containers/shared/SnackbarContainer';

import ErrorBoundary from 'containers/shared/ErrorBoundry';

import { fullStoryIdentify } from 'helpers/fullStoryHelper';
import { getUserCookie } from 'helpers/cookieHelper';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import globalActions from './actions';
import Routes from './Routes';
import QueryRoutes from './QueryRoutes';

if (ENV === 'prod') {
  history.listen(location => {
    // ReactGA.set({ page: location.pathname });
    // ReactGA.pageview(location.pathname);
    if (typeof fbq === 'function') {
      fbq('track', 'PageView');
    }
  });
}

function App({ dispatch }) {
  useInjectReducer({ key: 'global', reducer });
  useInjectSaga({ key: 'global', saga });
  useEffect(() => {
    const user = getUserCookie();
    if (user) {
      dispatch(globalActions.refreshTokenAction());
    }
    // if (ENV === 'prod') {
    //   ReactGA.pageview(window.location.pathname);
    // }
    dispatch(globalActions.loadContentAction());

    fullStoryIdentify();
  }, []);

  return (
    <div>
      {ENV !== 'prod' && (
        <Head>
          <meta name="robots" content="noindex, nofollow" />
        </Head>
      )}
      <ErrorBoundary>
        <Routes />
        <GlobalStyle />
        <SnackbarContainer />
        <QueryRoutes />
      </ErrorBoundary>
    </div>
  );
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const mapStateToProps = createStructuredSelector({});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(App);
