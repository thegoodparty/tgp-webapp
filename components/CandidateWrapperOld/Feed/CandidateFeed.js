/**
 *
 * Feed
 *
 */

import React, { useContext } from 'react';
import styled from 'styled-components';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

import { CandidateContext } from '/containers/CandidatePage';
import SocialPost from '../../shared/SocialPost';

function CandidateFeed() {
  const { feed } = useContext(CandidateContext);
  let posts = [];
  if (feed && feed.results) {
    posts = feed.results;
  }
  return (
    <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 1024: 2 }}>
      <Masonry gutter="16px">
        {(posts || []).map((post) => (
          <React.Fragment key={post.url}>
            <SocialPost post={post} />
          </React.Fragment>
        ))}
      </Masonry>
    </ResponsiveMasonry>
  );
}

export default CandidateFeed;
