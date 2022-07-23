import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Image from 'next/image';

import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Body11 } from '/components/shared/typogrophy';
import { uuidUrl } from '/helpers/userHelper';
import { logEvent } from '/services/AnalyticsService';
import QueryModalContainer from '/containers/shared/QueryModalContainer';

import { IoIosText, IoLogoTwitter, IoLogoWhatsapp } from 'react-icons/io';
import {
  FaFacebook,
  FaFacebookMessenger,
  FaYoutube,
  FaDiscord,
  FaReddit,
} from 'react-icons/fa';
import { RiSendPlaneFill } from 'react-icons/ri';
import { getUserCookie } from '/helpers/cookieHelper';
import { candidateRoute } from '/helpers/electionsHelper';
import FontH2 from './typogrophy/FontH2';
import Font16 from './typogrophy/Font16';
import Row from './Row';
import BlackButton, { InnerButton } from './buttons/BlackButton';
import Tooltip from './Tooltip';
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

  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    //padding: 24px 24px 32px;
    width: 85vw;
  }
`;

const Border = styled.div`
  height: 1px;
  background-color: #ececec;
  margin: 30px 0;
`;

const IconItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 14px;
  justify-content: center;
`;

const IconWrapper = styled.div`
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &.sms {
    color: #0ca78a;
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
    color: #2aabee;
  }

  &.messenger {
    color: #006bff;
  }
  &.whatsapp {
    color: #25d366;
  }

  &.twitter {
    color: #1ea1f3;
  }

  &.reddit {
    color: #fe4006;
  }

  &.instagram {
    color: #000;
  }

  &.tiktok {
    color: #000;
  }

  &.snapchat {
    color: #fffc00;
  }

  &.facebook {
    color: #507cc0;
  }
`;

const Icon = styled.div`
  font-size: 40px;
`;

const IconLabel = styled(Font16)`
  text-align: center;
`;

const CopiedWrapper = styled.div`
  margin-top: 24px;
  text-align: center;
  padding: 10px;
  border: solid 1px #fff;
  border-radius: 6px;
`;
//
// const StyledTextField = styled(TextField)`
//   && {
//     margin: 20px 0;
//     .MuiInputBase-multiline {
//       background-color: #fff;
//       box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.25);
//     }
//     .MuiOutlinedInput-notchedOutline {
//       border-color: ${(props) => props.theme.colors.purple};
//     }
//   }
// `;

const TipWrapper = styled.div`
  text-align: center;
  background-color: #f6f8fb;
  padding: 14px;
  font-size: 15px;
  cursor: pointer;
`;

const TipIcon = styled.span`
  display: inline-block;
  margin: 0 12px;
  font-size: 24px;
`;
const candidateMessage = (candidate, user) => {
  if (!candidate) {
    if (typeof window !== 'undefined') {
      if (user?.uuid) {
        let url = window.location.pathname;
        url = uuidUrl(user, window.location.origin + url, '');
        return `Vote different. ${url}`;
      }
      return `Vote different. ${window.location.href}`;
    }
    return 'Vote different. https://goodparty.org';
  }

  return `INDIE POWER!🗽💪 I just endorsed ${candidate.firstName} ${
    candidate.lastName
  }, the first people-powered candidate for ${
    candidate.race
  }! Follow their crowd-voting campaign here: https://goodparty.org${candidateRoute(
    candidate,
  )}`;
};

const candidateMessageNoUrl = (candidate, user) => {
  if (!candidate) {
    return 'Vote different';
  }

  return `INDIE POWER!🗽💪 I just endorsed ${candidate.firstName} ${candidate.lastName}, the first people-powered candidate for ${candidate.race}!`;
};

