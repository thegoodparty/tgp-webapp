/**
 *
 * VideoModal
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ReactPlayer from 'react-player';

import QueryModal from '../shared/QueryModal';

function VideoModal({ closeModalCallback, url }) {
  console.log('u', url);
  return (
    <QueryModal closeModalCallback={closeModalCallback} mode="full-screen">
      <div className="flex-center">
        <ReactPlayer
          url={url}
          // url="https://assets.goodparty.org/videos/welcome.mov"
          controls
          playing
          height={window.innerHeight * 0.8}
          width={window.innerWidth}
          style={{ display: 'block' }}
          config={{
            youtube: {
              playerVars: {
                showinfo: 1,
                modestbranding: 1,
                iv_load_policy: 3,
                rel: 1,
              },
            },
          }}
        />
      </div>
    </QueryModal>
  );
}

VideoModal.propTypes = {
  url: PropTypes.string,
  closeModalCallback: PropTypes.func,
};

export default VideoModal;
