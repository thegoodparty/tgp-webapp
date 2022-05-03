/**
 *
 * Hero
 *
 */

import React from 'react';

import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';

import { FontH1 } from '../shared/typogrophy';

const Side = styled.div`
  font-size: 20px;
  font-weight: 600;
  line-height: 33px;
  font-style: italic;
`;

function Hero() {
  return (
    <Grid container spacing={4} style={{ marginTop: '100px' }}>
      <Grid item xs={12} lg={6}>
        <FontH1 style={{ marginTop: 0 }}>
          Want to work on something Good?
          <br />
          <br />
          Join the party!
        </FontH1>
      </Grid>
      <Grid item xs={12} lg={6}>
        <Side>
          Good Party is a fully-funded startup organized as a Public Benefit
          Corporation (people and impact over revenues or profit). Our team is
          100% remote, with diverse backgrounds and political beliefs. We work
          hard on our mission of making people matter more than money in our
          democracy, but care about our own well being too.
          <br />
          <br />
          If creatively disrupting politics for good sounds like a challenge
          you’re up for, check out the roles we’re looking to fill right now!
        </Side>
      </Grid>
    </Grid>
  );
}

export default Hero;
