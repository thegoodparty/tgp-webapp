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

  &.left {
    align-items: flex-start;
  }
`;

const BarBg = styled.div`
  margin: 10px 0;
  width: 80%;
  position: relative;
  height: 12px;
  background-color: ${({ theme }) => theme.colors.grayC};

  // border-radius: 3px;
  border-radius: 12px;

  &.full-width {
    width: 100%;
  }
`;

const Bar = styled.div`
  position: absolute;
  height: 12px;
  // border-radius: 3px;
  border-radius: 12px;

  // background-color: ${({ theme }) => theme.colors.green};
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
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    // align-self: center;
  }
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
  let progress = 0;
  if (peopleSoFar && votesNeeded) {
    progress = (peopleSoFar * 100) / votesNeeded;
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
          {`${progress.toFixed(2)}% of `}
          <strong>{numberFormatter(votesNeeded)}</strong> votes needed to win
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
