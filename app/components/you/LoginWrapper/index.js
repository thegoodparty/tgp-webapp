import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import PageWrapper from 'components/shared/PageWrapper';
import { Body13, H2, H1 } from 'components/shared/typogrophy/index';
import SocialButton from 'components/you/SocialRegisterWrapper/SocialButton';
import heartImg from 'images/heart.svg';

import TextField from '@material-ui/core/TextField';
import globals from '../../../globals';
import { OutlinedButton } from '../../shared/buttons';
import FacebookButton from '../SocialRegisterWrapper/FacebookButton';

const Heart = styled.img`
  width: 64px;
  height: auto;
  margin-bottom: 12px;
`;

const VerticalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    height: calc(100vh - 100px);
  }
`;

const OrWrapper = styled.div`
  margin-top: 24px;
  height: 16px;
  position: relative;
`;

const Border = styled.div`
  border-bottom: solid 1px ${({ theme }) => theme.colors.grayE};
  height: 10px;
`;

const Or = styled.div`
  position: absolute;
  width: 50px;
  text-align: center;
  left: calc(50% - 25px);
  top: 0;
  background: ${({ theme }) => theme.colors.grayBg};
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

const LoginWrapper = ({
  loginCallback,
  socialLoginCallback,
  socialLoginFailureCallback,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setshowPassword] = useState(false);
  const onChangeEmail = event => {
    setEmail(event.target.value);
  };

  const enableSubmit = () => {
    return password.length >= 8 && validateEmail();
  };

  const validateEmail = () => {
    const validEmail = /\S+@\S+\.\S+/;
    return validEmail.test(email);
  };

  const handleSubmitForm = e => {
    e.preventDefault();
    handleSubmit();
  };

  const handleSubmit = () => {
    if (validateEmail()) {
      loginCallback(email, password);
    }
  };

  const handleClickShowPassword = () => {
    setshowPassword(!showPassword);
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const onChangePassword = event => {
    setPassword(event.target.value);
  };

  return (
    <PageWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <VerticalWrapper>
            <Heart src={heartImg} />
            <H1 data-cy="title">Sign into your account</H1>
          </VerticalWrapper>
        </Grid>
        <Grid item xs={12} md={6}>
          <VerticalWrapper>
            <form noValidate onSubmit={handleSubmitForm} data-cy="email-form">
              <Input
                value={email}
                label="Email Address"
                required
                size="medium"
                fullWidth
                type="email"
                name="email"
                autoComplete="email"
                variant="outlined"
                onChange={onChangeEmail}
                data-cy="email-input"
              />
              <Input
                value={password}
                label="Password"
                required
                size="medium"
                fullWidth
                type={showPassword ? 'text' : 'password'}
                name="password"
                onChange={onChangePassword}
                data-cy="password"
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <OutlinedButton
                fullWidth
                active={enableSubmit()}
                onClick={handleSubmit}
                type="submit"
              >
                Submit
              </OutlinedButton>
            </form>
            <OrWrapper>
              <Border />
              <Or>
                <Body13 style={{ color: '#767676' }}>Or</Body13>
              </Or>
            </OrWrapper>
            <FacebookButton
              onLoginSuccess={socialLoginCallback}
              onLoginFailure={socialLoginFailureCallback}
            >
              Continue with Facebook
            </FacebookButton>
            <div data-cy="google-login">
              <SocialButton
                channel="google"
                provider="google"
                appId={globals.googleAppId}
                onLoginSuccess={socialLoginCallback}
                onLoginFailure={socialLoginFailureCallback}
              >
                Continue with GOOGLE
              </SocialButton>
            </div>
            <Body13 style={{ margin: '24px 0' }} data-cy="register-label">
              Don&apos;t have an account?{' '}
              <Link to="?register=true" data-cy="register">
                Create one
              </Link>
            </Body13>
          </VerticalWrapper>
        </Grid>
      </Grid>
    </PageWrapper>
  );
};

LoginWrapper.propTypes = {
  loginCallback: PropTypes.func,
  socialLoginCallback: PropTypes.func,
  socialLoginFailureCallback: PropTypes.func,
};

export default LoginWrapper;