const ShareModal = ({ candidate, supportLink, isCandidate }) => {
  const user = getUserCookie(true);
  const defaultMessage = candidateMessage(candidate, user);
  const defaultMessageNoUrl = candidateMessageNoUrl(candidate, user);

  const [message, setMessage] = useState(defaultMessage);
  const [messageNoUrl, setMessageNoUrl] = useState(defaultMessageNoUrl);
  const [copied, setCopied] = useState(false);

  const onChangeField = (e) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    setMessage(candidateMessage(candidate, user));
    setMessageNoUrl(candidateMessageNoUrl(candidate, user));
    if (candidate) {
      logEvent(
        'Sharing',
        'Open Share Modal',
        `${candidate?.firstName} ${candidate?.lastName}`,
      );
    }
  }, [candidate]);
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

  const { firstName, lastName } = candidate || {};
  let url = '';
  if (typeof window !== 'undefined') {
    url = window.location.pathname;
    url = uuidUrl(
      user,
      window.location.origin + url,
      supportLink ? 'support=true' : '',
    );
  }

  const encodedUrl = encodeURIComponent(url);
  const encodedMessageBody = `${messageNoUrl} \n\n ${encodedUrl}`;

  const textMessageBody = `${url} ${'\n %0a'} ${'\n %0a'}${messageNoUrl}`;

  let emailSubject;
  if (candidate) {
    if (supportLink) {
      emailSubject = `I'm endorsing ${firstName} ${lastName} for ${candidate.race}`;
      if (candidate.isDraft) {
        emailSubject = `Let's get ${firstName} ${lastName} to run as an Independent for ${candidate.race}`;
      }
    } else {
      emailSubject = `Check out ${firstName} ${lastName} for ${candidate.race}`;
    }
  } else {
    emailSubject = 'Check this out';
  }

  const emailBody = `${messageNoUrl}%0D%0A%0D%0A${encodedUrl}%0D%0A%0D%0A GOOD PARTY%0D%0AFree software for free elections`;

  const handleCopy = () => {
    setCopied(true);

    trackShare('Copy to Clipboard');
  };
  const trackShare = (shareType = '') => {
    logEvent('Sharing', 'Click Share Method', shareType);
    // trackShareCallback(candidate);
  };

  const channels = [
    {
      label: 'Twitter',
      icon: <IoLogoTwitter />,
      className: 'twitter',
      link: `https://twitter.com/share?url=${encodedUrl}&text=${messageNoUrl}`,
    },
    {
      label: 'Facebook',
      icon: <FaFacebook />,
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

    // {
    //   label: 'Snapchat',
    //   icon: <FaSnapchatGhost />,
    //   className: 'snapchat',
    //   link: ``,
    // },
    //
    // {
    //   label: 'Reddit',
    //   icon: <IoLogoReddit />,
    //   className: 'reddit',
    //   link: `https://www.reddit.com/submit?url=${encodedUrl}&text=${messageNoUrl}&title=${emailSubject}`,
    // },
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
  ];

  return (
    <QueryModalContainer
      closeTitle={"Are you sure you don't want to share?"}
      closeContent={
        'Sharing a personal endorsement is the most powerful way to grow a grassroots campaign.'
      }
      closeBack={'BACK TO SHARE'}
    >
      <Wrapper>
        <FontH2 style={{ marginBottom: '22px' }}>Share</FontH2>
        {isCandidate && (
          <Font16>
            Candidates shared on social networks get more support.
          </Font16>
        )}
        <Border />
        {/*<StyledTextField*/}
        {/*  fullWidth*/}
        {/*  variant="outlined"*/}
        {/*  multiline*/}
        {/*  rows={4}*/}
        {/*  onChange={(e) => onChangeField(e)}*/}
        {/*  value={message}*/}
        {/*/>*/}
        {/*<br />*/}
        <Grid container spacing={3}>
          {channels.map((channel, index) => (
            <Grid item xs={6} md={4} key={index}>
              <a
                href={channel.link}
                onClick={() => {
                  trackShare(channel.label);
                }}
                target="_blank"
                rel="noopener noreferrer nofollow"
              >
                <IconItem>
                  <IconWrapper className={channel.className}>
                    <Icon>{channel.icon}</Icon>
                  </IconWrapper>
                </IconItem>
                <IconLabel>{channel.label}</IconLabel>
              </a>
            </Grid>
          ))}
        </Grid>
        <Border />
        Page Link
        <Row style={{ margin: '16px 0' }}>
          <TextField disabled value={url} fullWidth variant="outlined" />
          <Tooltip
            triggerEl={
              <CopyToClipboard text={url} onCopy={handleCopy}>
                <BlackButton style={{ marginLeft: '12px' }}>
                  <InnerButton>Copy</InnerButton>
                </BlackButton>
              </CopyToClipboard>
            }
          >
            Link Copied!
          </Tooltip>
        </Row>
        <div
          className="fb-send-to-messenger"
          messenger_app_id="1530862867115121"
          color="blue"
        />
        <Tooltip
          triggerEl={
            <CopyToClipboard text={url} onCopy={handleCopy}>
              <TipWrapper>
                <strong>Tip:</strong> Paste this {isCandidate && 'candidate '}
                link anywhere.
                <div style={{ marginTop: '12px' }}>
                  <TipIcon>
                    <Image
                      src="/images/icons/slack-logo.svg"
                      width={20}
                      height={20}
                    />
                  </TipIcon>
                  <TipIcon>
                    <FaYoutube style={{ color: '#FF0302' }} />
                  </TipIcon>
                  <TipIcon>
                    <FaDiscord style={{ color: '#5865F2' }} />
                  </TipIcon>
                  <TipIcon>
                    <FaReddit style={{ color: '#FF4500' }} />
                  </TipIcon>
                </div>
              </TipWrapper>
            </CopyToClipboard>
          }
        >
          Link Copied!
        </Tooltip>
      </Wrapper>
    </QueryModalContainer>
  );
};

ShareModal.propTypes = {
  candidate: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  supportLink: PropTypes.bool,
};

export default ShareModal;
