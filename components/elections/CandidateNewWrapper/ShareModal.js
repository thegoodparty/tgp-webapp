import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Body11, Body13, H2 } from 'components/shared/typogrophy';
import { uuidUrl } from 'helpers/userHelper';
import AnalyticsService from 'services/AnalyticsService';
import QueryModalContainer from 'containers/shared/QueryModalContainer';

import {
  IoIosText,
  IoIosLink,
  IoIosMail,
  IoLogoTwitter,
  // IoLogoInstagram,
  IoLogoReddit,
} from 'react-icons/io';
import { ImWhatsapp } from 'react-icons/im';
import { FaSnapchatGhost, FaFacebookF } from 'react-icons/fa';
// import { SiTiktok } from 'react-icons/si';
//
// const CopyPasteIcon = '/images/icons/copy-paste.svg';
// const LinkIcon = '/images/icons/link-icon.svg';
// const SmsIcon = '/images/icons/sms-icon.svg';
// const ShareIcon = '/images/icons/share-icon.svg';

const Wrapper = styled.div`
  border-radius: 8px;
  position: relative;
  width: calc(100% - 12px);
  margin: 0 auto;
  max-width: 500px;
  min-width: 300px;

  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    //padding: 24px 24px 32px;
    width: 85vw;
  }
`;

const WhiteBody13 = styled(Body13)`
  color: #fff;
  margin: 33px 0 18px;
`;
const ShareThisWrapper = styled.div`
  &.email {
    padding: 0;
  }

  .st-btn {
    border-radius: 50% !important;
  }

  .st-btn[data-network='email'] {
    background-color: #da0063 !important;
  }
`;

const IconItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 14px;
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
    background-color: #0ca78a;
  }

  &.copy {
    background: linear-gradient(
        103.63deg,
        rgba(255, 15, 19, 0.15) -3.51%,
        rgba(191, 0, 32, 0) 94.72%
      ),
      linear-gradient(
        257.82deg,
        rgba(67, 0, 211, 0.25) -11.17%,
        rgba(67, 0, 211, 0) 96.34%
      ),
      #5c00c7;
  }

  &.email {
    background-color: #da0063;
  }

  &.messenger {
    background: radial-gradient(
      108.96% 108.96% at 19.25% 99.47%,
      #0099ff 0%,
      #a033ff 60.98%,
      #ff5280 93.48%,
      #ff7061 100%
    );
  }
  &.whatsapp {
    background-color: #25d366;
  }

  &.twitter {
    background-color: #1ea1f3;
  }

  &.reddit {
    background-color: #fe4006;
  }

  &.instagram {
    background: radial-gradient(
        circle farthest-corner at 35% 90%,
        #fec564,
        transparent 50%
      ),
      radial-gradient(
        circle farthest-corner at 0 140%,
        #fec564,
        transparent 50%
      ),
      radial-gradient(
        ellipse farthest-corner at 0 -25%,
        #5258cf,
        transparent 50%
      ),
      radial-gradient(
        ellipse farthest-corner at 20% -50%,
        #5258cf,
        transparent 50%
      ),
      radial-gradient(
        ellipse farthest-corner at 100% 0,
        #893dc2,
        transparent 50%
      ),
      radial-gradient(
        ellipse farthest-corner at 60% -20%,
        #893dc2,
        transparent 50%
      ),
      radial-gradient(
        ellipse farthest-corner at 100% 100%,
        #d9317a,
        transparent
      ),
      linear-gradient(
        #6559ca,
        #bc318f 30%,
        #e33f5f 50%,
        #f77638 70%,
        #fec66d 100%
      );
  }

  &.tiktok {
    background-color: #000;
  }

  &.snapchat {
    background-color: #fffc00;
  }

  &.facebook {
    background-color: #507cc0;
  }
`;

const Icon = styled.div`
  color: #fff;
  font-size: 24px;
  margin-top: 6px;
`;

const IconLabel = styled(Body13)`
  color: #fff;
  margin-left: 14px;
`;

const CopiedWrapper = styled.div`
  margin-top: 24px;
  text-align: center;
  padding: 10px;
  border: solid 1px #fff;
  border-radius: 6px;
`;
const Copied = styled(Body11)`
  color: #fff;
