/**
 *
 * Heads
 *
 */

import React from 'react';
import styled from 'styled-components';
import { LazyLoadImage } from 'react-lazy-load-image-component';
const AvatarsWrapper = styled.div`
  display: flex;
  max-width: 20rem;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0 auto;
  margin-top: 4rem;
  @media only screen and (max-width: ${({ theme }) =>
    theme.creators.breakpoints.creatorsMobile}) {
    padding: 0 1.5rem;
    margin-bottom: 2.5rem;
  }
`;

const Avatar = styled(LazyLoadImage)`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  margin-right: 1rem;
  margin-bottom: 0.5rem;
  @media only screen and (max-width: ${({ theme }) =>
    theme.creators.breakpoints.creatorsMobile}) {
    width: 24px;
    height: 24px;
    margin-right: 0.7rem;
  }
`;

function Heads() {
  const avatars = [];
  for (let i = 0; i < 12; i++) {
    avatars.push(
      <Avatar
        key={i}
        src={`/images/avatars/ellipse_${i}.png`}
        alt={`avatar${i}`}
      />,
    );
  }
  return <AvatarsWrapper>{avatars}</AvatarsWrapper>;
}

Heads.propTypes = {};

export default Heads;
