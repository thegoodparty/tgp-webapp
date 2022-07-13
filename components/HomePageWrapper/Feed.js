import React, { useContext } from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

import { HomePageContext } from '../../containers/HomePage';
import SocialPost from './SocialPost';
import BlackButton, { InnerButton } from '../shared/buttons/BlackButton';
import LoadingAnimation from '../shared/LoadingAnimation';

const Wrapper = styled.div``;

const Top = styled.div`
  font-size: 24px;
  margin-bottom: 40px;
`;

const Feed = ({ openShareModalCallback }) => {
  const { feed, loadFeedCallback, fullFeed, loading } =
    useContext(HomePageContext);
  let posts = [];
  if (fullFeed) {
    posts = fullFeed.results;
  } else if (feed && feed.results) {
    posts = feed.results;
  }

  console.log('pp', posts)
  return (
    <Wrapper>
      <Top>
        Posts from <strong>#goodparty</strong> Tuesdays
      </Top>
      <Grid container spacing={2}>
        {(posts || []).map((post) => (
          <Grid item xs={12} lg={6} key={post.url}>
            <SocialPost
              post={post}
              openShareModalCallback={openShareModalCallback}
            />
          </Grid>
        ))}
      </Grid>
      <br />
      <br />
      {!fullFeed && !loading && (
        <BlackButton className="outlined" onClick={loadFeedCallback}>
          <div style={{ padding: '0 48px' }}>Load More Posts</div>
        </BlackButton>
      )}
      {loading && <CircularProgress />}
    </Wrapper>
  );
};

export default Feed;
