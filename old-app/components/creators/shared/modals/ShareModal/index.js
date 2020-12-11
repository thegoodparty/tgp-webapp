import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';

import { InlineShareButtons } from 'sharethis-reactjs';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import LogoCaps from 'images/logo.svg';
import { Body, H1, H3, Body9, Body11 } from 'components/shared/typogrophy';
import { uuidUrl } from 'helpers/userHelper';
import CopyPasteIcon from 'images/icons/copy-paste.svg';
import LinkIcon from 'images/icons/link-icon.svg';
import SmsIcon from 'images/icons/sms-icon.svg';
import ShareIcon from 'images/icons/share-icon.svg';
import {
  Title,
  BodyWrapper,
  OverlayModal,
  FooterWrapper,
  CloseIcon,
  Blurb,
  Logo,
} from '../shared';

const ModalTitle = styled(Title)`
  margin-bottom: 1rem;
  text-align: center;
  @media only screen and (max-width: ${({ theme }) =>
      theme.creators.breakpoints.creatorsMobile}) {
    margin-bottom: 1.5rem;
  }
`;
const ShareThisWrapper = styled.div`
  padding: 36px 0;

  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 36px 60px;
  }
  .st-btn {
    margin: 20px !important;
    border-radius: 50% !important;
    &:after {
      top: 45px;
      left: 0;
      width: 56px;
      text-align: center;
      position: absolute;
      display: block;
      font-size: 10px;
      color: ${({ theme }) => theme.colors.gray6};
    }
  }

  .st-btn[data-network='email'] {
    background-color: #f39268 !important;
    &:after {
      content: 'EMAIL';
    }
  }

  .st-btn[data-network='facebook'] {
    &:after {
      content: 'FACEBOOK';
    }
  }

  .st-btn[data-network='twitter'] {
    &:after {
      content: 'TWITTER';
    }
  }
`;

const AdditionalSharesWrapper = styled.div`
  padding: 0 25px;

  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 0 115px;
  }

  &.with-native {
    padding: 0 8px;
    @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
      padding: 0 90px;
    }
  }
`;

const IconItem = styled.div`
  display: flex;
  justify-content: center;
`;

const IconWrapper = styled.div`
  height: 56px;
  width: 56px;
  background-color: ${({ theme }) => theme.colors.blue};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &.sms {
    background: linear-gradient(#67ff81, #03b521);
  }

  &.native-share {
    background: #fff;
  }
`;

const Icon = styled.img``;

const IconLabel = styled.div`
  font-size: 10px;
  text-align: center;
  color: ${({ theme }) => theme.colors.gray6};
  margin-top: 12px;
`;

const CopiedWrapper = styled.div`
  margin-top: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  padding: 10px;
  border: solid 1px ${({ theme }) => theme.colors.green};
  border-radius: 6px;
`;
const Copied = styled(Body11)`
  margin-left: 6px;
`;
const CREATORS_URL = 'https://dev.thegoodparty.org/creators';
const ShareModal = ({ open, user, handleClose }) => {
  const [copied, setCopied] = useState(false);

  let url = user ? uuidUrl(user, CREATORS_URL) : CREATORS_URL;

  const messageTitle = `Creators of the World — Unite!`;
  const messageBody = `The Good Party is a non-profit to take back democracy from big-money donors and crooked career politicians. Please help us create the technology, messaging, visuals, audio, and stories that can reach and inspire millions of people: ${url}`;

  const canShare = typeof navigator !== 'undefined' && navigator.share;
  const nativeShare = () => {
    navigator
      .share({
        title: messageTitle,
        text: messageBody,
      })
      .then(() => console.log('Successful share'));
  };

  return (
    <OverlayModal
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <Fade in={open}>
        <BodyWrapper>
          <CloseIcon onClick={handleClose} />
          <Logo src={LogoCaps} alt="logo" />
          <ModalTitle>Let’s build The Good Party</ModalTitle>
          <Blurb style={{ marginBottom: 0 }}>
            Spread the word to get more creators on board. Together we can fix
            politics for Good.
          </Blurb>
          <ShareThisWrapper>
            <InlineShareButtons
              config={{
                alignment: 'center', // alignment of buttons (left, center, right)
                color: 'social', // set the color of buttons (social, white)
                enabled: true, // show/hide buttons (true, false)
                font_size: 16, // font size for the buttons
                labels: 'null', // button labels (cta, counts, null)
                language: 'en', // which language to use (see LANGUAGES)
                networks: [
                  // which networks to include (see SHARING NETWORKS)
                  'facebook',
                  'twitter',
                  'email',
                ],
                padding: 12, // padding within buttons (INTEGER)
                radius: 4, // the corner radius on each button (INTEGER)
                show_total: false,
                size: 56, // the size of each button (INTEGER)

                // OPTIONAL PARAMETERS
                url,
                description: messageBody,
                title: messageTitle, // (defaults to og:title or twitter:title)
                message: messageBody, // (only for email sharing)
                subject: messageTitle, // (only for email sharing)
              }}
            />
          </ShareThisWrapper>
          <AdditionalSharesWrapper className={canShare ? 'with-native' : ''}>
            <Grid container spacing={0}>
              <Grid item xs>
                <a href={`sms:?&body=${messageBody.replace('&', '%26')}`}>
                  <IconItem>
                    <IconWrapper className="sms">
                      <Icon src={SmsIcon} alt="sms" />
                    </IconWrapper>
                  </IconItem>
                  <IconLabel>SMS / TEXT</IconLabel>
                </a>
              </Grid>
              <Grid item xs>
                <IconItem>
                  <CopyToClipboard text={url} onCopy={() => setCopied(true)}>
                    <IconWrapper>
                      <Icon src={LinkIcon} alt="copy" />
                    </IconWrapper>
                  </CopyToClipboard>
                </IconItem>
                <IconLabel>COPY LINK</IconLabel>
              </Grid>
              {canShare && (
                <Grid item xs>
                  <IconItem>
                    <IconItem onClick={nativeShare}>
                      <IconWrapper className="native-share">
                        <Icon src={ShareIcon} alt="more" />
                      </IconWrapper>
                    </IconItem>
                  </IconItem>
                  <IconLabel>MORE</IconLabel>
                </Grid>
              )}
            </Grid>
          </AdditionalSharesWrapper>
          {copied && (
            <CopiedWrapper>
              <Icon src={CopyPasteIcon} alt="copy link" />
              <Copied>TEXT LINK COPIED TO CLIPBOARD</Copied>
            </CopiedWrapper>
          )}
        </BodyWrapper>
      </Fade>
    </OverlayModal>
  );
};

ShareModal.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  user: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

export default ShareModal;
