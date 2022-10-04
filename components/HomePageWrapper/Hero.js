import React, { useContext } from 'react';
import styled from 'styled-components';
import { Link as ScrollLink } from 'react-scroll';

import { HomePageContext } from '/containers/HomePage';

const H1 = styled.h1`
  margin: 16px 0 12px;
  font-weight: 900;
  font-size: 46px;
  line-height: 60px;
  display: inline-block;
  position: relative;
  @media only screen and (min-width: 1024px) {
    font-size: 70px;
    line-height: 80px;
  }
  @media only screen and (min-width: $1200px) {
    font-size: 90px;
    margin: 70px 0 24px;
    line-height: 100px;
  }

  .yellow {
    position: absolute;
    height: 25px;
    width: 100%;
    bottom: 0;
    left: -3px;
    background-color: #FFE600;
    @media only screen and (min-width: 1024px) {
      height: 40px;
      left: -7px;
    }
  }

  

  .top {
    position: relative;
    z-index: 10;
  }
`;

const H3 = styled.h3`
  margin: 0 0 35px;
  font-size: 19px;
  font-weight: 400;
  @media only screen and (min-width: 1024px) {
    font-size: 28px;
    margin: 0 0 70px;
  }

  @media only screen and (min-width: $1200px) {
    font-size: 36px;
  }
`;

const Hero = ({ openModalCallback }) => {
  return (
    <>
      <H1>
        <span className="relative">
          <span className="top">Break free</span> <span className="yellow" />
        </span>{' '}
        from <br />
        <span className="red">politics</span> as{' '}
        <span className="blue">usual</span>
      </H1>
      <H3 onClick={openModalCallback}>
        Declare independence with a <strong>#goodparty</strong>
      </H3>
    </>
  );
};

export default Hero;
