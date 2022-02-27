/**
 *
 * CandidateWrapper
 *
 */

import React, { useContext } from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';

import NotFound from '/containers/shared/NotFoundPage';
import PageWrapper from '../shared/PageWrapper';

import ProfileCard from './ProfileCard';
import EndorseSection from './EndorseSection';
import { CandidateContext } from '../../containers/CandidatePage';
import Stats from './Stats';
import SupportButton from './SupportButton';
import RecentlyJoined from './RecentlyJoined';
import SimilarCampaigns from './SimilarCampigns';
import HeroSection from './HeroSection';

const InnerWrapper = styled.div`
  padding-top: 36px;
`;

function CandidateWrapper() {
  const { candidate } = useContext(CandidateContext);
  if (!candidate) {
    return <NotFound />;
  }
  return (
    <PageWrapper>
      <InnerWrapper>
        <Grid container spacing={8}>
          <Grid item xs={12} md={4}>
            <ProfileCard />
            <EndorseSection />
            <Stats />
            <RecentlyJoined />
            <SupportButton />
            <SimilarCampaigns />
          </Grid>
          <Grid item xs={12} md={8}>
            <HeroSection />
          </Grid>
        </Grid>
      </InnerWrapper>
    </PageWrapper>
  );
}

export default CandidateWrapper;
