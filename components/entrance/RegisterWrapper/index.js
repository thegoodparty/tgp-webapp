import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Link from 'next/link';
import TextField from '@material-ui/core/TextField';
import dynamic from 'next/dynamic';
import PageWrapper from 'components/shared/PageWrapper';
import { Body13, H1, Body11 } from 'components/shared/typogrophy/index';
import globals from 'globals';
import { OutlinedButton } from 'components/shared/buttons';
import PasswordInput from 'components/shared/PasswordInput';
import TwitterButton from 'components/shared/TwitterButton';

const SocialButton = dynamic(
  () => import('components/you/SocialRegisterWrapper/SocialButton'),
  { ssr: false },
);

const heartImg = '/images/heart.svg';
const Heart = styled.img`
  width: 64px;
  height: auto;
  margin-bottom: 12px;
`;

const VerticalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
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
          theme.breakpointsPixels.md}) {
        font-size: 20px;
        line-height: 26px;
      }
    }
  }
`;

const ForgotLink = styled(Body11)`
  color: ${({ theme }) => theme.colors.blue};
  margin-bottom: 24px;
  cursor: pointer;
`;

const RegisterWrapper = ({
  registerCallback,
  socialRegisterCallback,
  socialRegisterFailureCallback,
  twitterButtonCallback,
}) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const enableSubmit = () => {
    return formData.password.length >= 8 && validateEmail();
  };

  const validateEmail = () => {
    const validEmail = /\S+@\S+\.\S+/;
    return validEmail.test(formData.email);
  };

  const handleSubmitForm = e => {
    e.preventDefault();
    // handleSubmit();
  };

  const handleSubmit = () => {
    if (enableSubmit()) {
      registerCallback(formData.email, formData.password);
    }
  };

  const onChangeField = (event, key) => {
    setFormData({
      ...formData,
      [key]: event.target.value,
    });
  };

  return (
    <PageWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <VerticalWrapper>
            <Heart src={heartImg} />
            <H1 data-cy="title">Join the Good Party</H1>
          </VerticalWrapper>
        </Grid>
        <Grid item xs={12} md={6}>
          <VerticalWrapper>
            <form noValidate onSubmit={handleSubmitForm} data-cy="email-form">
              <Input
                value={formData.email}
                label="Email Address"
                required
                size="medium"
                fullWidth
                type="email"
                name="email"
                autoComplete="email"
                variant="outlined"
                onChange={e => onChangeField(e, 'email')}
                data-cy="email-input"
              />

              <PasswordInput
                onChangeCallback={pwd =>
                  onChangeField({ target: { value: pwd } }, 'password')
                }
              />

              <div>
                <OutlinedButton
                  fullWidth
                  active={enableSubmit()}
                  onClick={handleSubmit}
                  type="submit"
                >
                  JOIN
                </OutlinedButton>
              </div>
            </form>
            <OrWrapper>
              <Border />
              <Or>
                <Body13 style={{ color: '#767676' }}>Or</Body13>
              </Or>
            </OrWrapper>
            <br />
            <div data-cy="facebook-login">
              <SocialButton
                channel="facebook"
                provider="facebook"
                appId={globals.facebookAppId}
                onLoginSuccess={socialRegisterCallback}
                onLoginFailure={socialRegisterFailureCallback}
              >
                Continue with FACEBOOK
              </SocialButton>
            </div>
            <br />
            <TwitterButton clickCallback={twitterButtonCallback}>
              Continue with Twitter
            </TwitterButton>
            <br />
            <div data-cy="google-login">
              <SocialButton
                channel="google"
                provider="google"
                appId={globals.googleAppId}
                onLoginSuccess={socialRegisterCallback}
                onLoginFailure={socialRegisterFailureCallback}
              >
                Continue with GOOGLE
              </SocialButton>
            </div>
            <Body13 style={{ margin: '24px 0' }} data-cy="register-label">
              Already have an account? <Link href="/login">login</Link>
            </Body13>
          </VerticalWrapper>
        </Grid>
      </Grid>
    </PageWrapper>
  );
};

RegisterWrapper.propTypes = {
  registerCallback: PropTypes.func,
  socialRegisterCallback: PropTypes.func,
  socialRegisterFailureCallback: PropTypes.func,
  twitterButtonCallback: PropTypes.func,
};

export default RegisterWrapper;
