/**
 *
 * AdminCandidateImageWrapper
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import CandidateTopMenu from '../CandidateTopMenu';
import { Body, H2 } from '../../shared/typogrophy';
import CandidateAvatar from '../../shared/CandidateAvatar';
import ImageCrop from '../../shared/ImageCrop';
import AdminPageWrapper from '../AdminWrapper/AdminPageWrapper';

const Wrapper = styled.div`
  min-height: calc(100vh - 50px);
  padding: 36px 0;
  max-width: ${({ theme }) => theme.breakpointsPixels.contentMax};
  margin: 0 auto;
`;

const CropWrapper = styled.div`
  position: relative;
`;

function AdminCandidateImageWrapper({ candidate, saveCallback }) {
  const [formState, setFormState] = useState({
    imageBase64: false,
  });

  const handleUpload = base64 => {
    setFormState({ ...formState, imageBase64: base64 });
    saveCallback({
      ...candidate,
      imageBase64: base64,
    });
  };
  return (
    <AdminPageWrapper>
      <Wrapper>
        <CandidateTopMenu candidate={candidate} />
        <br />
        <H2>Candidate Image</H2>
        <br />
        <br />
        {candidate && candidate.image && (
          <div className="flex-center">
            <CandidateAvatar
              src={candidate.image}
              name={candidate.firstName}
              good
              size="xl"
            />
          </div>
        )}

        {!formState.imageBase64 ? (
          <CropWrapper>
            <ImageCrop uploadImageCallback={handleUpload} />
          </CropWrapper>
        ) : (
          <Body>Image Selected</Body>
        )}
      </Wrapper>
    </AdminPageWrapper>
  );
}

AdminCandidateImageWrapper.propTypes = {
  candidate: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  saveCallback: PropTypes.func,
};

export default AdminCandidateImageWrapper;
