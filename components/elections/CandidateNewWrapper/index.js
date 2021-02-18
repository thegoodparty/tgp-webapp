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
import PageWrapper from '../../shared/PageWrapper';
import ProfileInfo from './ProfileInfo';
import Main from './Main';
import EndorsementPreviewModal from './EndorsementPreviewModal';
import ShareModal from './ShareModal';

const ContentWrapper = styled.div`
  margin: 0 auto;
  max-width: 1080px;
  padding-bottom: 48px;
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 60px 18px 64px;
  }
`;

function CandidateNewWrapper({
  content,
  candidate,
  supportCallback,
  showPreviewModal,
  showShareModal,
  user,
  isUserSupportCandidate,
  removeSupportCallback,
  previewNextStepCallback,
  candidateSupports,
}) {
  if (!candidate) {
    return <NotFound />;
  }
  let articles = [];
  if (content?.faqArticles) {
    articles = articlesHelper(content.faqArticles, 'election');
  }
  const handleSupport = () => {
    supportCallback(candidate.id, user);
  };
  const handleRemoveSupport = () => {
    removeSupportCallback(candidate.id);
  };
  return (
    <PageWrapper isFullWidth purple>
      <ContentWrapper>
        <Grid container spacing={3}>
          <Grid row item xs={12} md={7}>
            <Main
              candidate={candidate}
              articles={articles}
              supportCallback={handleSupport}
              isUserSupportCandidate={isUserSupportCandidate}
              removeSupportCallback={handleRemoveSupport}
              candidateSupports={candidateSupports}
            />
          </Grid>
          <Hidden xsDown>
            <Grid row item xs={12} md={5}>
              <ProfileInfo
                candidate={candidate}
                supportCallback={handleSupport}
                isUserSupportCandidate={isUserSupportCandidate}
                removeSupportCallback={handleRemoveSupport}
                candidateSupports={candidateSupports}
              />
            </Grid>
          </Hidden>
        </Grid>
      </ContentWrapper>
      {showPreviewModal && (
        <EndorsementPreviewModal
          candidate={candidate}
          user={user}
          previewNextStepCallback={previewNextStepCallback}
        />
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
  supportCallback: PropTypes.func,
  removeSupportCallback: PropTypes.func,
  showPreviewModal: PropTypes.bool,
  showShareModal: PropTypes.bool,
  isUserSupportCandidate: PropTypes.bool,
  previewNextStepCallback: PropTypes.func,
  candidateSupports: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
};

export default CandidateNewWrapper;
