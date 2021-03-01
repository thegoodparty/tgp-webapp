/**
 *
 * HomePage
 *
 */

import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Head from 'next/head';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import HomePageWrapper from 'components/HomePageWrapper';
import AnalyticsService from 'services/AnalyticsService';

import reducer from './reducer';
import saga from './saga';
import makeSelectHomePage from './selectors';
import actions from './actions';

export function HomePage({
  ssrState,
  dispatch,
  homeState,
  subscribeEmailCallback,
}) {
  useInjectReducer({ key: 'homePage', reducer });
  useInjectSaga({ key: 'homePage', saga });

  if (ssrState) {
    const candidates = ssrState.homepageCandidates;
    dispatch(actions.loadHomepageCandidatesActionSuccess(candidates));
  }
  const { homepageCandidates } = homeState;
  const childProps = {
    homepageCandidates,
    subscribeEmailCallback,
  };

  return (
    <div>
      <Head>
        <title>GOOD PARTY</title>
        <meta name="description" content="The Good Party" />
      </Head>
      <HomePageWrapper {...childProps} />
    </div>
  );
}

HomePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  homeState: PropTypes.object,
  subscribeEmailCallback: PropTypes.func,
  ssrState: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  homeState: makeSelectHomePage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    subscribeEmailCallback: email => {
      AnalyticsService.sendEvent(
        'Email & Marketing',
        'Subscribe to Newsletter',
      );
      dispatch(actions.subscribeEmailAction(email));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(HomePage);
