import React from 'react';
import styled from 'styled-components';
import YouTubeLazyPlayer from '../shared/YouTubeLazyPlayer';

const Wrapper = styled.div`
  .yt-lite {
    background: #f3f3f3 url(https://assets.goodparty.org/tgp-party-poster.jpg)
      center center no-repeat !important;
    background-size: contain !important;
    height: 50vh;
    &::before {
      display: none;
    }
  }
`;

const VideoSection = () => {
  return (
    <Wrapper>
      <YouTubeLazyPlayer id="qYYlOQbozZ8" />
    </Wrapper>
  );
};

export default VideoSection;
