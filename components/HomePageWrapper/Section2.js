import React from 'react';
// import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import StyledH2 from './StyledH2';
import GrayText from './GrayText';
import SectionImg from './SectionImg';

const Section2 = () => {
  return (
    <Grid container spacing={5} alignItems="center">
      <Grid item xs={12} md={6}>
        <SectionImg src="images/homepage/together.jpg" alt="together" />
      </Grid>
      <Grid item xs={12} md={6}>
        <StyledH2>Together we can change that. </StyledH2>
        <GrayText>
          We created free, open-source technology that puts power back in the
          hands of people. Where it should be.
        </GrayText>
      </Grid>
    </Grid>
  );
};

export default Section2;
