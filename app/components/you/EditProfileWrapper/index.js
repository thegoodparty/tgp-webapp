import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import BackIcon from '@material-ui/icons/ChevronLeft';
import Hidden from '@material-ui/core/Hidden';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import WarningIcon from '@material-ui/icons/Warning';

import Wrapper from 'components/shared/Wrapper';
import MobileHeader from 'components/shared/navigation/MobileHeader';
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

const AlertWrapper = styled.div`
  border: solid 1px red;
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

  let districtName = '';
  if (cds && cds.length > 0) {
    if (congDistrict) {
      cds.forEach(district => {
        if (district.id === congDistrict) {
          districtName = district.name;
        }
      });
    } else {
      districtName = cds[0].name;
    }
  }

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
    <div>
      <Nav />
      <Wrapper white>
        <MobileHeader />
        <Hidden smDown>
          <Link to="/you">
            <BackIcon style={{ fontSize: '34px' }} />
          </Link>
        </Hidden>
        {user && (
          <>
            <Row>
              <H1>Edit Profile</H1>

              <UserInitials onClick={uploadPhoto}>
                <UserAvatar user={user} size="large" />
                <Camera>
                  <CameraAltOutlinedIcon style={{ fontSize: '18px' }} />
                </Camera>
              </UserInitials>
            </Row>
            <Form noValidate onSubmit={handleSubmitForm}>
              <Input
                value={newName}
                label="Name"
                required
                size="medium"
                fullWidth
                onChange={onChangeName}
                helperText="Only your last initial will ever be shown"
              />
              <Input
                value={newFeedback}
                label="Share any thoughts about The Good Party"
                size="medium"
                multiline
                fullWidth
                onChange={onChangeFeedback}
              />
              <BlueButton
                fullWidth
                disabled={!canSave()}
                onClick={handleSubmit}
              >
                Save
              </BlueButton>
            </Form>
            <Row style={{ marginTop: '48px' }}>
              <Body11>Congressional District</Body11>
              <StyledBody14 onClick={handleChangeAddress}>Edit</StyledBody14>
            </Row>
            <Address>
              {primaryCity}
              {districtName && `, ${districtName}`}{' '}
            </Address>
            <Address>
              {stateLong} {zipCode && zipCode.zip}
            </Address>

            <PrivateWrapper>
              <Private>
                <H3>Private Info&nbsp;</H3>
                <LockIcon />
              </Private>
              <Body11>
                Not shown anywhere, only used for login and contact
              </Body11>
              <br />
              {!phone && !editPhone && (
                <PhoneWrapper>
                  <AddPhoneLabel>Phone Number</AddPhoneLabel>
                  <AddPhone onClick={() => setEditPhone(true)}>
                    Add Phone
                  </AddPhone>
                </PhoneWrapper>
              )}
              <form noValidate onSubmit={handleSubmitPhoneEmailForm}>
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
                />
                {isEmailVerified && email === initialEmail && (
                  <Verified>VERIFIED</Verified>
                )}
                <BlueButton
                  fullWidth
                  disabled={!canSavePhoneEmail()}
                  onClick={handlePhoneEmailSubmit}
                  style={{ margin: '24px 0' }}
                >
                  Save
                </BlueButton>
              </form>
            </PrivateWrapper>
            <Dialog
              onClose={handleCloseAlert}
              aria-labelledby="Ranking not Allowed"
              open={showRankAlert}
            >
              <AlertWrapper>
                <DialogTitle id="alert-dialog-title">
                  <WarningIcon /> District Change
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    If you proceed, your previous district&apos;s ranked choices
                    will be discarded.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseAlert} color="primary">
                    Cancel
                  </Button>
                  <Button
                    onClick={handleDeleteRanking}
                    color="primary"
                    autoFocus
                  >
                    Proceed
                  </Button>
                </DialogActions>
              </AlertWrapper>
            </Dialog>
          </>
        )}
      </Wrapper>
      {showUploadPhoto && (
        <AvatarUpload
          closeCallback={closeUploadPhotoCallback}
          selectImageCallback={selectImageCallback}
        />
      )}
    </div>
  );
};

EditProfileWrapper.propTypes = {
  user: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  updateProfileCallback: PropTypes.func,
  updatePhotoCallback: PropTypes.func,
  deleteRankingCallback: PropTypes.func,
};

export default EditProfileWrapper;
