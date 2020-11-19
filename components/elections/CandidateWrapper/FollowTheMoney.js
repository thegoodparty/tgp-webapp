import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Body13, Body, Body11, Body9 } from 'components/shared/typogrophy';

import moneyHelper from 'helpers/moneyHelper';
import { percHelper, numberFormatter } from 'helpers/numberHelper';
import {
  getComparedIncumbent,
  getCombinedReportDate,
} from 'helpers/candidatesHelper';

const FollowWrapper = styled.div`
  margin-top: 64px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const FundsWrapper = styled.div`
  margin: 32px 0;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;

  &.vertical {
    flex-direction: column;
    justify-content: flex-start;

    &.notgood {
      align-items: flex-end;
    }
  }
`;

const Fund = styled.div`
  text-align: center;
  margin: 0 4px;
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin: 0 10px;
  }

  &.vertical {
    text-align: left;
    margin: 16px 10px;
    color: ${({ theme }) => theme.colors.gray7};

    &.notgood {
      text-align: right;
    }
    .light-gray {
      color: ${({ theme }) => theme.colors.gray7};
    }
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

const FollowTheMoney = ({ candidate, incumbent, layout = 'horizontal' }) => {
  const [comparedIncumbent, setComparedIncumbent] = useState({});
  let isGood;
  if (candidate) {
    ({ isGood } = candidate);
  }

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

  useEffect(() => {
    if (incumbent) {
      setComparedIncumbent(getComparedIncumbent(totalRaised, incumbent));
    } else {
      setComparedIncumbent({});
    }
  }, [incumbent]);

  const isUnkown = isGood === null;
  const isGoodOrUnkwown = isGood || isUnkown;

  const color = isGoodOrUnkwown ? 'green' : 'red';
  const perc = isGoodOrUnkwown
    ? percHelper(smallDonorPerc, true)
    : percHelper(largeDonorPerc, true);
  const perHour = isGoodOrUnkwown
    ? moneyHelper(smallDonorPerHour)
    : moneyHelper(largeDonorPerHour);
  if (!isGoodOrUnkwown) {
  }

  const combinedReportDate = getCombinedReportDate(
    { reportDate, outsideReportDate },
    incumbent,
  );

  const isSameAsComparedIncumbent = comparedIncumbent.name === candidate.name;

  const firstFund = () => (
    <Fund
      data-cy="total-fund"
      className={`${layout} ${!isGoodOrUnkwown ? ' notgood' : ''}`}
    >
      <ColoredBodyText
        className={!isBigMoney && isGoodOrUnkwown ? 'green' : 'gray'}
      >
        {moneyHelper(totalRaised)}
      </ColoredBodyText>
      <StyledBody9 className="light-gray">TOTAL FUNDS RAISED</StyledBody9>
    </Fund>
  );
  const secondFund = () => {
    if (isGoodOrUnkwown) {
      if (isIncumbent || isBigMoney || perc > 50) {
        return (
          <Fund
            data-cy="fund"
            className={`${layout} ${!isGoodOrUnkwown ? ' notgood' : ''}`}
          >
            <ColoredBodyText className="green">{perc}%</ColoredBodyText>
            <StyledBody9 className="light-gray">
              FROM SMALL INDIV DONORS &lt;$200
            </StyledBody9>
          </Fund>
        );
      }
      return (
        <Fund
          data-cy="fund"
          className={`${layout} ${!isGoodOrUnkwown ? ' notgood' : ''}`}
        >
          <ColoredBodyText className="green">
            {comparedIncumbent.relativePerc}%
          </ColoredBodyText>
          <StyledBody9 className="light-gray">
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
      <Fund
        data-cy="fund"
        className={`${layout} ${!isGoodOrUnkwown ? ' notgood' : ''}`}
      >
        <ColoredBodyText className={color}>{perc}%</ColoredBodyText>
        <StyledBody9 className="light-gray">FROM BIG MONEY SOURCES</StyledBody9>
      </Fund>
    );
  };

  const thirdFund = () => {
    if (isGoodOrUnkwown) {
      if (isIncumbent || isSameAsComparedIncumbent) {
        return (
          <Fund
            data-cy="fund-disadvantage"
            className={`${layout} ${!isGoodOrUnkwown ? ' notgood' : ''}`}
          >
            <ColoredBodyText className="gray">N/A</ColoredBodyText>
            <StyledBody9 className="light-gray">
              FUNDING DISADVANTAGE
            </StyledBody9>
          </Fund>
        );
      }
      // NON INCUMBENT GOOD OR UNKNOWN
      return (
        <Fund
          data-cy="fund-disadvantage"
          className={`${layout} ${!isGoodOrUnkwown ? ' notgood' : ''}`}
        >
          <ColoredBodyText className="green">
            {numberFormatter(comparedIncumbent.xTimes)}x
          </ColoredBodyText>
          <StyledBody9 className="light-gray">FUNDING DISADVANTAGE</StyledBody9>
        </Fund>
      );
    }
    // NOT GOOD ENOUGH
    return (
      <Fund
        data-cy="fund-disadvantage"
        className={`${layout} ${!isGoodOrUnkwown ? ' notgood' : ''}`}
      >
        <ColoredBodyText className={color}>{perHour}/hr</ColoredBodyText>
        <StyledBody9 className="light-gray">
          BIG MONEY
          <SmallBr /> FUNDING RATE
        </StyledBody9>
      </Fund>
    );
  };

  return (
    <>
      {layout === 'horizontal' && (
        <FollowWrapper data-cy="follow-wrapper">
          <Body className="bold600">Follow the Money</Body>
          <Body11 style={{ marginLeft: '5px' }}>
            (FEC DATA as of {combinedReportDate})
          </Body11>
        </FollowWrapper>
      )}
      <FundsWrapper
        className={`${layout} ${!isGoodOrUnkwown ? ' notgood' : ''}`}
      >
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
  layout: PropTypes.string,
};

export default FollowTheMoney;
