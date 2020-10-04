import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';

import PageWrapper from 'components/shared/PageWrapper';
import LoadingAnimation from 'components/shared/LoadingAnimation';
import { Body13 } from 'components/shared/typogrophy';

import TopRow from './TopRow';
import MoneyAndCharacter from './MoneyAndCharacter';
import FollowTheMoney from './FollowTheMoney';
import FinancialText from './FinancialText';
import PolicyPositions from './PolicyPositions';
import CampaignWebsite from './CampaignWebsite';
import CandidateProfile from './CandidateProfile';
import RightCard from './RightCard';
import { candidateRoute } from '../../../helpers/electionsHelper';

const ContentWrapper = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 20px;
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 3rem 16px 0;
  }
`;

const TabsWrapper = styled.div`
  margin: 23px 0 35px;
  display: flex;
  justify-content: center;
  border-bottom: solid ${({ theme }) => theme.colors.grayC} 1px;
`;

const Tab = styled(Body13)`
  padding: 12px 30px;
  font-weight: 500;
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.colors.blue};
  }

  &.active {
    border-bottom: solid ${({ theme }) => theme.colors.blue} 2px;
    color: ${({ theme }) => theme.colors.blue};
  }
`;

const CandidateWrapper = ({
  candidate,
  chamberRank,
  chamberName,
  incumbent,
  user,
  deleteCandidateRankingCallback,
  tab = 'campaign',
}) => {
  let isGood;
  if (candidate) {
    ({ isGood } = candidate);
  }
  const isUnknown = isGood === null;
  const isGoodOrUnknown = isGood || isUnknown;

  const mobileHeaderProps = {
    showGood: true,
    isGood,
    showShare: true,
    user,
  };
  const route = candidateRoute(candidate);
  return (
    <PageWrapper mobileHeaderProps={mobileHeaderProps} isFullWidth white>
      <ContentWrapper>
        {candidate?.name ? (
          <Grid container spacing={3}>
            <Grid item xs={12} md={isGoodOrUnknown ? 8 : 12}>
              <TopRow candidate={candidate} chamberName={chamberName} />
              {isGoodOrUnknown && (
                <Hidden mdUp>
                  <Grid item xs={12}>
                    <RightCard
                      candidate={candidate}
                      chamberName={chamberName}
                      user={user}
                      chamberRank={chamberRank}
                      deleteCandidateRankingCallback={
                        deleteCandidateRankingCallback
                      }
                      tab={tab}
                    />
                  </Grid>
                </Hidden>
              )}
              <TabsWrapper>
                <Link to={route}>
                  <Tab className={tab === 'campaign' ? 'active' : ''}>
                    CAMPAIGN STATUS
                  </Tab>
                </Link>
                <Link to={`${route}/info`}>
                  <Tab className={tab !== 'campaign' ? 'active' : ''}>
                    CANDIDATE INFO
                  </Tab>
                </Link>
              </TabsWrapper>
              {tab === 'campaign' ? (
                <div>Campaign Status</div>
              ) : (
                <>
                  <MoneyAndCharacter
                    candidate={candidate}
                    incumbent={incumbent}
                  />
                  <FollowTheMoney candidate={candidate} incumbent={incumbent} />
                  <FinancialText
                    candidate={candidate}
                    incumbent={incumbent}
                    chamberName={chamberName}
                  />
                  <CandidateProfile candidate={candidate} />
                  <PolicyPositions candidate={candidate} />
                  <CampaignWebsite candidate={candidate} />
                </>
              )}
            </Grid>
            {isGoodOrUnknown && (
              <Hidden smDown>
                <Grid item xs={4}>
                  <RightCard
                    candidate={candidate}
                    chamberName={chamberName}
                    user={user}
                    chamberRank={chamberRank}
                    deleteCandidateRankingCallback={
                      deleteCandidateRankingCallback
                    }
                    tab={tab}
                  />
                </Grid>
              </Hidden>
            )}
          </Grid>
        ) : (
          <LoadingAnimation />
        )}
      </ContentWrapper>
    </PageWrapper>
  );
};

CandidateWrapper.propTypes = {
  candidate: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  chamberRank: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  chamberName: PropTypes.string,
  incumbent: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  user: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  deleteCandidateRankingCallback: PropTypes.func,
  tab: PropTypes.string,
};

export default CandidateWrapper;
