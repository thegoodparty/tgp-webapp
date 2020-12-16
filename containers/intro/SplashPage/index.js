/**
 *
 * SplashPage
 *
 */

import React, { memo } from 'react';
import Head from 'next/head';

import SplashWrapper from 'components/intro/SplashWrapper';

function SplashPage() {
  return (
    <div>
      <Head>
        <title>Splash | TGP</title>
        <meta name="description" content="Description of Splash" />
      </Head>
      <SplashWrapper />
    </div>
  );
}

export default memo(SplashPage);
