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

const Error = styled.div`
  margin-top: 12px;
  color: red;
`;

function ImageUploadWrapper({ fileSelectCallback, uploadCallback }) {
  const [fileSizeError, setFileSizeError] = useState(false);
  const handleUploadImage = img => {
    setFileSizeError(false);
    const node = document.getElementById('file-uploader');
    const file = node.files ? node.files[0] : false;
    if (file) {
      if (file.size > 400000) {
        setFileSizeError(true);
        return;
      }
      fileSelectCallback(file, uploadCallback);
    }
  };

  return (
    <>
      <Button variant="contained" component="label">
        <RiImageAddFill /> &nbsp; Upload Image
        <input
          type="file"
          hidden
          onChange={handleUploadImage}
          accept="image/*"
          id="file-uploader"
        />
      </Button>
      {fileSizeError && <Error>Max file size allowed: 400K </Error>}
    </>
  );
}

ImageUploadWrapper.propTypes = {
  fileSelectCallback: PropTypes.func,
  uploadCallback: PropTypes.func,
};

export default ImageUploadWrapper;
