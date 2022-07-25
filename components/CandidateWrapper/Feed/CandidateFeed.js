/**
 *
 * Feed
 *
 */

import React, { useContext } from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';

import { CandidateContext } from '/containers/CandidatePage';
import SocialPost from '../../shared/SocialPost';

function CandidateFeed() {
  const { feed } = useContext(CandidateContext);
  let posts = [];
  if (feed && feed.results) {
    posts = feed.results;
  }
  return (
    <Grid container spacing={2}>
      {(posts || []).map((post) => (
        <Grid item xs={12} lg={6} key={post.url}>
          <SocialPost post={post} />
        </Grid>
      ))}
    </Grid>
  );
}

export default CandidateFeed;
