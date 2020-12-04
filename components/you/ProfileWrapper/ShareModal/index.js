import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Dialog from '@material-ui/core/Dialog';
import Image from 'next/image';

import CloseIcon from '@material-ui/icons/Cancel';
import Grid from '@material-ui/core/Grid';
import { InlineShareButtons } from 'sharethis-reactjs';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { Body, Body11, H3 } from 'components/shared/typogrophy';
import UserAvatar from 'components/shared/UserAvatar';
import { uuidUrl } from 'helpers/userHelper';

const CopyPasteIcon = '/images/icons/copy-paste.svg';
const LinkIcon = '/images/icons/link-icon.svg';
const SmsIcon = '/images/icons/sms-icon.svg';
const ShareIcon = '/images/icons/share-icon.svg';

const Wrapper = styled.div`
  background-color: #fff;
  padding: 48px 18px 32px;
  border-radius: 8px;
  position: relative;
  width: 85vw;
  margin: 0 auto;
  max-width: 500px;

  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 24px 24px 32px;
  }
`;

const Close = styled.div`
  position: absolute;
  padding: 16px;
  top: 0;
  right: 0;
  color: ${({ theme }) => theme.colors.gray4};
  cursor: pointer;
`;

const AvatarWrapper = styled(Body)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ShareThisWrapper = styled.div`
  padding: 36px 0;

  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 36px 60px;
  }

  .st-inline-share-buttons {
    // display: flex !important;
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

const Logo = styled(Image)`
  margin-bottom: 50px;
  min-width: 170px;
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

const Icon = styled(Image)``;

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

const ShareModal = ({ open, user, closeCallback }) => {
  const [copied, setCopied] = useState(false);

  const url = uuidUrl(user);
  const messageTitle = `Invite Some Friends!`;
  const messageBody = `Check out The Good Party. See what’s possible, before you vote: ${url}`;
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
    <Dialog onClose={closeCallback} open={open}>
      <Wrapper>
        <Close onClick={closeCallback} data-cy="share-modal-close">
          <CloseIcon />
        </Close>
        <div className="text-center">
          {' '}
          <Logo src="/images/logo-caps.svg" width="170px" height="50px" />
        </div>

        <AvatarWrapper>
          <UserAvatar user={user} size="large" />
          <H3 data-cy="share-modal-title" style={{ marginTop: '22px' }}>
            Tell some friends...{' '}
          </H3>
        </AvatarWrapper>
        <ShareThisWrapper data-cy="social-share">
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
              <a
                href={`sms:?&body=${messageBody.replace('&', '%26')}`}
                data-cy="sms-share"
              >
                <IconItem>
                  <IconWrapper className="sms">
                    <Icon src={SmsIcon} alt="sms" width="36px" height="auto" />
                  </IconWrapper>
                </IconItem>
                <IconLabel data-cy="sms-share-title">SMS / TEXT</IconLabel>
              </a>
            </Grid>
            <Grid item xs>
              <IconItem>
                <CopyToClipboard text={url} onCopy={() => setCopied(true)}>
                  <IconWrapper>
                    <Icon
                      src={LinkIcon}
                      alt="copy"
                      width="36px"
                      height="auto"
                    />
                  </IconWrapper>
                </CopyToClipboard>
              </IconItem>
              <IconLabel data-cy="clipboard-share-title">COPY LINK</IconLabel>
            </Grid>
            {canShare && (
              <Grid item xs>
                <IconItem>
                  <IconItem onClick={nativeShare}>
                    <IconWrapper className="native-share">
                      <Icon
                        src={ShareIcon}
                        alt="more"
                        width="36px"
                        height="auto"
                      />
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
            <Icon
              src={CopyPasteIcon}
              alt="copy link"
              width="auto"
              height="auto"
            />
            <Copied>TEXT LINK COPIED TO CLIPBOARD</Copied>
          </CopiedWrapper>
        )}
      </Wrapper>
    </Dialog>
  );
};

ShareModal.propTypes = {
  open: PropTypes.bool,
  closeCallback: PropTypes.func,
  user: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

export default ShareModal;
