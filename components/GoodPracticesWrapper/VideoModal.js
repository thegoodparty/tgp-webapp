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
  return (
    <QueryModal closeModalCallback={closeModalCallback}>
      <div className="flex-center">
        <ReactPlayer
          url={url}
          playing
          height={window.innerHeight * 0.8}
          width={400}
          style={{ display: 'block' }}
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
