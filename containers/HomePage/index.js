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

// export const HomePageContext = createContext();

export function HomePage() {
  return (
    <div>
      <TgpHelmet
        title="GOOD PARTY | Free tools to change the rules and disrupt the corrupt."
        description="Not a political party, we’re building tools to change the rules, empowering creatives to mobilize community & disrupt the corrupt two-party system. Join us!"
      />
      <HomePageWrapper />
    </div>
  );
}

HomePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  // homeState: makeSelectHomePage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(HomePage);
