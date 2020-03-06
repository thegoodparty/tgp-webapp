/**
 *
 * SplashPage
 *
 */

import React, { memo } from 'react';
import { Helmet } from 'react-helmet';

import SplashWrapper from 'components/intro/SplashWrapper';

function SplashPage() {
  return (
    <div>
      <Helmet>
        <title>Splash | TGP</title>
        <meta name="description" content="Description of Splash" />
      </Helmet>
      <SplashWrapper />
    </div>
  );
}

export default memo(SplashPage);
