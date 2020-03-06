/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, { memo } from 'react';
import { Helmet } from 'react-helmet';

import HomePageWrapper from 'components/HomePageWrapper';

function HomePage() {
  return (
    <div>
      <Helmet>
        <title>The Good Party</title>
        <meta name="description" content="The Good Party" />
      </Helmet>
      <HomePageWrapper />
    </div>
  );
}

export default memo(HomePage);
