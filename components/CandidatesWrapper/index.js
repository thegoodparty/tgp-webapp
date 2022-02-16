/**
 *
 * CandidatesWrapper
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';

import PageWrapper from '../shared/PageWrapper';
// import GoodCertifiedAreSection from '../HomePageWrapperOld/GoodCertifiedAreSection';
// import FeaturedCandidateSection from '../HomePageWrapperOld/CandidatesSection';
import CandidatesSection from './CandidatesSection';
import VideoSection from './VideoSection';
import IllustrationSection from './IllustrationSection';
import GoodCertified from '../HomePageWrapper/GoodCertified';
import FeaturedCampaigns from '../HomePageWrapper/FeaturedCampaigns';

const Content = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.breakpointsPixels.contentMax};
  margin: 0 auto 48px;
  padding: 36px 0 0;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    padding: 48px 0;
    overflow-x: visible;
    max-width: 1280px;
  }
`;


function CandidatesWrapper({ candidates, homepageCandidates }) {
  return (
    <PageWrapper isFullWidth>
      <Content>
        <GoodCertified />
        {/*<GoodCertifiedAreSection headerElement="h1" />*/}
        <br />
        <br />
        <FeaturedCampaigns homepageCandidates={homepageCandidates} />
        {/*<FeaturedCandidateSection*/}
        {/*  homepageCandidates={homepageCandidates}*/}
        {/*  hideSeeMore*/}
        {/*/>*/}
        <CandidatesSection candidates={candidates} />
        <Grid container spacing={5}>
          <Grid item xs={12} md={7}>
            <IllustrationSection />
          </Grid>
          <Grid item xs={12} md={5}>
            <VideoSection />
          </Grid>
        </Grid>
      </Content>
    </PageWrapper>
  );
}

CandidatesWrapper.propTypes = {
  candidates: PropTypes.object,
  homepageCandidates: PropTypes.array,
};

export default CandidatesWrapper;
