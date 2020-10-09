import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';

import PageWrapper from 'components/shared/PageWrapper';
import LoadingAnimation from 'components/shared/LoadingAnimation';

import TopRow from './TopRow';
import MoneyAndCharacter from './MoneyAndCharacter';
import FollowTheMoney from './FollowTheMoney';
import FinancialText from './FinancialText';
import PolicyPositions from './PolicyPositions';
import CampaignWebsite from './CampaignWebsite';
import CandidateProfile from './CandidateProfile';
import RightCard from './RightCard';
import Tabs from './Tabs';
import CampaignStatus from './CampaignStatus';
import BottomButtons from './BottomButtons';

const ContentWrapper = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 20px;
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 3rem 16px 0;
  }
`;

const CandidateWrapper = ({
  candidate,
  chamberRank,
  chamberName,
  incumbent,
  user,
  deleteCandidateRankingCallback,
  routeTab = 'campaign',
  content,
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  let isGood;
  let campaignSummary;
  let campaignUpdates;
  if (candidate) {
    ({ isGood, campaignSummary, campaignUpdates } = candidate);
  }
  const isUnknown = isGood === null;
  const isGoodOrUnknown = isGood || isUnknown;

  let tab = routeTab;
  let hideTab = false;
  if (!campaignSummary && !campaignUpdates?.length > 0) {
    tab = 'info';
    hideTab = true;
  }

  const mobileHeaderProps = {
    showGood: true,
    isGood,
    showShare: true,
    user,
  };
  const buttonsProps = {
    candidate,
    chamberName,
    user,
    chamberRank,
    deleteCandidateRankingCallback,
  };

  const rightCard = <RightCard {...buttonsProps} tab={tab} hideTab={hideTab} />;
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
                    {rightCard}
                  </Grid>
                </Hidden>
              )}
              {!hideTab && <Tabs candidate={candidate} tab={tab} />}
              {tab === 'campaign' ? (
                <>
                  <CampaignStatus
                    candidate={candidate}
                    content={content}
                    showButtons={isGoodOrUnknown}
                    buttonsProps={buttonsProps}
                  />
                </>
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
                  <CampaignWebsite candidate={candidate} />
                  <PolicyPositions candidate={candidate} />
                  {isGoodOrUnknown && <BottomButtons {...buttonsProps} />}
                </>
              )}
            </Grid>
            {isGoodOrUnknown && (
              <Hidden smDown>
                <Grid item xs={4}>
                  {rightCard}
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
  routeTab: PropTypes.string,
  content: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

export default CandidateWrapper;
