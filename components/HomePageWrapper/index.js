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
`;

const HomePageWrapper = ({ homepageCandidates }) => {
  console.log('homepageCandidates', homepageCandidates);
  const sections = [
    { component: <TopSection /> },
    { component: <Section2 />, sectionClass: 'purple4' },
    { component: <Section3 /> },
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
          className={section.sectionClass && section.sectionClass}
          key={index}
        >
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
