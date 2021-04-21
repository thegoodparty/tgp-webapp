/**
 *
 * VideoSection
 *
 */

import React, { useEffect } from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';

const VideoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: calc(100vw - 36px);
  @media only screen and (min-width: ${({ theme }) => theme.breakpointsPixels.md}) {
    text-align: center;
    display: block;
    width: unset;
  }
`;

const Wrapper = styled.div`
  width: 325px;
  max-width: calc(100vw - 20px);
  margin: 0 auto;

  box-shadow: -9px 18px 30px rgba(224, 212, 234, 0.2),
    18px -18px 30px rgba(224, 212, 234, 0.2),
    -18px -18px 30px rgba(255, 255, 255, 0.9),
    18px 18px 30px rgba(224, 212, 234, 0.9),
    inset 1px 1px 2px rgba(255, 255, 255, 0.3),
    inset -1px -1px 2px rgba(224, 212, 234, 0.5);
`;

const tiktokEmbed =
  '<blockquote class="tiktok-embed" cite="https://www.tiktok.com/@goodparty/video/6939909685717781765" data-video-id="6939909685717781765" style="max-width: 605px;min-width: 325px;" > <section> <a target="_blank" title="@goodparty" href="https://www.tiktok.com/@goodparty">@goodparty</a> <p>Who is a good party candidate? Maybe you are ❤️ <a title="goodparty" target="_blank" href="https://www.tiktok.com/tag/goodparty">#goodparty</a> <a title="vote4good" target="_blank" href="https://www.tiktok.com/tag/vote4good">#vote4good</a> <a title="antiestablishment" target="_blank" href="https://www.tiktok.com/tag/antiestablishment">#antiestablishment</a> <a title="thirdparty" target="_blank" href="https://www.tiktok.com/tag/thirdparty">#thirdparty</a> <a title="indie" target="_blank" href="https://www.tiktok.com/tag/indie">#indie</a></p> <a target="_blank" title="♬ The Office - The Hyphenate" href="https://www.tiktok.com/music/The-Office-6819255229129689090">♬ The Office - The Hyphenate</a> </section> </blockquote>';
function VideoSection() {
  useEffect(() => {
    const script = document.createElement('script');

    script.src = 'https://www.tiktok.com/embed.js';
    script.async = true;

    document.body.appendChild(script);
  }, []);
  return (
    <VideoWrapper>
      <Wrapper dangerouslySetInnerHTML={{ __html: tiktokEmbed }} />
    </VideoWrapper>
  );
}

VideoSection.propTypes = {};

export default VideoSection;
