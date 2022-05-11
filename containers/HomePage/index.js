/**
 *
 * HomePage
 *
 */

import React, { createContext, memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
// import { useInjectSaga } from '/utils/injectSaga';
// import { useInjectReducer } from '/utils/injectReducer';

import HomePageWrapper from '/components/HomePageWrapper';
import TgpHelmet from '/components/shared/TgpHelmet';
// import { logEvent } from '/services/AnalyticsService';
//
// import reducer from './reducer';
// import saga from './saga';
// import makeSelectHomePage from './selectors';
// import actions from './actions';
import feedbackActions from '/containers/shared/FeedbackContainer/actions';
import { getExperiment } from '/helpers/optimizeHelper';

export const HomePageContext = createContext();

export function HomePage({ showFeedbackCallback }) {
  const [experimentVariant, setExperimentVariant] = useState('0');
  useEffect(() => {
    getExperiment('homepage-language', 'uoIDTR6vRKeDD-7mW_1Xmg', (type) => {
      setExperimentVariant(type);
    });
  }, []);
  console.log('experimentVariant', experimentVariant);
  const childProps = { showFeedbackCallback, experimentVariant };
  return (
    <HomePageContext.Provider value={childProps}>
      <TgpHelmet
        title="GOOD PARTY | Free tools to change the rules and disrupt the corrupt."
        description="Not a political party, we’re building tools to change the rules, empowering creatives to mobilize community & disrupt the corrupt two-party system. Join us!"
      />
      <HomePageWrapper />
    </HomePageContext.Provider>
  );
}

HomePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  showFeedbackCallback: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  // homeState: makeSelectHomePage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    showFeedbackCallback: () => {
      dispatch(feedbackActions.toggleModalAction(true));
    },
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(HomePage);
