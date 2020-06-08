/**
 *
 * Join
 *
 */

import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Fade } from '@material-ui/core';
import LogoCaps from 'images/logo.svg';
import FacebookIcon from 'images/icons/facebook.svg';
import TwitterIcon from 'images/icons/twitter.svg';
import EmailIcon from 'images/icons/email-icon.svg';
import SocialButton from 'components/you/SocialRegisterWrapper/SocialButton';
import { OutlinedButton } from 'components/shared/buttons';
import globals from 'globals';
import { BodyWrapper, OverlayModal, CloseIcon, Blurb, Logo, Title } from '../shared';
import { Body, Body18, Body13, Body15, Body11 } from '../../typography';
import { MediumButton } from '../../buttons';
import Heads from '../../Heads';

const JoinTitle = styled(Title)`
  margin-bottom: 1rem;
  text-align: center;
  @media only screen and (max-width: ${({ theme }) =>
    theme.creators.breakpoints.creatorsMobile}) {
    margin-bottom: 1.5rem;
  }
`;

const JoinButtonWrapper = styled.div`
  margin: 1rem 0;
`;

const FooterMessage = styled(Body13)`
  color: ${({ theme }) => theme.creators.colors.darkGray};
  margin: 0;
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
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 24px;
  }
`;

const StyledBody13 = styled(Body13)`
  color: ${({ theme }) => theme.colors.blue};
  font-weight: 500;
`;

const StyledBody15 = styled(Body15)`
  color: ${({ theme }) => theme.creators.colors.darkGray};
  @media only screen and (max-width: ${({ theme }) =>
    theme.creators.breakpoints.creatorsTablet}) {
    font-size: 13px;
  }
`;
const StyledBody11 = styled(Body11)`
  && {
    font-size: 13px;
    margin-bottom: 5px !important;
    color: ${({ theme }) => theme.creators.colors.darkGray};
    @media only screen and (max-width: ${({ theme }) =>
    theme.creators.breakpoints.creatorsTablet}) {
      font-size: 11px;
    }
  }
`;
const JoinBodyWrapper = styled(BodyWrapper)`
  && {
    padding: 3rem 7rem;
    @media only screen and (max-width: ${({ theme }) =>
    theme.creators.breakpoints.creatorsMobile}) {
      padding: 3rem;
    }
  }
`;

function Join({
  open,
  handleClose,
  socialLoginCallback,
  socialLoginFailureCallback,
  setSignupRedirectCookieCallback
}) {
  return (
    <OverlayModal
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <Fade in={open}>
        <JoinBodyWrapper>
          <CloseIcon onClick={handleClose} />
          <Logo src={LogoCaps} alt="logo" />
          <JoinTitle>Help fix politics for Good!</JoinTitle>
          <Blurb>
            Join our community of creators <br /> working together for the Good
            of all.
          </Blurb>
          <Heads />
          <JoinButtonWrapper>
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
            <OutlinedButton active style={{ marginTop: '24px', width: '100%' }} onClick={() => setSignupRedirectCookie('/creators')}>
              <Link
                to="/you/register-email"
                style={{ width: '100%' }}
              >
                <EmailInner>
                  <EmailIconImg src={EmailIcon} />
                  <StyledBody13>CONTINUE WITH EMAIL</StyledBody13>
                </EmailInner>
              </Link>
            </OutlinedButton>
          </JoinButtonWrapper>
          <StyledBody15 style={{ marginTop: '24px' }}  onClick={() => setSignupRedirectCookieCallback('/creators')}>
            Have an account? <Link to="/login"><b>Sign In</b></Link>
          </StyledBody15>
          <StyledBody11 style={{ margin: '24px 0' }}>
            By signing up, you agree to the{' '}
            <a href="/privacy" className="blue">
              Privacy Policy &amp; Terms of Service.
            </a>
          </StyledBody11>
          <FooterMessage>
            We will never post to any of your accounts without your permission.
          </FooterMessage>
        </JoinBodyWrapper>
      </Fade>
    </OverlayModal>
  );
}

Join.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  socialLoginCallback: PropTypes.func,
  socialLoginFailureCallback: PropTypes.func,
  setSignupRedirectCookieCallback: PropTypes.func
};

export default Join;
