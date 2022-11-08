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

const Sm = styled.div`
  font-size: 14px;
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

const Emoji = styled.span`
  font-size: 20px;
  margin-right: 6px;
`;

const CandidateProgressBar = ({
  candidate,
  peopleSoFar,
  withAchievement,
  withAnimation = true,
}) => {
  const {
    raceDate,
    votesNeeded,
    firstName,
    lastName,
    overrideFollowers,
    likelyVoters,
    didWin,
    votesReceived,
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

  const daysTillElection = daysTill(raceDate);

  let raceDone = false;
  if (raceDate) {
    if (daysTillElection < 0) {
      raceDone = true;
    }
  }

  if (raceDone && votesReceived && votesNeeded !== 0) {
    progress = (votesReceived * 100) / votesNeeded;
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

  let achievementIcon = (
    <Icon src="/images/icons/achievement.svg" alt="achievement" />
  );
  let achievementText = (
    <div>
      {firstName} {lastName} has <strong>{numberFormatter(realPerc)}%</strong>{' '}
      of the votes needed to win this race
    </div>
  );
  if (raceDone && didWin === 'Yes') {
    achievementIcon = (
      <Emoji role="img" aria-label="Party">
        🎉️
      </Emoji>
    );
    const resultPerc =
      votesNeeded && votesNeeded !== 0
        ? (votesReceived * 100) / votesNeeded
        : 0;
    achievementText = (
      <div>
        {firstName} {lastName} received{' '}
        <strong>{numberFormatter(resultPerc)}%</strong> of the votes needed and
        won this election!
      </div>
    );
  } else if (raceDone && didWin === 'No') {
    achievementIcon = (
      <Emoji role="img" aria-label="Ballot Box">
        🗳️
      </Emoji>
    );
    const resultPerc =
      votesNeeded && votesNeeded !== 0
        ? (votesReceived * 100) / votesNeeded
        : 0;
    achievementText = (
      <div>
        {firstName} {lastName} received{' '}
        <strong>{numberFormatter(resultPerc)}%</strong> of the votes needed and
        did not win this election
      </div>
    );
  } else if (raceDone) {
    achievementIcon = (
      <Emoji role="img" aria-label="Ballot Box">
        🗳️
      </Emoji>
    );
    achievementText = <div>Election ended, awaiting results...</div>;
  }
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          {raceDone && (didWin === 'Yes' || didWin === 'No') ? (
            <>
              <Number>{numberFormatter(votesReceived)}</Number>
              <Sm>votes received</Sm>
            </>
          ) : (
            <>
              <Number>{numberFormatter(people)}</Number>
              <Sm>likely voters</Sm>
            </>
          )}
        </Grid>

        <Grid item xs={4} className="text-center">
          {raceDone ? (
            <>
              {didWin === 'Yes' && (
                <div>
                  <strong>
                    <div>
                      Won{' '}
                      <span role="img" aria-label="Party">
                        🎉
                      </span>
                    </div>{' '}
                    election
                  </strong>
                </div>
              )}
              {didWin === 'No' && (
                <div>
                  <strong>
                    <div>Did not win</div> election
                  </strong>
                </div>
              )}

              {didWin !== 'Yes' && didWin !== 'No' && (
                <div>
                  <strong>
                    <div>Awaiting</div> results
                  </strong>
                </div>
              )}
            </>
          ) : (
            <>
              {daysTillElection === 0 ? (
                <Number>Election day</Number>
              ) : (
                <>
                  <Number>
                    {weeksToElection > 1 ? (
                      <>
                        {numberFormatter(weeksToElection)} week
                        {weeksToElection !== 1 ? 's' : ''}
                      </>
                    ) : (
                      <>
                        {daysTillElection} day
                        {daysTillElection !== 1 ? 's' : ''}
                      </>
                    )}
                  </Number>
                  <Sm>until election</Sm>
                </>
              )}
            </>
          )}
        </Grid>
        <Grid item xs={4} className="text-right">
          <Number>{numberFormatter(votesNeeded)}</Number>
          <Sm>votes needed</Sm>
        </Grid>
      </Grid>
      <ProgressBarWrapper data-cy="supporter-progress">
        <BarBg>
          <Bar style={{ width: `${barWidth}%`, backgroundColor: color }} />

          <Dial style={{ left: `${barWidth}%`, backgroundColor: color }}>
            <IoIosCheckmark />
          </Dial>
        </BarBg>
        {withAchievement && (
          <AchievementWrapper>
            {achievementIcon}
            {achievementText}
          </AchievementWrapper>
        )}
      </ProgressBarWrapper>
    </div>
  );
};

export default CandidateProgressBar;
