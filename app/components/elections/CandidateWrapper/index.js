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
import {
  houseElectionLink,
  partyResolver,
  presidentialElectionLink,
  rankText,
  senateElectionLink,
  shortToLongState,
} from 'helpers/electionsHelper';
import moneyHelper from 'helpers/moneyHelper';
import { percHelper, toPrecision } from 'helpers/numberHelper';
import contentfulHelper from 'helpers/contentfulHelper';
import FacebookIcon from 'images/icons/facebook-icon.svg';
import WebsiteIcon from 'images/icons/website-icon.svg';
import TwitterIcon from 'images/icons/twitter-icon.svg';
import GrayCheckbox from 'images/icons/checkbox-gray.svg';
import RedCheckbox from 'images/icons/checkbox-red.svg';
import GreenCheckbox from 'images/icons/checkbox-green.svg';
import QuestionMarkGray from 'images/icons/question-mark.svg';

const TopRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CheckboxRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin-top: 16px;
`;

const CheckboxImg = styled.img`
  margin-right: 12px;
  margin-top: 5px;
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
  margin: 0 10px;
`;

const ColoredBody13 = styled(Body13)`
  color: ${({ theme }) => theme.colors.red};
  font-weight: 700;

  &.green {
    color: ${({ theme }) => theme.colors.green};
  }

  &.gray {
    color: ${({ theme }) => theme.colors.gray4};
  }
`;

const SmallBr = styled.span`
  display: block;
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: inline;
  }
`;

const OpenSecretsLink = styled(Body9)`
  margin: 16px 0;
  color: ${({ theme }) => theme.colors.gray7};
