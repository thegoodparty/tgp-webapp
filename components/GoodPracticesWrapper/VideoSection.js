/**
 *
 * VideoSection
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { AiOutlineYoutube } from 'react-icons/ai';

import { H3 } from '../shared/typogrophy';

const Wrapper = styled.div`
  max-width: 712px; // 680 plus the 18*2 padding
  margin: 0 auto;
  padding: 0 18px;
  &.no-sm-padding {
    padding: 0;
    @media only screen and (min-width: ${({ theme }) =>
        theme.breakpointsPixels.md}) {
      padding: 0 18px;
    }
  }
`;

const VideoWrapper = styled.div`
  position: relative;
  padding-bottom: 60px;
`;

const VideoImg = styled.img`
  box-shadow: -3.62699px 3.62699px 9.06748px rgba(224, 212, 234, 0.2),
    3.62699px -3.62699px 9.06748px rgba(224, 212, 234, 0.2),
    -3.62699px -3.62699px 9.06748px rgba(255, 255, 255, 0.9),
    3.62699px 3.62699px 9.06748px rgba(224, 212, 234, 0.9),
    inset 1.8135px 1.8135px 1.8135px rgba(255, 255, 255, 0.3),
    inset -1.8135px -1.8135px 1.8135px rgba(224, 212, 234, 0.5);
  border-radius: 12px;
  margin-top: 12px;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    margin-top: 24px;
  }
`;

const VideoOverlay = styled.div`
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.purple3};
  box-shadow: -3.62699px 3.62699px 9.06748px rgba(224, 212, 234, 0.2),
    3.62699px -3.62699px 9.06748px rgba(224, 212, 234, 0.2),
    -3.62699px -3.62699px 9.06748px rgba(255, 255, 255, 0.9),
    3.62699px 3.62699px 9.06748px rgba(224, 212, 234, 0.9),
    inset 1.8135px 1.8135px 1.8135px rgba(255, 255, 255, 0.3),
    inset -1.8135px -1.8135px 1.8135px rgba(224, 212, 234, 0.5);
  width: 90%;
  position: absolute;
  bottom: 0px;
  left: 5%;
  padding: 24px;
  text-align: center;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    padding: 42px 24px;
  }
`;

const Watch = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.gray7};
  margin-top: 12px;
  font-size: 13px;
  cursor: pointer;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    margin-top: 24px;
    font-size: 18px;
  }
`;

function VideoSection({ content, showVideoCallback }) {
  return (
    <>
      {(content.video || content.youtubeId) && (
        <Wrapper className="no-sm-padding">
          <VideoWrapper>
            <VideoImg
              src={content.videoImage}
              alt="Video"
              className="full-image"
            />
            <VideoOverlay>
              <H3>
                Learn how to launch with Good Party{' '}
                <span role="img" aria-label="selfie">
                  🤳
                </span>
              </H3>
              <Watch onClick={showVideoCallback}>
                <AiOutlineYoutube size={28} /> &nbsp;&nbsp;
                <div>Watch now</div>
              </Watch>
            </VideoOverlay>
          </VideoWrapper>
        </Wrapper>
      )}
    </>
  );
}

VideoSection.propTypes = {
  content: PropTypes.object,
  showVideoCallback: PropTypes.func,
};

export default VideoSection;
