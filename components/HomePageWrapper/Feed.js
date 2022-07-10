import React, { useContext } from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import { HomePageContext } from '../../containers/HomePage';
import Tweet from './Tweet';

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
  const { feed } = useContext(HomePageContext);
  let posts = [];
  if (feed && feed.results) {
    posts = feed.results;
    if (posts.length > 4) {
      posts = posts.splice(0, 4);
    }
  }
  return (
    <Wrapper>
      <Top>
        Posts from <strong>#goodparty</strong> Tuesdays
      </Top>
      <Grid container spacing={2}>
        {posts.map((post) => (
          <Grid item xs={12} lg={6} key={post.url}>
            <Tweet
              tweet={post}
              openShareModalCallback={openShareModalCallback}
            />
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
};

export default Feed;
