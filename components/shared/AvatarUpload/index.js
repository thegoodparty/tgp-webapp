/**
 *
 * AvatarUpload
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Backdrop from '@material-ui/core/Backdrop';
import ImageUploader from 'react-images-upload';

const Wrapper = styled(Backdrop)`
  && {
    z-index: 1001;
  }
`;

const Inner = styled.div`
  padding: 2rem 4rem;
  background-color: #fff;
  border-radius: 8px;

  .fileContainer {
    box-shadow: none;

    .chooseFileButton {
      background-color: ${({ theme }) => theme.colors.blue};
    }
  }
`;

function AvatarUpload({ closeCallback, selectImageCallback }) {
  const [open, setOpen] = useState(true);

  const onDrop = (pictureFile, pictureData) => {
    selectImageCallback({ pictureFile, pictureData });
    handleClose();
  };
  const handleClose = () => {
    setOpen(false);
    closeCallback();
  };
  return (
    <Wrapper open={open} onClick={handleClose}>
      <Inner onClick={e => e.stopPropagation()}>
        <ImageUploader
          withIcon
          onChange={onDrop}
          imgExtension={['.jpg', '.jpeg', '.gif', '.png', '.gif']}
          maxFileSize={1048576}
          singleImage
          label="Please upload a profile image."
        />
      </Inner>
    </Wrapper>
  );
}

AvatarUpload.propTypes = {
  closeCallback: PropTypes.func,
  selectImageCallback: PropTypes.func,
};

export default AvatarUpload;
