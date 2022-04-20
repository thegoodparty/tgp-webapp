import React from 'react';
// import styled from 'styled-components';
import PageWrapper from '/components/shared/PageWrapper';
import Hero from './Hero';
import Together from './Together';
import WhosInIt from './WhosInIt';
import GoodPartyIs from './GoodPartyIs';
import HowWorks from './HowWorks';
import Pledge from './Pledge';
import FeaturedCampaigns from './FeaturedCampaigns';

const HomePageWrapper = () => {
  return (
    <PageWrapper isFullWidth>
      <Hero />
      <Together />
      <WhosInIt />
      <GoodPartyIs />
      <HowWorks />
      <Pledge />
      <FeaturedCampaigns />
    </PageWrapper>
  );
};

export default HomePageWrapper;
