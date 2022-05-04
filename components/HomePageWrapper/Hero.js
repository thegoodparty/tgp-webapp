import React from 'react';
import styled from 'styled-components';

const H1 = styled.h1`
  font-size: 64px;
  margin: 70px 0;
  font-weight: 900;

  .smaller {
    font-style: italic;
    font-size: 40px;

    @media only screen and (min-width: ${({ theme }) =>
        theme.breakpointsPixels.lg}) {
      font-size: 48px;
    }
  }

  .large {
    font-size: 90px;
    display: inline-block;
    position: relative;
    z-index: 10;
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

const Hero = () => {
  return (
    <H1>
      It wants us divided & hopeless.
      <br />
      <span className="large">
        <span className="yellow" />
        Fuck <u>It</u>!
      </span>{' '}
      <span className="smaller">(with a #goodparty)</span>
    </H1>
  );
};

export default Hero;
