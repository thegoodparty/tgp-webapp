import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { IoIosCheckmark } from 'react-icons/io';

import { numberFormatter } from '/helpers/numberHelper';
import { candidateColor } from '../../helpers/candidatesHelper';
import { daysTill } from '../../helpers/dateHelper';

const ProgressBarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  &.left {
    align-items: flex-start;
  }
`;

const BarBg = styled.div`
  margin: 10px 0 4px;
  position: relative;
  height: 22px;
  background-color: #f0f0f0;
  border-radius: 22px;
  width: 100%;
`;

const Bar = styled.div`
  position: absolute;
  height: 22px;
  border-radius: 22px;

  background-color: #000;
  left: 0;
  width: 3%;
  transition: width 1s;
`;

const AchievementWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  text-align: left;
  width: 100%;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.gray4};
  padding-left: 8px;
  margin-top: 12px;
`;

const Icon = styled.img`
  width: 32px;
  height: 32px;
  margin-right: 8px;
`;

const Total = styled.div`
  width: 100%;
  text-align: right;
  font-size: 13px;
  padding: 0 8px;
`;

const Number = styled.div`
  font-size: 17px;
  font-weight: 900;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    font-size: 19px;
  }

  &.positive {
    color: ${({ theme }) => theme.colors.green};
  }
`;

const Dial = styled.div`
  position: absolute;
  font-size: 36px;
  margin-left: -16px;
  top: -4px;
  z-index: 11;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  border: solid 1px #fff;
  transition: left 1s;
`;

const CandidateProgressBar = ({
  candidate,
  peopleSoFar,
  withAchievement = true,
  withAnimation = true,
}) => {
  const {
    raceDate,
    votesNeeded,
    firstName,
    lastName,
    overrideFollowers,
    likelyVoters,
  } = candidate;
  let people = overrideFollowers ? likelyVoters : peopleSoFar;
  const color = candidateColor(candidate);
  const days = daysTill(raceDate);

  const [barWidth, setBarWidth] = useState(0);
  const [isRendered, setIsRendered] = useState(false);
  const weeksToElection = Math.ceil(days / 7);

  let progress = 0;
  let realPerc = 0;
  if (votesNeeded && votesNeeded !== 0) {
    progress = Math.floor((100 * people) / votesNeeded);
    realPerc = Math.floor((100 * people) / votesNeeded);
  }

  if (!progress) {
    progress = 50;
  } else if (progress > 100) {
    progress = 100;
  } else if (progress < 50) {
    progress = 50;
  }

  useEffect(() => {
    if (withAnimation && !isRendered) {
      setTimeout(() => {
        setBarWidth(50);
      }, 100);

      setTimeout(() => {
        setBarWidth(progress);
      }, 2000);
    } else {
      setBarWidth(progress);
    }
    setIsRendered(true);
  }, [votesNeeded]);

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Number>{numberFormatter(people)}</Number>
          likely voters
        </Grid>

        <Grid item xs={6} className="text-right">
          {weeksToElection > 0 ? (
            <>
              <Number>
                {numberFormatter(weeksToElection)} week
                {weeksToElection !== 1 ? 's' : ''}
              </Number>
              until election
            </>
          ) : (
            <>
              <br />
              election ended
            </>
          )}
        </Grid>
      </Grid>
      <ProgressBarWrapper data-cy="supporter-progress">
        <BarBg>
          <Bar style={{ width: `${barWidth}%`, backgroundColor: color }} />

          <Dial style={{ left: `${barWidth}%`, backgroundColor: color }}>
            <IoIosCheckmark />
          </Dial>
        </BarBg>
        <Total>{numberFormatter(votesNeeded)}</Total>
        {withAchievement && days > 0 && (
          <AchievementWrapper>
            <Icon src="/images/icons/achievement.svg" alt="achievement" />
            <div>
              {firstName} {lastName} has {numberFormatter(realPerc)}% of the
              votes needed to win this race
            </div>
          </AchievementWrapper>
        )}
      </ProgressBarWrapper>
    </div>
  );
};



export default CandidateProgressBar;
