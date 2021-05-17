/**
 *
 * CandidatesWrapper
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Sticky from 'react-sticky-el';

import PageWrapper from '../shared/PageWrapper';
import { Body13, H1 } from '../shared/typogrophy';
import GoodCertifiedAreSection from '../HomePageWrapper/GoodCertifiedAreSection';
import CandidatesSection from './CandidatesSection';
import articlesHelper from '../../helpers/articlesHelper';
import TopQuestions from '../shared/TopQuestions';
import VideoSection from './VideoSection';
import IllustrationSection from './IllustrationSection';

const Content = styled.div`
  width: 100vw;
  overflow-x: hidden;
  max-width: ${({ theme }) => theme.breakpointsPixels.contentMax};
  margin: 0 auto 48px;
  padding: 0;
  @media only screen and (min-width: ${({ theme }) => theme.breakpointsPixels.md}) {
    padding: 48px 0;
    overflow-x: visible;
    max-width: 1280px;
  }

`;

const ReverseGrid = styled(Grid)`
  flex-direction: row;
  @media only screen and (min-width: ${({ theme }) => theme.breakpointsPixels.md}) {
    flex-direction: row-reverse;
  }
`;

const StyledH1 = styled(H1)`
  color: ${({ theme }) => theme.colors.gray2};
`;

const StyledBody13 = styled(Body13)`
  margin: 4px 0 48px;
  color: ${({ theme }) => theme.colors.gray7};
  @media only screen and (min-width: ${({ theme }) => theme.breakpointsPixels.md}) {
    font-size: 19px;
    line-height: 25px;
  }
`;

const ScrollArea = styled.div`
  height: calc(100% - 80px - 65px);
  position: relative;
  top: 0;
  width: 416px;
  margin-top: -25px;
`;

const Inner2 = styled.div`
  padding-top: 25px;
`;

const StickyWrapperElement = ({ children }) => {
  if (typeof window !== 'undefined' && window.innerWidth > 960) {
    return (
      <ScrollArea className="scroll-area">
        <Sticky
          boundaryElement=".scroll-area"
          hideOnBoundaryHit={false}
          dontUpdateHolderHeightWhenSticky
        >
          <Inner2 className="inner">{children}</Inner2>
        </Sticky>
      </ScrollArea>
    );
  }
  return <div>{children}</div>;
};

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
            <StickyWrapperElement>
              <VideoSection />
            </StickyWrapperElement>
          </Grid>
          <Grid item xs={12} md={7}>
            <StyledH1>Meet some Good Certified candidates</StyledH1>
            <StyledBody13>
              Endorse good Indie candidates from across the country. If you know
              a potentially good candidate, nominate them!
            </StyledBody13>
            <GoodCertifiedAreSection mdColumns={6} />
            <CandidatesSection candidates={candidates} />
            <IllustrationSection />
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
