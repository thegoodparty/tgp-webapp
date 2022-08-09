import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import Link from 'next/link';

import { MdClose } from 'react-icons/md';

import { HomePageContext } from '/containers/HomePage';
import BlackButton, { InnerButton } from '../shared/buttons/BlackButton';
import EmailInput, { isValidEmail } from '../shared/EmailInput';
import { getUserCookie } from '../../helpers/cookieHelper';

const Wrapper = styled.div`
  padding: 36px 0;
  background-color: #fff;
  border-radius: 12px;
  max-width: 600px;
  min-width: 300px;
  font-size: 16px;
  position: relative;

  .MuiInputBase-input {
    font-size: 14px !important;
  }
`;

const Padder = styled.div`
  padding: 0 36px;
`;

const CloseWrapper = styled.div`
  display: inline-block;
  padding: 16px;
  cursor: pointer;
  color: #d3d3d3;
  position: absolute;
  top: 0;
  right: 0;
`;

const Title = styled.div`
  font-size: 28px;
  font-weight: 900;
`;

const SubTitle = styled.div`
  font-weight: 900;
  padding-bottom: 35px;
  margin-top: 20px;
  font-size: 18px;
`;

const Line = styled.div`
  margin-bottom: 35px;
  border-top: solid 1px #ececec;
`;

const InvolvedModalInner = ({ closeModalCallback }) => {
  const user = getUserCookie(true);
  const [name, setName] = useState(user ? `${user.name}` : '');
  const [email, setEmail] = useState(user ? user.email : '');
  const { subscribeEmailCallback } = useContext(HomePageContext);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const canSubmit = () => isValidEmail(email) && name !== '' && name.length > 2;

  const submitForm = () => {
    if (canSubmit()) {
      subscribeEmailCallback(email, name);
      closeModalCallback();
    }
  };
  return (
    <Wrapper>
      <CloseWrapper onClick={closeModalCallback}>
        <MdClose />
      </CloseWrapper>
      <Padder>
        <Title>Get Involved</Title>
        <SubTitle>
          Subscribe to get our updates!{' '}
          <span role="img" aria-label="heart" style={{ color: 'red' }}>
            ❤
          </span>{' '}
          <span role="img" aria-label="Party">
            🎉️
          </span>
        </SubTitle>
      </Padder>
      <Line />
      <Padder>
        <form noValidate onSubmit={(e) => e.preventDefault()} id="homepage-involved-form">
          <TextField
            fullWidth
            primary
            label="Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={name != '' && name.length < 2}
          />
          <br />
          <br />
          <EmailInput
            hideIcon
            onChangeCallback={handleEmailChange}
            value={email}
          />
          <BlackButton
            disabled={!canSubmit()}
            onClick={submitForm}
            id="involved-modal-submit-email"
            type="submit"
            fullWidth
          >
            <InnerButton>Submit</InnerButton>
          </BlackButton>
        </form>
        <br />
        <br />
        <div className="text-center">
          <Link href="/candidates" passHref>
            <a>Find Good Candidates</a>
          </Link>
        </div>
      </Padder>
    </Wrapper>
  );
};

export default InvolvedModalInner;
