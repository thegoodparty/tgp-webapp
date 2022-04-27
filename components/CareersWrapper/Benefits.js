/**
 *
 * Benefits
 *
 */

import React from 'react';
import Grid from '@material-ui/core/Grid';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import { H2 } from '../shared/typogrophy';

const Wrapper = styled.section`
  li {
    margin-bottom: 16px;
  }
  @media only screen and (min-width: ${({ theme }) =>
  theme.breakpointsPixels.md}) {
    padding: 48px 10px;
  }
`;

const MaxContent = styled.div`
  max-width: ${({ theme }) => theme.breakpointsPixels.contentMax};
  margin: 0 auto;
`;

const Content = styled(MaxContent)`
  padding: 48px 12px;
  color: ${({ theme }) => theme.colors.gray2};
  font-size: 16px;
  line-height: 25px;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    font-size: 18px;
  }
`;

const StyledH2 = styled(H2)`
  font-size: 32px;
  line-height: 38px;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    font-size: 48px;
    line-height: 62px;
  }
`;

function Benefits() {
  return (
    <Wrapper>
      <Content>
        <Grid spacing={2} container>
          <Grid item xs={12} md={4}>
            <StyledH2 data-cy="benefits-title">Why You Should Join Us</StyledH2>
          </Grid>
          <Grid item xs={12} md={8} data-cy="benefits-content">
            <ul>
              <li>
                <strong>Be part of a mission</strong> to solve the biggest
                problem of our time – fixing our democracy, so all other
                problems can be solved
              </li>
              <li>
                We’re a <strong>Public Benefit Corporation</strong> that
                prioritizes social impact over profit
              </li>
              <li>
                <strong>Fully funded</strong> for our mission. No stressing over
                whether the next round of funding will come through. Focus on
                making an impact. That’s what matters here.
              </li>
              <li>
                Work where and how you like, on a{' '}
                <strong>fully remote team</strong> spread across the country
              </li>
              <li>
                Join a <strong>diverse group of people</strong> with views
                across the political spectrum
              </li>
              <li>
                <strong>100% coverage</strong> of health, dental, and vision
                benefits for you and your dependents
              </li>
              <li>
                We encourage you to take time off to recharge and have an{' '}
                <strong>unlimited PTO</strong> (sick and vacation) policy. This
                is a marathon, not a sprint. We believe a work-life balance is
                needed to get there.
              </li>
            </ul>
          </Grid>
        </Grid>
      </Content>
    </Wrapper>
  );
}

Benefits.propTypes = {};

export default Benefits;
