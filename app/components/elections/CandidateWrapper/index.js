import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Wrapper from 'components/shared/Wrapper';
import LoadingAnimation from 'components/shared/LoadingAnimation';
import MobileHeader from 'components/shared/navigation/MobileHeader';
import Nav from 'containers/shared/Nav';
import {
  H1,
  H3,
  Body13,
  Body,
  Body9,
  Body11,
  Body12,
} from 'components/shared/typogrophy';
import GrayWrapper from 'components/shared/GrayWrapper';
import CandidateAvatar from 'components/shared/CandidateAvatar';
import {
  isSmallCandidate,
  partyResolver,
  rankText,
} from 'helpers/electionsHelper';
import moneyHelper from 'helpers/moneyHelper';
import { percHelper } from 'helpers/numberHelper';
import contentfulHelper from 'helpers/contentfulHelper';
import noCandidateImage from 'components/shared/noCandidateImageUrl';
import FacebookIcon from 'images/icons/facebook-icon.svg';
import WebsiteIcon from 'images/icons/website-icon.svg';
import TwitterIcon from 'images/icons/twitter-icon.svg';

const TopRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SocialLinks = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const IconWrapper = styled.div`
  padding: 24px 20px 0;
  text-align: center;
`;

const SocialLabel = styled(Body9)`
  margin-top: 7px;
  color: ${({ theme }) => theme.colors.blue};
  text-transform: uppercase;
  flex-wrap: no-wrap;
`;

const RankButton = styled(Body9)`
  border: solid 2px ${({ theme }) => theme.colors.blue};
  padding: 14px 24px;
  border-radius: 30px;
  margin-top: 20px;
  text-align: center;
  color: ${({ theme }) => theme.colors.blue};
  cursor: pointer;

  &.blue {
    background-color: ${({ theme }) => theme.colors.blue};
    color: #fff;
  }
`;

const StyledBody12 = styled(Body12)`
  color: ${({ theme }) => theme.colors.blue};
`;

const ReportError = styled(Body9)`
  color: ${({ theme }) => theme.colors.gray7};
  margin-top: 7px;
  text-transform: uppercase;
`;

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
  margin: 0 12px;
`;

const ColoredBody13 = styled(Body13)`
  color: ${({ theme }) => theme.colors.red};
  font-weight: 700;

  &.green {
    color: ${({ theme }) => theme.colors.green};
  }
`;

const SmallBr = styled.span`
  display: block;
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: inline;
  }
`;

const OpenSecretsLink = styled(Body9)`
  margin-top: 16px;
  text-align: right;
  color: ${({ theme }) => theme.colors.gray7};
`;

const StyledBody9 = styled(Body9)`
  color: ${({ theme }) => theme.colors.gray4};
`;

const ColoredText = styled.span`
  color: ${({ theme }) => theme.colors.red};
  &.green {
    color: ${({ theme }) => theme.colors.green};
  }
