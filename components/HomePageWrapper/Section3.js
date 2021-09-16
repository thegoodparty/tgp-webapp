import React from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';

import StyledH2 from './StyledH2';
import SectionImg from './SectionImg';
import JoinUsButton from './JoinUsButton';
import NominateButton from './NominateButton';

const ReverseGrid = styled(Grid)`
  flex-direction: row;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    flex-direction: row-reverse;
  }
`;

const ResponsiveAlign = styled.div`
  text-align: center;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    text-align: left;
  }
`;

const Section3 = () => (
  <ReverseGrid container spacing={5} alignItems="center">
    <Grid item xs={12} md={6}>
      <SectionImg
        src="images/homepage/good-indie.svg"
        alt="Good Candidates"
        width={620}
        height={378}
        style={{ maxWidth: '620px' }}
      />
    </Grid>
    <Grid item xs={12} md={6}>
      <ResponsiveAlign>
        <StyledH2 style={{ marginBottom: '18px' }}>
          We build free software to help good indie candidates run and win.
        </StyledH2>
        <JoinUsButton style={{ marginRight: '24px', marginBottom: '12px' }} />
        <NominateButton />
      </ResponsiveAlign>
    </Grid>
  </ReverseGrid>
);

export default Section3;
