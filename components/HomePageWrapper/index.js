import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import PageWrapper from 'components/shared/PageWrapper';
import TopSection from './TopSection';
import Section2 from './Section2';
import Section3 from './Section3';
import GoodCertifiedAreSection from './GoodCertifiedAreSection';
import CandidatesSection from './CandidatesSection';
import HelpSection from './HelpSection';
import HowItWorksSection from './HowItWorksSection';

const Content = styled.div`
  max-width: ${({ theme }) => theme.breakpoints.contentMax};
  margin: 0 auto;
`;

const Section = styled.section`
  padding: 24px 18px;
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 60px 18px;
  }

  &.purple4 {
    background-color: ${({ theme }) => theme.colors.purple4};
  }

  &.purple-gradient {
    background: linear-gradient(0deg, #f2e7ff, #f2e7ff),
      linear-gradient(
        257.82deg,
        rgba(67, 0, 211, 0.25) -11.17%,
        rgba(67, 0, 211, 0) 96.34%
      ),
      #5c00c7;
  }
  &.no-padding {
    padding-left: 0;
    padding-right: 0;
  }
`;

const HomePageWrapper = ({ homepageCandidates }) => {
  console.log('homepageCandidates', homepageCandidates);
  const sections = [
    { component: <TopSection /> },
    { component: <Section2 />, sectionClass: 'purple4' },
    { component: <Section3 /> },
    { component: <HowItWorksSection />, noContent: true },
    { component: <GoodCertifiedAreSection /> },
    {
      component: <CandidatesSection homepageCandidates={homepageCandidates} />,
    },
    { component: <HelpSection />, sectionClass: 'purple4' },
  ];

  return (
    <PageWrapper isFullWidth purple>
      {sections.map((section, index) => (
        <Section
          className={`${section.sectionClass &&
            section.sectionClass} ${section.noContent && 'no-padding'}`}
          key={index}
        >
          {section.noContent ? (
            <>{section.component}</>
          ) : (
            <Content>{section.component}</Content>
          )}
        </Section>
      ))}
    </PageWrapper>
  );
};

HomePageWrapper.propTypes = {
  homepageCandidates: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
};

export default HomePageWrapper;
