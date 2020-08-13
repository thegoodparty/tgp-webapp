/**
 *
 * SocialRegisterWrapper
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';

import heartImg from 'images/heart.svg';
import EmailIcon from 'images/icons/email-icon.svg';
import globals from 'globals';
import QueryModalContainer from 'containers/shared/QueryModalContainer';

import SocialButton from './SocialButton';

import { H1, H2, Body13, Body11 } from '../../shared/typogrophy';
import { OutlinedButton } from '../../shared/buttons';
import FacebookButton from './FacebookButton';
import TwitterButton from './TwitterButton';

const Heart = styled.img`
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

const EmailIconImg = styled.img`
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
  twitterButtonCallback,
}) {
  return (
    <QueryModalContainer>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <VerticalWrapper>
            <Heart src={heartImg} />
            {blocName ? (
              <>
                <H1 data-cy="title">Join {blocName}</H1>
                <StyledH2 data-cy="description">
                  Sign-up to be counted, and we&apos;ll notify you if we can
                  win!
                </StyledH2>
              </>
            ) : (
              <>
                <H1 data-cy="title">Join The Good Party</H1>
                <StyledH2 data-cy="description">
                  Have your choices count and let&apos;s fix politics for Good!
                </StyledH2>
              </>
            )}
          </VerticalWrapper>
        </Grid>
        <Grid item xs={12} md={6}>
          <VerticalWrapper>
            <FacebookButton
              onLoginSuccess={socialLoginCallback}
              onLoginFailure={socialLoginFailureCallback}
            >
              Continue with Facebook
            </FacebookButton>
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
            <Link to="/you/register-email" data-cy="email-register">
              <OutlinedButton
                active
                style={{ marginTop: '24px', width: '100%' }}
              >
                <EmailInner>
                  <EmailIconImg src={EmailIcon} />
                  <StyledBody13>CONTINUE WITH EMAIL</StyledBody13>
                </EmailInner>
              </OutlinedButton>
            </Link>
            <Body13 style={{ marginTop: '24px' }} data-cy="login-wrapper">
              Have an account?{' '}
              <Link to="/login" data-cy="login">
                Sign In
              </Link>
            </Body13>
            <Body11 style={{ margin: '24px 0' }} data-cy="policy-wrapper">
              By signing up, you agree to the{' '}
              <a href="/privacy" className="blue" data-cy="policy">
                Privacy Policy &amp; Terms of Service.
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
};

export default SocialRegisterWrapper;
