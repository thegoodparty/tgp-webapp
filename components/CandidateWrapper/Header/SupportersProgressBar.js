import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { Body9, Body11 } from '/components/shared/typogrophy';
import { numberFormatter } from '/helpers/numberHelper';
import { achievementsHelper } from '/helpers/achievementsHelper';

const ProgressBarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  &.left {
    align-items: flex-start;
  }
`;

const BarBg = styled.div`
  margin: 10px 0;
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
  transition: width 0.5s;
`;

const BarBody9 = styled(Body9)`
  color: ${({ theme }) => theme.colors.gray7};
  align-self: flex-start;
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
  position: absolute;
  width: 100%;
  height: 22px;
  text-align: right;
  font-size: 14px;
  font-weight: 700;
  padding: 0 8px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const SupportersProgressBar = ({
  peopleSoFar,
  votesNeeded,
  peopleThisPeriod,
  days,
  color = '#000',
  withAchievement = true,
}) => {
  const weeksToElection = Math.floor(days / 7);
  let neededToWin = votesNeeded - peopleSoFar;
  if (neededToWin < 0) {
    neededToWin = 0;
  }
  let neededPerWeek;
  let neededThisWeek;
  let progress;
  if (days) {
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

  return (
    <ProgressBarWrapper data-cy="supporter-progress">
      <BarBg>
        <Bar style={{ width: `${progress}%`, backgroundColor: color }} />
        {neededPerWeek !== 0 && <Total>{numberFormatter(neededPerWeek)}</Total>}
      </BarBg>
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
              This candidate has a good chance of <strong>winning</strong>. Keep
              the momentum going!
            </div>
          )}
        </AchievementWrapper>
      )}
    </ProgressBarWrapper>
  );
};

SupportersProgressBar.propTypes = {
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

export default SupportersProgressBar;
