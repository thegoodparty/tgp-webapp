import React from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';

import StyledH2 from './StyledH2';
import SectionImg from './SectionImg';
import JoinUsButton from './JoinUsButton';
import NominateButton from './NominateButton';

const NoXsGrid = styled(Grid)`
  display: none;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    display: flex;
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
  <Grid container spacing={5} alignItems="center">
    <Grid item xs={12} md={6}>
      <ResponsiveAlign>
        <StyledH2 style={{ marginBottom: '18px' }}>
          Money has corrupted both major parties.
          <br />
          Together, we can change the game!
        </StyledH2>
        <JoinUsButton style={{ marginRight: '24px' }} />
      </ResponsiveAlign>
    </Grid>
    <NoXsGrid item xs={12} md={6}>
      <SectionImg
        src="images/homepage/good-indie.svg"
        alt="Good Candidates"
        width={620}
        height={378}
        style={{ maxWidth: '620px' }}
      />
    </NoXsGrid>
  </Grid>
);

export default Section3;
