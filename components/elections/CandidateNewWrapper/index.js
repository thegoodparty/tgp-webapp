/**
 *
 * CandidateNewWrapper
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import NotFound from 'containers/shared/NotFoundPage';
import PageWrapper from '../../shared/PageWrapper';
import ProfileInfo from './ProfileInfo';
import ReactPlayer from 'react-player/lazy';
import Main from './Main';

const ContentWrapper = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 20px;
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 5rem 16px 0;
  }
`;

function CandidateNewWrapper({ content, candidate }) {
  if (!candidate) {
    return <NotFound />;
  }
  return (
    <PageWrapper isFullWidth white>
      <ContentWrapper>
        <Grid container spacing={2}>
          <Grid row item xs={12} sm={7} style={{ marginBottom: 50 }}>
            <Main candidate={candidate} content={content} />
          </Grid>
          <Grid row item xs={12} sm={5}>
            <ProfileInfo candidate={candidate} />
          </Grid>
        </Grid>
      </ContentWrapper>
    </PageWrapper>
  );
}

CandidateNewWrapper.propTypes = {
  candidate: PropTypes.object,
  content: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

export default CandidateNewWrapper;
