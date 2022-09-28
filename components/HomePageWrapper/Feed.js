import React, { useContext } from 'react';
import styled from 'styled-components';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

import { HomePageContext } from '../../containers/HomePage';
import SocialPost from '../shared/SocialPost';

const Wrapper = styled.div``;

const Top = styled.div`
  font-size: 24px;
  margin-bottom: 40px;
`;

const Feed = ({ columns = 2 }) => {
  const { feed } = useContext(HomePageContext);
  let posts = [];
  if (feed && feed.results) {
    posts = feed.results;
  }

  let breakpoints = { 350: 1, 1024: 2 };
  if (columns === 3) {
    breakpoints = { 350: 1, 640: 2, 1024: 3 };
  }

  return (
    <Wrapper>
      <Top data-cy="home-feed-title">
        Posts from <strong>#goodparty</strong> movement
      </Top>
      {posts && (
        <ResponsiveMasonry columnsCountBreakPoints={breakpoints}>
          <Masonry gutter="16px">
            {posts.map((post) => (
              <React.Fragment key={post.url}>
                <SocialPost post={post} />
              </React.Fragment>
            ))}
          </Masonry>
        </ResponsiveMasonry>
      )}
    </Wrapper>
  );
};

export default Feed;
