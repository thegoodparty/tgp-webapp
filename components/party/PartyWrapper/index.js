import React, { useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import CandidatesSection from 'components/HomePageWrapper/CandidatesSection';

import contentfulHelper, { CmsContentWrapper } from 'helpers/contentfulHelper';
import PageWrapper from 'components/shared/PageWrapper';

const Content = styled.div`
  width: 100vw;
  max-width: ${({ theme }) => theme.breakpoints.contentMax};
  margin: 0 auto;
  padding: 0 18px 48px;
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 0 0 48px;
  }
`;

const AboutTitleWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.purple4};
`;

const AboutTitle = styled.h1`
  font-size: 48px;
  line-height: 64px;
  padding: 32px 0;
  max-width: ${({ theme }) => theme.breakpoints.contentMax};
  margin: 0 auto;

  color: ${({ theme }) => theme.colors.gray2};
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 64px;
    line-height: 92px;
  }
`;

const PartyWrapper = ({ content, candidates }) => {
  let mainContent = '';
  if (content && content.partyPage) {
    mainContent = contentfulHelper(content.partyPage.content);
  }

  return (
    <PageWrapper purple isFullWidth>
      <AboutTitleWrapper>
        <AboutTitle>About Good Party</AboutTitle>
      </AboutTitleWrapper>
      <Content>
        {content && <CmsContentWrapper>{mainContent}</CmsContentWrapper>}
        <div style={{ height: '64px' }}>&nbsp;</div>
        {candidates && <CandidatesSection homepageCandidates={candidates} />}
      </Content>
    </PageWrapper>
  );
};

PartyWrapper.propTypes = {
  content: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  candidates: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
};

export default PartyWrapper;
