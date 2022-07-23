import React, { useContext } from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';

import { HomePageContext } from '../../containers/HomePage';
import SocialPost from '../shared/SocialPost';

const Wrapper = styled.div``;

const Top = styled.div`
  font-size: 24px;
  margin-bottom: 40px;
`;

const Feed = () => {
  const { feed } = useContext(HomePageContext);
  let posts = [];
  if (feed && feed.results) {
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
            <SocialPost post={post} />
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
};

export default Feed;
