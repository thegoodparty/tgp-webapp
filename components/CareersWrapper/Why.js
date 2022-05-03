/**
 *
 * Why
 *
 */

import React from 'react';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';
import { FontH2, H2 } from '../shared/typogrophy';

const Wrapper = styled.section`
  margin-top: 140px;
`;
const Text = styled.div`
  font-size: 19px;
  line-height: 36px;
`;

function Why() {
  return (
    <Wrapper>
      <FontH2>Why you should join us</FontH2>
      <Grid container>
        <Grid xs={12} lg={9}>
          <Text>
            Be part of a mission to solve the biggest problem of our time –
            fixing our democracy, so all other problems can be solved.
            <br />
            <br />
            We’re a Public Benefit Corporation that prioritizes social impact
            over profit.
            <br />
            <br />
            Fully funded for our mission. No stressing over whether the next
            round of funding will come through. Focus on making an impact.
            That’s what matters here.
            <br />
            <br />
            Work where and how you like, on a fully remote team spread across
            the country.
            <br />
            <br />
            Join a diverse group of people with views across the political
            spectrum.
            <br />
            <br />
            100% coverage of health, dental, and vision benefits for you and
            your dependents.
            <br />
            <br />
            We encourage you to take time off to recharge and have an unlimited
            PTO (sick and vacation) policy. This is a marathon, not a sprint. We
            believe a work-life balance is needed to get there.
          </Text>
        </Grid>
      </Grid>
    </Wrapper>
  );
}

export default Why;
