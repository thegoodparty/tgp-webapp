import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CheckIcon from '@material-ui/icons/Check';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

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
  candidateBlocName,
  candidateRankObj,
  houseElectionLink,
  partyResolver,
  presidentialElectionLink,
  rankText,
  senateElectionLink,
  shortToLongState,
} from 'helpers/electionsHelper';
import moneyHelper from 'helpers/moneyHelper';
import { numberFormatter, percHelper, toPrecision } from 'helpers/numberHelper';
import contentfulHelper from 'helpers/contentfulHelper';
import FacebookIcon from 'images/icons/facebook-icon.svg';
import WebsiteIcon from 'images/icons/website-icon.svg';
import TwitterIcon from 'images/icons/twitter-icon.svg';
import GrayCheckbox from 'images/icons/checkbox-gray.svg';
import RedCheckbox from 'images/icons/checkbox-red.svg';
import GreenCheckbox from 'images/icons/checkbox-green.svg';
import QuestionMarkGray from 'images/icons/question-mark.svg';
import { candidateRanking } from '../../../helpers/electionsHelper';
import { numberNth } from '../../../helpers/numberHelper';

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

const BlocCount = styled(Body13)`
  margin-top: 20px;
  color: ${({ theme }) => theme.colors.gray7};
  text-align: center;
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

const RankWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 12px;
  cursor: pointer;
`;

const CheckMark = styled(CheckIcon)`
  color: ${({ theme }) => theme.colors.lightBlue};
  && {
    font-size: 9px;
    @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
      font-size: 12px;
    }
  }
`;

const CloseIcon = styled(HighlightOffIcon)`
  color: ${({ theme }) => theme.colors.gray7};
  display: inline-block;
  && {
    font-size: 9px;
    @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
      font-size: 12px;
    }
  }
`;

const ChosenCand = styled(Body9)`
  color: ${({ theme }) => theme.colors.gray7};
  display: inline-block;
  margin: 0 6px;
  text-transform: uppercase;
`;

