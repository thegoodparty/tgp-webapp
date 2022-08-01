/**
 *
 * SocialStats
 *
 */

import React, { useContext } from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';

import { CandidateContext } from '/containers/CandidatePage';
import SupportersProgressBar from './SupportersProgressBar';
import BlackButton, { InnerButton } from '../../shared/buttons/BlackButton';
import { numberFormatter } from '/helpers/numberHelper';
import { daysTill } from '/helpers/dateHelper';
import { candidateColor } from '../../../helpers/candidatesHelper';
import { CandidateWrapperContext } from '../index';

const Wrapper = styled.div`
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    display: flex;
    justify-content: flex-end;
  }
`;

const Inner = styled.div`
  font-size: 14px;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    width: 500px;
    font-size: 20px;
  }
`;

const Number = styled.div`
  font-size: 17px;
  font-weight: 900;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    font-size: 20px;
  }

  &.positive {
    color: #0c9a00;
  }
`;

const ButtonWrapper = styled.div`
  margin-top: 30px;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    display: none;
  }
`;

function SocialStats() {
  const { candidate, followers } = useContext(CandidateContext);
  const { openFollowModalCallback } = useContext(CandidateWrapperContext);
  let thisWeek = 0;
  let lastWeek = 0;
  if (followers) {
    thisWeek = followers.thisWeek;
    lastWeek = followers.lastWeek;
  }
  const { color, raceDate, votesNeeded } = candidate;
  const brightColor = candidateColor(candidate);
  const days = daysTill(raceDate);

  const diff = thisWeek - lastWeek;

  return (
    <Wrapper>
      <Inner>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <Number>{numberFormatter(thisWeek)}</Number>
            total followers
          </Grid>
          <Grid item xs={4}>
            <Number className={diff > 0 && 'positive'}>
              {diff > 0 && '+'}
              {numberFormatter(diff)}
            </Number>
            from last week
          </Grid>
          <Grid item xs={4}>
            <Number>
              {numberFormatter(days)} day{days !== 1 ? 's' : ''}
            </Number>
            until election
          </Grid>
        </Grid>
        <SupportersProgressBar
          votesNeeded={votesNeeded}
          peopleSoFar={thisWeek}
          peopleThisPeriod={diff}
          color={brightColor}
          days={days}
        />

        <ButtonWrapper>
          <BlackButton
            fullWidth
            style={{
              backgroundColor: brightColor,
              borderColor: brightColor,
            }}
            onClick={openFollowModalCallback}
          >
            <InnerButton>FOLLOW</InnerButton>
          </BlackButton>
        </ButtonWrapper>
      </Inner>
    </Wrapper>
  );
}

export default SocialStats;
