/**
 *
 * SocialStats
 *
 */

import React, { useContext } from 'react';
import styled from 'styled-components';

import { CandidateContext } from '/containers/CandidatePage';
import BlackButton, {
  InnerButton,
} from '/components/shared/buttons/BlackButton';
import { daysTill } from '/helpers/dateHelper';
import { candidateColor } from '/helpers/candidatesHelper';
import CandidateProgressBar from '/components/shared/CandidateProgressBar';
import { CandidateWrapperContext } from '../index';
import FollowButtonContainer from '../../../containers/shared/FollowButtonContainer';

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

const ButtonWrapper = styled.div`
  margin-top: 30px;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    display: none;
  }
`;

function SocialStats() {
  const { candidate, followers } = useContext(CandidateContext);
  const { offsetFollow } = useContext(CandidateWrapperContext);

  console.log('offsetFollow',offsetFollow)
  let thisWeek = offsetFollow;
  let lastWeek = 0;
  if (followers) {
    thisWeek = followers.thisWeek + offsetFollow;
    lastWeek = followers.lastWeek;
  }
  const { raceDate, votesNeeded } = candidate;
  const brightColor = candidateColor(candidate);
  const days = daysTill(raceDate);

  const diff = thisWeek - lastWeek || 0;
  console.log('diff', diff)

  return (
    <Wrapper>
      <Inner>
        <CandidateProgressBar
          votesNeeded={votesNeeded}
          peopleSoFar={thisWeek || 0}
          peopleThisPeriod={diff}
          color={brightColor}
          days={days}
        />

        <ButtonWrapper>
          <FollowButtonContainer candidate={candidate} fullWidth />
        </ButtonWrapper>
      </Inner>
    </Wrapper>
  );
}

export default SocialStats;
