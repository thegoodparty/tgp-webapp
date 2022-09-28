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
import SplashPage from '/containers/intro/SplashPage/Loadable';
import ZipFinderPage from '/containers/intro/ZipFinderPage/Loadable';

import DistrictPage from '/containers/elections/DistrictPage/Loadable';
import ElectionPage from '/containers/elections/ElectionPage/Loadable';
import CandidatePage from '/containers/elections/CandidatePage/Loadable';
import IncumbentsPage from '/containers/elections/IncumbentsPage/Loadable';

import EmailRegisterPage from '/containers/you/EmailRegisterPage/Loadable';
import ConfirmationSentPage from '/containers/you/ConfirmationSentPage/Loadable';
import EmailConfirmationPage from '/containers/you/EmailConfirmationPage/Loadable';
import YouPage from '/containers/you/YouPage/Loadable';
import CrewPage from '/containers/you/CrewPage/Loadable';
import LoginPage from '/containers/entrance/LoginPage/Loadable';
import LoginConfirmPage from '/containers/you/LoginConfirmPage/Loadable';
import EditProfilePage from '/containers/you/EditProfilePage/Loadable';
import ResetPasswordPage from '/containers/entrance/ResetPasswordPage/Loadable';

import PartyPage from '/containers/party/PartyPage/Loadable';
import FaqListPage from '/containers/faqs/FaqListPage/Loadable';
import EventsPage from '/containers/party/EventsPage/Loadable';

import IncumbentsToScrape from '/containers/scraping/IncumbentsToScrape/Loadable';
import AllCandidatesToScrape from '/containers/scraping/AllCandidatesToScrape/Loadable';
import Races from '/containers/scraping/Races/Loadable';

import CreatorsPage from '/containers/creators/CreatorsPage/Loadable';
import VerifyVotePage from '/containers/voterize/VerifyVotePage/Loadable';

import AdminPage from '/containers/admin/AdminPage/Loadable';
import AdminEditCandidatePage from '/containers/admin/AdminEditCandidatePage/Loadable';
import AdminAddCandidatePage from '/containers/admin/AdminAddCandidatePage/Loadable';

import DirectoryPage from '/containers/directory/DirectoryPage/Loadable';

import PrivacyPage from '/containers/shared/PrivacyPage/Loadable';
import ResearchPage from '/containers/shared/ResearchPage/Loadable';
import NotFoundPage from '/containers/shared/NotFoundPage/Loadable';
import TwitterCallbackPage from '/containers/you/TwitterCallbackPage/Loadable';
import HomePage from '/containers/HomePage/Loadable';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/home" component={HomePage} />
      <Route exact path="/intro/splash" component={SplashPage} />
      <Route exact path="/intro/zip-finder" component={ZipFinderPage} />

      <Route exact path="/elections/district/:zip" component={DistrictPage} />
      <Route
        exact
        path="/elections/district/:zip/:cd"
        component={DistrictPage}
      />
      <Route exact path="/elections/incumbents" component={IncumbentsPage} />
      <Route
        exact
        path="/elections/candidate/:chamber/:name/:id/:tab"
        component={CandidatePage}
      />
      <Route
        exact
        path="/elections/candidate/:chamber/:name/:id"
        component={CandidatePage}
      />

      <Route exact path="/elections/:chamber" component={ElectionPage} />
      <Route exact path="/elections/:chamber/:state" component={ElectionPage} />
      <Route
        exact
        path="/elections/:chamber/:state/:district"
        component={ElectionPage}
      />

      <Route exact path="/you/register-email" component={EmailRegisterPage} />
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

      <Route exact path="/you/reset-password" component={ResetPasswordPage} />
      <Route exact path="/you" component={YouPage} />
      <Route exact path="/you/edit" component={EditProfilePage} />
      <Route exact path="/you/crew" component={CrewPage} />
      <Route exact path="/you/crew/leaderboard" component={CrewPage} />
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/login/confirm" component={LoginConfirmPage} />

      <Route exact path="/party" component={PartyPage} />
      <Route exact path="/faqs" component={FaqListPage} />
      <Route exact path="/party/events" component={EventsPage} />

      <Route exact path="/scrape/incumbents" component={IncumbentsToScrape} />
      <Route
        exact
        path="/scrape/candidates"
        component={AllCandidatesToScrape}
      />
      <Route exact path="/scrape/races" component={Races} />

      <Route exact path="/privacy" component={PrivacyPage} />
      <Route exact path="/research" component={ResearchPage} />

      <Route exact path="/creators" component={CreatorsPage} />
      <Route exact path="/verify-vote" component={VerifyVotePage} />

      <Route exact path="/admin" component={AdminPage} />
      <Route
        exact
        path="/admin/edit-candidate/:chamber/:id"
        component={AdminEditCandidatePage}
      />
      <Route
        exact
        path="/admin/add-candidate"
        component={AdminAddCandidatePage}
      />

      <Route exact path="/directory" component={DirectoryPage} />
      <Route exact path="/twitter-callback" component={TwitterCallbackPage} />

      <Route component={NotFoundPage} status={404} />
    </Switch>
  );
}
export default Routes;
