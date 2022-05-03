/**
 *
 * CareersWrapper
 *
 */

import React from 'react';

import PageWrapper from '../shared/PageWrapper';
import Hero from './Hero';
import LeverCareers from './LeverCareers';
import Why from './Why';


function CareersWrapper() {
  return (
    <PageWrapper>
      <Hero />
      <LeverCareers />
      <Why />
    </PageWrapper>
  );
}

export default CareersWrapper;
