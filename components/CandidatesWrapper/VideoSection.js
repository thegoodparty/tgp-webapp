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
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
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
  '<blockquote class="tiktok-embed" cite="https://www.tiktok.com/@goodparty/video/6939909685717781765" data-video-id="6939909685717781765" style="max-width: 325px;min-width: 325px; border-radius: 8px;"> <section> <a target="_blank" title="@goodparty" href="https://www.tiktok.com/@goodparty">@goodparty</a> <p>People of Texas: “help us!” 🥶Establishment politicians: “idgaf” 😎 <a title="texasicestorm" target="_blank" href="https://www.tiktok.com/tag/texasicestorm">#texasicestorm</a> <a title="politicians" target="_blank" href="https://www.tiktok.com/tag/politicians">#politicians</a> <a title="vote4good" target="_blank" href="https://www.tiktok.com/tag/vote4good">#vote4good</a> <a title="tx" target="_blank" href="https://www.tiktok.com/tag/tx">#tx</a> <a title="cruz" target="_blank" href="https://www.tiktok.com/tag/cruz">#cruz</a> <a title="goodparty" target="_blank" href="https://www.tiktok.com/tag/goodparty">#goodparty</a></p> <a target="_blank" title="♬ Oh No - Kreepa" href="https://www.tiktok.com/music/Oh-No-6586947002464996102">♬ Oh No - Kreepa</a> </section> </blockquote> ';
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
