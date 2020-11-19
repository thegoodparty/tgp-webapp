import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';
import TextField from '@material-ui/core/TextField';

import Wrapper from 'components/shared/Wrapper';
import { Body13, H2 } from 'components/shared/typogrophy/index';
import NextButton from 'components/shared/buttons/NextButton';
import { fullFirstLastInitials } from 'helpers/userHelper';
import PasswordInput from 'components/shared/PasswordInput';
import PageWrapper from 'components/shared/PageWrapper';

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

const SubmitWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-bottom: 20px;
`;

const Error = styled(Body13)`
  color: red;
  font-weight: 600;
  margin-top: 12px;
`;

const Login = styled.span`
  a {
    color: ${({ theme }) => theme.colors.blue};
  }
  font-weight: 600;
  text-decoration: underline;
  margin-left: 4px;
`;

const RegisterWrapper = ({ registerCallback, loading, error }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showName, setShowName] = useState(false);

  const onChangeName = event => {
    setName(event.target.value);
  };

  const onChangeEmail = event => {
    setEmail(event.target.value);
  };

  const validateEmail = () => {
    const validEmail = /\S+@\S+\.\S+/;
    return validEmail.test(email);
  };

  const enableSubmit = () =>
    name !== '' && password.length >= 8 && validateEmail();

  const handleSubmitForm = e => {
    e.preventDefault();
    // handleSubmit();
  };

  const handleSubmit = () => {
    if (enableSubmit()) {
      registerCallback(email, name, password);
    }
  };

  const onEmailFocus = () => {
    if (name !== '') {
      setShowName(true);
    }
  };

  const onChangePassword = pwd => {
    setPassword(pwd);
  };

  return (
    <PageWrapper white>
      <H2 data-cy="title">Join The Good Party</H2>
      <Body13
        style={{ marginTop: '16px', marginBottom: '28px' }}
        data-cy="description"
      >
        Please enter your info, so we can count your support and notify you as
        we make progress.
      </Body13>
      <form noValidate onSubmit={handleSubmitForm}>
        <Input
          value={name}
          label="Full Name"
          required
          placeholder="John Smith"
          size="medium"
          name="name"
          variant="outlined"
          fullWidth
          onChange={onChangeName}
          data-cy="full-name"
          helperText={`We will never show your full name on our site. ${
            showName
              ? `On our site you'll be: ${fullFirstLastInitials(name)}`
              : ''
          }`}
        />

        <Input
          value={email}
          label="Email Address"
          required
          size="medium"
          fullWidth
          type="email"
          name="email"
          helperText="We will never share or sell your information for any reason"
          autoComplete="email"
          onChange={onChangeEmail}
          onFocus={onEmailFocus}
          data-cy="email"
          variant="outlined"
        />
        <PasswordInput onChangeCallback={onChangePassword} variant="outlined" />

        <SubmitWrapper onClick={handleSubmit} data-cy="submit">
          <NextButton active={enableSubmit()}>Submit</NextButton>
          {error && error.exists && <Error>{error.message} </Error>}
        </SubmitWrapper>
        <Body13 style={{ margin: '24px 0' }} data-cy="login-wrapper">
          Already have an account?{' '}
          <Link href="/login" data-cy="login-link">
            Login
          </Link>
        </Body13>
      </form>
    </PageWrapper>
  );
};

RegisterWrapper.propTypes = {
  registerCallback: PropTypes.func,
  loading: PropTypes.bool,
  error: PropTypes.bool,
};

export default RegisterWrapper;
