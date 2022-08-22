import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { IoIosCheckmark } from 'react-icons/io';

import { numberFormatter } from '/helpers/numberHelper';

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
  peopleSoFar,
  votesNeeded,
  peopleThisPeriod,
  days,
  color = '#000',
  withAchievement = true,
  withAnimation = true,
}) => {
  const [barWidth, setBarWidth] = useState(0);
  const [peopleThisWeek, setPeopleThisWeek] = useState(0);
  const weeksToElection = Math.ceil(days / 7);
  let neededToWin = votesNeeded - peopleSoFar;
  if (neededToWin < 0) {
    neededToWin = 0;
  }
  let neededPerWeek;
  let neededThisWeek;
  let progress = 0;
  if (days && days > 0) {
    if (weeksToElection && weeksToElection !== 0) {
      neededPerWeek = Math.floor(neededToWin / weeksToElection);
    }
    neededThisWeek = neededPerWeek - peopleThisPeriod;
  } else {
    neededPerWeek = votesNeeded;
    neededThisWeek = votesNeeded;
    peopleThisPeriod = peopleSoFar;
  }

  if (neededThisWeek <= 0) {
    progress = 100;
  } else {
    progress = (peopleThisPeriod * 100) / neededPerWeek;
  }
  if (days < 0) {
    neededPerWeek = votesNeeded;
    progress = (peopleSoFar * 100) / votesNeeded;
  }

  if (progress > 100) {
    progress = 100;
  }

  progress = progress / 2 + 50;
  if (!progress) {
    progress = 50;
  }
  if (progress < 0) {
    progress = 0;
  }

  useEffect(() => {
    if (withAnimation) {
      setTimeout(() => {
        setBarWidth(50);
      }, 100);

      setTimeout(() => {
        setBarWidth(progress);
        if (peopleThisPeriod > 0) {
          const interval = 1000 / peopleThisPeriod;
          let newValue = 0;
          const intervalId = setInterval(() => {
            if (newValue >= peopleThisPeriod) {
              setPeopleThisWeek(peopleThisPeriod);
              clearInterval(intervalId);
            } else {
              newValue = newValue + 1;
              setPeopleThisWeek(newValue);
            }
          }, interval);
        } else {
          setPeopleThisWeek(peopleThisPeriod);
        }
      }, 2000);
    } else {
      setBarWidth(progress);
      setPeopleThisWeek(peopleThisPeriod);
    }
  }, []);

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <Number>{numberFormatter(peopleSoFar)}</Number>
          total followers
        </Grid>
        <Grid item xs={4} className="text-center">
          <Number className={peopleThisPeriod > 0 && 'positive'}>
            {peopleThisPeriod > 0 && '+'}
            {numberFormatter(peopleThisWeek)}
          </Number>
          this week
        </Grid>
        <Grid item xs={4} className="text-right">
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
        {neededPerWeek !== 0 && <Total>{numberFormatter(neededPerWeek)}</Total>}
        {withAchievement && days > 0 && (
          <AchievementWrapper>
            <Icon src="/images/icons/achievement.svg" alt="achievement" />
            {progress < 100 ? (
              <div>
                If we can get to{' '}
                <strong>
                  {numberFormatter(neededPerWeek)} followers this week
                </strong>
                , we’ll be on track to win on election day!
              </div>
            ) : (
              <div>
                This candidate has a good chance of <strong>winning</strong>.
                Keep the momentum going!
              </div>
            )}
          </AchievementWrapper>
        )}
      </ProgressBarWrapper>
    </div>
  );
};

CandidateProgressBar.propTypes = {
  peopleSoFar: PropTypes.number,
  votesNeeded: PropTypes.number,
  showSupporters: PropTypes.bool,
  alignLeft: PropTypes.bool,
  showSuffix: PropTypes.bool,
  userState: PropTypes.string,
  prefixText: PropTypes.string,
  suffixText: PropTypes.string,
  withAchievement: PropTypes.bool,
  fullWidth: PropTypes.bool,
};

export default CandidateProgressBar;
