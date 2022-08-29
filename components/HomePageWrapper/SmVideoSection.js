import React, { useState } from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Image from 'next/image';
import { FaPlay } from 'react-icons/fa';
import YouTubeVideoModal from '../shared/YouTubeVideoModal';
import Row from '../shared/Row';

const Wrapper = styled.div`
  background-color: #f3f3f3;
  border-radius: 12px;
  padding: 0;
  height: 100px;
  font-size: 19px;
  font-weight: 900;
  cursor: pointer;
  img {
    border-radius: 12px;
    object-fit: cover;
    object-position: center center;
    width: 100%;
    height: 100px;
  }
`;

const Relative = styled.div`
  position: relative;
`;

const Play = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100px;
  height: 100px;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 12px;
  color: #fff;
`;

const PlayWrapper = styled.div`
  text-align: center;
  flex: 1;
`;

const YOUTUBE_ID = 'ssU2S8clVPo';

const SmVideoSection = () => {
  const [showVideo, setShowVideo] = useState(false);
  return (
    <>
      <Wrapper onClick={() => setShowVideo(true)} id="homepage-video-mobile">
        <Row>
          <Relative>
            <Image
              src="/images/homepage/tiktok-preview-sm.jpg"
              height={100}
              width={100}
              className="video-img"
            />
            <Play className="flex-center">
              <FaPlay />
            </Play>
          </Relative>
          <PlayWrapper>
            <FaPlay /> &nbsp; Watch Video
          </PlayWrapper>
        </Row>
      </Wrapper>
      {showVideo && (
        <YouTubeVideoModal
          closeModalCallback={() => {
            setShowVideo(false);
          }}
          id={YOUTUBE_ID}
        />
      )}
    </>
  );
};

export default SmVideoSection;
