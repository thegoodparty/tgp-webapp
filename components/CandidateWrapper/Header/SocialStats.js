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
import { achievementsHelper } from '../../../helpers/achievementsHelper';
import BlackButton, { InnerButton } from '../../shared/buttons/BlackButton';
import { numberFormatter } from '../../../helpers/numberHelper';
import { daysTill } from '../../../helpers/dateHelper';

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
  const { supportCount, candidate, followers } = useContext(CandidateContext);
  const achievements = achievementsHelper(followers?.thisWeek);
  const { color, raceDate } = candidate;
  const brightColor = color?.color ? color.color : '#000';
  const days = daysTill(raceDate);

  const diff = followers?.thisWeek - followers?.lastWeek;

  return (
    <Wrapper>
      <Inner>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <Number>{numberFormatter(followers?.thisWeek)}</Number>
            total followers
          </Grid>
          <Grid item xs={4}>
            <Number className={diff > 0 && 'positive'}>
              {diff > 0 && '+'}
              {diff < 0 && '-'}
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
          showSupporters={false}
          votesNeeded={achievements.nextStep}
          peopleSoFar={followers?.thisWeek}
          fullWidth
          showSuffix={false}
          withAchievement
          color={brightColor}
        />

        <ButtonWrapper>
          <BlackButton
            fullWidth
            style={{
              backgroundColor: brightColor,
              borderColor: brightColor,
            }}
          >
            <InnerButton>FOLLOW</InnerButton>
          </BlackButton>
        </ButtonWrapper>
      </Inner>
    </Wrapper>
  );
}

export default SocialStats;
