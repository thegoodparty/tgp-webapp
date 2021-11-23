/**
 *
 * CareersWrapper
 *
 */

import React from 'react';

import PropTypes from 'prop-types';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Link from 'next/link';

import PageWrapper from '../shared/PageWrapper';

import { H1, H2 } from '../shared/typogrophy';
import LeverCareers from './LeverCareers';
import Benefits from './Benefits';
import UpdatesForm from './UpdatesForm';

const HeroPurple = styled.div`
  background: linear-gradient(
      103.63deg,
      rgba(255, 15, 19, 0.15) -3.51%,
      rgba(191, 0, 32, 0) 94.72%
    ),
    #5c00c7;
`;

const Hero = styled.div`
  color: #fff;
  padding: 10px 35px;
  background: url('images/team/mobile-shadow.svg') left top no-repeat;
  background-size: 100% 100%;

  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    background: url('images/team/desktop-shadow.svg') right center no-repeat;
    background-size: contain;
    padding: 70px 35px;
  }
`;

export const MaxContent = styled.div`
  max-width: ${({ theme }) => theme.breakpointsPixels.contentMax};
  margin: 0 auto;
`;

const StyledH1 = styled(H1)`
  color: #fff;
  font-size: 40px;
  line-height: 52px;

  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    font-size: 66px;
    line-height: 82px;
  }
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

const ReverseGrid = styled(Grid)`
  flex-direction: row;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    flex-direction: row-reverse;
    align-items: center;
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

function CareersWrapper({ notificationsCallback }) {
  return (
    <PageWrapper isFullWidth white noPadding>
      <HeroPurple>
        <Hero>
          <MaxContent>
            <ReverseGrid spacing={2} container>
              <Grid item xs={12} md={6} className="text-right">
                <img src="images/team/team-heart.svg" />
              </Grid>
              <Grid item xs={12} md={6}>
                <StyledH1>Work With Us</StyledH1>
              </Grid>
            </ReverseGrid>
          </MaxContent>
        </Hero>
      </HeroPurple>
      <Content>
        <Grid spacing={2} container>
          <Grid item xs={12} md={4}>
            <StyledH2>Who Are We?</StyledH2>
          </Grid>
          <Grid item xs={12} md={8}>
            Good Party is a fully-funded startup organized as a Public Benefit
            Corporation (people and impact over revenues or profit). Our diverse{' '}
            <Link href="/team" passHref>
              <a>team</a>
            </Link>{' '}
            is 100% remote coming from all across the political spectrum and
            country. We work hard and care about each other’s well being.
            <br />
            <br />
            If fixing politics for good sounds like a challenge you’re up for,
            check out the roles we’re looking to fill right now!
          </Grid>
        </Grid>
      </Content>
      <LeverCareers />
      <Benefits />
      <UpdatesForm notificationsCallback={notificationsCallback} />
    </PageWrapper>
  );
}

CareersWrapper.propTypes = {
  notificationsCallback: PropTypes.func,
};

export default CareersWrapper;
