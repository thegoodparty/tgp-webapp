/**
 *
 * CandidatesWrapper
 *
 */

import React, { useState, useContext, createContext } from 'react';
import styled from 'styled-components';

import PageWrapper from '../shared/PageWrapper';
import TopSection from './TopSection';
import MaxWidth, { Padder } from '../shared/MaxWidth';
import CandidatesSection from './CandidatesSection';
import { CandidatesContext } from '../../containers/CandidatesPage';
import FiltersSection from './FiltersSection';

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

export const CandidatesWrapperContext = createContext();

function CandidatesWrapper() {
  const { routePosition, routeState } = useContext(CandidatesContext);
  const [showFilters, setShowFilters] = useState(routePosition || routeState);
  const [showOnlyGood, setShowOnlyGood] = useState(false);
  const childProps = {
    showOnlyGood,
    setShowOnlyGood,
  };
  return (
    <CandidatesWrapperContext.Provider value={childProps}>
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
            <CandidatesSection
              toggleFiltersCallback={() => setShowFilters(!showFilters)}
              showFilters={showFilters}
            />
          </Padder>
        </MaxWidth>
      </PageWrapper>
    </CandidatesWrapperContext.Provider>
  );
}

export default CandidatesWrapper;
