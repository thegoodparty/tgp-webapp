import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Sticky from 'react-sticky-el';
import Hidden from '@material-ui/core/Hidden';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import VotesNeeded from 'components/home/ChallengersSection/VotesNeeded';
import { Body11, Body13, Body14, Body9 } from 'components/shared/typogrophy';
import ShareIcon from 'images/icons/share-icon.svg';
import ShareIconWhite from 'images/icons/share-icon-white.svg';
import JoinedIcon from 'images/icons/joined-icon.svg';
import GraphIcon from 'images/icons/graph-icon.svg';
import HeartIcon from 'images/white-heart.svg';
import CheckIcon from '@material-ui/icons/Check';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { kFormatter, numberFormatter, numberNth } from 'helpers/numberHelper';
import { BlueButton, OutlinedButton } from 'components/shared/buttons';
import Body from 'components/shared/typogrophy/Body';
import {
  candidateRanking,
  candidateRankObj,
  candidateRoute,
  rankPageGrowLink,
  rankPageJoinLink,
} from 'helpers/electionsHelper';
import SupportersProgressBar from '../SupportersProgressBar';

const ScrollArea = styled.div`
  height: calc(100% - 60px - 65px);
  position: relative;
  top: 0;
`;

const Inner = styled.div`
  padding-top: 65px;
`;
const Wrapper = styled.div`
  border-radius: 8px;
  margin-top: 12px;
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 50px 30px;
    background-color: #fff;
    box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.1);
    max-height: calc(100% - 60px - 65px);
    overflow: auto;
  }
`;

const VotesNeededWrapper = styled(Body13)`
  color: ${props => props.theme.colors.gray7};
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 16px;
    line-height: 22px;
  }
`;

const Stats = styled.div`
  background-color: ${props => props.theme.colors.grayF};
  padding: 7px 16px;
  margin: 32px 0;
  border-radius: 6px;
`;

const Gray7 = styled(Body11)`
  color: ${props => props.theme.colors.gray7};
`;

const RankWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 12px;
  cursor: pointer;
  padding: 20px 0 0;
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 20px 0 12px;
  }
`;

const CheckMark = styled(CheckIcon)`
  color: ${({ theme }) => theme.colors.lightBlue};
  && {
    font-size: 13px;
    @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
      font-size: 16px;
    }
  }
`;

const ChosenCand = styled(Body13)`
  color: ${({ theme }) => theme.colors.gray7};
  display: inline-block;
  margin: 0 6px;
  text-transform: uppercase;
`;

const CloseIcon = styled(HighlightOffIcon)`
  color: ${({ theme }) => theme.colors.gray7};
  display: inline-block;
  && {
    font-size: 13px;
    @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
      font-size: 16px;
    }
  }
`;

const InnerButton = styled.div`
  position: relative;
  width: 100%;
`;

const Img = styled.img`
  position: absolute;
  top: 0;
  left: 24px;
  width: 16px;
  height: auto;

  &.heart {
    top: 4px;
    width: 24px;
  }
`;

const TabText = styled(Body14)`
  color: ${props => props.theme.colors.blue};
  cursor: pointer;
  margin: 32px 0;
  text-align: center;
`;

const JoinedItem = styled(Body14)`
  display: flex;
  align-items: center;
  color: ${props => props.theme.colors.gray7};
  padding: 13px 0;
  border-top: solid 1px #ddd;

  &.no-border {
    border-top: none;
  }
`;

const Ago = styled(Body11)`
  color: ${props => props.theme.colors.gray7};
`;

const JoinedImg = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 20px;
  border-radius: 50%;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
`;

const StyledBody14 = styled.div`
  color: ${props => props.theme.colors.gray3};
  margin-right: 6px;
`;

