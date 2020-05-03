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
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import history from 'utils/history';
import ReactGA from 'react-ga';
import ENV from 'api/ENV';

import HomePage from 'containers/intro/HomePage/Loadable';

import SplashPage from 'containers/intro/SplashPage/Loadable';
import ZipFinderPage from 'containers/intro/ZipFinderPage/Loadable';

import DistrictPage from 'containers/elections/DistrictPage/Loadable';
import ElectionPage from 'containers/elections/ElectionPage/Loadable';
import CandidatePage from 'containers/elections/CandidatePage/Loadable';

import RegisterPage from 'containers/you/EmailRegisterPage/Loadable';
import SocialRegisterPage from 'containers/you/SocialRegisterPage/Loadable';
import ConfirmationSentPage from 'containers/you/ConfirmationSentPage/Loadable';
import EmailConfirmationPage from 'containers/you/EmailConfirmationPage/Loadable';
import RegisterStep2Page from 'containers/you/RegisterStep2Page/Loadable';
import YouPage from 'containers/you/YouPage/Loadable';
import LoginPage from 'containers/you/LoginPage/Loadable';
import LoginConfirmPage from 'containers/you/LoginConfirmPage/Loadable';
import EditProfilePage from 'containers/you/EditProfilePage/Loadable';

import PartyPage from 'containers/party/PartyPage/Loadable';
import FaqListPage from 'containers/party/FaqListPage/Loadable';
import FaqArticlePage from 'containers/party/FaqArticlePage/Loadable';
import EventsPage from 'containers/party/EventsPage/Loadable';

import IncumbentsToScrape from 'containers/scraping/IncumbentsToScrape/Loadable';
import AllCandidatesToScrape from 'containers/scraping/AllCandidatesToScrape/Loadable';
import Races from 'containers/scraping/Races/Loadable';

import AdminPage from 'containers/admin/AdminPage/Loadable';

import PrivacyPage from 'containers/shared/PrivacyPage/Loadable';
import ResearchPage from 'containers/shared/ResearchPage/Loadable';
import NotFoundPage from 'containers/shared/NotFoundPage/Loadable';

import GlobalStyle from 'global-styles';
import SnackbarContainer from 'containers/shared/SnackbarContainer';

import Footer from 'components/shared/Footer';
import ErrorBoundary from 'containers/shared/ErrorBoundry';

import queryHelper from 'helpers/queryHelper';
import { setCookie } from 'helpers/cookieHelper';
import { fullStoryIdentify } from 'helpers/fullStoryHelper';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import globalActions from './actions';
import { makeSelectLocation } from './selectors';

if (ENV === 'prod') {
  history.listen(location => {
    ReactGA.set({ page: location.pathname });
    ReactGA.pageview(location.pathname);
  });
}

function App({ locationState, dispatch }) {
  useInjectReducer({ key: 'global', reducer });
  useInjectSaga({ key: 'global', saga });

  useEffect(() => {
    if (ENV === 'prod') {
      ReactGA.pageview(window.location.pathname);
    }
    dispatch(globalActions.loadContentAction());
    const { search } = locationState;
    const uuid = queryHelper(search, 'u');
    if (uuid) {
      setCookie('referrer', uuid);
    }
    fullStoryIdentify();
  }, []);

  return (
    <div>
      <ErrorBoundary>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/intro/splash" component={SplashPage} />
          <Route exact path="/intro/zip-finder" component={ZipFinderPage} />

          <Route
            exact
            path="/elections/district/:zip"
            component={DistrictPage}
          />
          <Route
            exact
            path="/elections/district/:zip/:cd"
            component={DistrictPage}
          />
          <Route
            exact
            path="/elections/candidate/:chamber/:name/:id"
            component={CandidatePage}
          />

          <Route exact path="/elections/:chamber" component={ElectionPage} />
          <Route
            exact
            path="/elections/:chamber/:state"
            component={ElectionPage}
          />
          <Route
            exact
            path="/elections/:chamber/:state/:district"
            component={ElectionPage}
          />

          <Route exact path="/you/register" component={SocialRegisterPage} />
          <Route exact path="/you/register-email" component={RegisterPage} />
          <Route
            exact
            path="/you/confirmation-sent"
            component={ConfirmationSentPage}
          />
          <Route
            exact
            path="/email-confirmation"
            component={EmailConfirmationPage}
          />
          <Route
            exact
            path="/you/register-step2"
            component={RegisterStep2Page}
          />
          <Route exact path="/you" component={YouPage} />
          <Route exact path="/you/edit" component={EditProfilePage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/login/confirm" component={LoginConfirmPage} />

          <Route exact path="/party" component={PartyPage} />
          <Route exact path="/party/faqs" component={FaqListPage} />
          <Route
            exact
            path="/party/faq/:title/:id"
            component={FaqArticlePage}
          />
          <Route exact path="/party/events" component={EventsPage} />

          <Route
            exact
            path="/scrape/incumbents"
            component={IncumbentsToScrape}
          />
          <Route
            exact
            path="/scrape/candidates"
            component={AllCandidatesToScrape}
          />
          <Route exact path="/scrape/races" component={Races} />

          <Route exact path="/privacy" component={PrivacyPage} />
          <Route exact path="/research" component={ResearchPage} />

          <Route exact path="/admin" component={AdminPage} />

          <Route component={NotFoundPage} />
        </Switch>
        <GlobalStyle />
        <SnackbarContainer />
        <Footer />
      </ErrorBoundary>
    </div>
  );
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  locationState: PropTypes.object,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const mapStateToProps = createStructuredSelector({
  locationState: makeSelectLocation(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(App);
