import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  max-width: ${({ theme }) => theme.breakpointsPixels.contentMax};
  margin: 0 auto;
  text-align: center;
`;

const TitleWrapper = styled.div`
  background: url('/images/homepage/how-works-bg-small.svg') center center
    no-repeat;
  background-size: 100% 100%;
  position: relative;
  min-height: 170px;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    background: none;
    display: block;
    min-height: unset;
  }

  .hidden {
    opacity: 0;
    @media only screen and (min-width: ${({ theme }) =>
        theme.breakpointsPixels.md}) {
      display: none;
    }
  }
`;

const Title = styled.h2`
  margin: 0;
  color: #fff;
  font-size: 22px;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    display: block;
    position: static;
    height: unset;
    background-color: #3a3a48;
    padding: 24px;
    margin: -24px 0 0;
    font-size: 36px;
  }
`;

const P = styled.p`
  font-size: 20px;
  line-height: 28px;
  max-width: 720px;
  margin: 0 auto;
  padding: 48px 24px;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    font-size: 25px;
    line-height: 38px;
    padding: 48px 12px;
  }
`;

const HowWorks = () => {
  return (
    <Wrapper>
      <TitleWrapper>
        <Title>How does it work?</Title>
        <img
          src="/images/homepage/how-works-bg-small.svg"
          className="hidden full-image"
        />
      </TitleWrapper>
      <P>
        We provide <strong>free crowd-voting tools</strong> to help Good
        Certified candidates run and win.
        <br />
        <br />
        Crowd-voting tools help <strong>mobilize the votes</strong> needed to
        win elections and make change happen.
        <br />
        <br />
        It’s kind of like crowd-funding (GoFundMe), but for{' '}
        <strong>votes, instead of money.</strong>
      </P>
    </Wrapper>
  );
};

HowWorks.propTypes = {};

export default HowWorks;
