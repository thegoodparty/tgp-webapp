/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';

import SplashPage from 'containers/intro/SplashPage/Loadable';
import ThreeStepsPage from 'containers/intro/ThreeStepsPage/Loadable';
import ZipFinderPage from 'containers/intro/ZipFinderPage/Loadable';

import DistrictPage from 'containers/elections/DistrictPage/Loadable';
import PresidentialElectionPage from 'containers/elections/PresidentialElectionPage/Loadable';
import SenateElectionPage from 'containers/elections/SenateElectionPage/Loadable';
import HouseElectionPage from 'containers/elections/HouseElectionPage/Loadable';
import CandidatePage from 'containers/elections/CandidatePage/Loadable';
import RankCandidatesPage from 'containers/elections/RankCandidatesPage/Loadable';
import RankedElectionPage from 'containers/elections/RankedElectionPage/Loadable';

import RegisterPage from 'containers/you/EmailRegisterPage/Loadable';
import SocialRegisterPage from 'containers/you/SocialRegisterPage/Loadable';
import ConfirmationSentPage from 'containers/you/ConfirmationSentPage/Loadable';
import EmailConfirmationPage from 'containers/you/EmailConfirmationPage/Loadable';
import RegisterStep2Page from 'containers/you/RegisterStep2Page/Loadable';
import SharePage from 'containers/you/SharePage/Loadable';
import YouPage from 'containers/you/YouPage/Loadable';
import LoginPage from 'containers/you/LoginPage/Loadable';
import LoginConfirmPage from 'containers/you/LoginConfirmPage/Loadable';
import EditProfilePage from 'containers/you/EditProfilePage/Loadable';

import PartyPage from 'containers/party/PartyPage/Loadable';
import FaqListPage from 'containers/party/FaqListPage/Loadable';
import FaqArticlePage from 'containers/party/FaqArticlePage/Loadable';

import IncumbentsToScrape from 'containers/scraping/IncumbentsToScrape/Loadable';
import AllCandidatesToScrape from 'containers/scraping/AllCandidatesToScrape/Loadable';

import NotFoundPage from 'containers/shared/NotFoundPage/Loadable';

import GlobalStyle from 'global-styles';
import SnackbarContainer from 'containers/shared/SnackbarContainer';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';

export default function App() {
  useInjectReducer({ key: 'global', reducer });
  useInjectSaga({ key: 'global', saga });

  return (
    <div>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/intro/splash" component={SplashPage} />
        <Route exact path="/intro/three-steps" component={ThreeStepsPage} />
        <Route exact path="/intro/zip-finder" component={ZipFinderPage} />

        <Route exact path="/elections/district/:zip" component={DistrictPage} />
        <Route
          exact
          path="/elections/district/:zip/:cd"
          component={DistrictPage}
        />
        <Route
          exact
          path="/elections/presidential-election"
          component={PresidentialElectionPage}
        />
        <Route
          exact
          path="/elections/senate-election/:shortState"
          component={SenateElectionPage}
        />
        <Route
          exact
          path="/elections/house-election/:stateDistrict"
          component={HouseElectionPage}
        />
        <Route
          exact
          path="/elections/candidate/:chamber/:name/:id"
          component={CandidatePage}
        />
        <Route
          exact
          path="/elections/rank-candidates/:chamber"
          component={RankCandidatesPage}
        />
        <Route
          exact
          path="/elections/rank-candidates/:chamber/:state"
          component={RankCandidatesPage}
        />
        <Route
          exact
          path="/elections/rank-candidates/:chamber/:state/:district"
          component={RankCandidatesPage}
        />
        <Route
          exact
          path="/elections/ranked-presidential-election"
          component={RankedElectionPage}
        />
        <Route
          exact
          path="/elections/ranked-senate-election/:shortState"
          component={RankedElectionPage}
        />
        <Route
          exact
          path="/elections/ranked-house-election/:stateDistrict"
          component={RankedElectionPage}
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
        <Route exact path="/you/register-step2" component={RegisterStep2Page} />
        <Route exact path="/you/share" component={SharePage} />
        <Route exact path="/you" component={YouPage} />
        <Route exact path="/you/edit" component={EditProfilePage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/login/confirm" component={LoginConfirmPage} />

        <Route exact path="/party" component={PartyPage} />
        <Route exact path="/party/faqs" component={FaqListPage} />
        <Route exact path="/party/faq/:title/:id" component={FaqArticlePage} />

        <Route exact path="/scrape/incumbents" component={IncumbentsToScrape} />
        <Route
          exact
          path="/scrape/candidates"
          component={AllCandidatesToScrape}
        />

        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
      <SnackbarContainer />
    </div>
  );
}
