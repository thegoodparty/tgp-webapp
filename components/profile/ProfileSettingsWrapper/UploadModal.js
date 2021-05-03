/**
 *
 * UploadModal
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Dialog from '@material-ui/core/Dialog';

import ImageCrop from 'components/shared/ImageCrop';
import { Body, H2 } from '../../shared/typogrophy';
import { PurpleButton } from '../../shared/buttons';

const Wrapper = styled.section`
  background-color: #000;
  min-height: 100vh;
  padding: 24px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  &.with-image {
    background-color: #fff;
  }
`;

const Inner = styled.div`
  max-width: 640px;
  padding: 24px;
  color: #fff;
  margin: 0 auto;
`;

const Img = styled.img`
  max-width: 300px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 18px;
`;

const StyledBody = styled(Body)`
  color: ${({ theme }) => theme.colors.gray7};
  margin-bottom: 18px;
`;

function UploadModal({ open, closeModalCallback, uploadImageCallback }) {
  const [base64Img, setBase64Img] = useState(false);
  const handleStep1 = base64 => {
    setBase64Img(base64);
  };

  const handleUpload = () => {
    uploadImageCallback(base64Img);
    closeModalCallback();
    setBase64Img(false);
  };

  const handleClose = () => {
    setBase64Img(false);
    closeModalCallback();
  };
  return (
    <Dialog open={open} fullScreen onClose={handleClose}>
      <Wrapper className={base64Img ? 'with-image' : ''}>
        <Inner>
          {base64Img ? (
            <div className="text-center">
              <H2>Profile Preview</H2>
              <StyledBody>This is how your photo will appear</StyledBody>
              <Img src={base64Img} />
              <PurpleButton fullWidth onClick={handleUpload}>
                UPLOAD IMAGE
              </PurpleButton>
            </div>
          ) : (
            <>
              Upload a new profile image
              <br />
              <br />
              <ImageCrop
                showTitle={false}
                withPreview={false}
                uploadImageCallback={handleStep1}
                label="CHOOSE"
                additionalButton={
                  <PurpleButton
                    className="outline"
                    fullWidth
                    onClick={handleClose}
                  >
                    CANCEL
                  </PurpleButton>
                }
              />
            </>
          )}
        </Inner>
      </Wrapper>
    </Dialog>
  );
}

UploadModal.propTypes = {
  open: PropTypes.bool,
  closeModalCallback: PropTypes.func,
  uploadImageCallback: PropTypes.func,
};

export default UploadModal;
