/**
 *
 * CandidatesWrapper
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import PageWrapper from '../shared/PageWrapper';
import Grid from '@material-ui/core/Grid';
import { Body13, H1 } from '../shared/typogrophy';
import GoodCertifiedAreSection from '../HomePageWrapper/GoodCertifiedAreSection';
import CandidatesSection from './CandidatesSection';
import articlesHelper from '../../helpers/articlesHelper';
import TopQuestions from '../shared/TopQuestions';
import VideoSection from './VideoSection';

const Content = styled.div`
  max-width: ${({ theme }) => theme.breakpoints.contentMax};
  margin: 0 auto;
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 48px 0;
  }
`;

const ReverseGrid = styled(Grid)`
  flex-direction: row;
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: row-reverse;
  }
`;

const StyledH1 = styled(H1)`
  color: ${({ theme }) => theme.colors.gray2};
`;

const StyledBody13 = styled(Body13)`
  margin: 4px 0 48px;
  color: ${({ theme }) => theme.colors.gray7};
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 19px;
    line-height: 25px;
  }
`;

function CandidatesWrapper({ candidates, content }) {
  let articles = [];
  if (content?.faqArticles) {
    articles = articlesHelper(content.faqArticles, 'election');
  }
  return (
    <PageWrapper isFullWidth purple>
      <Content>
        <ReverseGrid container spacing={4}>
          <Grid item xs={12} md={5}>
            <VideoSection />
          </Grid>
          <Grid item xs={12} md={7}>
            <StyledH1>Meet some Good Certified candidates</StyledH1>
            <StyledBody13>
              Currently, we’re focused on getting some wins for Good Certified
              candidates in New York and California. If you know a potentially
              good candidate, nominate them!
            </StyledBody13>
            <GoodCertifiedAreSection mdColumns={6} />
            <CandidatesSection candidates={candidates} />
            <TopQuestions articles={articles} />
          </Grid>
        </ReverseGrid>
      </Content>
    </PageWrapper>
  );
}

CandidatesWrapper.propTypes = {
  candidates: PropTypes.object,
  content: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

export default CandidatesWrapper;
