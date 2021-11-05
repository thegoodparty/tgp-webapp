import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import PageWrapper from 'components/shared/PageWrapper';
import Hero from './Hero';

const Content = styled.div`
  max-width: 524px;
  margin: 0 auto;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    max-width: ${({ theme }) => theme.breakpointsPixels.contentMax};
  }
`;

const Section = styled.section``;

const HomePageWrapper = ({ homepageCandidates }) => {
  const sections = [
    { component: <Hero />, key: 'hero' },
    // { component: <Section2 />, sectionClass: 'purple4' },
    // { component: <Section3 /> },
    // {
    //   component: <HowItWorksSection />,
    //   sectionClass: 'no-bottom-padding',
    //   noContent: true,
    // },
    // { component: <TestimonialsSection />, sectionClass: 'purple4' },
    // { component: <GoodCertifiedAreSection /> },
    // {
    //   component: <CandidatesSection homepageCandidates={homepageCandidates} />,
    // },
    // { component: <HelpSection />, sectionClass: 'purple4' },
  ];

  return (
    <PageWrapper isFullWidt white>
      {sections.map(section => (
        <Section key={section.key}>
          <Content>{section.component}</Content>
        </Section>
      ))}
    </PageWrapper>
  );
};

HomePageWrapper.propTypes = {
  homepageCandidates: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
};

export default HomePageWrapper;
