import React from 'react';
import styled from 'styled-components';
import YouTubeLazyPlayer from '../shared/YouTubeLazyPlayer';

const Wrapper = styled.section`
  padding: 80px 0;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    padding: 130px 0;
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
