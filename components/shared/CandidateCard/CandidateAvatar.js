import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { getPartyImage } from '../../../helpers/candidatesHelper';

const ChallengerAvatarWrapper = styled.div`
  width: 58px;
  height: 58px;
  box-shadow: inset 0px 0px 16.5455px rgba(255, 255, 255, 0.25);
  border-radius: 50%;
  margin-right: 20px;
  position: relative;

  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    width: 112px;
    height: 112px;
    margin: 0 auto;
  }

  &.small {
    width: 58px;
    height: 58px;
    margin: 0 5px;
  }

  &.medium {
    width: 70px;
    height: 70px;
  }
`;

const Img = styled.div`
  width: 58px;
  height: 58px;
  background-position: center center;
  background-size: cover;

  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    width: 112px;
    height: 112px;
  }

  &.small {
    width: 58px;
    height: 58px;
  }

  &.medium {
    width: 70px;
    height: 70px;
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 50%;
  border: solid 2px ${({ theme }) => theme.colors.primary};
  img {
    object-fit: cover;
    object-position: center center;
  }
`;

const PartyIcon = styled.img`
  && {
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

    @media only screen and (min-width: ${({ theme }) =>
        theme.breakpointsPixels.md}) {
      height: 36px;
      width: 36px;
    }

    &.small {
      height: 25px;
      width: 25px;
    }

    &.medium {
      height: 25px;
      width: 25px;
    }

    &.party-I {
      background: transparent;
      border: none;
      box-shadow: none;
    }
    &.no-bg {
      background: transparent !important;
      border: none !important;
      box-shadow: none;
    }
  }
`;
const CandidateAvatar = ({
  avatar,
  party,
  size = 'large',
  afterLoad = () => {},
  centered = false,
  partyBadge = false,
  hideBadge = false,
  candidate,
}) => {
  let PartyImg = getPartyImage(partyBadge, party, hideBadge);
  const { color } = candidate;
  const brightColor = color?.color ? color.color : '#000';

  return (
    <ChallengerAvatarWrapper
      className={size}
      style={centered ? { margin: '0 auto' } : {}}
    >
      <ImageWrapper style={{ borderColor: brightColor }}>
        {size === 'small' ? (
          <LazyLoadImage
            src={avatar || 'https://assets.goodparty.org/gray-heart.png'}
            alt=""
            width="100%"
            height="100%"
            afterLoad={afterLoad}
            style={{ width: '58px' }}
          />
        ) : (
          <Img
            className={size}
            style={{
              backgroundImage: `url(${
                avatar || 'https://assets.goodparty.org/gray-heart.png'
              })`,
            }}
          />
        )}
      </ImageWrapper>
      {PartyImg && (
        <PartyIcon
          src={PartyImg}
          className={`full-image ${size} party-${party} ${
            partyBadge && 'no-bg'
          }`}
          alt="badge"
        />
      )}
    </ChallengerAvatarWrapper>
  );
};

CandidateAvatar.propTypes = {
  avatar: PropTypes.string,
  party: PropTypes.string,
  size: PropTypes.string,
  afterLoad: PropTypes.func,
  centered: PropTypes.bool,
  partyBadge: PropTypes.bool,
};

export default CandidateAvatar;
