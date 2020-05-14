/**
 *
 * Join
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Modal, Fade } from '@material-ui/core';
import LogoCaps from 'images/logo.svg';
import { Body, Body18, Body13 } from '../../typography';
import { MediumButton } from '../../buttons';
import Heads from '../../Heads';
import FacebookIcon from 'images/icons/facebook.svg';
import TwitterIcon from 'images/icons/twitter.svg';
import EmailIcon from 'images/icons/email.svg';

const Wrapper = styled.div`
  max-width: 36rem;
  width: 100%;
  padding: 3rem;
  background-color: #fff;
  border-radius: 0.5rem;
  border: none;
  text-align: center;
`;
const OverlayModal = styled(Modal)`
  && {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const Logo = styled.img`
  height: 97px;
  width:  120px
  margin-bottom: 1.5rem;
`;

const Title = styled(Body)`
  color: #000;
  line-height: 130%;
  text-transform: none;
  margin-bottom: 1rem;
`;

const Blurb = styled(Body18)`
  margin: 1rem 0 3rem;
`;
const JoinButtonWrapper = styled.div`
  margin: 2rem 0;
`;

const JoinWithButton = styled(MediumButton)`
  && {
    margin-bottom: 1rem;
    width: 20rem;
    text-align: left;
    &.facebook {
      background-color: ${({ theme }) => theme.creators.colors.darkBlue};
    }
    &.twitter {
      background-color: ${({ theme }) => theme.creators.colors.blue1};
    }
    &.email {
      background-color: ${({ theme }) => theme.colors.blue};
    }
  }
`;

const SocialIcon = styled.img`
  margin-right: 0.7rem;
`;

const FooterMessage = styled(Body13)`
  color: ${({ theme }) => theme.creators.colors.gray};
  margin-bottom: 3rem;
`;

function Join({ open, handleClose }) {
  return (
    <OverlayModal
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <Fade in={open}>
        <Wrapper>
          <Logo src={LogoCaps} alt="logo" />
          <Title>Fixing politics for Good!</Title>
          <Blurb>
            Join our community of creators <br /> working together for the Good of
            all.
          </Blurb>
          <Heads />
          <JoinButtonWrapper>
            <JoinWithButton className="twitter">
              <SocialIcon src={TwitterIcon} /> Join With Twitter
            </JoinWithButton>
            <JoinWithButton className="facebook">
              <SocialIcon src={FacebookIcon} /> Join With Facebook
            </JoinWithButton>
            <JoinWithButton className="email">
              <SocialIcon src={EmailIcon} /> Join With Email
            </JoinWithButton>
          </JoinButtonWrapper>
        </Wrapper>
      </Fade>
    </OverlayModal>
  );
}

Join.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
};

export default Join;
