/**
 *
 * AdminCompareCandidatesWrapper
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import CandidateTopMenu from '../CandidateTopMenu';
import { H2 } from '../../shared/typogrophy';
import ComparedCandidates from './ComparedCandidates';
import AdminPageWrapper from '../AdminWrapper/AdminPageWrapper';
import BlackButton from '../../shared/buttons/BlackButton';

const Wrapper = styled.div`
  min-height: calc(100vh - 50px);
  padding: 36px 0;
  max-width: ${({ theme }) => theme.breakpointsPixels.contentMax};
  margin: 0 auto;
`;

function AdminCompareCandidatesWrapper({ candidate, saveCallback, topics }) {
  const [comparedCandidates, setComparedCandidates] = useState(false);
  const compareCandidatesCallback = (comparedCands) => {
    setComparedCandidates(comparedCands);
  };

  const handleSave = () => {
    saveCallback({
      ...candidate,
      comparedCandidates,
    });
  };

  return (
    <AdminPageWrapper>
      <Wrapper>
        <CandidateTopMenu candidate={candidate} />
        <br />
        <H2>Compare Candidates</H2>
        <br />
        <br />
        <ComparedCandidates
          candidate={candidate}
          candidatesCallback={compareCandidatesCallback}
          topics={topics}
        />
        <br />
        <br />
        <BlackButton
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSave}
        >
          SAVE
        </BlackButton>
      </Wrapper>
    </AdminPageWrapper>
  );
}

AdminCompareCandidatesWrapper.propTypes = {
  candidate: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  saveCallback: PropTypes.func,
  topics: PropTypes.array,
};

export default AdminCompareCandidatesWrapper;
