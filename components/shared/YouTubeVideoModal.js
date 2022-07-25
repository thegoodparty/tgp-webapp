/**
 *
 * VideoModal
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ModalVideo from 'react-modal-video';
const Wrapper = styled.div`
  @keyframes modal-video {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @keyframes modal-video-inner {
    from {
      transform: translate(0, 100px);
    }
    to {
      transform: translate(0, 0);
    }
  }
  .modal-video {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000000;
    cursor: pointer;
    opacity: 1;
    animation-timing-function: ease-out;
    animation-duration: 0.3s;
    animation-name: modal-video;
    transition: opacity 0.3s ease-out;
  }
  .modal-video-effect-exit {
    opacity: 0;
  }
  .modal-video-effect-exit .modal-video-movie-wrap {
    -webkit-transform: translate(0, 100px);
    -moz-transform: translate(0, 100px);
    -ms-transform: translate(0, 100px);
    -o-transform: translate(0, 100px);
    transform: translate(0, 100px);
  }
  .modal-video-body {
    max-width: 960px;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    padding: 0 10px;
    display: flex;
    justify-content: center;
    box-sizing: border-box;
  }
  .modal-video-inner {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
  @media (orientation: landscape) {
    .modal-video-inner {
      padding: 10px 60px;
      box-sizing: border-box;
    }
  }
  .modal-video-movie-wrap {
    width: 100%;
    height: 0;
    position: relative;
    padding-bottom: 56.25%;
    background-color: #333;
    animation-timing-function: ease-out;
    animation-duration: 0.3s;
    animation-name: modal-video-inner;
    transform: translate(0, 0);
    transition: transform 0.3s ease-out;
  }
  .modal-video-movie-wrap iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .modal-video-close-btn {
    position: absolute;
    z-index: 2;
    top: -45px;
    right: 0px;
    display: inline-block;
    width: 35px;
    height: 35px;
    overflow: hidden;
    border: none;
    background: transparent;
  }
  @media (orientation: landscape) {
    .modal-video-close-btn {
      top: 0;
      right: -45px;
    }
  }
  .modal-video-close-btn:before {
    transform: rotate(45deg);
  }
  .modal-video-close-btn:after {
    transform: rotate(-45deg);
  }
  .modal-video-close-btn:before,
  .modal-video-close-btn:after {
    content: ' ';
    position: absolute;
    height: 2px;
    width: 100%;
    top: 50%;
    left: 0;
    background: #fff;
    border-radius: 5px;
    margin-top: -6px;
  }
`;
function YouTubeVideoModal({ closeModalCallback, id }) {
  return (
    <Wrapper>
      <ModalVideo
        channel="youtube"
        autoplay={1}
        isOpen
        videoId={id}
        onClose={closeModalCallback}
      />
    </Wrapper>
  );
}

YouTubeVideoModal.propTypes = {
  id: PropTypes.string,
  closeModalCallback: PropTypes.func,
};

export default YouTubeVideoModal;
