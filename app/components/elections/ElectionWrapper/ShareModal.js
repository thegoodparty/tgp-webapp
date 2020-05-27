import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Cancel';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { InlineShareButtons } from 'sharethis-reactjs';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { Body, H1, H3, Body9, Body11 } from 'components/shared/typogrophy';
import CandidateAvatar from 'components/shared/CandidateAvatar';
import { candidateBlocLink, candidateBlocName } from 'helpers/electionsHelper';
import { uuidUrl } from 'helpers/userHelper';
import CopyPasteIcon from 'images/icons/copy-paste.svg';
import LinkIcon from 'images/icons/link-icon.svg';
import SmsIcon from 'images/icons/sms-icon.svg';
import ShareIcon from 'images/icons/share-icon.svg';

const Wrapper = styled.div`
  background-color: #fff;
  padding: 48px 18px 32px;
  border-radius: 8px;
  position: relative;
  width: 85vw;
  margin: 0 auto;
  max-width: 500px;

  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 48px 24px 32px;
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

const Subtitle = styled(H3)`
  font-weight: 400;
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

const ShareModal = ({
  candidate,
  open,
  user,
  chamber,
  isExternalLink,
  closeCallback,
}) => {
  const [copied, setCopied] = useState(false);
  if (!candidate) {
    return <> </>;
  }

  let { isGood } = candidate;
  if (candidate.unknown) {
    isGood = null;
  }
  const blocName = candidateBlocName(candidate, chamber);
  const blocLink = candidateBlocLink(candidate, chamber);
  let url = uuidUrl(user);
  let queryOperator = '&';
  if (url === 'https://thegoodparty.org') {
    queryOperator = '?';
  }
  url = url + queryOperator + 'b=' + blocLink;

  let chamberTitle = 'President';
  if (candidate.chamber?.toLowerCase() === 'senate') {
    chamberTitle = `U.S. Senate from ${candidate.state?.toUpperCase()}`;
  } else if (candidate.chamber?.toLowerCase() === 'house') {
    chamberTitle = `U.S. House from ${candidate.state?.toUpperCase()}-${Math.abs(
      candidate.id,
    )}`;
  }

  const messageTitle = `Want see if we can elect ${
    candidate.name
  } for ${chamberTitle}?`;
  const messageBody = `Check out ${blocName} for ${chamberTitle} in The Good Party. See what’s possible, before we vote: ${url}`;

  const sendSms = () => {
    if (navigator.userAgent.match(/Android/i)) {
      window.open(`sms:?&body=${messageBody}`, '_blank');
    } else {
      window.open(`sms:?&body=${messageBody}`, '_blank');
    }
  };

  const canShare = typeof navigator !== 'undefined' && navigator.share;
  const nativeShare = () => {
    navigator
      .share({
        title: messageTitle,
        text: messageBody,
        url,
      })
      .then(() => console.log('Successful share'));
  };

  return (
    <Dialog onClose={closeCallback} open={open}>
      <Wrapper>
        <Close onClick={closeCallback}>
          <CloseIcon />
        </Close>

        <AvatarWrapper>
          <CandidateAvatar
            good={isGood}
            size="large"
            src={candidate.image}
            name={candidate.name}
          />
          <H1 style={{ marginTop: '22px', marginBottom: '10px' }}>
            {isExternalLink ? (
              <>
                {blocName} Joined!{' '}
                <span role="img" aria-label="flex">
                  💪
                </span>
              </>
            ) : (
              <>Grow {blocName}</>
            )}
          </H1>
          <Subtitle>Spread the word to grow this bloc!</Subtitle>
        </AvatarWrapper>
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
              <IconItem onClick={sendSms}>
                <IconWrapper className="sms">
                  <Icon src={SmsIcon} alt="sms" />
                </IconWrapper>
              </IconItem>
              <IconLabel>SMS / TEXT</IconLabel>
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
      </Wrapper>
    </Dialog>
  );
};

ShareModal.propTypes = {
  open: PropTypes.bool,
  closeCallback: PropTypes.func,
  candidate: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  user: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  chamber: PropTypes.string,
  isExternalLink: PropTypes.bool,
};

export default ShareModal;
