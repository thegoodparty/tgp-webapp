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
`;

const ButtonWrapper = styled.div`
  margin-top: 30px;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    display: none;
  }
`;

function SocialStats() {
  const { supportCount, candidate } = useContext(CandidateContext);
  const achievements = achievementsHelper(supportCount);
  const { color, likelyVoters, votesNeeded } = candidate;
  const brightColor = color?.color ? color.color : '#000';

  return (
    <Wrapper>
      <Inner>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <Number>174</Number>
            total followers
          </Grid>
          <Grid item xs={4}>
            <Number>174</Number>
            from last week
          </Grid>
          <Grid item xs={4}>
            <Number>35 days</Number>
            until election
          </Grid>
        </Grid>
        <SupportersProgressBar
          showSupporters={false}
          votesNeeded={achievements.nextStep}
          peopleSoFar={supportCount}
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
