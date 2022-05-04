/**
 *
 * HomePage
 *
 */

import React, { createContext, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from '/utils/injectSaga';
import { useInjectReducer } from '/utils/injectReducer';

import HomePageWrapper from '/components/HomePageWrapper';
import TgpHelmet from '/components/shared/TgpHelmet';
import { logEvent } from '/services/AnalyticsService';

import reducer from './reducer';
import saga from './saga';
import makeSelectHomePage from './selectors';
import actions from './actions';

export const HomePageContext = createContext();

export function HomePage({ ssrState, subscribeEmailCallback }) {
  useInjectReducer({ key: 'homePage', reducer });
  useInjectSaga({ key: 'homePage', saga });

  const childProps = {
    homepageCandidates: ssrState.homepageCandidates,
    engagements: ssrState.engagements,
    subscribeEmailCallback,
  };

  return (
    <HomePageContext.Provider value={childProps}>
      <TgpHelmet
        title="GOOD PARTY | Free software for free elections"
        description="GOOD PARTY builds free software for free elections. We're helping good indie candidates run and win, because BOTH Red + Blue have been corrupted beyond repair."
      />
      <HomePageWrapper />
    </HomePageContext.Provider>
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
    subscribeEmailCallback: (email) => {
      logEvent('Email & Marketing', 'Subscribe to Newsletter');
      dispatch(actions.subscribeEmailAction(email));
    },
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(HomePage);
