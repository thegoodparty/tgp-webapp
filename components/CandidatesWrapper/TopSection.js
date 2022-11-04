/**
 *
 * TopSection
 *
 */

import React from 'react';
import styled from 'styled-components';

const H1 = styled.h1`
  margin: 24px 0;
  font-size: 40px;
  font-weight: 900;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    margin: 64px 0 24px;
    font-size: 64px;
  }
`;

const Relative = styled.div`
  display: inline-block;
  position: relative;
`;

const Up = styled.span`
  z-index: 10;
  position: relative;
`;

const Yellow = styled.div`
  position: absolute;
  height: 30px;
  width: calc(100% + 10px);
  bottom: 0;
  left: -5px;
  background-color: ${({ theme }) => theme.colors.yellow};
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    bottom: 4px;
    height: 30px;
  }
`;

function TopSection() {
  return (
    <H1 data-cy="candidates-top-title">
      Claim your{' '}
      <Relative>
        <Up> Independents!</Up>
        <Yellow />
      </Relative>
    </H1>
  );
}

export default TopSection;