const RightCard = ({
  user,
  candidate,
  chamberName,
  chamberRank,
  deleteCandidateRankingCallback,
  tab,
  hideTab,
}) => {
  const {
    name,
    rankingCount,
    likelyVoters,
    twitterFollowers,
    state,
    district,
    recentlyJoined,
    shares,
  } = candidate;
  const rank = candidateRanking(chamberRank, candidate);
  const rankObj = candidateRankObj(chamberRank, candidate);
  const route = candidateRoute(candidate);
  return (
    <ScrollArea className="scroll-area">
      <Sticky
        boundaryElement=".scroll-area"
        hideOnBoundaryHit={false}
        dontUpdateHolderHeightWhenSticky
      >
        <Inner>
          <Wrapper>
            <VotesNeededWrapper>
              <VotesNeeded candidate={candidate} />
            </VotesNeededWrapper>
            <SupportersProgressBar
              peopleSoFar={likelyVoters}
              votesNeeded={candidate.votesNeeded}
              showSupporters={false}
              showSuffix={false}
              fullWidth
            />
            <Stats>
              <Body14
                className="bold600"
                style={{ marginBottom: '12px', color: '#333' }}
              >
                Campaign Stats
              </Body14>
              <Grid container spacing={3}>
                <Grid item xs={4} className="text-center">
                  <Body11 title={numberFormatter(likelyVoters + rankingCount)}>
                    {kFormatter(likelyVoters + rankingCount)}
                  </Body11>
                  <Gray7>likely voters</Gray7>
                </Grid>
                <Grid item xs={4} className="text-center">
                  <Body11 title={numberFormatter(shares)}>
                    {kFormatter(shares)}
                  </Body11>
                  <Gray7>shares</Gray7>
                </Grid>
                <Grid item xs={4} className="text-center">
                  <Body11
                    title={numberFormatter(
                      likelyVoters + twitterFollowers + rankingCount,
                    )}
                  >
                    {kFormatter(likelyVoters + twitterFollowers + rankingCount)}
                  </Body11>
                  <Gray7>supporters</Gray7>
                </Grid>
              </Grid>
            </Stats>
            <Link
              to={rankPageGrowLink(candidate, chamberName, state, district)}
            >
              {rank ? (
                <BlueButton fullWidth>
                  <InnerButton>
                    <Img src={ShareIconWhite} alt="share" />
                    SHARE
                  </InnerButton>
                </BlueButton>
              ) : (
                <OutlinedButton active fullWidth>
                  <InnerButton>
                    <Img src={ShareIcon} alt="share" />
                    SHARE
                  </InnerButton>
                </OutlinedButton>
              )}
            </Link>
            {rank ? (
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
            ) : (
              <Link
                to={rankPageJoinLink(
                  user,
                  candidate,
                  chamberName,
                  state,
                  district,
                )}
                data-cy="rank-button"
              >
                <BlueButton fullWidth style={{ marginTop: '24px' }}>
                  <InnerButton>
                    <Img src={HeartIcon} alt="vote" className="heart" />
                    ADD YOUR VOTE
                  </InnerButton>
                </BlueButton>
              </Link>
            )}
            {hideTab ? (
              <>
                <br />
                <br />
              </>
            ) : (
              <>
                {tab === 'campaign' ? (
                  <Link to={`${route}/info`}>
                    <TabText>Learn more about {name}</TabText>
                  </Link>
                ) : (
                  <Link to={route}>
                    <TabText>See campaign for {name}</TabText>
                  </Link>
                )}
              </>
            )}

            <Hidden smDown>
              <Body className="bold600" style={{ marginBottom: '12px' }}>
                Recently Joined
              </Body>
              <JoinedItem className="no-border">
                <JoinedImg src={GraphIcon} alt="joined" />
                <div>
                  {kFormatter(rankingCount)}{' '}
                  {rankingCount === 1 ? 'person' : 'people'} joined
                </div>
              </JoinedItem>
              {recentlyJoined.map((joined, index) => (
                <JoinedItem key={`${joined.name}-${index}`}>
                  <JoinedImg src={joined.avatar || JoinedIcon} alt="joined" />
                  <div>
                    <Row>
                      <StyledBody14>{joined.name}</StyledBody14>
                      <Body13>{joined.district}</Body13>
                    </Row>
                    <Ago>{joined.timeAgo}</Ago>
                  </div>
                </JoinedItem>
              ))}
            </Hidden>
          </Wrapper>
        </Inner>
      </Sticky>
    </ScrollArea>
  );
};

RightCard.propTypes = {
  candidate: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  chamberRank: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  chamberName: PropTypes.string,
  user: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  deleteCandidateRankingCallback: PropTypes.func,
  tab: PropTypes.string,
  hideTab: PropTypes.bool,
};

export default RightCard;
