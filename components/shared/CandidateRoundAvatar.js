/**
 *
 * CandidateRoundAvatar
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import { candidateRoute } from '../../helpers/electionsHelper';
import { numberFormatter } from '../../helpers/numberHelper';
import { candidateColor } from '../../helpers/candidatesHelper';

const Wrapper = styled.div`
  position: relative;
  background-color: #fff;
`;

const ImageWrapper = styled.div`
  position: relative;
  height: 150px;
  width: 150px;
  border-radius: 50%;
  border: solid 5px #000;

  &.large {
    height: 130px;
    width: 130px;

    .overlay {
      font-size: 14px;
    }
  }

  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    &.large {
      height: 230px;
      width: 230px;
    }
  }

  img {
    object-fit: cover;
    object-position: top center;
    border-radius: 50%;
  }
`;

const Overlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  padding: 4px;
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.8) 0%,
    rgba(255, 255, 255, 0) 40%,
    rgba(255, 255, 255, 0) 100%
  );
  font-size: 10px;
  font-weight: 900;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  img {
    margin-top: 12px;
    display: inline-block;
    object-fit: initial;
    object-position: initial;
    border-radius: unset;
  }

  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    padding: 12px;
    font-size: 12px;
  }
`;
function CandidateRoundAvatar({ candidate, large = false, priority = false }) {
  const { firstName, lastName, image, isClaimed } = candidate;
  const brightColor = candidateColor(candidate);

  return (
    <Wrapper>
      <ImageWrapper
        style={{ borderColor: brightColor }}
        className={large && 'large'}
      >
        {image && (
          <Image
            src={image}
            layout="fill"
            alt={`${firstName} ${lastName}`}
            data-cy="candidate-img"
            style={{ borderColor: brightColor }}
            priority={priority}
          />
        )}
        {isClaimed && (
          <Overlay className="overlay">
            <div style={{ marginBottom: '4px' }}>GOOD CERTIFIED</div>
            <Image src="/images/heart.svg" width={26} height={20} alt="GP" />
          </Overlay>
        )}
      </ImageWrapper>
    </Wrapper>
  );
}

CandidateRoundAvatar.propTypes = {
  candidate: PropTypes.object,
};

export default CandidateRoundAvatar;
