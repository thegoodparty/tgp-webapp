import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import PageWrapper from 'components/shared/PageWrapper';
import Hero from './Hero';
import NotRepresented from './NotRepresented';
import Testimonials from './Testimonials';
import GoodPartyIs from './GoodPartyIs';
import HowWorks from './HowWorks';
import GoodCertified from './GoodCertified';
import FeaturedCampaigns from './FeaturedCampaigns';
import StayTuned from './StayTuned';

const HomePageWrapper = ({ homepageCandidates, engagements }) => {
  const sections = [
    { component: <Hero engagements={engagements} />, key: 'hero' },
    { component: <NotRepresented />, key: 'not-rep' },
    { component: <Testimonials />, key: 'testimonials' },
    { component: <GoodPartyIs />, key: 'good-party-is' },
    { component: <HowWorks />, key: 'how-works' },
    { component: <GoodCertified />, key: 'good-certified' },
    {
      component: <FeaturedCampaigns homepageCandidates={homepageCandidates} />,
      key: 'featured',
    },
    { component: <StayTuned />, key: 'tuned' },
  ];

  return (
    <PageWrapper isFullWidth>
      {sections.map(section => (
        <section key={section.key}>{section.component}</section>
      ))}
    </PageWrapper>
  );
};

HomePageWrapper.propTypes = {
  homepageCandidates: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
};

export default HomePageWrapper;
