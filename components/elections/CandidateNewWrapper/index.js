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
import { H1 } from '../../shared/typogrophy';
import RedirectModal from './RedirectModal';

const ContentWrapper = styled.div`
  width: 100vw;
  overflow-x: hidden;
  margin: 0 auto;
  max-width: 1080px;
  padding-bottom: 48px;
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 24px 18px 64px;
  }
`;

function CandidateNewWrapper({
  content,
  candidate,
  supportCallback,
  showPreviewModal,
  fromShareLink,
  showShareModal,
  supportLink,
  showRedirectModal,
  user,
  isUserSupportCandidate,
  removeSupportCallback,
  previewNextStepCallback,
  candidateSupports,
  total,
  adminDeleteSupportCallback,
  trackShareCallback,
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
      {showRedirectModal && <RedirectModal />}

      <ContentWrapper>
        <Hidden smDown>
          <H1 style={{ marginBottom: '24px' }}>{candidate.headline}</H1>
        </Hidden>
        <Grid container spacing={3}>
          <Grid row item xs={12} md={7}>
            <Main
              candidate={candidate}
              articles={articles}
              supportCallback={handleSupport}
              isUserSupportCandidate={isUserSupportCandidate}
              removeSupportCallback={handleRemoveSupport}
              candidateSupports={candidateSupports}
              total={total}
              trackShareCallback={trackShareCallback}
            />
          </Grid>
          <Hidden mdDown>
            <Grid row item xs={12} md={5}>
              <ProfileInfo
                candidate={candidate}
                supportCallback={handleSupport}
                isUserSupportCandidate={isUserSupportCandidate}
                removeSupportCallback={handleRemoveSupport}
                candidateSupports={candidateSupports}
                total={total}
                adminDeleteSupportCallback={adminDeleteSupportCallback}
                trackShareCallback={trackShareCallback}
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
          candidateSupports={candidateSupports}
          fromShareLink={fromShareLink}
        />
      )}
      {showShareModal && (
        <ShareModal
          candidate={candidate}
          user={user}
          message={showShareModal}
          supportLink={supportLink}
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
  fromShareLink: PropTypes.bool,
  showShareModal: PropTypes.bool,
  supportLink: PropTypes.bool,
  showRedirectModal: PropTypes.bool,
  isUserSupportCandidate: PropTypes.bool,
  previewNextStepCallback: PropTypes.func,
  candidateSupports: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  total: PropTypes.number,
  adminDeleteSupportCallback: PropTypes.func,
  trackShareCallback: PropTypes.func,
};

export default CandidateNewWrapper;
