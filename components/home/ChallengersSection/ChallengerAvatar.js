import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Image from 'next/image';

const ChallengerAvatarWrapper = styled.div`
  width: 7rem;
  min-height: 7rem;
  margin: 0 auto;
  border-radius: 3.5rem;
  box-shadow: 0px 0px 4.8436px rgba(0, 0, 0, 0.12),
    0px 0px 3.6327px rgba(0, 0, 0, 0.08), 0px 0px 9.6872px rgba(0, 0, 0, 0.07);
  position: relative;
`;

const ImageWrapper = styled.div`
  width: 7rem;
  height: 7rem;
  overflow: hidden;
  border-radius: 50%;
  img {
    object-fit: cover;
    object-position: top center;
  }
`;

const PartyIcon = styled.img`
  position: absolute;
  bottom: -10px;
  left: -10px;
  border: 4px solid white;
  background: white;
  border-radius: 50%;
  height: 45px;
  width: 45px;
`;
const ChallengerAvatar = ({ avatar, party }) => {
  let PartyImg;
  if (party === 'D') {
    PartyImg = '/images/icons/democrat.png';
  } else if (party === 'R') {
    PartyImg = '/images/icons/republican.png';
  } else if (party === 'I') {
    PartyImg = '/images/icons/independent.png';
  } else if (party === 'L') {
    PartyImg = '/images/icons/libertarian.png';
  }
  return (
    <ChallengerAvatarWrapper>
      <ImageWrapper>
        <LazyLoadImage src={avatar} alt="" width="100%" height="100%" />
      </ImageWrapper>
      {PartyImg && <PartyIcon src={PartyImg} className="full-image" />}
    </ChallengerAvatarWrapper>
  );
};

ChallengerAvatar.propTypes = {
  avatar: PropTypes.string,
  party: PropTypes.string,
};

export default ChallengerAvatar;