`;

const CandidateWrapper = ({
  candidate,
  chamberRank = [],
  chamberName,
  isGood,
}) => {
  const [candidateInfo, setCandidateInfo] = useState('');
  const [rank, setRank] = useState(false);
  const [socialAccounts, setSocialAccounts] = useState([]);

  useEffect(() => {
    if (candidate && candidate.info) {
      const info = JSON.parse(candidate.info);
      const bio = contentfulHelper(info.bio);
      const { facebook, twitter, website } = info;
      setCandidateInfo(bio);
      setSocialAccounts([
        { name: 'facebook', url: facebook, icon: FacebookIcon },
        { name: 'twitter', url: twitter, icon: TwitterIcon },
        { name: 'website', url: website, icon: WebsiteIcon },
      ]);
    }
  }, [candidate]);

  useEffect(() => {
    if (candidate && chamberRank && chamberRank.length > 0) {
      const savedRank = chamberRank.indexOf(candidate.id) + 1;
      if (savedRank) {
        setRank(savedRank);
      }
    }
  }, [chamberRank, candidate]);

  const {
    name,
    image,
    party,
    totalRaised,
    smallDonorPerc,
    largeDonorPerc,
    smallDonorPerHour,
    largeDonorPerHour,
    isIncumbent,
    outsideReportDate,
    openSecretsId,
  } = candidate;

  const isSmallChallenger = isSmallCandidate(totalRaised, chamberName);

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

  const comparedIncumbent = {
    name: 'Donald Trump',
    raised: 232093000,
    bigFundsPerc: 81,
  };
  comparedIncumbent.xTimes = (comparedIncumbent.raised / totalRaised).toFixed(
    2,
  );
  comparedIncumbent.relativePerc = (
    (totalRaised * 100) /
    comparedIncumbent.raised
  ).toFixed(2);

  let openSecretLink = 'https://www.opensecrets.org/';
  if (chamberName === 'presidential') {
    openSecretLink += `2020-presidential-race/candidate?id=${openSecretsId}`;
  }
  return (
    <GrayWrapper>
      {candidate ? (
        <>
          <Nav />
          <Wrapper>
            <MobileHeader showGoodisGood={isGood} showShare />
            <TopRow>
              <CandidateAvatar
                src={image || noCandidateImage}
                good={isGood}
                size="xl"
              />
              <H3 style={{ marginTop: '14px' }}>{name}</H3>
              <Body11 style={{ marginTop: '5px' }}>
                {partyResolver(party)} {isIncumbent && '(INCUMBENT)'}
              </Body11>
              {socialAccounts.length > 0 && (
                <SocialLinks>
                  {socialAccounts.map(social => (
                    <a href={social.url} target="_blank">
                      <IconWrapper>
                        <img src={social.icon} alt={social.name} />
                        <SocialLabel>{social.name}</SocialLabel>
                      </IconWrapper>
                    </a>
                  ))}
                </SocialLinks>
              )}
              <Link
                to={`/elections/rank-candidates/${chamberName ||
                  'presidential'}`}
              >
                <RankButton className={rank ? 'blue' : ''}>
                  <StyledBody12>
                    {rank ? `${rankText(rank)} CHOICE` : 'RANK YOUR CHOICES'}
                  </StyledBody12>
                </RankButton>
              </Link>
              <a href="mailto:ask@thegoodparty.org">
                <ReportError>Report an error</ReportError>
              </a>
            </TopRow>
            <FollowWrapper>
              <Body className="bold600">Follow the Money</Body>
              <Body11 style={{ marginLeft: '5px' }}>
                (FEC DATA as of {outsideReportDate})
              </Body11>
            </FollowWrapper>
            <FundsWrapper>
              <Fund>
                <Body13 className="bold700">{moneyHelper(totalRaised)}</Body13>
                <StyledBody9>TOTAL FUNDS RAISED</StyledBody9>
              </Fund>
              {isSmallChallenger ? (
                <Fund>
                  <ColoredBody13 className={color}>
                    {comparedIncumbent.relativePerc}%
                  </ColoredBody13>
                  <StyledBody9>FUNDING RELATIVE TO INCUMBENT</StyledBody9>
                </Fund>
              ) : (
                <Fund>
                  <ColoredBody13 className={color}>{perc}%</ColoredBody13>
                  <StyledBody9>
                    {isGood ? (
                      <span>
                        FROM SMALL INDIV
                        <SmallBr />
                        DONORS &lt; $200
                      </span>
                    ) : (
                      'FROM BIG MONEY SOURCES'
                    )}
                  </StyledBody9>
                </Fund>
              )}
              {!isGood && (
                <Fund>
                  <ColoredBody13 className={color}>{perHour}/hr</ColoredBody13>
                  <StyledBody9>
                    BIG MONEY
                    <SmallBr />
                    FUNDING RATE
                  </StyledBody9>
                </Fund>
              )}
            </FundsWrapper>
            <Body13 className="bold500" style={{ margin: '26px 0 16px' }}>
              Why We Believe {lastName()} is {coloredGood()}:
            </Body13>
            <Body13>
              According to Federal Election Commission (FEC) filings for the
              this election cycle, as of {outsideReportDate},{' '}
              {isSmallChallenger ? (
                <strong>
                  {name} has raised just {moneyHelper(totalRaised)} in Total
                  Funds,or {comparedIncumbent.relativePerc}% of the funding of
                  the Big Money incumbent in this race.
                </strong>
              ) : (
                <>
                  <strong>
                    {name} has raised {moneyHelper(totalRaised)} with a majority
                    ({perc}%) of funds coming from{' '}
                    {isGood ? 'Small Individual Donors' : 'Big Money Sources'}
                  </strong>
                  {isGood
                    ? ', donating less than $200/each'
                    : ', like Political Action Committees (PACs), Corporate Lobbyists and Large Donors.'}
                </>
              )}
            </Body13>
            <br />
            <br />
            <Body13>
              {isGood ? (
                <>
                  {isSmallChallenger ? (
                    <>
                      The incumbent{' '}
                      <strong>
                        {comparedIncumbent.name}, has raised{' '}
                        {moneyHelper(comparedIncumbent.raised)} or{' '}
                        {comparedIncumbent.xTimes}x times more money, than{' '}
                        {name}, with a majority (
                        {comparedIncumbent.bigFundsPerc}%) of in Total Funds
                        coming from Big Money sources
                      </strong>
                      , like Political Action Committees (PACs), Corporate
                      Lobbyists and Large Donors.
                      <br />
                      <br />
                      Such a difference in funding creates an impossible hurdle
                      that good indie or grass-roots candidate like {name} must
                      overcome against a major party incumbent that Big Money
                      Backers are bankrolling. This is why we created The Good
                      Party to help them.
                    </>
                  ) : (
                    <>
                      This means that {lastName()} is mostly being supported by
                      large numbers of ordinary people, who are banding
                      together, each giving a little, to help {name} compete
                      with the Big Money pouring into this race. <br /> <br />
                      In contrast, the incumbent in this race,{' '}
                      <strong>
                        {comparedIncumbent.name}, has raised{' '}
                        {moneyHelper(comparedIncumbent.raised)}, or{' '}
                        {comparedIncumbent.xTimes}x times more money, than{' '}
                        {name}, with a majority (
                        {comparedIncumbent.bigFundsPerc}%) of funds coming from
                        Big Money sources
                      </strong>
                      , like Political Action Committees (PACs), Corporate
                      Lobbyists and Large Donors.
                    </>
                  )}
                </>
              ) : (
                <>
                  According to Federal Election Commission (FEC) filings for the
                  this election cycle, as of {outsideReportDate},{' '}
                  <strong>
                    {name} has raised {moneyHelper(totalRaised)} with a majority
                    ({perc}%) of funds coming from Big Money Sources
                  </strong>
                  , like Political Action Committees (PACs), Corporate Lobbyists
                  and Large Donors.
                  <br />
                  <br />
                  This means that{' '}
                  <strong>
                    Big Money backers are bankrolling {lastName()}
                    ’s {isIncumbent && 're-'}election at a rate of {perHour}/hr
                    for every hour Trump has been in office.
                  </strong>{' '}
                  Of course, Big Money Backers usually expect a big return on
                  their investments, which means, if {isIncumbent && 're-'}
                  elected, {name} will have to work very hard to deliver a good
                  return for them.
                </>
              )}
            </Body13>

            {/*      ****    */}
            <a href={openSecretLink} target="_blank">
              <OpenSecretsLink>
                FEC DATA COURTESY OF OPENSECRETS.ORG
              </OpenSecretsLink>
            </a>

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

CandidateWrapper.propTypes = {
  candidate: PropTypes.object,
  chamberRank: PropTypes.array,
  chamberName: PropTypes.string,
  isGood: PropTypes.bool,
};

export default CandidateWrapper;
