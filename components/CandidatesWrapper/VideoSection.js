/**
 *
 * VideoSection
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Body13 } from '../shared/typogrophy';

const Wrapper = styled.div`
  box-shadow: -9px 18px 30px rgba(224, 212, 234, 0.2),
    18px -18px 30px rgba(224, 212, 234, 0.2),
    -18px -18px 30px rgba(255, 255, 255, 0.9),
    18px 18px 30px rgba(224, 212, 234, 0.9),
    inset 1px 1px 2px rgba(255, 255, 255, 0.3),
    inset -1px -1px 2px rgba(224, 212, 234, 0.5);
`;


const tiktokEmbed =
  '<blockquote class="tiktok-embed" cite="https://www.tiktok.com/@scout2015/video/6718335390845095173" data-video-id="6718335390845095173" style="max-width: 605px;min-width: 325px;" > <section> <a target="_blank" title="@scout2015" href="https://www.tiktok.com/@scout2015">@scout2015</a> <p>Scramble up ur name & I’ll try to guess it😍❤️ <a title="foryoupage" target="_blank" href="https://www.tiktok.com/tag/foryoupage">#foryoupage</a> <a title="petsoftiktok" target="_blank" href="https://www.tiktok.com/tag/petsoftiktok">#petsoftiktok</a> <a title="aesthetic" target="_blank" href="https://www.tiktok.com/tag/aesthetic">#aesthetic</a></p> <a target="_blank" title="♬ original sound - tiff" href="https://www.tiktok.com/music/original-sound-6689804660171082501">♬ original sound - tiff</a> </section> </blockquote>';
function VideoSection() {
  useEffect(() => {
    const script = document.createElement('script');

    script.src = 'https://www.tiktok.com/embed.js';
    script.async = true;

    document.body.appendChild(script);
  }, []);
  return (
    <Wrapper>
      <div dangerouslySetInnerHTML={{ __html: tiktokEmbed }} />
    </Wrapper>
  );
}

VideoSection.propTypes = {};

export default VideoSection;
