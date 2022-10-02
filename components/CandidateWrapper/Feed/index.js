/**
 *
 * Feed
 *
 */

import React from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import CandidateFeed from './CandidateFeed';
import TopIssues from './TopIssues';
import { MdUpOnly } from '../../shared/navigation/NavWrapper';

const Wrapper = styled.section``;

const Title = styled.h3`
  font-size: 22px;
  font-weight: 900;
  margin: 0 0 24px;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    font-size: 32px;
  }
`;

const SubTitle = styled.div`
  font-size: 14px;
  margin-bottom: 40px;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    font-size: 20px;
  }
`;

function Feed() {
  return (
    <Wrapper>
      <Grid container spacing={8}>
        <Grid item xs={12} lg={9} data-cy="post-list">
          <Title data-cy="feed-title">Get ‘em trending</Title>
          <SubTitle data-cy="feed-subtitle">
            Indie candidates need help growing their movements! Like, follow,
            and share posts to amplify this campaign:
          </SubTitle>
          <CandidateFeed />
        </Grid>
        <Grid item xs={false} lg={3}>
          <MdUpOnly>
            <TopIssues />
          </MdUpOnly>
        </Grid>
      </Grid>
    </Wrapper>
  );
}

export default Feed;
