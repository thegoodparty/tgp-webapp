import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Link from 'next/link';

import { Body9, Body11, Body13 } from 'components/shared/typogrophy';
import { numberFormatter } from 'helpers/numberHelper';

const ProgressBarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 4px;

  &.left {
    align-items: flex-start;
  }
`;

const BarBg = styled.div`
  margin: 10px 0;
  width: 80%;
  position: relative;
  height: 2px;
  background-color: ${({ theme }) => theme.colors.grayC};
  border-radius: 3px;

  &.full-width {
    width: 100%;
  }
`;

const Bar = styled.div`
  position: absolute;
  height: 6px;
  border-radius: 3px;
  background-color: ${({ theme }) => theme.colors.green};
  left: 0;
  top: -2px;
  width: 3%;
  transition: width 0.5s;
`;

const BarBody11 = styled(Body11)`
  color: ${({ theme }) => theme.colors.gray7};
`;

const BarBody9 = styled(Body9)`
  color: ${({ theme }) => theme.colors.gray7};
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
}) => {
  let progress = 3;
  if (peopleSoFar && votesNeeded) {
    progress = 3 + (peopleSoFar * 100) / votesNeeded;
  }
  if (progress > 100) {
    progress = 100;
  }
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
          {numberFormatter(votesNeeded)} VOTES NEEDED TO WIN
          {userState && <> IN {userState.toUpperCase()}</>}
          {suffixText}
        </BarBody9>
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
};

export default SupportersProgressBar;
