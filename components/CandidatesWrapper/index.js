/**
 *
 * CandidatesWrapper
 *
 */

import React from 'react';
import styled from 'styled-components';

import PageWrapper from '../shared/PageWrapper';
import TopSection from './TopSection';
import MaxWidth, { Padder } from '../shared/MaxWidth';
import FiltersSection from './FiltersSection';
import CandidatesSection from './CandidatesSection';

const Line = styled.div`
  display: none;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    display: block;
    height: 1px;
    background-color: #f3f3f3;
    margin: 40px 0 60px;
  }
`;

function CandidatesWrapper() {
  return (
    <PageWrapper isFullWidth>
      <MaxWidth>
        <Padder>
          <TopSection />
        </Padder>
      </MaxWidth>
      <Line />
      <MaxWidth>
        <Padder>
          <FiltersSection />
          <CandidatesSection />
        </Padder>
      </MaxWidth>
    </PageWrapper>
  );
}

export default CandidatesWrapper;
