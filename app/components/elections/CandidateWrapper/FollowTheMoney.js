import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Body13, Body, Body11 } from 'components/shared/typogrophy';

import moneyHelper from 'helpers/moneyHelper';
import { percHelper, numberFormatter } from 'helpers/numberHelper';
import {
  getComparedIncumbent,
  getCombinedReportDate,
} from 'helpers/candidatesHelper';
import { Body9 } from '../../shared/typogrophy';

const FollowWrapper = styled.div`
  margin-top: 24px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const FundsWrapper = styled.div`
  margin-top: 24px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
`;

const Fund = styled.div`
  text-align: center;
  margin: 0 4px;
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin: 0 10px;
  }
`;

const ColoredBodyText = styled(Body13)`
  color: ${({ theme }) => theme.colors.red};
  font-weight: 700;

  &.green {
    color: ${({ theme }) => theme.colors.green};
  }

  &.gray {
    color: ${({ theme }) => theme.colors.gray4};
  }
  font-size: 9px;

  @media only screen and (min-width: 375px) {
    font-size: 11px;
  }

  @media only screen and (min-width: 600px) {
    font-size: 16px;
  }
`;

const SmallBr = styled.span`
  display: block;
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: inline;
  }
`;

const StyledBody9 = styled(Body9)`
  color: ${({ theme }) => theme.colors.gray4};
`;

const FollowTheMoney = ({ candidate, incumbent }) => {
  const [comparedIncumbent, setComparedIncumbent] = useState({});
  let isGood;
  if (candidate) {
    ({ isGood } = candidate);
  }

  useEffect(() => {
    if (incumbent) {
      setComparedIncumbent(getComparedIncumbent(totalRaised, incumbent));
    } else {
      setComparedIncumbent({});
    }
  }, [incumbent]);

  const {
    totalRaised,
    smallDonorPerc,
    largeDonorPerc,
    smallDonorPerHour,
    largeDonorPerHour,
    isIncumbent,
    outsideReportDate,
    reportDate,
    isBigMoney,
  } = candidate;

  const isUnkown = isGood === null;
  const isGoodOrUnkwown = isGood || isUnkown;

  const color = isGoodOrUnkwown ? 'green' : 'red';
  const colorWithGray = isGoodOrUnkwown ? 'green' : isBigMoney ? 'red' : 'gray';
  const perc = isGoodOrUnkwown
    ? percHelper(smallDonorPerc, true)
    : percHelper(largeDonorPerc, true);
  const perHour = isGoodOrUnkwown
    ? moneyHelper(smallDonorPerHour)
    : moneyHelper(largeDonorPerHour);

  const combinedReportDate = getCombinedReportDate(
    { reportDate, outsideReportDate },
    incumbent,
  );

  const isSameAsComparedIncumbent = comparedIncumbent.name === candidate.name;

  const firstFund = () => (
    <Fund data-cy="total-fund">
      <ColoredBodyText
        className={!isBigMoney && isGoodOrUnkwown ? 'green' : 'gray'}
      >
        {moneyHelper(totalRaised)}
      </ColoredBodyText>
      <StyledBody9>TOTAL FUNDS RAISED</StyledBody9>
    </Fund>
  );
  const secondFund = () => {
    if (isGoodOrUnkwown) {
      if (isIncumbent || isBigMoney || perc > 50) {
        return (
          <Fund data-cy="fund">
            <ColoredBodyText className="green">{perc}%</ColoredBodyText>
            <StyledBody9>FROM SMALL INDIV DONORS &lt;$200</StyledBody9>
          </Fund>
        );
      }
      return (
        <Fund data-cy="fund">
          <ColoredBodyText className="green">
            {comparedIncumbent.relativePerc}%
          </ColoredBodyText>
          <StyledBody9>
            FUNDING RELATIVE TO{' '}
            {comparedIncumbent.isFakeIncumbent
              ? 'BIG MONEY CANDIDATE'
              : 'INCUMBENT'}
          </StyledBody9>
        </Fund>
      );
    }
    // NOT GOOD ENOUGH
    return (
      <Fund data-cy="fund">
        <ColoredBodyText className={colorWithGray}>{perc}%</ColoredBodyText>
        <StyledBody9>FROM BIG MONEY SOURCES</StyledBody9>
      </Fund>
    );
  };

  const thirdFund = () => {
    if (isGoodOrUnkwown) {
      if (isIncumbent || isSameAsComparedIncumbent) {
        return (
          <Fund data-cy="fund-disadvantage">
            <ColoredBodyText className="gray">N/A</ColoredBodyText>
            <StyledBody9>FUNDING DISADVANTAGE</StyledBody9>
          </Fund>
        );
      }
      // NON INCUMBENT GOOD OR UNKNOWN
      return (
        <Fund data-cy="fund-disadvantage">
          <ColoredBodyText className="green">
            {numberFormatter(comparedIncumbent.xTimes)}x
          </ColoredBodyText>
          <StyledBody9>FUNDING DISADVANTAGE</StyledBody9>
        </Fund>
      );
    }
    // NOT GOOD ENOUGH
    return (
      <Fund data-cy="fund-disadvantage">
        <ColoredBodyText className={color}>{perHour}/hr</ColoredBodyText>
        <StyledBody9>
          BIG MONEY
          <SmallBr /> FUNDING RATE
        </StyledBody9>
      </Fund>
    );
  };

  return (
    <>
      <FollowWrapper data-cy="follow-wrapper">
        <Body className="bold600">Follow the Money</Body>
        <Body11 style={{ marginLeft: '5px' }}>
          (FEC DATA as of {combinedReportDate})
        </Body11>
      </FollowWrapper>
      <FundsWrapper>
        {firstFund()}
        {secondFund()}
        {thirdFund()}
      </FundsWrapper>
    </>
  );
};

FollowTheMoney.propTypes = {
  candidate: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  incumbent: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

export default FollowTheMoney;
