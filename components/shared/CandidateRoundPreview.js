/**
 *
 * CandidatesRoundPreview
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import { candidateRoute } from '../../helpers/electionsHelper';
import { numberFormatter } from '../../helpers/numberHelper';

const Wrapper = styled.div`
  position: relative;
  background-color: #fff;
`;

const ImageWrapper = styled.div`
  position: relative;
  height: 82px;
  width: 82px;
  border-radius: 50%;
  border: solid 3px #000;

  &.large {
    height: 130px;
    width: 130px;
  }

  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    height: 150px;
    width: 150px;

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

const Name = styled.div`
  margin-top: 11px;
  font-size: 16px;
  font-weight: 900;
  text-decoration: underline;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    font-size: 30px;
    margin-top: 20px;
  }
`;

const Supporters = styled.div`
  margin: 12px 0;
  font-size: 16px;
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
  font-size: 12px;
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
    font-size: 14px;
  }
`;
function CandidatesRoundPreview({
  candidate,
  imageOnly = false,
  large = false,
}) {
  const { id, firstName, lastName, image, color, supporters } = candidate;
  const brightColor = color?.color ? color.color : '#000';

  const candidateImage = () => {
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
            />
          )}
          <Overlay>
            <div style={{ marginBottom: '4px' }}>GOOD CERTIFIED</div>
            <Image src="/images/heart.svg" width={26} height={20} alt="" />
          </Overlay>
        </ImageWrapper>
      </Wrapper>
    );
  };

  return (
    <>
      {imageOnly ? (
        <>{candidateImage()}</>
      ) : (
        <Link href={candidateRoute(candidate)} passHref>
          <a
            className="no-underline"
            data-cy="candidate-link"
            id={`candidate-preview-${firstName}-${lastName}`}
          >
            <Wrapper>
              {candidateImage()}
              <Name>
                {firstName} {lastName}
              </Name>
              <Supporters>
                {numberFormatter(supporters)} Supporters so far
              </Supporters>
            </Wrapper>
          </a>
        </Link>
      )}
    </>
  );
}

CandidatesRoundPreview.propTypes = {
  candidate: PropTypes.object,
};

export default CandidatesRoundPreview;
