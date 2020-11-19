import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Sticky from 'react-sticky-el';
import Hidden from '@material-ui/core/Hidden';
import Link from 'next/link';
import Grid from '@material-ui/core/Grid';
import VotesNeeded from 'components/home/ChallengersSection/VotesNeeded';
import { Body11, Body13, Body14 } from 'components/shared/typogrophy';
import JoinedIcon from 'public/images/icons/joined-icon.svg';
import GraphIcon from 'public/images/icons/graph-icon.svg';
import { kFormatter, numberFormatter } from 'helpers/numberHelper';
import Body from 'components/shared/typogrophy/Body';
import { candidateRoute } from 'helpers/electionsHelper';
import SupportersProgressBar from '../SupportersProgressBar';
import ShareButtons from './ShareButtons';
import WonLostElection from '../../shared/WonLostElection';

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
  addVoteCallback,
  openShareCallback,
}) => {
  const {
    name,
    rankingCount,
    likelyVoters,
    twitterFollowers,
    state,
    district,
    recentActivity,
    shares,
    activityCount,
    votesNeeded,
    votesReceived,
  } = candidate;
  const route = candidateRoute(candidate);
  const votes =
    votesReceived !== 0 ? votesReceived : likelyVoters + rankingCount;
  return (
    <ScrollArea className="scroll-area">
      <Sticky
        boundaryElement=".scroll-area"
        hideOnBoundaryHit={false}
        dontUpdateHolderHeightWhenSticky
      >
        <Inner>
          <Wrapper>
            <WonLostElection candidate={candidate} style={{ marginTop: 0 }} />
            <VotesNeededWrapper>
              <VotesNeeded candidate={candidate} />
            </VotesNeededWrapper>
            <SupportersProgressBar
              peopleSoFar={votes}
              votesNeeded={votesNeeded}
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
                  <Body11 title={numberFormatter(votes)}>
                    {kFormatter(votes)}
                  </Body11>
                  <Gray7>
                    {votesReceived !== 0 ? '2020 Votes' : 'likely voters'}
                  </Gray7>
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
            <ShareButtons
              candidate={candidate}
              chamberRank={chamberRank}
              district={district}
              chamberName={chamberName}
              user={user}
              deleteCandidateRankingCallback={deleteCandidateRankingCallback}
              state={state}
              addVoteCallback={addVoteCallback}
              openShareCallback={openShareCallback}
            />
            {hideTab ? (
              <>
                <br />
                <br />
              </>
            ) : (
              <>
                {tab === 'campaign' ? (
                  <Link href={`${route}/info`}>
                    <TabText>Learn more about {name}</TabText>
                  </Link>
                ) : (
                  <Link href={route}>
                    <TabText>See campaign for {name}</TabText>
                  </Link>
                )}
              </>
            )}

            <Hidden smDown>
              <Body className="bold600" style={{ marginBottom: '12px' }}>
                Recent Activity
              </Body>
              <JoinedItem className="no-border">
                <JoinedImg src={GraphIcon} alt="joined" />
                <div>
                  {kFormatter(activityCount)}{' '}
                  {activityCount === 1 ? 'person' : 'people'} joined or shared
                </div>
              </JoinedItem>
              {recentActivity.map((joined, index) => (
                <JoinedItem key={`${joined.name}-${index}`}>
                  <JoinedImg src={joined.avatar || JoinedIcon} alt="joined" />
                  <div>
                    <Row>
                      <StyledBody14>{joined.name}</StyledBody14>
                      <Body13>{joined.district}</Body13>
                    </Row>
                    <Ago>
                      {joined.type} {joined.timeAgo}
                    </Ago>
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
  addVoteCallback: PropTypes.func,
  openShareCallback: PropTypes.func,
};

export default RightCard;
