import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';

import Wrapper from 'components/shared/Wrapper';
import MobileHeader from 'components/shared/navigation/MobileHeader';
import Nav from 'containers/shared/Nav';
import { Body13, H2, H1 } from 'components/shared/typogrophy/index';
import GrayWrapper from 'components/shared/GrayWrapper';
import SocialButton from 'components/you/SocialRegisterWrapper/SocialButton';
import heartImg from 'images/heart.svg';

import TextField from '@material-ui/core/TextField';
import globals from '../../../globals';
import { OutlinedButton } from '../../shared/buttons';

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
  const onChangeEmail = event => {
    setEmail(event.target.value);
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
      loginCallback(email);
    }
  };
  return (
    <GrayWrapper>
      <Nav />
      <Wrapper>
        <MobileHeader />
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <VerticalWrapper>
              <Heart src={heartImg} />
              <H1>Sign into your account</H1>
            </VerticalWrapper>
          </Grid>
          <Grid item xs={12} md={6}>
            <VerticalWrapper>
              <form noValidate onSubmit={handleSubmitForm}>
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
                />
                <OutlinedButton
                  fullWidth
                  active={validateEmail()}
                  onClick={handleSubmit}
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
              <SocialButton
                channel="facebook"
                provider="facebook"
                appId={globals.facebookAppId}
                onLoginSuccess={socialLoginCallback}
                onLoginFailure={socialLoginFailureCallback}
              >
                Continue with Facebook
              </SocialButton>
              <SocialButton
                channel="google"
                provider="google"
                appId={globals.googleAppId}
                onLoginSuccess={socialLoginCallback}
                onLoginFailure={socialLoginFailureCallback}
              >
                Continue with GOOGLE
              </SocialButton>

              <Body13 style={{ margin: '24px 0' }}>
                Don&apos;t have an account?{' '}
                <Link to="?register=true">Create one</Link>
              </Body13>
            </VerticalWrapper>
          </Grid>
        </Grid>
      </Wrapper>
    </GrayWrapper>
  );
};

LoginWrapper.propTypes = {
  loginCallback: PropTypes.func,
  socialLoginCallback: PropTypes.func,
  socialLoginFailureCallback: PropTypes.func,
};

export default LoginWrapper;
