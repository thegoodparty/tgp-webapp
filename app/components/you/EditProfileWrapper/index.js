import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

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
import { fullFirstLastInitials, getInitials } from 'helpers/userHelper';
import { numberNth } from 'helpers/numberHelper';
import LoadingAnimation from 'components/shared/LoadingAnimation';
import CameraAltOutlinedIcon from '@material-ui/icons/CameraAltOutlined';
import TextField from '@material-ui/core/TextField';
import LockIcon from '@material-ui/icons/Lock';

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

const EditProfileWrapper = ({ user, signoutCallback }) => {
  const { name, feedback, zipCode, email, isEmailVerified } = user;
  const [newName, setNewName] = useState(name);
  const [newFeedback, setNewFeedback] = useState(feedback);
  if (!user) {
    return (
      <div>
        <Nav />
        <LoadingAnimation />
      </div>
    );
  }

  const { stateLong, cds } = zipCode;

  let districtName = '';
  if (cds && cds.length > 0) {
    districtName = cds[0].name;
  }

  const onChangeName = event => {
    setNewName(event.target.value);
  };
  const onChangeFeedback = event => {
    setNewFeedback(event.target.value);
  };

  const handleSubmitForm = e => {
    e.preventDefault();
    handleSubmit();
  };

  const handleSubmit = () => {
    // if (validateEmail()) {
    //   loginCallback(email);
    // }
  };

  return (
    <div>
      <Nav />
      <Wrapper white>
        <MobileHeader />
        <Row>
          <H1>Edit Profile</H1>
          <UserInitials>
            {getInitials(name)}
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
        </Form>
        <Row>
          <Body11>Your Home Location</Body11>
          <StyledBody14>Edit</StyledBody14>
        </Row>
        <Address>{stateLong}</Address>
        <Address>{districtName}</Address>
        <PrivateWrapper>
          <Private>
            <H3>Private Info&nbsp;</H3>
            <LockIcon />
          </Private>
          <Body11>Not shown anywhere, only used for login and contact</Body11>
          <br />
          <Input
            value={email}
            disabled
            label="Email"
            size="medium"
            fullWidth
            style={{ marginBottom: '16px' }}
          />
          {isEmailVerified && <Verified>VERIFIED</Verified>}
        </PrivateWrapper>
      </Wrapper>
    </div>
  );
};

EditProfileWrapper.propTypes = {
  user: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  signoutCallback: PropTypes.func,
};

export default EditProfileWrapper;
