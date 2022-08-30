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

const Feed = () => {
  const { feed } = useContext(HomePageContext);
  let posts = [];
  if (feed && feed.results) {
    posts = feed.results;
  }

  return (
    <Wrapper>
      <Top>
        Posts from <strong>#goodparty</strong> movement
      </Top>
      {posts && (
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 1024: 2 }}>
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
