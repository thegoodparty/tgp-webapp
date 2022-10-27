/**
 *
 * CareersWrapper
 *
 */

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

import PageWrapper from '../../shared/PageWrapper';
import Hero from './Hero';
import MaxWidth, { Padder } from '../../shared/MaxWidth';

const Values = dynamic(() => import('./Values'), {
  suspense: true,
});

const LeverCareers = dynamic(() => import('./LeverCareers'), {
  suspense: true,
});

const Why = dynamic(() => import('./Why'), {
  suspense: true,
});

function CareersWrapper() {
  return (
    <PageWrapper isFullWidth>
      <MaxWidth>
        <Padder>
          <Hero />
        </Padder>
      </MaxWidth>
      <Suspense fallback={`Loading...`}>
        <Values />
      </Suspense>
      <MaxWidth>
        <Padder>
          <Suspense fallback={`Loading...`}>
            <LeverCareers />
          </Suspense>
          <Suspense fallback={`Loading...`}>
            <Why />
          </Suspense>
        </Padder>
      </MaxWidth>
    </PageWrapper>
  );
}

export default CareersWrapper;
