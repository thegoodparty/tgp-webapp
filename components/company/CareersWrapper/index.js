/**
 *
 * CareersWrapper
 *
 */

import React from 'react';

import PageWrapper from '../../shared/PageWrapper';
import Hero from './Hero';
import LeverCareers from './LeverCareers';
import Why from './Why';
import Values from './Values';
import MaxWidth, { Padder } from '../../shared/MaxWidth';

function CareersWrapper() {
  return (
    <PageWrapper isFullWidth>
      <MaxWidth>
        <Padder>
          <Hero />
        </Padder>
      </MaxWidth>
      <Values />
      <MaxWidth>
        <Padder>
          <Hero />
          <LeverCareers />
          <Why />
        </Padder>
      </MaxWidth>
    </PageWrapper>
  );
}

export default CareersWrapper;
