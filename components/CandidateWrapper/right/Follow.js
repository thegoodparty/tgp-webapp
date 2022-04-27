/**
 *
 * Follow
 *
 */

import React, { useContext } from 'react';
import styled from 'styled-components';
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

import { validateLink } from '/helpers/linkHelper';
import { logEvent } from '/services/AnalyticsService';
import { CandidateContext } from '/containers/CandidatePage';

const Wrapper = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  margin: 60px 0;
  background: linear-gradient(
    0deg,
    #f50e1c 0%,
    rgba(12, 36, 237, 0.2) 70%,
    rgba(12, 36, 237, 0.1) 90%,
    #fff 100%
  );
  border-radius: 10px;
  padding: 18px 32px;

  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    flex-direction: row;
    justify-content: space-between;
    background: linear-gradient(
      269.65deg,
      #f50e1c 0%,
      rgba(12, 36, 237, 0.4) 70%,
      rgba(12, 36, 237, 0.1) 100%
    );
  }
`;

const SocialLink = styled.a`
  margin-right: 25px;
  display: inline-block;
  color: #fff;
  font-size: 26px;
  transition: color 0.3s;
  &:hover {
    color: #ccc;
  }
`;

const Title = styled.div`
  margin-bottom: 24px;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    margin-bottom: 0;
  }
`;

function Follow() {
  const { candidate } = useContext(CandidateContext);
  const {
    firstName,
    lastName,
    facebook,
    twitter,
    tiktok,
    snap,
    instagram,
    youtube,
    twitch,
    reddit,
    website,
    linkedin,
    color,
  } = candidate;

  const brightColor = color?.color ? color.color : false;

  const trackSocial = (channel) => {
    logEvent('Click', channel, 'Candidate Social Links');
  };
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
    { label: 'Reddit', icon: <FaRedditAlien />, link: validateLink(reddit) },
    { label: 'Website', icon: <FaGlobe />, link: validateLink(website) },
  ];

  const isSmall = typeof window !== 'undefined' && window?.innerWidth < 768;

  return (
    <Wrapper
      style={
        brightColor
          ? {
              background: `linear-gradient(
        ${isSmall ? '0deg' : '270deg'},
      ${brightColor} 0%,
      ${brightColor} 60%,
      #fff 100%
      )`,
            }
          : {}
      }
    >
      <Title data-cy="follow-title">
        <strong>Follow</strong> {firstName} {lastName}!
      </Title>
      <div>
        {channels.map((channel) => (
          <React.Fragment key={channel.label} data-cy="follow-item">
            {channel.link && (
              <SocialLink
                href={channel.link}
                target="_blank"
                rel="nofollow"
                onClick={() => trackSocial(channel.label)}
                data-cy="follow-item-link"
              >
                {channel.icon}
              </SocialLink>
            )}
          </React.Fragment>
        ))}
      </div>
    </Wrapper>
  );
}

export default Follow;
