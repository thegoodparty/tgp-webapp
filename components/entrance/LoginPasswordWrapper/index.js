import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import PageWrapper from 'components/shared/PageWrapper';
import { Body11, Body13, H1 } from 'components/shared/typogrophy';
import Link from 'next/link';
import PasswordInput from '../../shared/PasswordInput';
import { PurpleButton } from '../../shared/buttons';

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
  email,
  loginCallback,
  forgotPasswordCallback,
}) => {
  const [password, setPassword] = useState('');
  const [sentForgot, setSentForgot] = useState(false);

  const enableSubmit = () => {
    return password.length >= 8;
  };

  const handleSubmitForm = e => {
    e.preventDefault();
  };

  const handleSubmit = () => {
    if (enableSubmit()) {
      loginCallback(email, password);
    }
  };

  const onChangePassword = pwd => {
    setPassword(pwd);
  };

  const handleForgotPassword = e => {
    e.preventDefault();
    e.stopPropagation();
    forgotPasswordCallback(email);
    setSentForgot(true);
  };

  return (
    <PageWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <VerticalWrapper>
            <H1 data-cy="title">Sign into your account</H1>
          </VerticalWrapper>
        </Grid>
        <Grid item xs={12} md={6}>
          <VerticalWrapper>
            <form noValidate onSubmit={handleSubmitForm} data-cy="email-form">
              <Body13>
                {email} &nbsp; &nbsp;{' '}
                <Link href="/login" passHref>
                  <a>
                    <ForgotLink style={{ display: 'inline' }}>
                      Change Email
                    </ForgotLink>
                  </a>
                </Link>
              </Body13>
              <br />
              <PasswordInput onChangeCallback={onChangePassword} />
              {sentForgot ? (
                <Body11 style={{ color: 'red', marginBottom: '24px' }}>
                  Your password recovery link was sent to {email}
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
                <PurpleButton
                  fullWidth
                  disabled={!enableSubmit()}
                  onClick={handleSubmit}
                  type="submit"
                >
                  SIGN IN
                </PurpleButton>
              </div>
            </form>
          </VerticalWrapper>
        </Grid>
      </Grid>
    </PageWrapper>
  );
};

LoginPasswordWrapper.propTypes = {
  email: PropTypes.string,
  loginCallback: PropTypes.func,
  forgotPasswordCallback: PropTypes.func,
};

export default LoginPasswordWrapper;
