import React from 'react';
import styled from 'styled-components';
import YouTubeLazyPlayer from '../shared/YouTubeLazyPlayer';

const Wrapper = styled.div`
  .yt-lite {
    background: #fff url(https://assets.goodparty.org/tgp-party-poster.jpg)
      center center no-repeat !important;
    background-size: contain !important;
    height: 50vh;
    margin-top: 16px;
    &::before {
      display: none;
    }
    @media only screen and (min-width: ${({ theme }) =>
        theme.breakpointsPixels.xl}) {
      margin-top: 70px;
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
