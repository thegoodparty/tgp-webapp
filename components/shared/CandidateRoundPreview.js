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
  box-shadow: 0 0 8px 8px rgba(0, 0, 0, 0.05);

  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    height: 150px;
    width: 150px;
  }

  img {
    object-fit: cover;
    object-position: center center;
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
function CandidatesRoundPreview({ candidate }) {
  const { id, firstName, lastName, image, color, supporters } = candidate;
  const brightColor = color?.color ? color.color : '#000';

  return (
    <Link href={candidateRoute(candidate)} passHref>
      <a className="no-underline" data-cy="candidate-link">
        <Wrapper>
          <ImageWrapper>
            {image && (
              <Image
                src={image}
                layout="fill"
                alt={`${firstName} ${lastName}`}
                data-cy="candidate-img"
              />
            )}
          </ImageWrapper>
          <Name>
            {firstName} {lastName}
          </Name>
          <Supporters>
            {numberFormatter(supporters)} Supporters so far
          </Supporters>
        </Wrapper>
      </a>
    </Link>
  );
}

CandidatesRoundPreview.propTypes = {
  candidate: PropTypes.object,
};

export default CandidatesRoundPreview;
