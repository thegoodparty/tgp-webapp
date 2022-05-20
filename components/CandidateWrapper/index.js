/**
 *
 * CandidateWrapper
 *
 */

import React, { useContext } from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';

import NotFound from '/containers/shared/NotFoundPage';
import PageWrapper from '../shared/PageWrapper';

import ProfileCard from './left/ProfileCard';
import EndorseSection from './left/EndorseSection';
import { CandidateContext } from '../../containers/CandidatePage';
import SupportButton from './left/SupportButton';
import RecentlyJoined from './left/RecentlyJoined';
import HeroSection from './right/HeroSection';
import Summary from './right/Summary';
import TopIssues from './right/TopIssues';
import Follow from './right/Follow';
import Updates from './right/Updates';
import Endorsements from './right/Endorsements';
import DateBox from './left/DateBox';

const InnerWrapper = styled.div`
  padding-top: 36px;
`;

function CandidateWrapper() {
  const { candidate, candidatePositions } = useContext(CandidateContext);
  if (!candidate) {
    return <NotFound />;
  }
  const withTopIssues = candidatePositions?.length > 0;
  return (
    <PageWrapper>
      <InnerWrapper>
        <Grid container spacing={8}>
          <Grid item xs={12} md={4}>
            <ProfileCard />
            <DateBox showPast={false} />
            <EndorseSection />

            <DateBox showPast />
            <RecentlyJoined />

            {/*<Hidden mdDown>*/}
            {/*  <SimilarCampaigns />*/}
            {/*</Hidden>*/}
          </Grid>
          <Grid item xs={12} md={8}>
            <HeroSection />
            <Grid container spacing={4}>
              <Grid item xs={12} md={withTopIssues ? 7 : 12}>
                <Summary />
              </Grid>
              {withTopIssues && (
                <Grid item xs={12} md={5}>
                  <TopIssues />
                </Grid>
              )}
            </Grid>
            {/*<Hidden lgUp>*/}
            {/*  <SimilarCampaigns />*/}
            {/*</Hidden>*/}
            <Endorsements />
            <Follow />
            <Updates />
          </Grid>
        </Grid>
      </InnerWrapper>
    </PageWrapper>
  );
}

export default CandidateWrapper;
