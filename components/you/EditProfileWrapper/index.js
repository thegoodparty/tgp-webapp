import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Link from 'next/link';
import BackIcon from '@material-ui/icons/ChevronLeft';
import Hidden from '@material-ui/core/Hidden';
import PageWrapper from 'components/shared/PageWrapper';
import Nav from 'containers/shared/Nav';
import {
  H1,
  Body11,
  Body14,
  H3,
  Body,
} from 'components/shared/typogrophy/index';
import LoadingAnimation from 'components/shared/LoadingAnimation';
import CameraAltOutlinedIcon from '@material-ui/icons/CameraAltOutlined';
import TextField from '@material-ui/core/TextField';
import LockIcon from '@material-ui/icons/Lock';
import { formatToPhone } from 'helpers/phoneHelper';
import AvatarUpload from 'components/shared/AvatarUpload/Loadable';
import { BlueButton } from 'components/shared/buttons';
import UserAvatar from 'components/shared/UserAvatar';
import AlertDialog from 'components/shared/AlertDialog';

import { getUserDistrictName } from 'helpers/userHelper';
const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: space-between;
`;

const UserInitials = styled(H3)`
  cursor: pointer;
  height: 70px;
  width: 70px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  background-color: ${({ theme }) => theme.colors.lighterBlue};
  text-transform: uppercase;
  margin-bottom: 12px;
  position: relative;
  overflow: hidden;

  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    height: 100px;
    width: 100px;
  }
`;

const Camera = styled.div`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100px;
  text-align: center;
  color: #fff;
  bottom: 0;
`;

const Input = styled(TextField)`
  && {
    margin-bottom: 48px;

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

const Form = styled.form`
  margin-top: 2rem;
`;

const StyledBody14 = styled(Body14)`
  color: ${({ theme }) => theme.colors.blue};
`;

const Address = styled(Body)`
  margin-top: 8px;
`;

const PrivateWrapper = styled.div`
  margin-top: 48px;
  background-color: #f2f2f2;
  width: 100vw;
  margin-left: -16px;
  padding 16px;
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    width: auto;
  }
`;

const Private = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.gray4};
  margin-bottom: 6px;
`;

const Verified = styled.div`
  color: ${({ theme }) => theme.colors.green};
`;

const PhoneWrapper = styled.div`
  margin: 20px 0 36px;
`;

const AddPhoneLabel = styled(Body11)`
  color: rgba(0, 0, 0, 0.54);
  font-weight: 500;
`;

const AddPhone = styled(Body)`
  color: ${({ theme }) => theme.colors.blue};
  margin-top: 10px;
  padding-bottom: 16px;
  border-bottom: solid 1px ${({ theme }) => theme.colors.gray9};
  cursor: pointer;
