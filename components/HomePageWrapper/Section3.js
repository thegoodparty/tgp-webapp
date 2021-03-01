import React from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';

import StyledH2 from './StyledH2';
import SectionImg from './SectionImg';
import JoinUsButton from './JoinUsButton';

const ReverseGrid = styled(Grid)`
  flex-direction: row;
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: row-reverse;
  }
`;

const Section3 = () => {
  return (
    <ReverseGrid container spacing={5} alignItems="center">
      <Grid item xs={12} md={6}>
        <SectionImg src="images/homepage/money-out.jpg" alt="big money" />
      </Grid>
      <Grid item xs={12} md={6}>
        <StyledH2>Let’s get money out of politics - for good.</StyledH2>
        <JoinUsButton />
      </Grid>
    </ReverseGrid>
  );
};

export default Section3;
