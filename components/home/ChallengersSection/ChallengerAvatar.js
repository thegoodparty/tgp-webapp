import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const ChallengerAvatarWrapper = styled.div`
  width: 7rem;
  height: 7rem;
  margin: 0 auto;
  border-radius: 3.5rem;
  box-shadow: 0px 0px 4.8436px rgba(0, 0, 0, 0.12),
    0px 0px 3.6327px rgba(0, 0, 0, 0.08), 0px 0px 9.6872px rgba(0, 0, 0, 0.07);
  position: relative;
  &.full {
    width: unset;
    height: unset;
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 50%;
  img {
    object-fit: cover;
    object-position: center center;
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
  &.full {
    width: 31px;
    height: 31px;
    bottom: -5px;
    left: -5px;
  }
`;
const ChallengerAvatar = ({ avatar, party, isFull, afterLoad = () => { } }) => {
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
    <ChallengerAvatarWrapper className={isFull && 'full'}>
      <ImageWrapper>
        <img
          src={avatar || 'https://assets.thegoodparty.org/gray-heart.png'}
          alt=""
          width="100%"
          height="100%"
          afterLoad={afterLoad}
        />
      </ImageWrapper>
      {PartyImg && (
        <PartyIcon
          src={PartyImg}
          className={`full-image ${isFull && 'full'}`}
        />
      )}
    </ChallengerAvatarWrapper>
  );
};

ChallengerAvatar.propTypes = {
  avatar: PropTypes.string,
  party: PropTypes.string,
  isFull: PropTypes.bool,
  afterLoad: PropTypes.func,
};

export default ChallengerAvatar;
