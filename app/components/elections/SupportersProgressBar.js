import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

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
  height: 5px;
  background-color: ${({ theme }) => theme.colors.grayC};
  border-radius: 3px;
  overflow: hidden;
`;

const Bar = styled.div`
  position: absolute;
  height: 5px;
  border-radius: 3px;
  background-color: ${({ theme }) => theme.colors.blue};
  left: 0;
  top: 0;
  width: 0;
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
  showSupporters = true,
  alignLeft = false,
}) => {
  const progress = (peopleSoFar * 100) / votesNeeded;
  return (
    <ProgressBarWrapper className={alignLeft ? 'left' : ''}>
      {showSupporters && (
        <BarBody11>
          {numberFormatter(peopleSoFar)}{' '}
          {peopleSoFar === 1 ? 'person ' : 'people '}
          in voting bloc so far
        </BarBody11>
      )}
      <BarBg>
        <Bar style={{ width: `${progress}%` }} />
      </BarBg>
      <BarBody9>{numberFormatter(votesNeeded)} VOTES NEEDED TO WIN!</BarBody9>
    </ProgressBarWrapper>
  );
};

SupportersProgressBar.propTypes = {
  peopleSoFar: PropTypes.number,
  votesNeeded: PropTypes.number,
  showSupporters: PropTypes.bool,
};

export default SupportersProgressBar;
