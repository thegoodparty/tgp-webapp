/**
 *
 * CandidateNewWrapper
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import NotFound from 'containers/shared/NotFoundPage';
import PageWrapper from '../../shared/PageWrapper';

const ContentWrapper = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 20px;
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 3rem 16px 0;
  }
`;

function CandidateNewWrapper({ candidate }) {
  if (!candidate) {
    return <NotFound />;
  }
  console.log('cand', candidate)
  return (
    <PageWrapper isFullWidth white>
      <ContentWrapper>
        New Candidate Page
        {candidate.firstName} {candidate.lastName}
      </ContentWrapper>
    </PageWrapper>
  );
}

CandidateNewWrapper.propTypes = {
  candidate: PropTypes.object,
};

export default CandidateNewWrapper;
