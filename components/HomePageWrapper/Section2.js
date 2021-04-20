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
        <SectionImg
          src="images/homepage/career-politicians.png"
          alt="career politicians"
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <StyledH2>Corrupt career politicians won’t fix it.</StyledH2>
      </Grid>
    </Grid>
  );
};

export default Section2;
