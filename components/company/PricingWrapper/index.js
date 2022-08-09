/**
 *
 * PricingWrapper
 *
 */

import React from 'react';
import PageWrapper from '../../shared/PageWrapper';
import styled from 'styled-components';
import Plans from './Plans';

const H1 = styled.h1`
  font-size: 36px;
  line-height: 46px;
  letter-spacing: 0.2px;
  font-weight: 900;
  font-family: ${({ theme }) => theme.typography.fontFamily};
  margin: 32px 0 18px;

  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    font-size: 64px;
    line-height: 77px;
    margin: 50px 0 30px;
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
  height: 20px;
  width: calc(100% + 10px);
  bottom: 0;
  left: -5px;
  background-color: #ffe600;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    bottom: 4px;
    height: 20px;
  }
`;

const H2 = styled.h2`
  font-size: 20px;
  line-height: 30px;
  letter-spacing: 0.2px;
  font-weight: 300;
  font-family: ${({ theme }) => theme.typography.fontFamily};
  margin: 0 0 50px;
  max-width: 800px;

  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    margin: 0 0 60px;
  }
`;

function PricingWrapper() {
  return (
    <PageWrapper>
      <H1>
        Flexible plans to help{' '}
        <Relative>
          <Up>grow</Up>
          <Yellow />
        </Relative>{' '}
        and{' '}
        <Relative>
          <Up>scale</Up>
          <Yellow />
        </Relative>{' '}
        civic engagement campaigns
      </H1>
      <H2>
        Whether you’re starting up a local grassroots effort or building a
        national movement, we have customizable plans to help you get engaged
        and make an impact.
      </H2>
      <Plans />
    </PageWrapper>
  );
}

export default PricingWrapper;
