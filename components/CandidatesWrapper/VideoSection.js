/**
 *
 * VideoSection
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FaPlay } from 'react-icons/fa';
import VideoModal from '../shared/VideoModal';

const VideoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: calc(100vw - 36px);
  @media only screen and (min-width: ${({ theme }) =>
  theme.breakpointsPixels.md}) {
    text-align: center;
    display: block;
    width: unset;
  }
`;

const Wrapper = styled.div`
  //width: 325px;
  //max-width: calc(100vw - 20px);
  //margin: 0 auto;
  posisiton: relative;
`;

const VideoImg = styled.img`
  border-radius: 12px;
  cursor: pointer;
`;

const PlayButton = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -25px;
  margin-left: -25px;
  opacity: 0.8;
`;

function VideoSection({ pageContent }) {
  const [showVideoModal, setShowVideoModal] = useState(false);
  const showVideo = () => {
    setShowVideoModal(true);
  };
  return (
    <VideoWrapper>
      <Wrapper onClick={showVideo}>
        <VideoImg
          src={
            pageContent?.videoPlaceholder ||
            '//images.ctfassets.net/g08ybc4r0f4b/5fDZlDzjGD3QWSSp6jhULu/9342c2fa2415cf713163163b6c605a96/whois.jpg'
          }
          alt="Video"
          className="full-image"
        />
        <PlayButton>
          <FaPlay size={50} color="#FFF" />
        </PlayButton>
      </Wrapper>
      {showVideoModal && (
        <VideoModal
          closeModalCallback={() => setShowVideoModal(false)}
          url={`https://www.youtube.com/watch?v=${
            pageContent?.youtubeId || '183Otqkf8So'
          }?modestbranding=1`}
        />
      )}
    </VideoWrapper>
  );
}

VideoSection.propTypes = {
  pageContent: PropTypes.object,
};

export default VideoSection;
