/**
 *
 * TeamWrapper
 *
 */

import React from 'react';
import PageWrapper from '../shared/PageWrapper';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';

import { H1, H2 } from '../shared/typogrophy';
import TeamSection from './TeamSection';
import VolunteersSection from './VolunteersSection';

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
  padding: 70px 35px;
  background: url('images/team/mobile-shadow.svg') center top no-repeat;
  background-size: contain;

  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    background: url('images/team/desktop-shadow.svg') right center no-repeat;
    background-size: contain;
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
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    font-size: 48px;
    line-height: 62px;
  }
`;

function TeamWrapper() {
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
                <StyledH1>Meet the Good Party Team</StyledH1>
              </Grid>
            </ReverseGrid>
          </MaxContent>
        </Hero>
      </HeroPurple>
      <Content>
        <Grid spacing={2} container>
          <Grid item xs={12} md={4}>
            <StyledH2>Team</StyledH2>
          </Grid>
          <Grid item xs={12} md={8}>
            Good Party’s core team are the people working full-time, part-time,
            or as dedicated volunteer contributors on our mission of making
            people matter more than money in our democracy.
            <br />
            <br />
            If you agree that fixing democracy so it creates rules that work for
            people, not for money, is the problem that must be solved to make
            all other problems solvable, please consider joining us!
          </Grid>
        </Grid>
      </Content>
      <TeamSection />
      <VolunteersSection />
    </PageWrapper>
  );
}

TeamWrapper.propTypes = {};

export default TeamWrapper;
