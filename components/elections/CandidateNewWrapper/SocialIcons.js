/**
 *
 * SocialIcons
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
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
} from 'react-icons/fa';
import { SiTiktok } from 'react-icons/si';

import { validateLink } from '/helpers/linkHelper';
import { logEvent } from '/services/AnalyticsService';

const SocialLink = styled.a`
  margin-right: 25px;
  margin-bottom: 6px;
  display: inline-block;
`;

const Wrapper = styled.div`
  margin-top: 24px;
  font-size: 32px;
`;

function SocialIcons({ candidate }) {
  let website;
  const {
    facebook,
    twitter,
    tiktok,
    snap,
    instagram,
    youtube,
    twitch,
    reddit,
  } = candidate;
  if (candidate.comparedCandidates?.candidates?.length > 0) {
    candidate.comparedCandidates.candidates[0].image = candidate.image;
    ({ website } = candidate.comparedCandidates.candidates[0]);
  }

  const trackSocial = channel => {
    logEvent('Click', channel, 'Candidate Social Links');
  };

  const channels = [
    { label: 'Facebook', icon: <FaFacebookF />, link: validateLink(facebook) },
    { label: 'Twitter', icon: <FaTwitter />, link: validateLink(twitter) },
    { label: 'Tiktok', icon: <SiTiktok />, link: validateLink(tiktok) },
    { label: 'Snap', icon: <FaSnapchatGhost />, link: validateLink(snap) },
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

  return (
    <Wrapper>
      {channels.map(channel => (
        <React.Fragment key={channel.label}>
          {channel.link && (
            <SocialLink
              href={channel.link}
              target="_blank"
              rel="nofollow"
              onClick={() => trackSocial(channel.label)}
            >
              {channel.icon}
            </SocialLink>
          )}
        </React.Fragment>
      ))}
    </Wrapper>
  );
}

SocialIcons.propTypes = {
  candidate: PropTypes.object,
};

export default SocialIcons;
