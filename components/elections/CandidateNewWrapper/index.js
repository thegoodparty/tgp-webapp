/**
 *
 * CandidateNewWrapper
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import articlesHelper from 'helpers/articlesHelper';
import NotFound from 'containers/shared/NotFoundPage';
import TopQuestions from 'components/shared/TopQuestions';
import PageWrapper from '../../shared/PageWrapper';
import ProfileInfo from './ProfileInfo';
import Main from './Main';
import EndorsementPreviewModal from './EndorsementPreviewModal';
import ShareModal from './ShareModal';

const ContentWrapper = styled.div`
  max-width: 100%;
  margin: 0 auto;
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding-top: 60px;
  }
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    max-width: 980px;
  }
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.xl}) {
    max-width: 1080px;
  }
`;

const RightCol = styled(Grid)`
  && {
    max-width: 100%;
    margin-bottom: 50px;
    @media only screen and (min-width: ${({ theme }) => theme.breakpoints.lg}) {
      max-width: calc(100% - 448px);
    }
  }
`;

const LeftCol = styled(Grid)`
  && {
    max-width: 100%;
    @media only screen and (max-width: ${({ theme }) => theme.breakpoints.lg}) {
      padding-left: 18px;
      padding-right: 18px;
    }
    @media only screen and (min-width: ${({ theme }) => theme.breakpoints.lg}) {
      max-width: 416px;
    }
  }
`;

function CandidateNewWrapper({
  content,
  candidate,
  endorseCallback,
  showPreviewModal,
  showShareModal,
  user,
}) {
  if (!candidate) {
    return <NotFound />;
  }
  console.log('New Candidae Data', candidate);
  let articles = [];
  if (content?.faqArticles) {
    articles = articlesHelper(content.faqArticles, 'election');
  }
  return (
    <PageWrapper isFullWidth white>
      <ContentWrapper>
        <Grid container justify="space-between">
          <RightCol row item>
            <Main
              candidate={candidate}
              endorseCallback={() => {
                endorseCallback(user);
              }}
            />
            <TopQuestions articles={articles} />
          </RightCol>
          <LeftCol row item>
            <Hidden xsDown>
              <ProfileInfo
                candidate={candidate}
                endorseCallback={() => {
                  endorseCallback(user);
                }}
              />
            </Hidden>
          </LeftCol>
        </Grid>
      </ContentWrapper>
      {showPreviewModal && (
        <EndorsementPreviewModal candidate={candidate} user={user} />
      )}
      {showShareModal && (
        <ShareModal
          candidate={candidate}
          user={user}
          message={showShareModal}
        />
      )}
    </PageWrapper>
  );
}

CandidateNewWrapper.propTypes = {
  candidate: PropTypes.object,
  content: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  user: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  endorseCallback: PropTypes.func,
  showPreviewModal: PropTypes.bool,
  showShareModal: PropTypes.bool,
};

export default CandidateNewWrapper;
