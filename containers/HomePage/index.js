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

import HomePageWrapper from 'components/home/HomePageWrapper';
import AnalyticsService from 'services/AnalyticsService';

import reducer from './reducer';
import saga from './saga';
import makeSelectHomePage from './selectors';
import homeActions from './actions';

export function HomePage({ dispatch, homeState, subscribeEmailCallback }) {
  useInjectReducer({ key: 'homePage', reducer });
  useInjectSaga({ key: 'homePage', saga });
  const { goodChallengers } = homeState;
  const childProps = {
    goodChallengers,
    subscribeEmailCallback,
  };
  useEffect(() => {
    dispatch(homeActions.loadChallengersAction());
  }, []);
  return (
    <div>
      <Head>
        <title>The Good Party</title>
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
      dispatch(homeActions.subscribeEmailAction(email));
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
