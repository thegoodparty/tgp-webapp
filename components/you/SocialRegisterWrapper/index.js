/**
 *
 * SocialRegisterWrapper
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Link from 'next/link';
import TextField from '@material-ui/core/TextField';

import globals from 'globals';
import QueryModalContainer from 'containers/shared/QueryModalContainer';
import AnalyticsService from 'services/AnalyticsService';

import SocialButton from './SocialButton';

import { H1, H2, Body13, Body11, Body } from '../../shared/typogrophy';
import { OutlinedButton, PurpleButton } from '../../shared/buttons';
import TwitterButton from './TwitterButton';

const StyledH1 = styled(H1)`
  margin: 18px 0;
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    margin: 24px 0;
  }
`;
const OrWrapper = styled.div`
  margin-top: 24px;
  height: 16px;
  position: relative;
`;

const Border = styled.div`
  border-bottom: solid 1px ${({ theme }) => theme.colors.grayE};
  height: 13px;
`;

const Or = styled.div`
  position: absolute;
  width: 50px;
  text-align: center;
  left: calc(50% - 25px);
  top: 0;
  background-color: ${({ theme }) => theme.colors.purple3};
`;

const Tap = styled.div`
  margin: 20px 0;
  text-align: center;
  color: ${({ theme }) => theme.colors.gray7};
`;

const ButtonText = styled(Body)`
  color: #fff;
  font-weight: 500;
`;

const Input = styled(TextField)`
  && {
    margin-bottom: 12px;

    .MuiInputBase-root {
      border-radius: 8px;
    }

    .MuiInputBase-input {
      line-height: 22px;
      font-size: 16px;
      letter-spacing: 0.1px;
      border-radius: 8px;
      background-color: #fff;
      box-shadow: 0px 2px 0px rgba(17, 17, 31, 0.25);

      @media only screen and (min-width: ${({ theme }) =>
          theme.breakpoints.md}) {
        font-size: 20px;
        line-height: 26px;
      }
    }
  }
`;

function SocialRegisterWrapper({
  socialLoginCallback,
  socialLoginFailureCallback,
  blocName,
  candidateName,
  twitterButtonCallback,
}) {
  // const registerSteps = blocName
  //   ? defaultRegisterSteps
  //   : defaultRegisterSteps.slice(0, 2);

  const trackEmail = () => {
    AnalyticsService.sendEvent(
      'Signup',
      'Click Signup Method',
      `Click Email Signup`,
    );
  };
  return (
    <QueryModalContainer>
      <Body13 data-cy="login-wrapper">
        Have an profile?{' '}
        <Link href="/login" data-cy="login">
          Sign In
        </Link>
      </Body13>
      <StyledH1 data-cy="title">
        To endorse a candidate,
        <br />
        create your profile
      </StyledH1>

      <form noValidate>
        <Input
          label="Full name"
          required
          size="medium"
          name="name"
          variant="outlined"
          fullWidth
          data-cy="full-name"
        />
        <Input
          label="Email address"
          required
          size="medium"
          name="name"
          variant="outlined"
          fullWidth
          data-cy="email"
        />
        <PurpleButton fullWidth>
          <ButtonText>CONTINUE</ButtonText>
        </PurpleButton>
      </form>
      <OrWrapper>
        <Border />
        <Or>
          <Body13 style={{ color: '#767676' }}>OR</Body13>
        </Or>
      </OrWrapper>
      <Tap>ONE TAP BELOW</Tap>
      <Grid container spacing={3}>
        <Grid item xs>
          <div data-cy="facebook-login">
            <SocialButton
              channel="facebook"
              provider="facebook"
              appId={globals.facebookAppId}
              onLoginSuccess={socialLoginCallback}
              onLoginFailure={socialLoginFailureCallback}
            >
              FACEBOOK
            </SocialButton>
          </div>
        </Grid>
        <Grid item xs>
          <TwitterButton clickCallback={twitterButtonCallback}>
            Twitter
          </TwitterButton>
        </Grid>
        <Grid item xs>
          <div data-cy="google-login">
            <SocialButton
              channel="google"
              provider="google"
              appId={globals.googleAppId}
              onLoginSuccess={socialLoginCallback}
              onLoginFailure={socialLoginFailureCallback}
            >
              GOOGLE
            </SocialButton>
          </div>
        </Grid>
      </Grid>
      <div className="text-center">
        <Body11 style={{ margin: '24px 0' }} data-cy="policy-wrapper">
          By signing up, you agree to the{' '}
          <a href="/privacy" target="_blank" data-cy="policy">
            Terms of Service.
          </a>
        </Body11>
      </div>
    </QueryModalContainer>
  );
}

SocialRegisterWrapper.propTypes = {
  socialLoginCallback: PropTypes.func,
  socialLoginFailureCallback: PropTypes.func,
  twitterButtonCallback: PropTypes.func,
  blocName: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  candidateName: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

export default SocialRegisterWrapper;
