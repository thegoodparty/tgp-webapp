/**
 *
 * FollowModal
 *
 */

import React, { useContext } from 'react';
import styled from 'styled-components';
import { IoMdClose } from 'react-icons/io';
import {
  FaFacebookF,
  FaTwitter,
  FaSnapchatGhost,
  FaGlobe,
  FaInstagram,
  FaYoutube,
  FaTwitch,
  FaLinkedinIn,
} from 'react-icons/fa';
import { SiTiktok } from 'react-icons/si';
import { BiLinkAlt } from 'react-icons/bi';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { CandidateContext } from '/containers/CandidatePage';
import { CandidateWrapperContext } from './index';
import { validateLink } from '../../helpers/linkHelper';
import { logEvent } from '../../services/AnalyticsService';
import { FontH3 } from '../shared/typogrophy';
import Row from '../shared/Row';
import BlackButton, { InnerButton } from '../shared/buttons/BlackButton';
import Tooltip from '../shared/Tooltip';

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

const CloseWrapper = styled.div`
  display: inline-block;
  padding: 0 0 12px 12px;
  cursor: pointer;
  color: #d3d3d3;
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
  transition: box-shadow 0.3s;
  
  &:hover {
    color: #FFF;
    box-shadow: 0 0 6px 2px rgba(0, 0, 0, 0.3);
  }

  &.Facebook {
    background-color: #4267b2;
  }

  &.Instagram {
    background: #f09433;

    background: radial-gradient(
      circle at 30% 107%,
      #fdf497 0%,
      #fdf497 5%,
      #fd5949 45%,
      #d6249f 60%,
      #285aeb 90%
    );
  }

  &.Twitter {
    background-color: #1da1f2;
  }

  &.Snap {
    background-color: #fffc00;
  }

  &.YouTube {
    background-color: #ff0000;
  }

  &.Twitch {
    background-color:  #9146FF;
  }

  &.Tiktok {
    background-color: #000;
  }

  &.LinkedIn {
    background-color: #0077b5;
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

function FollowModal() {
  const { candidate } = useContext(CandidateContext);
  const { closeFollowModalCallback } = useContext(CandidateWrapperContext);

  let url = '';
  if (typeof window !== 'undefined') {
    url = window.location.href;
  }
  const {
    facebook,
    twitter,
    tiktok,
    snap,
    instagram,
    youtube,
    twitch,
    website,
    linkedin,
    color,
  } = candidate;

  const brightColor = color?.color ? color.color : false;

  const channels = [
    { label: 'Facebook', icon: <FaFacebookF />, link: validateLink(facebook) },
    { label: 'Twitter', icon: <FaTwitter />, link: validateLink(twitter) },
    { label: 'Tiktok', icon: <SiTiktok />, link: validateLink(tiktok) },
    { label: 'Snap', icon: <FaSnapchatGhost />, link: validateLink(snap) },
    {
      label: 'LinkedIn',
      icon: <FaLinkedinIn />,
      link: validateLink(linkedin),
    },
    {
      label: 'Instagram',
      icon: <FaInstagram />,
      link: validateLink(instagram),
    },
    {
      label: 'YouTube',
      icon: <FaYoutube />,
      link: validateLink(youtube),
    },
    { label: 'Twitch', icon: <FaTwitch />, link: validateLink(twitch) },
    { label: 'Website', icon: <FaGlobe />, link: validateLink(website) },
  ];

  const trackSocial = (channel) => {
    logEvent('Click', channel, 'Candidate Social Links');
  };

  return (
    <Wrapper>
      <Row style={{ justifyContent: 'space-between' }}>
        <FontH3>Follow on</FontH3>
        <div className="text-right">
          <CloseWrapper onClick={closeFollowModalCallback}>
            <IoMdClose />
          </CloseWrapper>
        </div>
      </Row>
      {channels.map((channel) => (
        <React.Fragment key={channel.label}>
          {channel.link && (
            <SocialWrapper data-cy="follow-item">
              <div className="flex-center">
                <SocialLink
                  className={channel.label}
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
                onClick={() => trackSocial(channel.label)}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="follow-button"
                id={`${channel.label}-follow`}
              >
                <BlackButton>
                  <InnerButton>
                    <Smaller>Follow</Smaller>
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
            <CopyWrapper id="follow-copy-link">
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
    </Wrapper>
  );
}

export default FollowModal;
