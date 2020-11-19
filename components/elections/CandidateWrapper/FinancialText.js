import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Body13, Body9 } from 'components/shared/typogrophy';

import moneyHelper from 'helpers/moneyHelper';
import { percHelper, numberFormatter } from 'helpers/numberHelper';
import {
  getComparedIncumbent,
  getCombinedReportDate,
  getFakeIncumbentOrIncumbentLabel,
  getOpenSecretLink,
} from 'helpers/candidatesHelper';

const ReportError = styled(Body9)`
  color: ${({ theme }) => theme.colors.gray7};
  text-transform: uppercase;
`;

const OpenSecretsLink = styled(Body9)`
  margin: 16px 0;
  color: ${({ theme }) => theme.colors.gray7};
`;

const ColoredText = styled.span`
  color: ${({ theme }) => theme.colors.red};
  &.green {
    color: ${({ theme }) => theme.colors.green};
  }
  &.gray {
    color: ${({ theme }) => theme.colors.gray4};
  }
`;

const FinancialText = ({ candidate, chamberName, incumbent }) => {
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
    name,
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

  const nameArr = name ? name.split(' ') : [];
  let lastName = name ? nameArr[nameArr.length - 1] : '';
  if ((lastName === 'Jr.' || lastName === 'Sr.') && nameArr.length > 2) {
    lastName = nameArr[nameArr.length - 2];
  }

  const openSecretLink = getOpenSecretLink(chamberName, candidate);
  const combinedReportDate = getCombinedReportDate(
    { reportDate, outsideReportDate },
    incumbent,
  );

  const bigMoneyFunds = candidate ? totalRaised * largeDonorPerc : 0;
  const smallMoneyFunds = totalRaised - bigMoneyFunds;
  const isSameAsComparedIncumbent = comparedIncumbent.name === candidate.name;
  const fakeIncumbentOrIncumbentLabel = getFakeIncumbentOrIncumbentLabel(
    comparedIncumbent.isFakeIncumbent,
  );

  const comparedIncumbentText = () => {
    if (!isIncumbent && !isBigMoney && !isSameAsComparedIncumbent) {
      return (
        <>
          <br />
          <br />
          <strong>
            The {fakeIncumbentOrIncumbentLabel}, {comparedIncumbent.name}, has
            raised {moneyHelper(comparedIncumbent.raised)}, or{' '}
            {numberFormatter(comparedIncumbent.xTimes)}x times more money, with{' '}
            <ColoredText className="red">
              {moneyHelper(comparedIncumbent.bigMoneyFunds)}
            </ColoredText>{' '}
            ({percHelper(comparedIncumbent.bigFundsPerc, true)}% ) of funds
            coming from Big Money sources
          </strong>
          , like Political Action Committees (PACs), Corporate Lobbyists and
          Large Donors.
          <br />
          <br />
          Such a difference in funding creates a nearly impossible hurdle that
          relatively less known, indie or grass-roots candidates like {
            name
          }{' '}
          must overcome against a major party{' '}
          {comparedIncumbent.isFakeIncumbent
            ? 'Big Money Candidate'
            : 'Incumbent'}{' '}
          that Big Money Backers are bankrolling. The reason we created The Good
          Party is to help such candidates.
        </>
      );
    }
  };

  const text = () => {
    if (!isGoodOrUnkwown) {
      // NOT GOOD ENOUGH
      return (
        <>
          <strong>
            {name} has raised {moneyHelper(totalRaised)} in Total Funds , with{' '}
            <ColoredText className="red">
              {moneyHelper(bigMoneyFunds)}
            </ColoredText>{' '}
            ({perc}%) of the their funds coming from Big Money Sources
          </strong>
          , like Political Action Committees (PACs), Corporate Lobbyists and
          Large Donors. <br />
          <br />
          This means that{' '}
          <strong>
            Big Money backers are bankrolling {lastName}
            ’s {isIncumbent && 're-'}election at a rate of{' '}
            <ColoredText className={color}>{perHour}/hr</ColoredText> for every
            hour {isIncumbent ? lastName : 'the incumbent'} has been in office.
          </strong>{' '}
          Of course, Big Money Backers usually expect a big return on their
          investments, which means, if {isIncumbent && 're-'}
          elected, {name} will have to work very hard to deliver a good return
          for them.
        </>
      );
    }
    // GOOD OR UNKNOWN
    if (isBigMoney || isIncumbent || isSameAsComparedIncumbent) {
      // GOOD OR UNKNOWN INCUMBENT OR BIG MONEY
      return (
        <>
          <strong>
            {name} has raised {moneyHelper(totalRaised)} with{' '}
            <ColoredText className={color}>
              {moneyHelper(smallMoneyFunds)}
            </ColoredText>{' '}
            (<ColoredText className={colorWithGray}>{perc}%</ColoredText>) of
            funds coming from Small Individual Donors
          </strong>
          , donating less than $200/each. <br /> <br />
          This means that {lastName} is mostly being supported by large numbers
          of ordinary people, who are banding together, each giving a little, to
          help {name} compete with the Big Money pouring into this race. <br />{' '}
          <br />
          {!isIncumbent && !isSameAsComparedIncumbent && (
            <>
              In contrast to {name}, the incumbent in this race,{' '}
              <strong>
                {comparedIncumbent.name}, has raised{' '}
                {moneyHelper(comparedIncumbent.raised)}, or{' '}
                {numberFormatter(comparedIncumbent.xTimes)}x times more money,
                with{' '}
                <ColoredText className="red">
                  {moneyHelper(comparedIncumbent.bigMoneyFunds)}
                </ColoredText>{' '}
                ({percHelper(comparedIncumbent.bigFundsPerc, true)}% ) of funds
                coming from Big Money sources
              </strong>
              , like Political Action Committees (PACs), Corporate Lobbyists and
              Large Donors.
            </>
          )}
          {comparedIncumbentText()}
        </>
      );
    }
    // GOOD OR UNKNOWN SMALL CANDIDATE
    return (
      <>
        <strong>
          {name} has raised just {moneyHelper(totalRaised)} in Total Funds, or{' '}
          <ColoredText className="green">
            {comparedIncumbent.relativePerc}%
          </ColoredText>{' '}
          of the funding of the {fakeIncumbentOrIncumbentLabel} in this race
        </strong>
        {comparedIncumbentText()}
      </>
    );
  };

  return (
    <>
      <Body13 style={{ margin: '26px 0 16px' }} data-cy="fec">
        According to Federal Election Commission (FEC) filings for the this
        election cycle, as of {combinedReportDate}, {text()}
      </Body13>
      <div className="text-center" data-cy="report">
        <a
          href={openSecretLink}
          target="_blank"
          data-cy="secret-link"
          rel="nofollow"
        >
          <OpenSecretsLink>
            FEC DATA COURTESY OF OPENSECRETS.ORG
          </OpenSecretsLink>
        </a>
        <a
          href={`mailto:info@thegoodparty.org?subject=Data%20Error:%20Candidate%20Page&body=${
            window.location.href
          }`}
          data-cy="error-link"
        >
          <ReportError>Report an error</ReportError>
        </a>
      </div>
    </>
  );
};

FinancialText.propTypes = {
  candidate: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  chamberName: PropTypes.string,
  incumbent: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

export default FinancialText;
