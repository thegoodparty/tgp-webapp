import React from 'react';
import styled from 'styled-components';
import { Link as ScrollLink } from 'react-scroll';

const H1 = styled.h1`
  font-size: 48px;
  margin: 16px 0 20px;
  font-weight: 900;

  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    margin: 70px 0;
    font-size: 56px;
  }

  .smaller {
    font-style: italic;
    font-size: 36px;

    @media only screen and (min-width: ${({ theme }) =>
        theme.breakpointsPixels.lg}) {
      font-size: 48px;
    }
  }

  .large {
    font-size: 70px;
    display: inline-block;
    position: relative;
    z-index: 10;
    @media only screen and (min-width: ${({ theme }) =>
        theme.breakpointsPixels.lg}) {
      font-size: 90px;
    }
  }

  .yellow {
    position: absolute;
    height: 28px;
    width: calc(100% + 10px);
    bottom: 14px;
    left: -5px;
    background-color: #ffe600;
    z-index: -1;
  }
`;

const MobileBr = styled.span`
  display: block;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    display: inline;
  }
`;

const Hero = () => {
  return (
    <H1>
      <u>
        <i>It</i>
      </u>{' '}
      wants us divided & hopeless.
      <br />
      <span className="large">
        <span className="yellow" />
        Fuck{' '}
        <ScrollLink className="pointer" to="what-is-it" duration={350} smooth>
          <u>
            <i>It</i>
          </u>
        </ScrollLink>
        !
      </span>{' '}
      <MobileBr />
      <span className="smaller">(with a #goodparty)</span>
    </H1>
  );
};

export default Hero;
