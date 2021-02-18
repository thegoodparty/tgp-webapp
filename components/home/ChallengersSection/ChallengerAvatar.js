import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const ChallengerAvatarWrapper = styled.div`
  width: 70px;
  height: 70px;
  margin: 0 auto;
  box-shadow: inset 0px 0px 16.5455px rgba(255, 255, 255, 0.25);
  position: relative;
  border-radius: 50%;
  &.small {
   width: unset;
   height: unset;
  }
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 100px;
    height: 100px;
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 50%;
  border: solid 2px ${({ theme }) => theme.colors.purple};
  img {
    object-fit: cover;
    object-position: center center;
  }
`;

const PartyIcon = styled.img`
  position: absolute;
  bottom: -5px;
  right: -5px;
  border: 4px solid white;
  background: white;
  border-radius: 50%;
  height: 25px;
  width: 25px;
  box-shadow: 0px 0px 4.8436px rgba(0, 0, 0, 0.12),
    0px 0px 3.6327px rgba(0, 0, 0, 0.08), 0px 0px 9.6872px rgba(0, 0, 0, 0.07);
  //&.small {
  //  width: 31px;
  //  height: 31px;
  //  bottom: -5px;
  //  right: -5px;
  //}
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    height: 36px;
    width: 36px;
    bottom: -5px;
    right: -5px;
  }
`;
const ChallengerAvatar = ({ avatar, party, isSmall, afterLoad = () => { }}) => {
  console.log('isSmall', isSmall);
  let PartyImg;
  if (party === 'D') {
    PartyImg = '/images/icons/democrat.png';
  } else if (party === 'R') {
    PartyImg = '/images/icons/republican.png';
  } else if (party === 'I') {
    PartyImg = '/images/icons/independent.png';
  } else if (party === 'L') {
    PartyImg = '/images/icons/libertarian.png';
  } else if (party === 'LI') {
    PartyImg = '/images/icons/liberation.png';
  } else if (party === 'P') {
    PartyImg = '/images/icons/progressive.png';
  } else if (party === 'G' || party === 'GP') {
    PartyImg = '/images/icons/green-party.png';
  }
  return (
    <ChallengerAvatarWrapper className={isSmall && 'small'}>
      <ImageWrapper>
        <LazyLoadImage
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
          className={`full-image ${isSmall && 'small'}`}
        />
      )}
    </ChallengerAvatarWrapper>
  );
};

ChallengerAvatar.propTypes = {
  avatar: PropTypes.string,
  party: PropTypes.string,
  afterLoad: PropTypes.func,
  isSmall: PropTypes.bool,
};

export default ChallengerAvatar;
