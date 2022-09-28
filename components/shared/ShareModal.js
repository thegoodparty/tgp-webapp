import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { sanitizeUrl } from '@braintree/sanitize-url';

import { CopyToClipboard } from 'react-copy-to-clipboard';
import { uuidUrl } from '/helpers/userHelper';
import { logEvent } from '/services/AnalyticsService';
import QueryModalContainer from '/containers/shared/QueryModalContainer';

import { IoIosText, IoLogoWhatsapp } from 'react-icons/io';
import { FaFacebookF, FaFacebookMessenger, FaTwitter } from 'react-icons/fa';
import { BiLinkAlt } from 'react-icons/bi';
import { RiSendPlaneFill } from 'react-icons/ri';
import { getUserCookie } from '/helpers/cookieHelper';
import Row from './Row';
import BlackButton, { InnerButton } from './buttons/BlackButton';
import Tooltip from './Tooltip';
import { FontH3 } from './typogrophy';

const Wrapper = styled.div`
  padding: 24px;
  background-color: #fff;
  border-radius: 4px;
  width: 60vw;
  max-width: 450px;
  min-width: 300px;
  font-size: 24px;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    padding: 15px 34px;
  }
`;

const SocialLink = styled.div`
  font-size: 26px;
  background-color: #000;
  width: 50px;
  height: 50px;
  color: #fff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;

  &.sms {
    background-color: #0ca78a;
  }

  &.email {
    background-color: #2aabee;
  }

  &.messenger {
    background-color: #006bff;
  }
  &.whatsapp {
    background-color: #25d366;
  }

  &.twitter {
    background-color: #1ea1f3;
  }

  &.facebook {
    background-color: #507cc0;
  }
`;

const SocialWrapper = styled.div`
  padding: 15px 0;
  border-top: solid 1px #ececec;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Label = styled.div`
  font-size: 15px;
  margin-left: 15px;
`;

const Smaller = styled.div`
  font-size: 11px;
  font-weight: 900;
  text-transform: initial;
`;

const Copied = styled.div`
  z-index: 3000;
`;

const CopyWrapper = styled.div`
  padding: 15px 0;
  border-top: solid 1px #ececec;
  display: flex;
  align-items: center;
`;

const CopyIcon = styled.div`
  font-size: 26px;
  background-color: #fff;
  width: 50px;
  height: 50px;
  color: #000;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: solid 2px #000;
`;

const ShareModal = ({ shareUrl, closeCallback = () => {} }) => {
  const user = getUserCookie(true);
  const messageNoUrl = 'Vote different';

  let queryUrl = shareUrl;
  if (queryUrl) {
    queryUrl = sanitizeUrl(queryUrl);
  }

  let url = '';
  if (typeof window !== 'undefined') {
    if (queryUrl) {
      url = queryUrl;
    } else {
      const path = window.location.pathname;
      url = uuidUrl(user, window.location.origin + path);
    }
  }

  const encodedUrl = encodeURIComponent(url);
  const encodedMessageBody = `${messageNoUrl} \n\n ${encodedUrl}`;

  const textMessageBody = `${url} ${'\n %0a'} ${'\n %0a'}${messageNoUrl}`;

  const emailSubject = 'Check this out';

  const emailBody = `${messageNoUrl}%0D%0A%0D%0A${encodedUrl}%0D%0A%0D%0A GOOD PARTY%0D%0AFree software for free elections`;

  const trackShare = (shareType = '') => {
    logEvent('Sharing', 'Click Share Method', shareType);
    // trackShareCallback(candidate);
  };

  const channels = [
    {
      label: 'Twitter',
      icon: <FaTwitter />,
      className: 'twitter',
      link: `https://twitter.com/share?url=${encodedUrl}&text=${messageNoUrl}`,
    },
    {
      label: 'Facebook',
      icon: <FaFacebookF />,
      className: 'facebook',
      link: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      label: 'Messenger',
      icon: <FaFacebookMessenger />,
      className: 'messenger',
      link: `fb-messenger://share/?app_id=241239336921963&link=${encodedUrl}`,
    },
    {
      label: 'Text message',
      icon: <IoIosText />,
      className: 'sms',
      link: `sms:?&body=${textMessageBody.replace('&', '%26')}`,
    },
    {
      label: 'WhatsApp',
      icon: <IoLogoWhatsapp />,
      className: 'whatsapp',
      link: `https://api.whatsapp.com/send?text=${encodedMessageBody}`,
    },
    {
      label: 'Email',
      icon: <RiSendPlaneFill />,
      className: 'email',
      link: `mailto:?body=${emailBody}&subject=${emailSubject}`,
    },
  ];

  return (
    <QueryModalContainer closeModalCallbackOverride={closeCallback}>
      <Wrapper>
        <Row style={{ justifyContent: 'space-between' }}>
          <FontH3>Share on</FontH3>
        </Row>
        {channels.map((channel, index) => (
          <React.Fragment key={channel.label}>
            {channel.link && (
              <SocialWrapper data-cy="share-item">
                <div className="flex-center">
                  <SocialLink
                    className={channel.className}
                    style={
                      channel.label === 'Website'
                        ? { backgroundColor: brightColor }
                        : {}
                    }
                  >
                    {channel.icon}
                  </SocialLink>
                  <Label>{channel.label}</Label>
                </div>
                <a
                  href={channel.link}
                  onClick={() => {
                    trackShare(channel.label);
                  }}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  id={`${channel.label}-share`}
                >
                  <BlackButton>
                    <InnerButton>
                      <Smaller>Share</Smaller>
                    </InnerButton>
                  </BlackButton>
                </a>
              </SocialWrapper>
            )}
          </React.Fragment>
        ))}
        <Tooltip
          triggerEl={
            <CopyToClipboard text={url}>
              <CopyWrapper id="share-copy-link">
                <CopyIcon>
                  <BiLinkAlt />
                </CopyIcon>
                <Label>Copy link</Label>
              </CopyWrapper>
            </CopyToClipboard>
          }
          triggerWrapperStyle={{ display: 'block' }}
        >
          <Copied>Link Copied!</Copied>
        </Tooltip>

        <div
          className="fb-send-to-messenger"
          messenger_app_id="1530862867115121"
          color="blue"
        />
      </Wrapper>
    </QueryModalContainer>
  );
};

ShareModal.propTypes = {
  isCandidate: PropTypes.bool,
};

export default ShareModal;
