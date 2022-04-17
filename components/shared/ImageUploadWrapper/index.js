/**
 *
 * ImageUploadWrapper
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { RiImageAddFill } from 'react-icons/ri';

import Button from '@material-ui/core/Button';
import { PurpleButton } from '../buttons';
import { InnerButton } from '../buttons/BlackButton';

const StyledButton = styled(Button)`
  && {
    background-color: #000;
    color: #fff;
    padding: 12px 0;
    font-weight: 700;
  }
`;

const Error = styled.div`
  margin-top: 12px;
  color: red;
`;

function ImageUploadWrapper({
  fileSelectCallback,
  uploadCallback,
  maxFileSize,
  customElement,
  isUserImage,
}) {
  const [fileSizeError, setFileSizeError] = useState(false);
  const handleUploadImage = (img) => {
    setFileSizeError(false);
    const node = document.getElementById('file-uploader');
    const file = node.files ? node.files[0] : false;
    if (file) {
      if (file.size > maxFileSize) {
        setFileSizeError(true);
        return;
      }
      fileSelectCallback(file, uploadCallback, isUserImage);
    }
  };

  return (
    <>
      {customElement ? (
        <Button
          component="label"
          style={{
            textTransform: 'none',
            fontSize: '16px',
            padding: 0,
            lineHeight: '1.3',
          }}
        >
          {customElement}
          <input
            type="file"
            hidden
            onChange={handleUploadImage}
            accept="image/*"
            id="file-uploader"
          />
        </Button>
      ) : (
        <StyledButton variant="contained" component="label">
          <InnerButton>
            <RiImageAddFill /> &nbsp; Select &nbsp;&nbsp;
            <input
              type="file"
              hidden
              onChange={handleUploadImage}
              accept="image/*"
              id="file-uploader"
            />
          </InnerButton>
        </StyledButton>
      )}
      {fileSizeError && (
        <Error>Max file size allowed: {maxFileSize / 1000}K </Error>
      )}
    </>
  );
}

ImageUploadWrapper.propTypes = {
  fileSelectCallback: PropTypes.func,
  uploadCallback: PropTypes.func,
  isUserImage: PropTypes.bool,
};

export default ImageUploadWrapper;
