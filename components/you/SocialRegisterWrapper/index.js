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
import Image from 'next/image';

import globals from 'globals';
import QueryModalContainer from 'containers/shared/QueryModalContainer';
import AnalyticsService from 'services/AnalyticsService';

import SocialButton from './SocialButton';

import { H1, H2, Body13, Body11 } from '../../shared/typogrophy';
import { OutlinedButton } from '../../shared/buttons';
import TwitterButton from './TwitterButton';

const Heart = styled(Image)`
  width: 64px;
  height: auto;
  margin-bottom: 12px;
`;

const StyledH2 = styled(H2)`
  margin-top: 12px;
  font-weight: 500;
`;

const VerticalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
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
`;

const EmailInner = styled.div`
  position: relative;
  width: 100%;
`;

const EmailIconImg = styled(Image)`
  width: 20px;
  height: auto;
  position: absolute;
  left: 4px;
  top: 4px;
`;

const StyledBody13 = styled(Body13)`
  color: ${({ theme }) => theme.colors.blue};
  font-weight: 500;
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
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <VerticalWrapper>
            <Heart src="images/heart.svg" />
            {blocName ? (
              <>
                <H1 data-cy="title">Add Your Vote!</H1>
                <StyledH2 data-cy="description">
                  Sign up to join this crowd-voting campaign for {candidateName}
                </StyledH2>
              </>
            ) : (
              <>
                <H1 data-cy="title">Join The Good Party</H1>
                <StyledH2 data-cy="description">
                  Check your voter registration and get ready to vote and fix
                  politics for Good!
                </StyledH2>
              </>
            )}
          </VerticalWrapper>
        </Grid>
        <Grid item xs={12} md={6}>
          <VerticalWrapper>
            <div data-cy="facebook-login">
              <SocialButton
                channel="facebook"
                provider="facebook"
                appId={globals.facebookAppId}
                onLoginSuccess={socialLoginCallback}
                onLoginFailure={socialLoginFailureCallback}
              >
                Continue with FACEBOOK
              </SocialButton>
            </div>
            <TwitterButton clickCallback={twitterButtonCallback}>
              Continue with Twitter
            </TwitterButton>
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
            <OrWrapper>
              <Border />
              <Or>
                <Body13 style={{ color: '#767676' }}>Or</Body13>
              </Or>
            </OrWrapper>
            <Link
              href="/you/register-email"
              data-cy="email-register"
              onClick={trackEmail}
            >
              <OutlinedButton
                active
                style={{ marginTop: '24px', width: '100%' }}
              >
                <EmailInner>
                  <EmailIconImg src="images/icons/email-icon.svg" />
                  <StyledBody13>CONTINUE WITH EMAIL</StyledBody13>
                </EmailInner>
              </OutlinedButton>
            </Link>
            <Body13 style={{ marginTop: '24px' }} data-cy="login-wrapper">
              Have an account?{' '}
              <Link href="/login" data-cy="login">
                Sign In
              </Link>
            </Body13>
            <Body11 style={{ margin: '24px 0' }} data-cy="policy-wrapper">
              By signing up, you agree to the{' '}
              <a href="/privacy" className="blue" data-cy="policy">
                Privacy Policy.
              </a>
            </Body11>
          </VerticalWrapper>
        </Grid>
      </Grid>
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