const StyledBody13 = styled(Body13)`
  font-weight: 400;
  padding: 0 2rem;
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
  chamberRank,
  chamberName,
  incumbent,
  user,
  deleteCandidateRankingCallback,
}) => {
  const [candidateInfo, setCandidateInfo] = useState('');
  const [campaignWebsite, setCampaignWebsite] = useState('');
  const [socialAccounts, setSocialAccounts] = useState([]);
  const [comparedIncumbent, setComparedIncumbent] = useState({});
  let isGood;
  if (candidate) {
    ({ isGood } = candidate);
  }
  const rank = candidateRanking(chamberRank, candidate);
  const rankObj = candidateRankObj(chamberRank, candidate);

  useEffect(() => {
    if (candidate) {
      const info = candidate.info;
      const facebook = candidate.facebook;
      const twitter = candidate.twitter;
      const website = candidate.website;
      let bio = '';

      try {
        bio = info ? decodeURI(info) : null;
      } catch (e) {
        bio = info;
        // console.log(e);
      }
      setCandidateInfo(bio);

      let campWebsite = '';
      try {
        campWebsite = candidate.campaignWebsite
          ? decodeURI(candidate.campaignWebsite)
          : null;
      } catch (e) {
        campWebsite = candidate.campaignWebsite;
        // console.log(e);
      }

      setCampaignWebsite(campWebsite);

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

  // useEffect(() => {
  //   if (candidate && chamberRank && chamberRank.length > 0) {
  //     const savedRank = chamberRank.indexOf(candidate.id) + 1;
  //     if (savedRank) {
  //       setRank(savedRank);
  //     } else {
  //       setRank(false);
  //     }
  //   } else {
  //     setRank(false);
  //   }
  // }, [chamberRank, candidate]);

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
    rankingCount,
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
  const lastName = name ? nameArr[nameArr.length - 1] : '';

  const coloredGood = () => {
    if (isGood) {
      return (
        <ColoredText className="green">
          <strong>Potentially Good</strong>
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
      return presidentialElectionLink();
    }
    if (chamberName === 'senate') {
      return senateElectionLink(state);
    }
    return houseElectionLink(state, district);
  };

  const rankPageJoinLink = () => {
    if (user) {
      const query = `?join=${candidate.id}&name=${encodeURI(candidate.name)}`;
      if (chamberName === 'presidential') {
        return presidentialElectionLink() + query;
      }
      if (chamberName === 'senate') {
        return senateElectionLink(state) + query;
      }
      return houseElectionLink(state, district) + query;
    } else {
      return '?register=true';
    }
  };

  const rankPageGrowLink = () => {
    const query = `?grow=${candidate.id}&name=${encodeURI(candidate.name)}`;
    if (chamberName === 'presidential') {
      return presidentialElectionLink() + query;
    }
    if (chamberName === 'senate') {
      return senateElectionLink(state) + query;
    }
    return houseElectionLink(state, district) + query;
  };

  // const rankLabel = () => {
  //   if (rank) {
  //     return `YOUR ${rankText(rank)} CHOICE`;
  //   }
  //   if (chamberRank && chamberRank.length > 0) {
  //     return 'EDIT CHOICES';
  //   }
  //   return 'RANK YOUR CHOICES';
  // };

  const bigMoneyFunds = candidate ? totalRaised * largeDonorPerc : 0;
  const smallMoneyFunds = totalRaised - bigMoneyFunds;
  const isSameAsComparedIncumbent = comparedIncumbent.name === candidate.name;
  const fakeIncumbentOrIncumbentLabel = comparedIncumbent.isFakeIncumbent
    ? 'top funded candidate'
    : 'incumbent';

  const blocName = candidateBlocName(candidate, chamberName);
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
              {isGoodOrUnkwown && (
                <>
                  <BlocCount>
                    {numberFormatter(rankingCount)}{' '}
                    {rankingCount === 1 ? 'person' : 'people'} have joined{' '}
                    <br />
                    <strong>{blocName}</strong>
                  </BlocCount>
                  {rank ? (
                    <>
                      <Link to={rankPageGrowLink()}>
                        <RankButton>
                          <StyledBody13>GROW {blocName}</StyledBody13>
                        </RankButton>
                      </Link>
                      <RankWrapper
                        onClick={() =>
                          deleteCandidateRankingCallback(
                            { ...rankObj, chamber: chamberName },
                            user,
                          )
                        }
                      >
                        <CheckMark />{' '}
                        <ChosenCand>{numberNth(rank)} CHOICE </ChosenCand>
                        <CloseIcon />
                      </RankWrapper>
                    </>
                  ) : (
                    <RankButton className="blue">
                      <Link to={rankPageJoinLink()}>
                        <StyledBody13 className="white">
                          JOIN {blocName}
                        </StyledBody13>
                      </Link>
                    </RankButton>
                  )}
                </>
              )}
            </TopRow>

            <Body style={{ marginTop: '32px' }}>
              Why {lastName} is {coloredGood()}
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
                      failing the character check.
                    </Body13>
                  </CheckboxRow>
                )}

                {isAligned === 'yes' ? (
                  <CheckboxRow>
                    <CheckboxImg src={GrayCheckbox} />
                    <Body13>
                      <strong>Character Check:</strong> Candidate passes{' '}
                      <Link to="?article=66i4vRRLkX1yf8MnCQvYSb">
                        our minimum standard of civility
                      </Link>
                      .
                    </Body13>
                  </CheckboxRow>
                ) : (
                  <>
                    {isAligned === 'no' ? (
                      <CheckboxRow>
                        <CheckboxImg src={RedCheckbox} />
                        <Body13>
                          <strong>
                            <ColoredText>Character Check:</ColoredText>{' '}
                          </strong>
                          Candidate fails to meet{' '}
                          <Link to="?article=66i4vRRLkX1yf8MnCQvYSb">
                            our minimum standard of civility
                          </Link>
                          . Candidate has engaged in a pattern of activities or{' '}
                          <Link to="?article=5bwvf0PwsbpFEe8IJ9sHhX">
                            hate-speech
                          </Link>{' '}
                          encouraging intolerance, discrimination or hostility
                          towards a constitutionally or state-protected group or
                          class.
                        </Body13>
                      </CheckboxRow>
                    ) : (
                      <CheckboxRow>
                        <CheckboxImg src={QuestionMarkGray} />
                        <Body13>
                          <strong>
                            <ColoredText className="gray">
                              Character Check:
                            </ColoredText>{' '}
                          </strong>
                          Candidate has not yet been vetted. Do you have factual
                          info about this candidate we should consider?{' '}
                          <a
                            href={`mailto:info@thegoodparty.org?subject=Character%20Check:%20Candidate%20Page&body=${
                              window.location.href
                            }`}
                          >
                            Please let us know
                          </a>
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
                          Character Check:
                        </ColoredText>
                      </strong>{' '}
                      Candidate passes{' '}
                      <Link to="?article=66i4vRRLkX1yf8MnCQvYSb">
                        minimum standard of civility
                      </Link>
                      .
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
                      <Link to="?article=2Pv9KNb6rng0sMfqwu1xKm">
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
                    <strong>Character Check: </strong>
                    Candidate has not yet been vetted. Do you have factual info
                    about this candidate we should consider?{' '}
                    <a
                      href={`mailto:info@thegoodparty.org?subject=Character%20Check:%20Candidate%20Page&body=${
                        window.location.href
                      }`}
                    >
                      Please let us know
                    </a>
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
                  {isIncumbent || isSameAsComparedIncumbent ? (
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
                    Big Money backers are bankrolling {lastName}
                    ’s {isIncumbent && 're-'}election at a rate of{' '}
                    <ColoredText className={color}>{perHour}/hr</ColoredText>{' '}
                    for every hour {isIncumbent ? lastName : 'the incumbent'}{' '}
                    has been in office.
                  </strong>{' '}
                  Of course, Big Money Backers usually expect a big return on
                  their investments, which means, if {isIncumbent && 're-'}
                  elected, {name} will have to work very hard to deliver a good
                  return for them.
                </>
              ) : (
                <>
                  {isBigMoney || isIncumbent || isSameAsComparedIncumbent ? (
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
                      This means that {lastName} is mostly being supported by
                      large numbers of ordinary people, who are banding
                      together, each giving a little, to help {name} compete
                      with the Big Money pouring into this race. <br /> <br />
                      {!isIncumbent && !isSameAsComparedIncumbent && (
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
                        of the funding of the {fakeIncumbentOrIncumbentLabel} in
                        this race
                      </strong>
                    </>
                  )}

                  {!isIncumbent && !isBigMoney && !isSameAsComparedIncumbent && (
                    <>
                      <br />
                      <br />
                      <strong>
                        The {fakeIncumbentOrIncumbentLabel},{' '}
                        {comparedIncumbent.name}, has raised{' '}
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

              <div>
                {((campaignWebsite && campaignWebsite !== null) ||
                  (candidateInfo && candidateInfo)) !== null && (
                  <Body13 style={{ marginTop: '12px' }}>
                    The following policy positions for {name} were compiled by{' '}
                    <a href={ballotpediaLink} target="_blank">
                      Ballotpedia
                    </a>{' '}
                    from the candidate&apos;s survey, official campaign website,
                    editorials, speeches, and interviews.
                  </Body13>
                )}
              </div>
            </InfoWrapper>

            {campaignWebsite && campaignWebsite !== 'null' && (
              <div>
                <Body className="bold600" style={{ margin: '48px 0 16px' }}>
                  Campaign Website
                </Body>
                <Body13 dangerouslySetInnerHTML={{ __html: campaignWebsite }} />
              </div>
            )}

            {candidateInfo && candidateInfo !== 'null' && (
              <div>
                <Body className="bold600" style={{ margin: '48px 0 16px' }}>
                  CandidateConnection
                </Body>
                <Body13 dangerouslySetInnerHTML={{ __html: candidateInfo }} />
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
                  <a href={ballotpediaLink} target="_blank">
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
  candidate: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  chamberRank: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  chamberName: PropTypes.string,
  incumbent: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  user: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  deleteCandidateRankingCallback: PropTypes.func,
};

export default CandidateWrapper;
