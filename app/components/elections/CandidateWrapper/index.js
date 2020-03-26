import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Wrapper from 'components/shared/Wrapper';
import LoadingAnimation from 'components/shared/LoadingAnimation';
import MobileHeader from 'components/shared/navigation/MobileHeader';
import Nav from 'containers/shared/Nav';
import {
  H3,
  Body13,
  Body,
  Body9,
  Body11,
  Body12,
} from 'components/shared/typogrophy';
import GrayWrapper from 'components/shared/GrayWrapper';
import CandidateAvatar from 'components/shared/CandidateAvatar';
import { partyResolver, rankText } from 'helpers/electionsHelper';
import moneyHelper from 'helpers/moneyHelper';
import { percHelper, toPrecision } from 'helpers/numberHelper';
import contentfulHelper from 'helpers/contentfulHelper';
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
  &.white {
    color: #fff;
  }
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

const InfoWrapper = styled.div`
  .survey-question {
    font-weight: 700;
    margin-top: 36px;
    margin-bottom: 0;
  }
`;

const ChamberLink = styled(Body11)`
  margin-top: 5px;
  text-transform: capitalize;
`;

const CandidateWrapper = ({
  candidate,
  chamberRank = [],
  chamberName,
  isGood,
  incumbent,
}) => {
  const [candidateInfo, setCandidateInfo] = useState('');
  const [rank, setRank] = useState(false);
  const [socialAccounts, setSocialAccounts] = useState([]);
  const [comparedIncumbent, setComparedIncumbent] = useState({});

  useEffect(() => {
    if (candidate && candidate.info) {
      let info;
      let facebook;
      let twitter;
      let website;
      let bio;
      if (chamberName === 'presidential') {
        info = JSON.parse(candidate.info);
        facebook = info.facebook;
        twitter = info.twitter;
        website = info.website;
        bio = info ? contentfulHelper(info.bio) : '';
      } else {
        info = candidate.info;
        facebook = candidate.facebook;
        twitter = candidate.twitter;
        website = candidate.website;
        bio = info ? decodeURI(info) : null;
      }
      console.log('bio', bio, typeof bio);
      setCandidateInfo(bio);
      setSocialAccounts([
        { name: 'facebook', url: facebook, icon: FacebookIcon },
        { name: 'twitter', url: twitter, icon: TwitterIcon },
        { name: 'website', url: website, icon: WebsiteIcon },
      ]);
    } else {
      setCandidateInfo('');
      setSocialAccounts([]);
    }
  }, [candidate]);

  useEffect(() => {
    if (incumbent) {
      const raised = incumbent.raised || incumbent.combinedRaised;
      let bigFundsPerc = (raised - incumbent.smallContributions) / raised;
      bigFundsPerc = toPrecision(bigFundsPerc);
      const compared = {
        name: incumbent.name,
        raised,
        bigFundsPerc,
      };
      compared.xTimes = (compared.raised / totalRaised).toFixed(2);
      compared.relativePerc = ((totalRaised * 100) / compared.raised).toFixed(
        2,
      );

      compared.xTimes = toPrecision(compared.raised / totalRaised);
      compared.relativePerc = toPrecision(
        (totalRaised * 100) / compared.raised,
      );
      setComparedIncumbent(compared);
    } else {
      setComparedIncumbent({});
    }
  }, [incumbent]);

  useEffect(() => {
    if (candidate && chamberRank && chamberRank.length > 0) {
      const savedRank = chamberRank.indexOf(candidate.id) + 1;
      if (savedRank) {
        setRank(savedRank);
      } else {
        setRank(false);
      }
    } else {
      setRank(false);
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
    reportDate,
    openSecretsId,
    uuid,
    isApproved,
    state,
    district,
  } = candidate;

  const isUnkown = isGood === null;
  const isGoodOrUnkwown = isGood || isUnkown;

  const isSmallChallenger = isUnkown || isApproved; // isSmallCandidate(totalRaised, chamberName);

  const color = isGoodOrUnkwown ? 'green' : 'red';
  const perc = isGoodOrUnkwown
    ? percHelper(smallDonorPerc, true)
    : percHelper(largeDonorPerc, true);
  const perHour = isGoodOrUnkwown
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
        {!isGoodOrUnkwown && 'Not'} Good Enough
      </ColoredText>
    );
  };

  let openSecretLink = 'https://www.opensecrets.org/';
  if (chamberName === 'presidential') {
    openSecretLink += `2020-presidential-race/candidate?id=${openSecretsId}`;
  } else if (isIncumbent) {
    openSecretLink += `members-of-congress/summary?cycle=2020&type=C&cid=${openSecretsId}`;
  } else if (uuid) {
    const stateDistrict = uuid.split('_')[1];
    openSecretLink += `races/candidates?cycle=2020&id=${stateDistrict}&spec=N`;
  }
  console.log('incumbent', incumbent, comparedIncumbent);
  const combinedReportDate =
    reportDate ||
    outsideReportDate ||
    (incumbent && incumbent.reportDate) ||
    '02/12/2020';

  const chamberLink = () => {
    const incumbentText = isIncumbent ? 'Incumbent' : 'Candidate';
    console.log('chamberName', chamberName);
    if (chamberName === 'presidential') {
      return (
        <ChamberLink>
          <Link to="/elections/presidential-election">
            Presidential {incumbentText}
          </Link>
        </ChamberLink>
      );
    }
    if (chamberName === 'senate') {
      if (state) {
        return (
          <ChamberLink>
            <Link to={`/elections/senate-election/${state}`}>
              Senate {incumbentText} for {state.toUpperCase()}
            </Link>
          </ChamberLink>
        );
      }
    }
    if (chamberName === 'house') {
      if (state && district) {
        return (
          <ChamberLink>
            <Link to={`/elections/house-election/${state}-${district}`}>
              House {incumbentText} for {state.toUpperCase()}-{district}
            </Link>
          </ChamberLink>
        );
      }
    }
  };

  return (
    <GrayWrapper>
      {candidate ? (
        <>
          <Nav />
          <Wrapper>
            <MobileHeader showGoodisGood={isGood} showShare />
            <TopRow>
              <CandidateAvatar src={image} good={isGoodOrUnkwown} size="xl" />
              <H3 style={{ marginTop: '14px' }}>{name}</H3>
              <Body11 style={{ marginTop: '5px' }} className="bold500">
                {partyResolver(party)}
              </Body11>
              {chamberLink()}
              {socialAccounts.length > 0 && (
                <SocialLinks>
                  {socialAccounts.map((social, index) => (
                    <React.Fragment key={`${index}-${social.url}`}>
                      {social.url && social.url !== '' && (
                        <a href={social.url} target="_blank">
                          <IconWrapper>
                            <img src={social.icon} alt={social.name} />
                            <SocialLabel>{social.name}</SocialLabel>
                          </IconWrapper>
                        </a>
                      )}
                    </React.Fragment>
                  ))}
                </SocialLinks>
              )}
              <Link
                to={`/elections/rank-candidates/${chamberName ||
                  'presidential'}`}
              >
                <RankButton className={rank ? 'blue' : ''}>
                  <StyledBody12 className={rank ? 'white' : ''}>
                    {rank
                      ? `YOUR ${rankText(rank)} CHOICE`
                      : 'RANK YOUR CHOICES'}
                  </StyledBody12>
                </RankButton>
              </Link>
              <a
                href={`mailto:info@thegoodparty.org?subject=Data%20Error:%20Candidate%20Page&body=${
                  window.location.href
                }`}
              >
                <ReportError>Report an error</ReportError>
              </a>
            </TopRow>
            <FollowWrapper>
              <Body className="bold600">Follow the Money</Body>
              <Body11 style={{ marginLeft: '5px' }}>
                (FEC DATA as of {combinedReportDate})
              </Body11>
            </FollowWrapper>
            <FundsWrapper>
              <Fund>
                <Body13 className="bold700">{moneyHelper(totalRaised)}</Body13>
                <StyledBody9>TOTAL FUNDS RAISED</StyledBody9>
              </Fund>
              {isSmallChallenger ? (
                <>
                  {comparedIncumbent.relativePerc && (
                    <Fund>
                      <ColoredBody13 className={color}>
                        {comparedIncumbent.relativePerc}%
                      </ColoredBody13>
                      <StyledBody9>FUNDING RELATIVE TO INCUMBENT</StyledBody9>
                    </Fund>
                  )}
                </>
              ) : (
                <Fund>
                  <ColoredBody13 className={color}>{perc}%</ColoredBody13>
                  <StyledBody9>
                    {isGoodOrUnkwown ? (
                      <span>
                        FROM SMALL INDIV
                        <SmallBr /> DONORS &lt; $200
                      </span>
                    ) : (
                      'FROM BIG MONEY SOURCES'
                    )}
                  </StyledBody9>
                </Fund>
              )}
              {!isGoodOrUnkwown && (
                <Fund>
                  <ColoredBody13 className={color}>{perHour}/hr</ColoredBody13>
                  <StyledBody9>
                    BIG MONEY
                    <SmallBr /> FUNDING RATE
                  </StyledBody9>
                </Fund>
              )}
            </FundsWrapper>
            <Body13 className="bold500" style={{ margin: '26px 0 16px' }}>
              Why We Believe {lastName()} {isUnkown ? 'could be' : 'is'}{' '}
              {coloredGood()}:
            </Body13>
            <Body13>
              According to Federal Election Commission (FEC) filings for the
              this election cycle, as of {outsideReportDate},{' '}
              {isSmallChallenger ? (
                <strong>
                  {name} has raised just {moneyHelper(totalRaised)} in Total
                  Funds
                  {comparedIncumbent.relativePerc ? (
                    <>
                      , or{' '}
                      <ColoredText className={color}>
                        {comparedIncumbent.relativePerc}%
                      </ColoredText>{' '}
                      of the funding of the Big Money incumbent in this race.
                    </>
                  ) : (
                    <>.</>
                  )}
                </strong>
              ) : (
                <>
                  <strong>
                    {name} has raised {moneyHelper(totalRaised)} with a majority
                    (<ColoredText className={color}>{perc}%</ColoredText>) of
                    funds coming from{' '}
                    {isGoodOrUnkwown
                      ? 'Small Individual Donors'
                      : 'Big Money Sources'}
                  </strong>
                  {isGoodOrUnkwown
                    ? ', donating less than $200/each'
                    : ', like Political Action Committees (PACs), Corporate Lobbyists and Large Donors.'}
                </>
              )}
            </Body13>
            <br />
            <br />
            <Body13>
              {isGoodOrUnkwown ? (
                <>
                  {isSmallChallenger ? (
                    <>
                      The incumbent{' '}
                      <strong>
                        {comparedIncumbent.name}, has raised{' '}
                        {moneyHelper(comparedIncumbent.raised)} or{' '}
                        {comparedIncumbent.xTimes}x times more money, than{' '}
                        {name}, with a majority (
                        <ColoredText className="red">
                          {percHelper(comparedIncumbent.bigFundsPerc, true)}%
                        </ColoredText>
                        ) of in Total Funds coming from Big Money sources
                      </strong>
                      , like Political Action Committees (PACs), Corporate
                      Lobbyists and Large Donors.
                      <br />
                      <br />
                      Such a difference in funding creates a nearly impossible
                      hurdle that relatively less known, indie or grass-roots
                      candidates like {name} must overcome against a major party
                      incumbent that Big Money Backers are bankrolling. This is
                      why we created The Good Party to help them.
                    </>
                  ) : (
                    <>
                      This means that {lastName()} is mostly being supported by
                      large numbers of ordinary people, who are banding
                      together, each giving a little, to help {name} compete
                      with the Big Money pouring into this race. <br /> <br />
                      In contrast to {name}, the incumbent in this race,{' '}
                      <strong>
                        {comparedIncumbent.name}, has raised{' '}
                        {moneyHelper(comparedIncumbent.raised)}, or{' '}
                        {comparedIncumbent.xTimes}x times more money, with a
                        majority (
                        <ColoredText className="red">
                          {percHelper(comparedIncumbent.bigFundsPerc, true)}%
                        </ColoredText>
                        ) of funds coming from Big Money sources
                      </strong>
                      , like Political Action Committees (PACs), Corporate
                      Lobbyists and Large Donors.
                    </>
                  )}
                </>
              ) : (
                <>
                  This means that{' '}
                  <strong>
                    Big Money backers are bankrolling {lastName()}
                    ’s {isIncumbent && 're-'}election at a rate of{' '}
                    <ColoredText className={color}>{perHour}/hr</ColoredText>{' '}
                    for every hour {isIncumbent ? lastName() : 'the incumbent'}{' '}
                    has been in office.
                  </strong>{' '}
                  Of course, Big Money Backers usually expect a big return on
                  their investments, which means, if {isIncumbent && 're-'}
                  elected, {name} will have to work very hard to deliver a good
                  return for them.
                </>
              )}
            </Body13>

            <a href={openSecretLink} target="_blank">
              <OpenSecretsLink>
                FEC DATA COURTESY OF OPENSECRETS.ORG
              </OpenSecretsLink>
            </a>

            <InfoWrapper>
              <Body className="bold600" style={{ marginTop: '48px' }}>
                Candidate Policy Positions:
              </Body>
              {chamberName === 'Presidential' ? (
                <Body13>{candidateInfo}</Body13>
              ) : (
                <div>
                  {candidateInfo && candidateInfo !== 'null' ? (
                    <>
                      <Body11 style={{ margin: '16px 0' }}>
                        The following policy positions for {name} were compiled
                        by [Ballotpedia] from the candidate's survey, official
                        campaign website, editorials, speeches, and interviews.
                      </Body11>
                      <Body13
                        dangerouslySetInnerHTML={{ __html: candidateInfo }}
                      />
                    </>
                  ) : (
                    <Body13 style={{ padding: '16px 0' }}>
                      No data found for {name} Ballotpedia
                      <a
                        href={`mailto:info@thegoodparty.org?subject=Data%20Error:%20Candidate%20Page&body=${
                          window.location.href
                        }`}
                      >
                        <ReportError>Report an error</ReportError>
                      </a>
                    </Body13>
                  )}
                </div>
              )}
            </InfoWrapper>
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
  chamberRank: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  chamberName: PropTypes.string,
  isGood: PropTypes.bool,
  incumbent: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

export default CandidateWrapper;
