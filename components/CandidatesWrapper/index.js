/**
 *
 * CandidatesWrapper
 *
 */

import React from 'react';
import styled from 'styled-components';

import PageWrapper from '../shared/PageWrapper';
import TopSection from './TopSection';
import FiltersSection from './FiltersSection';
import CandidatesSection from './CandidatesSection';

function CandidatesWrapper() {
  return (
    <PageWrapper>
      <TopSection />
      <FiltersSection />
      <CandidatesSection />
    </PageWrapper>
  );
}

export default CandidatesWrapper;