`;

const BallotpediaNoData = styled(Body9)`
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
  &.gray {
    color: ${({ theme }) => theme.colors.gray4};
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
  incumbent,
  user,
}) => {
  const [candidateInfo, setCandidateInfo] = useState('');
  const [rank, setRank] = useState(false);
  const [socialAccounts, setSocialAccounts] = useState([]);
  const [comparedIncumbent, setComparedIncumbent] = useState({});
  let isGood;
  if (candidate) {
    ({ isGood } = candidate);
  }

  useEffect(() => {
    if (candidate) {
      let info;
      let facebook;
      let twitter;
      let website;
      let bio = '';
      if (chamberName === 'presidential') {
        info = candidate.info ? JSON.parse(candidate.info) : '';
        if (info) {
          facebook = info.facebook;
          twitter = info.twitter;
          website = info.website;
          bio = contentfulHelper(info.bio);
        }
      } else {
        info = candidate.info;
        facebook = candidate.facebook;
        twitter = candidate.twitter;
        website = candidate.website;
        try {
          bio = info ? decodeURI(info) : null;
        } catch (e) {
          console.log(e);
        }
      }
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
        isFakeIncumbent: incumbent.isFakeIncumbent,
      };
      compared.xTimes = (compared.raised / totalRaised).toFixed(2);
      compared.relativePerc = ((totalRaised * 100) / compared.raised).toFixed(
        2,
      );

      compared.xTimes = toPrecision(compared.raised / totalRaised);
      compared.relativePerc = toPrecision(
        (totalRaised * 100) / compared.raised,
      );
      compared.bigMoneyFunds = compared.raised * compared.bigFundsPerc;
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

  const campaignWebsite =
    candidate && candidate.campaignWebsite
      ? decodeURI(candidate.campaignWebsite)
      : null;

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
    isAligned,
    state,
    district,
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

  const lastName = () => {
    if (!name) {
      return '';
    }
    const arr = name.split(' ');
    return arr[arr.length - 1];
  };

  const coloredGood = () => {
    if (isGood) {
      return (
        <ColoredText className="green">
          <strong>a Good Option</strong>
        </ColoredText>
      );
    }
    if (isUnkown) {
      return (
        <ColoredText className="gray">
          <strong>Not Yet Rated</strong>
        </ColoredText>
      );
    }
    return (
      <ColoredText className="red">
        <strong>Not Good Enough</strong>
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
  const combinedReportDate =
    reportDate ||
    outsideReportDate ||
    (incumbent && incumbent.reportDate) ||
    '02/12/2020';

  const chamberLink = () => {
    if (chamberName === 'presidential') {
      return (
        <ChamberLink>
          <Link to={rankPageLink()}>U.S. President</Link>
        </ChamberLink>
      );
    }
    if (chamberName === 'senate') {
      if (state) {
        return (
          <ChamberLink>
            <Link to={rankPageLink()}>
              U.S. Senate for {shortToLongState[state.toUpperCase()]}
            </Link>
          </ChamberLink>
        );
      }
    }
    if (chamberName === 'house') {
      if (state && district) {
        return (
          <ChamberLink>
            <Link to={rankPageLink()}>
              U.S. House for District {state.toUpperCase()}-{district}
            </Link>
          </ChamberLink>
        );
      }
    }
  };

  const ballotpediaLink = candidate.source
    ? candidate.source
    : 'https://ballotpedia.org/';

  const rankPageLink = () => {
    if (chamberName === 'presidential') {
      return presidentialElectionLink(chamberRank, true);
    }
    if (chamberName === 'senate') {
      return senateElectionLink(chamberRank, state, true);
    }
    return houseElectionLink(chamberRank, state, district, true);
  };

  const rankLabel = () => {
    if (rank) {
      return `YOUR ${rankText(rank)} CHOICE`;
    }
    if (chamberRank && chamberRank.length > 0) {
      return 'EDIT CHOICES';
    }
    return 'RANK YOUR CHOICES';
  };

  const bigMoneyFunds = candidate ? totalRaised * largeDonorPerc : 0;
  const smallMoneyFunds = totalRaised - bigMoneyFunds;
  return (
    <GrayWrapper>
      {candidate && name ? (
        <>
          <Nav />
          <Wrapper>
            <MobileHeader showGoodisGood={isGood} showShare user={user} />
            <TopRow>
              <CandidateAvatar
                src={image}
                good={isGood}
                name={name}
                size="xl"
              />
              <H3 style={{ marginTop: '14px' }}>{name}</H3>
              <Body11 style={{ marginTop: '5px' }} className="bold500">
                {partyResolver(party)} {isIncumbent ? 'INCUMBENT' : 'CANDIDATE'}
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
              <Link to={rankPageLink()}>
                <RankButton className={rank ? 'blue' : ''}>
                  <StyledBody12 className={rank ? 'white' : ''}>
                    {rankLabel()}
                  </StyledBody12>
                </RankButton>
              </Link>
            </TopRow>

            <Body style={{ marginTop: '32px' }}>
              Why {lastName()} is {coloredGood()}
            </Body>
            {!isGoodOrUnkwown && (
              <>
                {isBigMoney ? (
                  <CheckboxRow>
                    <CheckboxImg src={RedCheckbox} />
                    <Body13>
                      <strong>
                        <ColoredText>Follow the Money:</ColoredText>{' '}
                      </strong>
                      Candidate has raised most of funding (&gt;50%) from Big
                      Money sources.
                    </Body13>
                  </CheckboxRow>
                ) : (
                  <CheckboxRow>
                    <CheckboxImg src={GrayCheckbox} />
                    <Body13>
                      <strong>Follow the Money:</strong> Candidate has raised
                      most of funding (&gt;50%) from Small Indiv. Donors
                      (&lt;$200). This is good, but not enough because of
                      candidate policy positions.
                    </Body13>
                  </CheckboxRow>
                )}

                {isAligned === 'yes' ? (
                  <CheckboxRow>
                    <CheckboxImg src={GrayCheckbox} />
                    <Body13>
                      <strong>Candidate Policy Positions:</strong> Candidate
                      positions are aligned with{' '}
                      <Link to="/party/faq/what-is-the-good-party-platform/2Pv9KNb6rng0sMfqwu1xKm">
                        The Good Party Platform.
                      </Link>
                    </Body13>
                  </CheckboxRow>
                ) : (
                  <>
                    {isAligned === 'no' ? (
                      <CheckboxRow>
                        <CheckboxImg src={RedCheckbox} />
                        <Body13>
                          <strong>
                            <ColoredText>
                              Candidate Policy Positions:
                            </ColoredText>{' '}
                          </strong>
                          Candidate positions are not aligned with{' '}
                          <Link to="/party/faq/what-is-the-good-party-platform/2Pv9KNb6rng0sMfqwu1xKm">
                            The Good Party Platform.
                          </Link>
                        </Body13>
                      </CheckboxRow>
                    ) : (
                      <CheckboxRow>
                        <CheckboxImg src={QuestionMarkGray} />
                        <Body13>
                          <strong>
                            <ColoredText className="gray">
                              Candidate Policy Positions:
                            </ColoredText>{' '}
                          </strong>
                          Not yet confirmed if this candidate aligns with{' '}
                          <Link to="/party/faq/what-is-the-good-party-platform/2Pv9KNb6rng0sMfqwu1xKm">
                            The Good Party Platform.
                          </Link>
                        </Body13>
                      </CheckboxRow>
                    )}
                  </>
                )}
              </>
            )}

            {isGood && (
              <>
                {isBigMoney || isIncumbent || perc > 50 ? (
                  <CheckboxRow>
                    <CheckboxImg src={GreenCheckbox} />
                    <Body13>
                      <strong>
                        <ColoredText className="green">
                          Follow the Money:
                        </ColoredText>{' '}
                      </strong>
                      Candidate has raised most of funding (&gt;50%) from Small
                      Indiv. Donors (&lt;$200)
                    </Body13>
                  </CheckboxRow>
                ) : (
                  <CheckboxRow>
                    <CheckboxImg src={GreenCheckbox} />
                    <Body13>
                      <strong>
                        <ColoredText className="green">
                          Follow the Money:
                        </ColoredText>
                      </strong>{' '}
                      Candidate has raised less than 50% of the total funding of
                      the incumbent in this race.
                    </Body13>
                  </CheckboxRow>
                )}

                {isAligned === 'yes' ? (
                  <CheckboxRow>
                    <CheckboxImg src={GreenCheckbox} />
                    <Body13>
                      <strong>
                        <ColoredText className="green">
                          Candidate Policy Positions:
                        </ColoredText>
                      </strong>{' '}
                      Candidate positions are aligned with{' '}
                      <Link to="/party/faq/what-is-the-good-party-platform/2Pv9KNb6rng0sMfqwu1xKm">
                        The Good Party Platform.
                      </Link>
                    </Body13>
                  </CheckboxRow>
                ) : (
                  <CheckboxRow>
                    <CheckboxImg src={RedCheckbox} />
                    <Body13>
                      <strong>
                        <ColoredText>Candidate Policy Positions:</ColoredText>{' '}
                      </strong>
                      Candidate positions are not aligned with{' '}
                      <Link to="/party/faq/what-is-the-good-party-platform/2Pv9KNb6rng0sMfqwu1xKm">
                        The Good Party Platform.
                      </Link>
                    </Body13>
                  </CheckboxRow>
                )}
              </>
            )}

            {isUnkown && (
              <>
                <CheckboxRow>
                  <CheckboxImg src={GreenCheckbox} />
                  <Body13>
                    <strong>
                      <ColoredText className="green">
                        Follow the Money:
                      </ColoredText>
                    </strong>{' '}
                    {comparedIncumbent.relativePerc < 50 ? (
                      'Candidate has raised less than 50% of the total funding of the incumbent in this race.'
                    ) : (
                      <>
                        Candidate has raised most of funding (&gt;50%) from
                        Small Indiv. Donors (&lt;$200).
                      </>
                    )}
                  </Body13>
                </CheckboxRow>

                <CheckboxRow>
                  <CheckboxImg src={QuestionMarkGray} />
                  <Body13>
                    <strong>Candidate Policy Positions: </strong>
                    Not yet confirmed if this candidate aligns with{' '}
                    <Link to="/party/faq/what-is-the-good-party-platform/2Pv9KNb6rng0sMfqwu1xKm">
                      The Good Party Platform.
                    </Link>
                  </Body13>
                </CheckboxRow>
              </>
            )}

            <FollowWrapper>
              <Body className="bold600">Follow the Money</Body>
              <Body11 style={{ marginLeft: '5px' }}>
                (FEC DATA as of {combinedReportDate})
              </Body11>
            </FollowWrapper>
            <FundsWrapper>
              <Fund>
                <Body13 className="bold700">
                  <ColoredText
                    className={
                      !isBigMoney && isGoodOrUnkwown ? 'green' : 'gray'
                    }
                  >
                    {moneyHelper(totalRaised)}
                  </ColoredText>
                </Body13>
                <StyledBody9>TOTAL FUNDS RAISED</StyledBody9>
              </Fund>
              {isGoodOrUnkwown ? (
                <Fund>
                  {isIncumbent || isBigMoney || perc > 50 ? (
                    <>
                      <ColoredBody13 className="green">{perc}%</ColoredBody13>
                      <StyledBody9>
                        FROM SMALL INDIV DONORS &lt;$200
                      </StyledBody9>
                    </>
                  ) : (
                    <>
                      <ColoredBody13 className="green">
                        {comparedIncumbent.relativePerc}%
                      </ColoredBody13>
                      <StyledBody9>
                        FUNDING RELATIVE TO{' '}
                        {comparedIncumbent.isFakeIncumbent
                          ? 'BIG MONEY CANDIDATE'
                          : 'INCUMBENT'}
                      </StyledBody9>
                    </>
                  )}
                </Fund>
              ) : (
                <Fund>
                  <ColoredBody13 className={colorWithGray}>
                    {perc}%
                  </ColoredBody13>
                  <StyledBody9>FROM BIG MONEY SOURCES</StyledBody9>
                </Fund>
              )}

              {isGoodOrUnkwown ? (
                <Fund>
                  {isIncumbent ? (
                    <>
                      <ColoredBody13 className="gray">N/A</ColoredBody13>
                      <StyledBody9>FUNDING DISADVANTAGE</StyledBody9>
                    </>
                  ) : (
                    <>
                      <ColoredBody13 className="green">
                        {comparedIncumbent.xTimes}x
                      </ColoredBody13>
                      <StyledBody9>FUNDING DISADVANTAGE</StyledBody9>
                    </>
                  )}
                </Fund>
              ) : (
                <Fund>
                  <ColoredBody13 className={color}>{perHour}/hr</ColoredBody13>
                  <StyledBody9>
                    BIG MONEY
                    <SmallBr /> FUNDING RATE
                  </StyledBody9>
                </Fund>
              )}
            </FundsWrapper>

            <Body13 style={{ margin: '26px 0 16px' }}>
              According to Federal Election Commission (FEC) filings for the
              this election cycle, as of {combinedReportDate},{' '}
              {!isGoodOrUnkwown ? (
                <>
                  <strong>
                    {name} has raised {moneyHelper(totalRaised)} in Total Funds
                    , with{' '}
                    <ColoredText className="red">
                      {moneyHelper(bigMoneyFunds)}
                    </ColoredText>{' '}
                    ({perc}%) of the their funds coming from Big Money Sources
                  </strong>
                  , like Political Action Committees (PACs), Corporate Lobbyists
                  and Large Donors. <br />
                  <br />
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
              ) : (
                <>
                  {isBigMoney || isIncumbent ? (
                    <>
                      <strong>
                        {name} has raised {moneyHelper(totalRaised)} with{' '}
                        <ColoredText className={color}>
                          {moneyHelper(smallMoneyFunds)}
                        </ColoredText>{' '}
                        (
                        <ColoredText className={colorWithGray}>
                          {perc}%
                        </ColoredText>
                        ) of funds coming from Small Individual Donors
                      </strong>
                      , donating less than $200/each. <br /> <br />
                      This means that {lastName()} is mostly being supported by
                      large numbers of ordinary people, who are banding
                      together, each giving a little, to help {name} compete
                      with the Big Money pouring into this race. <br /> <br />
                      {!isIncumbent && (
                        <>
                          In contrast to {name}, the incumbent in this race,{' '}
                          <strong>
                            {comparedIncumbent.name}, has raised{' '}
                            {moneyHelper(comparedIncumbent.raised)}, or{' '}
                            {comparedIncumbent.xTimes}x times more money, with a{' '}
                            <ColoredText className="red">
                              {moneyHelper(comparedIncumbent.bigMoneyFunds)}
                            </ColoredText>{' '}
                            ({percHelper(comparedIncumbent.bigFundsPerc, true)}%
                            ) of funds coming from Big Money sources
                          </strong>
                          , like Political Action Committees (PACs), Corporate
                          Lobbyists and Large Donors.
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      <strong>
                        {name} has raised just {moneyHelper(totalRaised)} in
                        Total Funds, or{' '}
                        <ColoredText className="green">
                          {comparedIncumbent.relativePerc}%
                        </ColoredText>{' '}
                        of the funding of the incumbent in this race
                      </strong>
                    </>
                  )}

                  {!isIncumbent && !isBigMoney && (
                    <>
                      <br />
                      <br />
                      <strong>
                        The incumbent, {comparedIncumbent.name}, has raised{' '}
                        {moneyHelper(comparedIncumbent.raised)}, or{' '}
                        {comparedIncumbent.xTimes}x times more money, with a{' '}
                        <ColoredText className="red">
                          {moneyHelper(comparedIncumbent.bigMoneyFunds)}
                        </ColoredText>{' '}
                        ({percHelper(comparedIncumbent.bigFundsPerc, true)}% )
                        of funds coming from Big Money sources
                      </strong>
                      , like Political Action Committees (PACs), Corporate
                      Lobbyists and Large Donors.
                      <br />
                      <br />
                      Such a difference in funding creates a nearly impossible
                      hurdle that relatively less known, indie or grass-roots
                      candidates like {name} must overcome against a major party{' '}
                      {comparedIncumbent.isFakeIncumbent
                        ? 'Big Money Candidate'
                        : 'Incumbent'}{' '}
                      that Big Money Backers are bankrolling. The reason we
                      created The Good Party is to help such candidates.
                    </>
                  )}
                </>
              )}
            </Body13>

            <div className="text-center">
              <a href={openSecretLink} target="_blank">
                <OpenSecretsLink>
                  FEC DATA COURTESY OF OPENSECRETS.ORG
                </OpenSecretsLink>
              </a>
              <a
                href={`mailto:info@thegoodparty.org?subject=Data%20Error:%20Candidate%20Page&body=${
                  window.location.href
                }`}
              >
                <ReportError>Report an error</ReportError>
              </a>
            </div>
            <InfoWrapper>
              <Body className="bold600" style={{ marginTop: '48px' }}>
                Candidate Policy Positions:
              </Body>
              {chamberName === 'presidential' ? (
                <Body13>{candidateInfo}</Body13>
              ) : (
                <div>
                  <Body13>
                    The following policy positions were compiled by{' '}
                    <a href={ballotpediaLink} target="_blank">
                      Ballotpedia
                    </a>{' '}
                    from the candidate&apos;s official campaign website,
                    editorials, speeches, and interviews.
                  </Body13>
                  {candidateInfo && candidateInfo !== 'null' && (
                    <>
                      <Body11 style={{ margin: '16px 0' }}>
                        The following policy positions for {name} were compiled
                        by{' '}
                        <a href={ballotpediaLink} target="_blank">
                          Ballotpedia
                        </a>{' '}
                        from the candidate&apos;s survey, official campaign
                        website, editorials, speeches, and interviews.
                      </Body11>
                      <Body13
                        dangerouslySetInnerHTML={{ __html: candidateInfo }}
                      />
                    </>
                  )}
                </div>
              )}
            </InfoWrapper>

            {campaignWebsite && campaignWebsite !== 'null' && (
              <div>
                <Body className="bold600" style={{ margin: '48px 0 16px' }}>
                  Campaign Website
                </Body>
                <Body13 dangerouslySetInnerHTML={{ __html: campaignWebsite }} />
              </div>
            )}
            {(campaignWebsite && campaignWebsite !== 'null') ||
            (candidateInfo && candidateInfo !== 'null') ? (
              <div className="text-center" style={{ paddingBottom: '16px' }}>
                <a href={ballotpediaLink} target="_blank">
                  <OpenSecretsLink>
                    CANDIDATE DATA COURTESY OF BALLOTPEDIA
                  </OpenSecretsLink>
                </a>
                <ReportError>Report an error</ReportError>
              </div>
            ) : (
              <div className="text-center">
                <BallotpediaNoData style={{ padding: '16px 0' }}>
                  No data found for {name} on{' '}
                  <a href="https://ballotpedia.org/" target="_blank">
                    Ballotpedia
                  </a>
                  <br />
                  <br />
                  <a
                    href={`mailto:info@thegoodparty.org?subject=Data%20Error:%20Candidate%20Page&body=${
                      window.location.href
                    }`}
                  >
                    <ReportError>Report an error</ReportError>
                  </a>
                </BallotpediaNoData>
              </div>
            )}
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
  incumbent: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  user: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

export default CandidateWrapper;