`;

const EditProfileWrapper = ({
  user,
  updateProfileCallback,
  updatePhotoCallback,
  deleteRankingCallback,
}) => {
  if (!user) {
    return (
      <div>
        <Nav />
        <LoadingAnimation />
      </div>
    );
  }
  const { name, feedback, zipCode, isEmailVerified, congDistrict } = user;
  const initialPhone = user.phone ? formatToPhone(user.phone) : false;
  const initialEmail = user.email;
  const [phone, setPhone] = useState(initialPhone);
  const [email, setEmail] = useState(initialEmail);
  const [digitsPhone, setDigitsPhone] = useState(false);
  const [newName, setNewName] = useState(name);
  const [newFeedback, setNewFeedback] = useState(feedback);
  const [editPhone, setEditPhone] = useState(false);
  const [showUploadPhoto, setShowUploadPhoto] = useState(false);
  const [showRankAlert, setShowRankAlert] = useState(false);

  // phone
  const phoneReg = /^(\([0-9]{3}\))\s[0-9]{3}\s-\s[0-9]{4}$/;
  const onChangePhone = event => {
    const formattedPhone = formatToPhone(event.target.value);
    setPhone(formattedPhone);
    const validPhone = phoneReg.test(formattedPhone);

    if (validPhone) {
      setDigitsPhone(formattedPhone.replace(/\D/g, '').substring(0, 10));
    } else {
      setDigitsPhone(false);
    }
  };

  const { stateLong, cds, primaryCity } = zipCode || {};

  const districtName = getUserDistrictName(congDistrict, cds);

  const onChangeName = event => {
    setNewName(event.target.value);
  };

  const onChangeEmail = event => {
    setEmail(event.target.value);
  };
  const onChangeFeedback = event => {
    setNewFeedback(event.target.value);
  };

  const handleSubmitForm = e => {
    e.preventDefault();
    handleSubmit();
  };

  const handleSubmit = () => {
    if (canSave()) {
      const updatedFields = {};
      if (newName !== name) {
        updatedFields.name = newName;
      }
      if (newFeedback !== feedback) {
        updatedFields.feedback = newFeedback;
      }
      updateProfileCallback(updatedFields);
    }
  };

  const handleSubmitPhoneEmailForm = e => {
    e.preventDefault();
    handlePhoneEmailSubmit();
  };

  const handlePhoneEmailSubmit = () => {
    const updatedFields = {};
    if (digitsPhone !== phone) {
      updatedFields.phone = digitsPhone;
    }
    if (email !== initialEmail && validateEmail()) {
      updatedFields.email = email;
    }
    updateProfileCallback(updatedFields);
  };

  const validateEmail = () => {
    const validEmail = /\S+@\S+\.\S+/;
    return validEmail.test(email);
  };

  const canSave = () => newName !== name || newFeedback !== feedback;

  const canSavePhoneEmail = () =>
    (digitsPhone && phone !== initialPhone) ||
    (validateEmail() && email !== initialEmail);

  const uploadPhoto = () => {
    setShowUploadPhoto(true);
  };

  const closeUploadPhotoCallback = () => {
    setShowUploadPhoto(false);
  };

  const selectImageCallback = photo => {
    updatePhotoCallback(photo);
  };

  const handleChangeAddress = () => {
    setShowRankAlert(true);
  };

  const handleCloseAlert = () => {
    setShowRankAlert(false);
  };

  const handleDeleteRanking = () => {
    deleteRankingCallback(user);
    handleCloseAlert();
  };

  return (
    <PageWrapper white>
      <Hidden smDown>
        <Link href="/you" data-cy="back-link">
          <BackIcon style={{ fontSize: '34px' }} />
        </Link>
      </Hidden>
      {user && (
        <>
          <Row>
            <H1 data-cy="title">Edit Profile</H1>

            <UserInitials onClick={uploadPhoto}>
              <UserAvatar user={user} size="large" />
              <Camera>
                <CameraAltOutlinedIcon style={{ fontSize: '18px' }} />
              </Camera>
            </UserInitials>
          </Row>
          <Form noValidate onSubmit={handleSubmitForm} data-cy="profile-form">
            <Input
              value={newName}
              label="Name"
              required
              size="medium"
              fullWidth
              onChange={onChangeName}
              helperText="Only your last initial will ever be shown"
              data-cy="new-name"
            />
            <Input
              value={newFeedback}
              label="Share any thoughts about The Good Party"
              size="medium"
              multiline
              fullWidth
              onChange={onChangeFeedback}
              data-cy="new-feedback"
            />
            <BlueButton
              fullWidth
              disabled={!canSave()}
              onClick={handleSubmit}
              data-cy="profile-save"
            >
              Save
            </BlueButton>
          </Form>
          <Row style={{ marginTop: '48px' }}>
            <Body11 data-cy="congress-district-title">
              Congressional District
            </Body11>
            <StyledBody14 onClick={handleChangeAddress} data-cy="edit-district">
              Edit
            </StyledBody14>
          </Row>
          <Address data-cy="address1">
            {primaryCity}
            {districtName && `, ${districtName}`}{' '}
          </Address>
          <Address data-cy="address2">
            {stateLong} {zipCode && zipCode.zip}
          </Address>

          <PrivateWrapper>
            <Private>
              <H3 data-cy="private-info-title">Private Info&nbsp;</H3>
              <LockIcon />
            </Private>
            <Body11 data-cy="private-info-description">
              Not shown anywhere, only used for login and contact
            </Body11>
            <br />
            {!phone && !editPhone && (
              <PhoneWrapper>
                <AddPhoneLabel data-cy="phone-label">
                  Phone Number
                </AddPhoneLabel>
                <AddPhone
                  onClick={() => setEditPhone(true)}
                  data-cy="add-phone"
                >
                  Add Phone
                </AddPhone>
              </PhoneWrapper>
            )}
            <form
              noValidate
              onSubmit={handleSubmitPhoneEmailForm}
              data-cy="private-info-form"
            >
              {(phone || editPhone) && (
                <PhoneWrapper>
                  <Input
                    value={phone}
                    label="Phone"
                    size="medium"
                    autoFocus={editPhone}
                    fullWidth
                    onChange={onChangePhone}
                    style={{ marginBottom: '24px' }}
                    data-cy="new-phone"
                  />
                </PhoneWrapper>
              )}
              <Input
                value={email}
                onChange={onChangeEmail}
                label="Email"
                size="medium"
                fullWidth
                style={{ marginBottom: '16px' }}
                data-cy="new-email"
              />
              {isEmailVerified && email === initialEmail && (
                <Verified>VERIFIED</Verified>
              )}
              <BlueButton
                fullWidth
                disabled={!canSavePhoneEmail()}
                onClick={handlePhoneEmailSubmit}
                style={{ margin: '24px 0' }}
                data-cy="private-info-submit"
              >
                Save
              </BlueButton>
            </form>
          </PrivateWrapper>
          <AlertDialog
            open={showRankAlert}
            handleClose={handleCloseAlert}
            title="District Change"
            ariaLabel="Ranking not Allowed"
            description="If you proceed, your previous district's ranked choices will be discarded."
            handleProceed={handleDeleteRanking}
          />
        </>
      )}
      {showUploadPhoto && (
        <AvatarUpload
          closeCallback={closeUploadPhotoCallback}
          selectImageCallback={selectImageCallback}
        />
      )}
    </PageWrapper>
  );
};

EditProfileWrapper.propTypes = {
  user: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  updateProfileCallback: PropTypes.func,
  updatePhotoCallback: PropTypes.func,
  deleteRankingCallback: PropTypes.func,
};

export default EditProfileWrapper;
