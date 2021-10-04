/**
 *
 * VideoSection
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { BsFillPlayFill } from 'react-icons/bs';
import VideoModal from '../shared/VideoModal';

const VideoWrapper = styled.div`
  margin-top: 64px;
`;

const Wrapper = styled.div`
  //width: 325px;
  //max-width: calc(100vw - 20px);
  //margin: 0 auto;
  position: relative;
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
  color: #fff;
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
          src="//images.ctfassets.net/g08ybc4r0f4b/5fDZlDzjGD3QWSSp6jhULu/9342c2fa2415cf713163163b6c605a96/whois.jpg"
          alt="Video"
          className="full-image"
        />
        <PlayButton>
          <BsFillPlayFill size={70} />
        </PlayButton>
      </Wrapper>
      {showVideoModal && (
        <VideoModal
          closeModalCallback={() => setShowVideoModal(false)}
          url="https://www.youtube.com/watch?v=183Otqkf8So?modestbranding=1"
        />
      )}
    </VideoWrapper>
  );
}

VideoSection.propTypes = {
  pageContent: PropTypes.object,
};

export default VideoSection;
