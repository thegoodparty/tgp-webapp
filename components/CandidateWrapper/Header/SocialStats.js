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
  const { openFollowModalCallback } = useContext(CandidateWrapperContext);
  let thisWeek = 0;
  let lastWeek = 0;
  if (followers) {
    thisWeek = followers.thisWeek;
    lastWeek = followers.lastWeek;
  }
  const { raceDate, votesNeeded } = candidate;
  const brightColor = candidateColor(candidate);
  const days = daysTill(raceDate);

  const diff = thisWeek - lastWeek || 0;

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
          <BlackButton
            fullWidth
            style={{
              backgroundColor: brightColor,
              borderColor: brightColor,
            }}
            onClick={openFollowModalCallback}
            dataCy="candidate-follow-btn"
          >
            <InnerButton>FOLLOW</InnerButton>
          </BlackButton>
        </ButtonWrapper>
      </Inner>
    </Wrapper>
  );
}

export default SocialStats;
