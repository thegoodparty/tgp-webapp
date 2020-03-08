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
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import GlobalStyle from 'global-styles';

export default function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/intro/splash" component={SplashPage} />
        <Route exact path="/intro/three-steps" component={ThreeStepsPage} />
        <Route exact path="/intro/zip-finder" component={ZipFinderPage} />
        <Route exact path="/elections/district/:zip" component={DistrictPage} />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </div>
  );
}
