/**
 *
 * ImageSection
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import UserAvatar from '../../shared/UserAvatar';
import { Body9, H2 } from '../../shared/typogrophy';

import { fullFirstLastInitials } from '../../../helpers/userHelper';
import UploadModal from './UploadModal';

const Wrapper = styled.section`
  padding: 24px 0;
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding-left: 24px;
  }
`;

const Row = styled.div`
  display: none;
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: flex;
    align-items: center;
  }

  &.top {
    display: flex;
    align-items: center;
  }
`;

const AvatarWrapper = styled.div`
  position: relative;
  height: 64px;
  width: 64px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;

  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    height: 94px;
    width: 94px;
  }
`;

const EditText = styled(Body9)`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 64px;
  height: 20px;
  background-color: rgba(232, 227, 236, 0.8);
  color: ${({ theme }) => theme.colors.purple2};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;

  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    height: 30px;
    width: 94px;
  }
`;

function ImageSection({ user, mode = 'desktop', uploadImageCallback }) {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
  return (
    <Wrapper>
      <Row className={mode}>
        <AvatarWrapper onClick={handleOpenModal}>
          <EditText>EDIT</EditText>

          <UserAvatar user={user} size="large" />
        </AvatarWrapper>
        <H2 style={{ marginLeft: '12px' }}>
          {fullFirstLastInitials(user.name)}
        </H2>
      </Row>

      <UploadModal
        closeModalCallback={handleCloseModal}
        open={showModal}
        uploadImageCallback={uploadImageCallback}
      />
    </Wrapper>
  );
}

ImageSection.propTypes = {
  user: PropTypes.object,
  mode: PropTypes.string,
  uploadImageCallback: PropTypes.func,
};

export default ImageSection;
