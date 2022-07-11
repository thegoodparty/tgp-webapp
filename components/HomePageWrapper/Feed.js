import React, { useContext } from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

import { HomePageContext } from '../../containers/HomePage';
import Tweet from './Tweet';
import BlackButton from '../shared/buttons/BlackButton';
import LoadingAnimation from '../shared/LoadingAnimation';

const Wrapper = styled.div``;

const Top = styled.div`
  font-size: 24px;
  margin-bottom: 40px;
`;

const Post = styled.div`
  padding: 40px 30px;
  margin: 5px 0;
  background-color: #fff;
`;

const Content = styled.div``;

const Img = styled.img`
  width: 100%;
  height: auto;
  margin-bottom: 12px;
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
  return (
    <Wrapper>
      <Top>
        Posts from <strong>#goodparty</strong> Tuesdays
      </Top>
      <Grid container spacing={2}>
        {(posts || []).map((post) => (
          <Grid item xs={12} lg={6} key={post.url}>
            <Tweet
              tweet={post}
              openShareModalCallback={openShareModalCallback}
            />
          </Grid>
        ))}
      </Grid>
      <br />
      <br />
      {!fullFeed && !loading && (
        <BlackButton className="outlined" fullWidth onClick={loadFeedCallback}>
          Load More Posts
        </BlackButton>
      )}
      {loading && <CircularProgress />}
    </Wrapper>
  );
};

export default Feed;
