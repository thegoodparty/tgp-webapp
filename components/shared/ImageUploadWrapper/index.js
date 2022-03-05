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

const StyledButton = styled(Button)`
  && {
    background-color: ${({ theme }) => theme.colors.purple};
    color: #fff;
  }
`;

const Error = styled.div`
  margin-top: 12px;
  color: red;
`;

function ImageUploadWrapper({
  fileSelectCallback,
  uploadCallback,
  maxFileSize ,
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
      fileSelectCallback(file, uploadCallback);
    }
  };

  return (
    <>
      <StyledButton
        variant="contained"
        component="label"
        style={{ padding: '6px 8px' }}
      >
        &nbsp;&nbsp;
        <RiImageAddFill /> &nbsp; Select &nbsp;&nbsp;
        <input
          type="file"
          hidden
          onChange={handleUploadImage}
          accept="image/*"
          id="file-uploader"
        />
      </StyledButton>
      {fileSizeError && <Error>Max file size allowed: 400K </Error>}
    </>
  );
}

ImageUploadWrapper.propTypes = {
  fileSelectCallback: PropTypes.func,
  uploadCallback: PropTypes.func,
};

export default ImageUploadWrapper;
