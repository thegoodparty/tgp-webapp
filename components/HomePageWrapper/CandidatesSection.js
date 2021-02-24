import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import StyledH2 from './StyledH2';
import { Body, H2 } from '../shared/typogrophy';
import CandidateCard from '../shared/CandidateCard';

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
    </>
  );
};

CandidatesSection.propTypes = {
  homepageCandidates: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
};

export default CandidatesSection;
