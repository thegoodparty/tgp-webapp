import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { Body9, Body11 } from 'components/shared/typogrophy';
import { numberFormatter } from 'helpers/numberHelper';
import { achievementsHelper } from 'helpers/achievementsHelper';

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
  width: 80%;
  position: relative;
  height: 18px;
  background-color: ${({ theme }) => theme.colors.grayC};
  border-radius: 12px;

  &.full-width {
    width: 100%;
  }
`;

const Bar = styled.div`
  position: absolute;
  height: 18px;
  border-radius: 12px;

  background-color: ${({ theme }) => theme.colors.purple};
  left: 0;
  width: 3%;
  transition: width 0.5s;
`;

const BarBody11 = styled(Body11)`
  color: ${({ theme }) => theme.colors.gray7};
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
  font-size: 13px;
  line-height: 18px;
  color: ${({ theme }) => theme.colors.gray4};
  padding-left: 8px;
`;

const Icon = styled.img`
  width: 32px;
  height: 32px;
  margin-right: 8px;
`;

const SupportersProgressBar = ({
  peopleSoFar,
  votesNeeded,
  userState,
  showSupporters = true,
  alignLeft = false,
  suffixText,
  prefixText = 'likely voters for top candidate',
  showSuffix = true,
  fullWidth = false,
  withAchievement = false,
}) => {
  let progress = 0;
  if (peopleSoFar && votesNeeded) {
    progress = (peopleSoFar * 100) / votesNeeded;
  }
  if (progress > 100) {
    progress = 100;
  }
  const achievements = achievementsHelper(peopleSoFar);
  return (
    <ProgressBarWrapper
      className={alignLeft ? 'left' : ''}
      data-cy="supporter-progress"
    >
      {showSupporters && (
        <BarBody11 data-cy="people-so-far">
          {numberFormatter(peopleSoFar)} {prefixText}
        </BarBody11>
      )}
      <BarBg className={`bar-bg ${fullWidth && 'full-width'}`}>
        <Bar style={{ width: `${progress}%` }} />
      </BarBg>
      {showSuffix && (
        <BarBody9 data-cy="votes-needed">
          {`${progress.toFixed(2)}% of `}
          <strong>{numberFormatter(votesNeeded)}</strong> votes needed to win
          {userState && <> IN {userState.toUpperCase()}</>}
          {suffixText}
        </BarBody9>
      )}
      {withAchievement && (
        <AchievementWrapper>
          <Icon src="/images/icons/achievement.svg" alt="achievement" />
          <div>{achievements.text}</div>
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
