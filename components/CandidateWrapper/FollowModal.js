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
  FaRedditAlien,
  FaLinkedinIn,
} from 'react-icons/fa';
import { SiTiktok } from 'react-icons/si';

import { CandidateContext } from '/containers/CandidatePage';
import { CandidateWrapperContext } from './index';
import { validateLink } from '../../helpers/linkHelper';
import { logEvent } from '../../services/AnalyticsService';
import { FontH3 } from '../shared/typogrophy';
import Row from '../shared/Row';
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
    padding: 36px;
  }
`;

const CloseWrapper = styled.div`
  display: inline-block;
  padding: 0 0 12px 12px;
  cursor: pointer;
  color: #d3d3d3;
`;
const SocialLink = styled.a`
  margin: 20px;
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
  
`;

function FollowModal() {
  const { candidate } = useContext(CandidateContext);
  const { closeFollowModalCallback } = useContext(CandidateWrapperContext);

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
        <FontH3>Follow</FontH3>
        <div className="text-right">
          <CloseWrapper onClick={closeFollowModalCallback}>
            <IoMdClose />
          </CloseWrapper>
        </div>
      </Row>
      <div className="text-center">
        {channels.map((channel) => (
          <React.Fragment key={channel.label}>
            <span data-cy="follow-item">
              {channel.link && (
                <SocialLink
                  href={channel.link}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  onClick={() => trackSocial(channel.label)}
                  className={channel.label}
                  style={
                    channel.label === 'Website'
                      ? { backgroundColor: brightColor }
                      : {}
                  }
                >
                  {channel.icon}
                </SocialLink>
              )}
            </span>
          </React.Fragment>
        ))}
      </div>
    </Wrapper>
  );
}

export default FollowModal;
