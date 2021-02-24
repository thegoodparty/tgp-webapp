import React from 'react';
import styled from 'styled-components';
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
        <StyledH2>Together we can be powerful</StyledH2>
        <GrayText>
          That’s why we’re creating free technology that puts power back in the
          hands of the people, where it belongs
        </GrayText>
      </Grid>
    </Grid>
  );
};

export default Section2;