`;

const ShareModal = ({ candidate, user, message }) => {
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    AnalyticsService.sendEvent('Sharing', 'Open Share Modal', candidate?.name);
  }, []);
  useEffect(() => {
    const sharebtns = document.getElementsByClassName('st-btn');
    for (let i = 0; i < sharebtns.length; i++) {
      sharebtns[i].onclick = () => {
        let label = '';
        if (i === 0) {
          label = 'Email';
        } else if (i === 1) {
          label = 'Facebook';
        } else if (i === 2) {
          label = 'Twitter';
        }
        trackShare(label);
      };
    }
  });

  if (!candidate) {
    return <> </>;
  }

  const cleanMessage = message === 'true' ? '' : message;

  const { firstName, lastName, race } = candidate;
  const url = uuidUrl(user, window.location.origin + window.location.pathname);
  console.log('url', url);
  const encodedUrl = encodeURIComponent(url);

  const messageTitle = `Help ${firstName} ${lastName} take back ${race}.`;
  // const messageBody = `Check out ${blocName} for ${chamberTitle} in The Good Party. See what’s possible, before we vote: ${url}`;
  const messageBody = `${firstName} ${lastName} could win in ${race}, if we all just share this crowd-voting campaign! Add Your Vote and Share here: ${url}. ${cleanMessage}`;

  const canShare = typeof navigator !== 'undefined' && navigator.share;
  const nativeShare = () => {
    navigator
      .share({
        title: messageTitle,
        text: messageBody,
      })
      .then(() => {
        trackShare('Native Share');
      });
  };
  const handleCopy = () => {
    setCopied(true);

    trackShare('Copy to Clipboard');
  };
  const trackShare = (shareType = '') => {
    AnalyticsService.sendEvent('Sharing', 'Click Share Method', shareType);
    // trackShareCallback(candidate);
  };

  const privateChannels = [
    {
      label: 'Text message',
      icon: <IoIosText />,
      className: 'sms',
      link: `sms:?&body=${messageBody.replace('&', '%26')}`,
    },
    {
      label: 'Email',
      icon: <IoIosMail />,
      className: 'email',
      link: `mailto:?body=${messageBody}&subject=${messageTitle}`,
    },
    // {
    //   label: 'Messenger',
    //   icon: <img src="/images/icons/messenger-icon.svg" alt="messenger" />,
    //   className: 'messenger',
    //   link: ``,
    // },
    {
      label: 'WhatsApp',
      icon: <ImWhatsapp />,
      className: 'whatsapp',
      link: `https://api.whatsapp.com/send?text=${messageBody}`,
    },
    // {
    //   label: 'Snapchat',
    //   icon: <FaSnapchatGhost />,
    //   className: 'snapchat',
    //   link: ``,
    // },
  ];

  const publicChannels = [
    {
      label: 'Twitter',
      icon: <IoLogoTwitter />,
      className: 'twitter',
      link: `https://twitter.com/share?url=${encodedUrl}&text=${messageBody}`,
    },
    {
      label: 'Reddit',
      icon: <IoLogoReddit />,
      className: 'reddit',
      link: `https://www.reddit.com/submit?url=${encodedUrl}&text=${messageBody}`,
    },
    // {
    //   label: 'Instagram',
    //   icon: <IoLogoInstagram />,
    //   className: 'instagram',
    //   link: ``,
    // },
    // {
    //   label: 'TikTok',
    //   icon: <SiTiktok />,
    //   className: 'tiktok',
    //   link: ``,
    // },

    {
      label: 'Facebook',
      icon: <FaFacebookF />,
      className: 'facebook',
      link: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
  ];
  return (
    <QueryModalContainer mode="purple">
      <Wrapper>
        <H2 style={{ color: '#FFF' }}>Share to</H2>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <WhiteBody13>PRIVATE</WhiteBody13>
            {privateChannels.map(channel => (
              <a
                href={channel.link}
                onClick={() => {
                  trackShare(channel.label);
                }}
                target="_blank"
                rel="nofollow"
              >
                <IconItem>
                  <IconWrapper className={channel.className}>
                    <Icon>{channel.icon}</Icon>
                  </IconWrapper>
                  <IconLabel>{channel.label}</IconLabel>
                </IconItem>
              </a>
            ))}

            <CopyToClipboard text={url} onCopy={handleCopy}>
              <IconItem>
                <IconWrapper className="copy">
                  <Icon>
                    <IoIosLink />
                  </Icon>
                </IconWrapper>
                <IconLabel data-cy="clipboard-share-title">Copy Link</IconLabel>
              </IconItem>
            </CopyToClipboard>
            <div
              className="fb-send-to-messenger"
              messenger_app_id="1530862867115121"
              color="blue"
            />
          </Grid>

          <Grid item xs={6}>
            <WhiteBody13> PUBLIC</WhiteBody13>
            {publicChannels.map(channel => (
              <a
                href={channel.link}
                onClick={() => {
                  trackShare(channel.label);
                }}
                target="_blank"
                rel="nofollow"
              >
                <IconItem>
                  <IconWrapper className={channel.className}>
                    <Icon>{channel.icon}</Icon>
                  </IconWrapper>
                  <IconLabel>{channel.label}</IconLabel>
                </IconItem>
              </a>
            ))}
          </Grid>
        </Grid>

        {copied && (
          <CopiedWrapper>
            <Copied>TEXT LINK COPIED TO CLIPBOARD</Copied>
          </CopiedWrapper>
        )}
      </Wrapper>
    </QueryModalContainer>
  );
};

ShareModal.propTypes = {
  candidate: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  user: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  message: PropTypes.string,
};

export default ShareModal;
