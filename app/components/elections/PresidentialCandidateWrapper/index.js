import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Wrapper from 'components/shared/Wrapper';
import LoadingAnimation from 'components/shared/LoadingAnimation';
import MobileHeader from 'components/shared/navigation/MobileHeader';
import Nav from 'containers/Nav';
import { H1, Body13, Body, Body9 } from 'components/shared/typogrophy';
import GrayWrapper from 'components/shared/GrayWrapper';
import CandidateAvatar from 'components/shared/CandidateAvatar';
import { partyResolver, rankText } from 'helpers/electionsHelper';
import moneyHelper from 'helpers/moneyHelper';
import { percHelper } from 'helpers/numberHelper';
import contentfulHelper from 'helpers/contentfulHelper';

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const DesktopGood = styled.div`
  display: none;
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
`;

const LargeNum = styled(Body)`
  margin-top: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.red};

  &.green {
    color: ${({ theme }) => theme.colors.green};
  }
`;

const StyledBody9 = styled(Body9)`
  color: ${({ theme }) => theme.colors.gray4};
`;

const StyledBody13 = styled(Body13)`
  color: ${({ theme }) => theme.colors.red};
  font-weight: 500;

  &.green {
    color: ${({ theme }) => theme.colors.green};
  }
`;

const ColoredText = styled.span`
  color: ${({ theme }) => theme.colors.red};
  &.green {
    color: ${({ theme }) => theme.colors.green};
  }
`;

const RankButton = styled(Body9)`
  border: solid 1px ${({ theme }) => theme.colors.blue};
  padding: 8px 6px;
  border-radius: 8px;
  margin-top: 20px;
  text-align: center;
  color: ${({ theme }) => theme.colors.blue};
  cursor: pointer;

  &.blue {
    background-color: ${({ theme }) => theme.colors.blue};
    color: #fff;
  }
`;

const PresidentialCandidateWrapper = ({ candidate, presidentialRank = [] }) => {
  const [candidateInfo, setCandidateInfo] = useState('');
  const [rank, setRank] = useState(false);

  useEffect(() => {
    if (candidate) {
      const info = contentfulHelper(candidate.info);
      setCandidateInfo(info);
    }
  }, [candidate]);

  useEffect(() => {
    if (candidate && presidentialRank && presidentialRank.length > 0) {
      const savedRank = presidentialRank.indexOf(candidate.id) + 1;
      if (savedRank) {
        setRank(savedRank);
      }
    }
  }, [presidentialRank, candidate]);

  const {
    name,
    image,
    isGood,
    party,
    totalRaised,
    smallDonorPerc,
    largeDonorPerc,
    smallDonorPerHour,
    largeDonorPerHour,
    isIncumbent,
  } = candidate;

  const color = isGood ? 'green' : 'red';
  const perc = isGood ? percHelper(smallDonorPerc) : percHelper(largeDonorPerc);
  const perHour = isGood
    ? moneyHelper(smallDonorPerHour)
    : moneyHelper(largeDonorPerHour);

  const lastName = () => {
    if (!name) {
      return '';
    }
    const arr = name.split(' ');
    return arr[arr.length - 1];
  };

  const coloredGood = () => {
    return (
      <ColoredText className={color}>
        {!isGood && 'Not'} Good Enough
      </ColoredText>
    );
  };
  return (
    <GrayWrapper>
      {candidate ? (
        <>
          <Nav />
          <Wrapper>
            <MobileHeader showGoodisGood={isGood} showShare />
            <DesktopGood>
              <StyledBody13 className={color}>
                {!isGood && 'NOT'} GOOD ENOUGH
              </StyledBody13>
            </DesktopGood>
            <Row>
              <div>
                <H1>{name}</H1>
                <Body13 style={{ marginTop: '5px' }}>
                  {partyResolver(party)} {isIncumbent && '(Incumbent)'}
                </Body13>
                <Body className="bold600" style={{ marginTop: '10px' }}>
                  {moneyHelper(totalRaised)}
                </Body>
                <StyledBody9>TOTAL FUNDS RAISED</StyledBody9>
                <LargeNum className={color}>{perc}%</LargeNum>
                <StyledBody9>
                  {isGood
                    ? 'FROM SMALL INDIVIDUAL DONORS &lt; $200'
                    : 'FROM BIG MONEY SOURCES'}
                </StyledBody9>
                <LargeNum className={color}>{perHour}/hr</LargeNum>
                <StyledBody9>
                  {isGood ? 'SMALL DONOR SUPPORT' : 'BIG MONEY SUPPORT'}
                </StyledBody9>
              </div>
              <div>
                <CandidateAvatar src={image} good={isGood} size="xl" />
                <Link to="/elections/rank-presidential-candidates">
                  <RankButton className={rank ? 'blue' : ''}>
                    {rank ? `${rankText(rank)} CHOICE` : 'RANK CANDIDATES'}
                  </RankButton>
                </Link>
              </div>
            </Row>
            <Body className="bold600" style={{ marginTop: '37px' }}>
              Why is {lastName()} is {coloredGood()}
            </Body>
            <Body13 style={{ marginTop: '16px' }}>
              According to Federal Election Commission filings for the 2020
              election cycle,{' '}
              <strong>
                {name} has raised the majority ({perc}%) of{' '}
                {moneyHelper(totalRaised)} in Total Funds Raised from{' '}
                {isGood ? 'Small Individual Donors' : 'Big Money Backers'}
              </strong>
              {isGood
                ? ', donating less than $200/each.'
                : ', like Political Action Committees, Corporate Lobbyists and Large Individual Donors.'}
              <br />
              <br />
              This means that{' '}
              {isGood ? (
                <>
                  <strong>
                    {lastName()} and his campaign are mostly being supported by
                    large numbers of ordinary people who are banding together to
                    give
                    {perHour}/hr for every hour the incumbent has been in
                    office.
                  </strong>{' '}
                  This makes it more likely that, if {isIncumbent && 're-'}
                  elected, {lastName()} is going to be working hard on behalf of
                  the ordinary people who got him elected, rather than for the
                  Big Money Backers who are majority bankrolling other
                  candidates.
                </>
              ) : (
                <>
                  <strong>
                    Big Money Backers are bankrolling {lastName()}’s{' '}
                    {isIncumbent && 're-'}election at a rate of {perHour}/hr for
                    every hour {lastName()} has been in office
                  </strong>{' '}
                  Of course, Big Money Backers usually expect a big return on
                  their investments, which means, if {isIncumbent && 're-'}
                  elected, {name} will have to work very hard to deliver a good
                  return for them.
                </>
              )}
            </Body13>
            <Body9 className="text-right">
              FEC Data COMPILED BY{' '}
              <a href="https://www.opensecrets.org/" target="_blank">
                OpenSecrets.org
              </a>
            </Body9>
            <Body className="bold600" style={{ marginTop: '48px' }}>
              Candidate Policy Positions:
            </Body>
            <Body13>{candidateInfo}</Body13>
          </Wrapper>
        </>
      ) : (
        <Wrapper>
          <MobileHeader />
          <LoadingAnimation />
        </Wrapper>
      )}
    </GrayWrapper>
  );
};

export default PresidentialCandidateWrapper;
