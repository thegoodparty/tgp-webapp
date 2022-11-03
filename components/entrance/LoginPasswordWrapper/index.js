import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import PageWrapper from '/components/shared/PageWrapper';
import { Body11, Body13, H1 } from '/components/shared/typogrophy';
import Link from 'next/link';
import PasswordInput from '../../shared/PasswordInput';
import { formatToPhone } from '/helpers/phoneHelper';
import { passwordRegex } from '/helpers/userHelper';
import BlackButton from '../../shared/buttons/BlackButton';

const VerticalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    height: calc(100vh - 100px);
  }
`;

const ForgotLink = styled(Body11)`
  color: ${({ theme }) => theme.colors.blue};
  margin-bottom: 24px;
  cursor: pointer;
`;

const LoginPasswordWrapper = ({
  value,
  valueType,
  loginCallback,
  forgotPasswordCallback,
}) => {
  const [password, setPassword] = useState('');
  const [sentForgot, setSentForgot] = useState(false);

  const enableSubmit = () =>
    password !== '' && password.match(passwordRegex) && password.length >= 8;

  const handleSubmitForm = (e) => {
    e.preventDefault();
  };

  const handleSubmit = () => {
    if (enableSubmit()) {
      loginCallback(value, password, valueType);
    }
  };

  const onChangePassword = (pwd) => {
    setPassword(pwd);
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    e.stopPropagation();
    forgotPasswordCallback(value, valueType);
    setSentForgot(true);
  };

  return (
    <PageWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <VerticalWrapper>
            <H1 data-cy="login-pwd-title">Sign into your account</H1>
          </VerticalWrapper>
        </Grid>
        <Grid item xs={12} md={6}>
          <VerticalWrapper>
            <form noValidate onSubmit={handleSubmitForm} data-cy="value-form">
              <Body13 data-cy="email-label">
                {valueType === 'phone' ? formatToPhone(value) : value} &nbsp;
                &nbsp;{' '}
                <Link href="/?login=true" data-cy="redirect-to-login">
                  <ForgotLink style={{ display: 'inline' }}>
                    Change {valueType === 'email' ? 'email' : 'phone'}
                  </ForgotLink>
                </Link>
              </Body13>
              <br />
              <PasswordInput
                onChangeCallback={onChangePassword}
                autoFocus
                helperText="For security, passwords must have at least 1 capital letter, 1 lowercase, 1 special character or number, and 8 characters minimum"
              />
              {sentForgot ? (
                <Body11
                  style={{ color: 'red', marginBottom: '24px' }}
                  data-cy="sent-forgot"
                >
                  Your password recovery link was sent to{' '}
                  {valueType === 'email' ? value : formatToPhone(value)}
                </Body11>
              ) : (
                <ForgotLink
                  onClick={handleForgotPassword}
                  data-cy="forgot-link"
                >
                  Forgot your password?
                </ForgotLink>
              )}

              <div data-cy="login">
                <BlackButton
                  fullWidth
                  disabled={!enableSubmit()}
                  onClick={handleSubmit}
                  type="submit"
                >
                  SIGN IN
                </BlackButton>
              </div>
            </form>
          </VerticalWrapper>
        </Grid>
      </Grid>
    </PageWrapper>
  );
};

LoginPasswordWrapper.propTypes = {
  value: PropTypes.string,
  valueType: PropTypes.string,
  loginCallback: PropTypes.func,
  forgotPasswordCallback: PropTypes.func,
};

export default LoginPasswordWrapper;
