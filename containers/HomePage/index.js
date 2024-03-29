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
import { useRouter } from 'next/router';
// import { useInjectSaga } from '/utils/injectSaga';
// import { useInjectReducer } from '/utils/injectReducer';

import HomePageWrapper from '/components/HomePageWrapper';
import TgpHelmet from '/components/shared/TgpHelmet';
//
import reducer from './reducer';
import saga from './saga';
import makeSelectHomePage from './selectors';
import actions from './actions';
import feedbackActions from '/containers/shared/FeedbackContainer/actions';
// import { getExperiment } from '/helpers/optimizeHelper';
import registerActions from '../entrance/RegisterPage/actions';
import { useInjectSaga } from '../../utils/injectSaga';
import registerSaga from '../entrance/RegisterPage/saga';
// import { logEvent } from '../../services/AnalyticsService';
import makeSelectUser from '../you/YouPage/selectors';
// import { getUtmExperiment } from '../../helpers/utmHelper';
import { useInjectReducer } from '../../utils/injectReducer';

export const HomePageContext = createContext();

export function HomePage({
  showFeedbackCallback,
  registerCallback,
  userState,
  ssrState,
  homeState,
  subscribeEmailCallback,
}) {
  const { totalFollowers, feed, homepageCandidates } = ssrState;
  const {  loading } = homeState;
  const router = useRouter();

  useInjectReducer({ key: 'homePage', reducer });
  useInjectSaga({ key: 'homePage', saga });
  useInjectSaga({ key: 'registerPage', saga: registerSaga });

  // const utmExperiment = getUtmExperiment(utmContent, utmSource);

  // const [experimentVariant, setExperimentVariant] = useState('0');
  // useEffect(() => {
  //   getExperiment(
  //     'Aug 2022 Homepage order updated',
  //     'xP2-vukvS3697k43zU8nnw',
  //     (type) => {
  //       setExperimentVariant(type);
  //     },
  //   );
  // }, []);
  // console.log('experimentVariant', experimentVariant);

  const showInitModal = router.query.host === 'true';

  const { user } = userState;
  const childProps = {
    registerCallback,
    showFeedbackCallback,
    user,
    // experimentVariant,
    showInitModal,
    totalFollowers,
    loading,
    subscribeEmailCallback,
    homepageCandidates,
  };

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
  registerCallback: PropTypes.func,
  loadFeedCallback: PropTypes.func,
  subscribeEmailCallback: PropTypes.func,
  userState: PropTypes.object,
  homeState: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  homeState: makeSelectHomePage(),
  userState: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    showFeedbackCallback: () => {
      dispatch(feedbackActions.toggleModalAction(true));
    },
    registerCallback: (name, email, phone, zip) => {
      dispatch(
        registerActions.registerAction(
          name,
          email,
          phone,
          zip,
          false,
          'homepageModal',
        ),
      );
    },
    subscribeEmailCallback: (email, name) => {
      dispatch(actions.subscribeEmailAction(email, name));
    },
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(HomePage);
