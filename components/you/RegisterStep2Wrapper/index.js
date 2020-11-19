import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Link from 'next/link';
import CircularProgress from '@material-ui/core/CircularProgress';

import PageWrapper from 'components/shared/PageWrapper';
import { Body, Body13, H2, Body11 } from 'components/shared/typogrophy/index';
import heartImg from 'public/images/heart.svg';
import addPhotoImg from 'public/images/icons/add-photo.svg';

import TextField from '@material-ui/core/TextField';
import UserAvatar from 'components/shared/UserAvatar';
import AvatarUpload from 'components/shared/AvatarUpload/Loadable';
import { NextButton } from 'components/shared/buttons';

const Heart = styled.img`
  width: 64px;
  height: auto;
  margin-bottom: 12px;
`;
const Skip = styled(Body13)`
  text-align: right;
`;

const VerticalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    height: calc(100vh - 100px);
  }
`;

const PhotoRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 14px 0 36px;
  cursor: pointer;
`;

const PhotoAction = styled(Body)`
  color: ${({ theme }) => theme.colors.blue};
  margin-left: 16px;
`;

const Input = styled(TextField)`
  && {
    margin-bottom: 18px;

    .MuiInputBase-input {
      line-height: 22px;
      font-size: 16px;
      letter-spacing: 0.1px;

      @media only screen and (min-width: ${({ theme }) =>
          theme.breakpoints.md}) {
        font-size: 20px;
        line-height: 26px;
      }
    }
  }
`;

const AddPhotoWrapper = styled.div`
  border-radius: 50%;
  height: 80px;
  width: 80px;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 0px 32px rgba(0, 0, 0, 0.07), 0px 0px 10px rgba(0, 0, 0, 0.15),
    0px 0px 16px rgba(0, 0, 0, 0.12);

  & > img {
    width: 30px;
    height: auto;
  }

  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    height: 120px;
    width: 120px;

    & > img {
      width: 40px;
      height: auto;
    }
  }
`;

const SubmitText = styled(Body11)`
  &.active {
    color: ${({ theme }) => theme.colors.blue};
  }
`;

const RegisterStep2Wrapper = ({ user, submitCallback, loading }) => {
  const [showUploadPhoto, setShowUploadPhoto] = useState(false);
  const [comments, setComments] = useState('');
  const [uploadedPhoto, setUploadedPhoto] = useState(false);
  const onChangeComments = event => {
    setComments(event.target.value);
  };

  let avatar;
  if (
    uploadedPhoto &&
    uploadedPhoto.pictureData &&
    uploadedPhoto.pictureData.length > 0
  ) {
    [avatar] = uploadedPhoto.pictureData;
  } else if (user) {
    ({ avatar } = user);
  }

  const uploadPhoto = () => {
    setShowUploadPhoto(true);
  };

  const closeUploadPhotoCallback = () => {
    setShowUploadPhoto(false);
  };

  const selectImageCallback = photo => {
    setUploadedPhoto(photo);
  };

  const submitActive = () => {
    return comments !== '' || uploadedPhoto;
  };

  const handleSubmit = () => {
    submitCallback(comments, uploadedPhoto);
  };
  return (
    <PageWrapper>
      <Skip onClick={submitCallback}>Skip</Skip>

      <Grid container spacing={3}>
        <Grid item xs={12} />
        <Grid item xs={12} md={6}>
          <VerticalWrapper>
            <Heart src={heartImg} />
            <H2>Add some flavor!</H2>
          </VerticalWrapper>
        </Grid>
        <Grid item xs={12} md={6}>
          <VerticalWrapper>
            <Body className="bold600">Profile Photo</Body>
            {avatar ? (
              <PhotoRow onClick={uploadPhoto}>
                {uploadedPhoto ? (
                  <UserAvatar user={{ avatar }} size="large" />
                ) : (
                  <UserAvatar user={user} size="large" />
                )}
                <PhotoAction>Edit Photo</PhotoAction>
              </PhotoRow>
            ) : (
              <PhotoRow onClick={uploadPhoto}>
                <AddPhotoWrapper>
                  <img src={addPhotoImg} />
                </AddPhotoWrapper>
                <PhotoAction>Add a Photo</PhotoAction>
              </PhotoRow>
            )}
            <Body className="bold600">
              What inspires you about The Good Party?
            </Body>
            <Input
              value={comments}
              label="I’m excited to join because..."
              helperText="We may use this quote to inspire others to join!"
              size="medium"
              fullWidth
              multiline
              rows={2}
              rowsMax={8}
              variant="outlined"
              onChange={onChangeComments}
              style={{ margin: '16px 0' }}
            />
            {loading ? (
              <CircularProgress />
            ) : (
              <NextButton active={submitActive()} onClick={handleSubmit}>
                <SubmitText className={submitActive() && 'active'}>
                  SUBMIT
                </SubmitText>
              </NextButton>
            )}
          </VerticalWrapper>
        </Grid>
      </Grid>
      {showUploadPhoto && (
        <AvatarUpload
          closeCallback={closeUploadPhotoCallback}
          selectImageCallback={selectImageCallback}
        />
      )}
    </PageWrapper>
  );
};

RegisterStep2Wrapper.propTypes = {
  user: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  submitCallback: PropTypes.func,
  loading: PropTypes.bool,
};

export default RegisterStep2Wrapper;
