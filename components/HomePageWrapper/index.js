import React from 'react';
// import styled from 'styled-components';
import PageWrapper from '/components/shared/PageWrapper';
import Hero from './Hero';
import MaxWidth from '../shared/MaxWidth';
import SocialSection from './SocialSection';
import GrayParty from './GrayParty';
import WhatIsIt from './WhatIsIt';
import Accomplish from './Accomplish';
import Anatomy from './Anatomy';
import SoFIt from './SoFIt';

const HomePageWrapper = () => {
  return (
    <PageWrapper isFullWidth>
      <MaxWidth style={{ padding: '0 24px' }}>
        <Hero />
        <SocialSection />
      </MaxWidth>
      <GrayParty />
      <MaxWidth style={{ padding: '0 24px' }}>
        <WhatIsIt />
        <Accomplish />
        <Anatomy />
        <SoFIt />
      </MaxWidth>
    </PageWrapper>
  );
};

export default HomePageWrapper;
