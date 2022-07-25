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
import { logEvent } from '../../services/AnalyticsService';
import makeSelectUser from '../you/YouPage/selectors';
import { getUtmExperiment } from '../../helpers/utmHelper';
import { useInjectReducer } from '../../utils/injectReducer';

export const HomePageContext = createContext();

export function HomePage({
  showFeedbackCallback,
  registerCallback,
  userState,
  ssrState,
  homeState,
  loadFeedCallback,
  subscribeEmailCallback,
}) {
  const { utmContent, utmSource, totalFollowers, feed, homepageCandidates } =
    ssrState;
  const { fullFeed, loading } = homeState;
  const router = useRouter();

  useInjectReducer({ key: 'homePage', reducer });
  useInjectSaga({ key: 'homePage', saga });
  useInjectSaga({ key: 'registerPage', saga: registerSaga });

  // const utmExperiment = getUtmExperiment(utmContent, utmSource);

  // const [experimentVariant, setExperimentVariant] = useState('0');
  // useEffect(() => {
  //   getExperiment('homepage-language', '5H5-CrICR-qVMSCUUTp7MQ', (type) => {
  //     setExperimentVariant(type);
  //   });
  // }, []);

  const showInitModal = router.query.host === 'true';

  const { user } = userState;
  const childProps = {
    registerCallback,
    showFeedbackCallback,
    user,
    // utmExperiment,
    showInitModal,
    totalFollowers,
    feed,
    fullFeed,
    loading,
    loadFeedCallback,
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
    loadFeedCallback: () => {
      dispatch(actions.loadFeedAction());
    },
    subscribeEmailCallback: (email) => {
      dispatch(actions.subscribeEmailAction(email));
    },
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(HomePage);
