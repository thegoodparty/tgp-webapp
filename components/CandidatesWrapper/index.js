/**
 *
 * CandidatesWrapper
 *
 */

import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import dynamic from 'next/dynamic';

import PageWrapper from '../shared/PageWrapper';
import TopSection from './TopSection';
import MaxWidth, { Padder } from '../shared/MaxWidth';
import CandidatesSection from './CandidatesSection';
import { CandidatesContext } from '../../containers/CandidatesPage';
const FiltersSection = dynamic(() => import('./FiltersSection'), {
  loading: () => <>Loading</>,
});

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
  const { routePosition, routeState } = useContext(CandidatesContext);
  const [showFilters, setShowFilters] = useState(routePosition || routeState);
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
          {showFilters && <FiltersSection />}
          <CandidatesSection
            toggleFiltersCallback={() => setShowFilters(!showFilters)}
            showFilters={showFilters}
          />
        </Padder>
      </MaxWidth>
    </PageWrapper>
  );
}

export default CandidatesWrapper;
