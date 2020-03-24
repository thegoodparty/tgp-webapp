import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import noCandidateImage from './noCandidateImageUrl';

const Wrapper = styled.div`
  width: ${props => props.wrapperSizeSmall};
  height: ${props => props.wrapperSizeSmall};
  border-radius: 50%;
  border: solid 1px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    width: ${props => props.wrapperSizeLarge};
    height: ${props => props.wrapperSizeLarge};
  }

  &.green {
    border: solid 1px ${({ theme }) => theme.colors.green};
  }

  &.red {
    border: solid 1px ${({ theme }) => theme.colors.orange};
  }
`;

const Avatar = styled.div`
  width: ${props => props.avatarSizeSmall};
  height: ${props => props.avatarSizeSmall};
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 50%;
  position: relative;
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    width: ${props => props.avatarSizeLarge};
    height: ${props => props.avatarSizeLarge};
  }
`;

const RedOverlay = styled.div`
  position: absolute;
  background-color: ${({ theme }) => theme.colors.orange};
  opacity: 0.5;
  height: 100%;
  width: 100%;
  border-radius: 50%;
`;

const CandidateAvatar = ({ src = noCandidateImage, size = 'large', good }) => {
  let avatarSizeSmall;
  let avatarSizeLarge;
  let wrapperSizeSmall;
  let wrapperSizeLarge;
  if (size === 'small') {
    avatarSizeSmall = '52px';
    avatarSizeLarge = '52px';
    wrapperSizeSmall = '56px';
    wrapperSizeLarge = '56px';
  } else if (size === 'large') {
    avatarSizeSmall = '74px';
    avatarSizeLarge = '74px';
    wrapperSizeSmall = '80px';
    wrapperSizeLarge = '80px';
  } else if (size === 'responsive') {
    avatarSizeSmall = '52px';
    avatarSizeLarge = '74px';
    wrapperSizeSmall = '56px';
    wrapperSizeLarge = '80px';
  } else if (size === 'xl') {
    avatarSizeSmall = '90px';
    avatarSizeLarge = '130px';
    wrapperSizeSmall = '96px';
    wrapperSizeLarge = '140px';
  }
  if (!src) {
    src = noCandidateImage;
  }

  return (
    <Wrapper
      wrapperSizeSmall={wrapperSizeSmall}
      wrapperSizeLarge={wrapperSizeLarge}
      className={good ? 'green' : 'red'}
    >
      <Avatar
        src={src}
        avatarSizeSmall={avatarSizeSmall}
        avatarSizeLarge={avatarSizeLarge}
        style={{ backgroundImage: `url(${src}` }}
      >
        {!good && <RedOverlay />}
      </Avatar>
    </Wrapper>
  );
};

CandidateAvatar.propTypes = {
  src: PropTypes.string,
  size: PropTypes.string,
  good: PropTypes.bool,
};

export default CandidateAvatar;
