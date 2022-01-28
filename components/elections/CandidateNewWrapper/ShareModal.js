import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Body11, Body13, H2 } from 'components/shared/typogrophy';
import { uuidUrl } from 'helpers/userHelper';
import { logEvent } from 'services/AnalyticsService';
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
import { getUserCookie } from 'helpers/cookieHelper';
import { candidateRoute } from 'helpers/electionsHelper';
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

const WhiteBody11 = styled(Body11)`
  color: #fff;
  margin: 33px 0 18px;
`;

const IconItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 14px;
`;

const IconWrapper = styled.div`
  height: 40px;
  width: 40px;
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
  font-size: 16px;
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

const StyledTextField = styled(TextField)`
  && {
    margin: 20px 0;
    .MuiInputBase-multiline {
      background-color: #fff;
      box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.25);
    }
    .MuiOutlinedInput-notchedOutline {
      border-color: ${props => props.theme.colors.purple};
    }
  }
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

  return `INDIE POWER!🗽💪 I just endorsed ${candidate.firstName} ${
    candidate.lastName
  }, the first people-powered candidate for ${candidate.race}!`;
};

const ShareModal = ({ candidate, supportLink }) => {
  const user = getUserCookie(true);
  const defaultMessage = candidateMessage(candidate, user);
  const defaultMessageNoUrl = candidateMessageNoUrl(candidate, user);

  const [message, setMessage] = useState(defaultMessage);
  const [messageNoUrl, setMessageNoUrl] = useState(defaultMessageNoUrl);
  const [copied, setCopied] = useState(false);

  const onChangeField = e => {
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
      emailSubject = `I'm endorsing ${firstName} ${lastName} for ${
        candidate.race
      }`;
      if (candidate.isDraft) {
        emailSubject = `Let's get ${firstName} ${lastName} to run as an Independent for ${
          candidate.race
        }`;
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

  const privateChannels = [
    {
      label: 'Text message',
      icon: <IoIosText />,
      className: 'sms',
      link: `sms:?&body=${textMessageBody.replace('&', '%26')}`,
    },
    {
      label: 'Email',
      icon: <IoIosMail />,
      className: 'email',
      link: `mailto:?body=${emailBody}&subject=${emailSubject}`,
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
      link: `https://api.whatsapp.com/send?text=${encodedMessageBody}`,
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
      link: `https://twitter.com/share?url=${encodedUrl}&text=${messageNoUrl}`,
    },
    {
      label: 'Reddit',
      icon: <IoLogoReddit />,
      className: 'reddit',
      link: `https://www.reddit.com/submit?url=${encodedUrl}&text=${messageNoUrl}&title=${emailSubject}`,
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
    <QueryModalContainer
      mode="purple"
      closeTitle={"Are you sure you don't want to share?"}
      closeContent={
        'Sharing a personal endorsement is the most powerful way to grow a grassroots campaign.'
      }
      closeBack={'BACK TO SHARE'}
    >
      <Wrapper>
        <H2 style={{ color: '#FFF' }}>Share to inspire others!</H2>
        <StyledTextField
          fullWidth
          variant="outlined"
          multiline
          rows={4}
          onChange={e => onChangeField(e)}
          value={message}
        />
        <br />
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <WhiteBody11>PRIVATE</WhiteBody11>
            {privateChannels.map(channel => (
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
            <WhiteBody11>PUBLIC</WhiteBody11>
            {publicChannels.map(channel => (
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
  supportLink: PropTypes.bool,
};

export default ShareModal;
