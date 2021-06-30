/**
 *
 * AdminCompareCandidatesWrapper
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Nav from 'containers/shared/Nav';
import CandidateTopMenu from '../CandidateTopMenu';
import { Body, H2 } from '../../shared/typogrophy';
import ComparedCandidates from './ComparedCandidates';
import { PurpleButton } from '../../shared/buttons';

const Wrapper = styled.div`
  min-height: calc(100vh - 50px);
  padding: 36px 0;
  max-width: ${({ theme }) => theme.breakpointsPixels.contentMax};
  margin: 0 auto;
`;

function AdminCompareCandidatesWrapper({ candidate, saveCallback }) {
  const [comparedCandidates, setComparedCandidates] = useState(false);
  const compareCandidatesCallback = comparedCands => {
    console.log('compared', comparedCands);
    setComparedCandidates(comparedCands);
  };

  const handleSave = () => {
    console.log('cand', candidate);
    console.log('comparedCandidates', comparedCandidates);
    saveCallback({
      ...candidate,
      comparedCandidates,
    });
  };

  return (
    <div style={{ backgroundColor: '#FFF' }} className="text-center">
      <Nav />
      <Wrapper>
        <CandidateTopMenu candidate={candidate} />
        <br />
        <H2>Compare Candidates</H2>
        <br />
        <br />
        <ComparedCandidates
          candidate={candidate}
          candidatesCallback={compareCandidatesCallback}
        />
        <br />
        <br />
        <PurpleButton
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSave}
        >
          SAVE
        </PurpleButton>
      </Wrapper>
    </div>
  );
}

AdminCompareCandidatesWrapper.propTypes = {
  candidate: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  saveCallback: PropTypes.func,
};

export default AdminCompareCandidatesWrapper;
