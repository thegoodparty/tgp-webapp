import React from 'react';
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

const ContentWrapper = styled.div`
  max-width: 1280px;
  margin: 0 auto;
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

  return (
    <PageWrapper mobileHeaderProps={mobileHeaderProps} isFullWidth>
      <ContentWrapper>
        {candidate?.name ? (
          <Grid container spacing={3}>
            <Grid item xs={12} md={isGoodOrUnknown ? 8 : 12}>
              <TopRow
                candidate={candidate}
                chamberName={chamberName}
              />
              <MoneyAndCharacter candidate={candidate} incumbent={incumbent} />
              <FollowTheMoney candidate={candidate} incumbent={incumbent} />
              <FinancialText
                candidate={candidate}
                incumbent={incumbent}
                chamberName={chamberName}
              />
              <CandidateProfile candidate={candidate} />
              <PolicyPositions candidate={candidate} />
              <CampaignWebsite candidate={candidate} />
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
};

export default CandidateWrapper;
