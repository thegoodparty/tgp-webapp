import React, { useContext } from 'react';
import styled from 'styled-components';
import { Link as ScrollLink } from 'react-scroll';

import { HomePageContext } from '/containers/HomePage';

const H1 = styled.h1`
  font-size: 48px;
  margin: 16px 0 20px;
  font-weight: 900;

  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.xl}) {
    margin: 70px 0;
    font-size: 45px;
  }

  .smaller {
    font-style: italic;
    font-size: 30px;
    color: #8e8e8e;

    @media only screen and (min-width: ${({ theme }) =>
        theme.breakpointsPixels.xl}) {
      font-size: 48px;
    }
  }

  .large {
    font-size: 60px;
    display: inline-block;
    position: relative;
    z-index: 10;
    @media only screen and (min-width: ${({ theme }) =>
        theme.breakpointsPixels.xl}) {
      font-size: 90px;
    }
  }

  .yellow {
    position: absolute;
    height: 28px;
    width: calc(100% + 10px);
    bottom: 3px;
    left: -5px;
    background-color: #ffe600;
  }
`;

const Up = styled.span`
  z-index: 10;
  position: relative;
`;

const MobileBr = styled.span`
  display: block;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    display: inline;
  }
`;

const Hero = ({ openModalCallback }) => {
  const { utmExperiment } = useContext(HomePageContext);

  return (
    <H1>
      {utmExperiment.text1}
      <br />
      {utmExperiment.text2 !== '' && (
        <span className="large">
          <span className="yellow" />
          <Up>{utmExperiment.text2}</Up>
        </span>
      )}{' '}
      <MobileBr />
      <span className="smaller pointer" onClick={openModalCallback}>
        {utmExperiment.text3}
      </span>
    </H1>
  );
};

export default Hero;
