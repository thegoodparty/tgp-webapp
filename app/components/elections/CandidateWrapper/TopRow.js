import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CheckIcon from '@material-ui/icons/Check';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Button from '@material-ui/core/Button';
import { H3, Body13, Body9, Body11 } from 'components/shared/typogrophy';
import CandidateAvatar from 'components/shared/CandidateAvatar';
import {
  candidateBlocName,
  candidateRankObj,
  houseElectionLink,
  partyResolver,
  presidentialElectionLink,
  candidateRanking,
  senateElectionLink,
  shortToLongState,
  blocNameSuffix,
} from 'helpers/electionsHelper';
import { numberNth } from 'helpers/numberHelper';
import { getVotesNeededState } from 'helpers/candidatesHelper';
import FacebookIcon from 'images/icons/facebook-icon.svg';
import WebsiteIcon from 'images/icons/website-icon.svg';
import TwitterIcon from 'images/icons/twitter-icon.svg';
import ShareIcon from 'images/icons/share-icon.svg';
import { IconButton } from '@material-ui/core';
import SupportersProgressBar from '../SupportersProgressBar';

const TopRowWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
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
const ShareButton = styled(Link)`
  && {
    display: flex;
    align-items: flex-end;
    position: absolute;
    right: 0;
    color: #117cb6;
    font-size: 17px;
    img {
      margin-right: 5px;
    }
  }
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

const ChamberLink = styled(Body11)`
  margin-top: 5px;
  text-transform: capitalize;
`;

const TopRow = ({
  candidate,
  chamberRank,
  chamberName,
  user,
  deleteCandidateRankingCallback,
}) => {
  const [socialAccounts, setSocialAccounts] = useState([]);
  let isGood;
  if (candidate) {
    ({ isGood } = candidate);
  }
  const rank = candidateRanking(chamberRank, candidate);
  const rankObj = candidateRankObj(chamberRank, candidate);

  useEffect(() => {
    if (candidate) {
      const { facebook, twitter, website } = candidate;

      setSocialAccounts([
        { name: 'website', url: website, icon: WebsiteIcon },
        { name: 'facebook', url: facebook, icon: FacebookIcon },
        { name: 'twitter', url: twitter, icon: TwitterIcon },
      ]);
    } else {
      setSocialAccounts([]);
    }
  }, [candidate]);

  const {
    name,
    image,
    party,
    isIncumbent,
    state,
    district,
    rankingCount,
  } = candidate;

  const isUnkown = isGood === null;
  const isGoodOrUnkwown = isGood || isUnkown;

  const chamberLink = () => {
    if (chamberName === 'presidential') {
      return (
        <ChamberLink>
          <Link to={rankPageLink()} data-cy="chamber-link">
            U.S. President
          </Link>
        </ChamberLink>
      );
    }
    if (chamberName === 'senate') {
      if (state) {
        return (
          <ChamberLink>
            <Link to={rankPageLink()} data-cy="chamber-link">
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
            <Link to={rankPageLink()} data-cy="chamber-link">
              U.S. House for District {state.toUpperCase()}-{district}
            </Link>
          </ChamberLink>
        );
      }
    }
  };

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
    }
    return '?register=true';
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

  const socialAccountSection = () => {
    if (socialAccounts.length > 0) {
      return (
        <SocialLinks>
          {socialAccounts.map((social, index) => (
            <React.Fragment key={`${index}-${social.url}`}>
              {social.url && social.url !== '' && (
                <a href={social.url} target="_blank" data-cy="social-link">
                  <IconWrapper>
                    <img src={social.icon} alt={social.name} />
                    <SocialLabel>{social.name}</SocialLabel>
                  </IconWrapper>
                </a>
              )}
            </React.Fragment>
          ))}
        </SocialLinks>
      );
    }
  };

  const blocName = candidateBlocName(candidate);
  const isTwitter = blocName.charAt(0) === '@';
  const prefixText = () => {
    if (isTwitter) {
      return (
        <>
          support{' '}
          <a href={candidate.twitter} target="_blank">
            <strong>{blocName}</strong>
          </a>
        </>
      );
    }
    return (
      <>
        support <strong>{blocName}</strong>
      </>
    );
  };

  const votesNeededState = getVotesNeededState(chamberName, district, state);
  return (
    <TopRowWrapper data-cy="top-row">
      <ShareButton to={rankPageGrowLink()}>
        <img src={ShareIcon} alt="more" />
        Share
      </ShareButton>
      <CandidateAvatar src={image} good={isGood} name={name} size="xl" />
      <H3 style={{ marginTop: '14px' }} data-cy="top-name">
        {name}
      </H3>
      <Body11
        style={{ marginTop: '5px' }}
        className="bold500"
        data-cy="top-position"
      >
        {partyResolver(party)} {isIncumbent ? 'INCUMBENT' : 'CANDIDATE'}
      </Body11>
      {chamberLink()}
      {socialAccountSection()}
      {isGoodOrUnkwown && (
        <>
          <BlocCount data-cy="bloc-count">
            <SupportersProgressBar
              peopleSoFar={rankingCount}
              votesNeeded={candidate.votesNeeded}
              userState={votesNeededState}
              prefixText={prefixText()}
              suffixText={
                chamberName === 'presidential' ? ' (270 ELECTORS)' : ''
              }
            />
          </BlocCount>
          {rank ? (
            <>
              <Link to={rankPageGrowLink()}>
                <RankButton>
                  <StyledBody13>
                    GROW <strong>{blocName}</strong> {blocNameSuffix(blocName)}
                  </StyledBody13>
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
                <CheckMark /> <ChosenCand>{numberNth(rank)} CHOICE </ChosenCand>
                <CloseIcon />
              </RankWrapper>
            </>
          ) : (
            <RankButton className="blue">
              <Link to={rankPageJoinLink()} data-cy="rank-button">
                <StyledBody13 className="white">
                  JOIN {blocName} {blocNameSuffix(blocName)}
                </StyledBody13>
              </Link>
            </RankButton>
          )}
        </>
      )}
    </TopRowWrapper>
  );
};

TopRow.propTypes = {
  candidate: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  chamberRank: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  chamberName: PropTypes.string,
  user: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  deleteCandidateRankingCallback: PropTypes.func,
};

export default TopRow;
