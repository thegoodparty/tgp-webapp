/**
 *
 * CandidatesSection
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import { Body, Body11, H2, H3 } from '../shared/typogrophy';
import { shortToLongState } from '../../helpers/electionsHelper';
import CandidateCard from '../shared/CandidateCard';

const Wrapper = styled.div``;
const StyledH3 = styled(H3)`
  color: ${({ theme }) => theme.colors.gray2};
  margin-top: 48px;
  margin-bottom: 16px;
  position: relative;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    margin-top: 66px;
  }
`;

const Nominate = styled(Body11)`
  color: ${({ theme }) => theme.colors.purple};
  border: solid 1px ${({ theme }) => theme.colors.purple};
  display: inline-block;
  border-radius: 8px;
  padding: 14px 18px;
  font-weight: 500;
`;

function CandidatesSection({ candidates }) {
  const states = Object.keys(candidates);
  return (
    <Wrapper>
      {states.map(state => (
        <>
          <StyledH3>{shortToLongState[state] || 'No State'}</StyledH3>
          <Grid container spacing={1}>
            {candidates[state].map(candidate => (
              <Grid item xs={12} md={6} lg={4}>
                <CandidateCard candidate={candidate} />
              </Grid>
            ))}
          </Grid>
        </>
      ))}
      <H2 style={{ marginBottom: '4px', marginTop: '64px', color: '#000' }}>
        Meet some Good Certified candidates
      </H2>
      <Body style={{ marginBottom: '24px' }}>
        We are actively recruiting candidates now, and will have some to show
        you very soon. In the meanwhile, if you know any good candidates please
        nominate them!
      </Body>
      <a
        href="https://docs.google.com/forms/d/e/1FAIpQLSe78SJOH5edK4jTyOWVhs-b8AIf9_ElONlc5opPgzHnnpm_0Q/viewform?usp=sf_link"
        target="_blank"
        rel="noopener noreferrer nofollow"
      >
        <Nominate>NOMINATE A CANDIDATE</Nominate>
      </a>
    </Wrapper>
  );
}

CandidatesSection.propTypes = {
  candidates: PropTypes.object,
};

export default CandidatesSection;
