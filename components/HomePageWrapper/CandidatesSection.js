import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { Body11, H2 } from '../shared/typogrophy';
import CandidateCard from '../shared/CandidateCard';

const SeeMore = styled(Body11)`
  color: ${({ theme }) => theme.colors.purple};
  border: solid 1px ${({ theme }) => theme.colors.purple};
  display: inline-block;
  border-radius: 8px;
  padding: 14px 18px;
  font-weight: 500;
`;

const CandidatesSection = ({ homepageCandidates }) => {
  return (
    <>
      <H2 style={{ marginBottom: '24px' }}>
        Meet some Good Certified candidates
      </H2>
      <Grid container spacing={5} alignItems="center">
        {homepageCandidates &&
          homepageCandidates.map(candidate => (
            <Grid item xs={12} md={4}>
              <CandidateCard candidate={candidate} />
            </Grid>
          ))}
        <Grid item xs={12} md={4} />
      </Grid>
      <div className="text-center">
        <SeeMore>SEE MORE CANDIDATES</SeeMore>
      </div>
    </>
  );
};

CandidatesSection.propTypes = {
  homepageCandidates: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
};

export default CandidatesSection;
