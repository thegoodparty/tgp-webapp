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

import Wrapper from 'components/shared/Wrapper';
import MobileHeader from 'components/shared/navigation/MobileHeader';
import Nav from 'containers/shared/Nav';
import heartImg from 'images/heart.svg';
import GrayWrapper from 'components/shared/GrayWrapper';
import EmailIcon from 'images/icons/email-icon.svg';

import SocialButton from './SocialButton';
import { H1, H2, Body13, Body11 } from '../../shared/typogrophy';
import { OutlinedButton } from '../../shared/buttons';
import globals from '../../../globals';

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
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 24px;
    top: 4px;
  }
`;

const StyledBody13 = styled(Body13)`
  color: ${({ theme }) => theme.colors.blue};
  font-weight: 500;
`;

function SocialRegisterWrapper({
  socialLoginCallback,
  socialLoginFailureCallback,
}) {
  return (
    <GrayWrapper>
      <Nav />
      <Wrapper>
        <MobileHeader />
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <VerticalWrapper>
              <Heart src={heartImg} />
              <H1>Join The Good Party</H1>
              <StyledH2>
                Have your choices count and let&apos;s fix politics for Good!
              </StyledH2>
            </VerticalWrapper>
          </Grid>
          <Grid item xs={12} md={6}>
            <VerticalWrapper>
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
              <OrWrapper>
                <Border />
                <Or>
                  <Body13 style={{ color: '#767676' }}>Or</Body13>
                </Or>
              </OrWrapper>
              <OutlinedButton active style={{ marginTop: '24px' }}>
                <Link to="/you/register-email" style={{ width: '100%' }}>
                  <EmailInner>
                    <EmailIconImg src={EmailIcon} />
                    <StyledBody13>CONTINUE WITH EMAIL</StyledBody13>
                  </EmailInner>
                </Link>
              </OutlinedButton>
              <Body13 style={{ marginTop: '24px' }}>
                Have an account? <Link to="/login">Sign In</Link>
              </Body13>
              <Body11 style={{ margin: '24px 0' }}>
                By signing up, you agree to the{' '}
                <a href="/privacy" className="blue">
                  Privacy Policy &amp; Terms of Service.
                </a>
              </Body11>
            </VerticalWrapper>
          </Grid>
        </Grid>
      </Wrapper>
    </GrayWrapper>
  );
}

SocialRegisterWrapper.propTypes = {
  socialLoginCallback: PropTypes.func,
  socialLoginFailureCallback: PropTypes.func,
};

export default SocialRegisterWrapper;
