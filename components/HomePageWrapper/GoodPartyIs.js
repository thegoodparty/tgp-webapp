import React from 'react';
import styled from 'styled-components';
import Hidden from '@material-ui/core/Hidden';

const Wrapper = styled.div`
  position: relative;
  max-width: ${({ theme }) => theme.breakpointsPixels.contentMax};
  margin: 0 auto;
  padding: 48px 0;

  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    background: url('https://assets.goodparty.org/homepage/win-bg.png') bottom
      center no-repeat;
    background-size: contain;
  }
`;

const Img = styled.img`
  max-width: 500px;
  display: block;
  margin: 0 auto;
`;

const TextWrapper = styled.div`
  text-align: center;
  margin-top: 24px;
  font-size: 22px;
  line-height: 32px;
  padding: 0 8px;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    text-align: left;
    margin-top: 0;
    position: absolute;
    bottom: 20%;
    left: 0;
    width: 50%;
    height: 50%;
    padding: 0 0 0 80px;
    font-size: 30px;
    line-height: 40px;
  }

  .size26 {
    font-size: 20px;
    @media only screen and (min-width: ${({ theme }) =>
        theme.breakpointsPixels.lg}) {
      font-size: 26px;
    }
  }
`;

const StyledH2 = styled.h2`
  margin: 0;
  font-size: 22px;
  font-weight: 700;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    font-size: 36px;
  }
`;

const Red = styled.span`
  color: ${({ theme }) => theme.colors.red};
  font-weight: 600;
`;

const Blue = styled.span`
  color: ${({ theme }) => theme.colors.blue};
  font-weight: 600;
`;

const Heart = styled.img`
  width: 60px;
  height: auto;
`;

const GoodPartyIs = () => {
  return (
    <Wrapper>
      <Hidden mdDown>
        <img
          className="full-image"
          src="https://assets.goodparty.org/homepage/win-bg.png"
          data-cy="gp-bg"
        />
      </Hidden>
      <Hidden lgUp>
        <Img className="full-image" src="/images/homepage/win-small.png" data-cy="gp-small-bg"/>
      </Hidden>
      <TextWrapper data-cy="gp-title">
        <StyledH2>Good Party is...</StyledH2>
        <p>
          <strong>For people</strong>, not money 💰
          <br />
          <strong>For people</strong>, not <Red>red</Red> and <Blue>blue</Blue>
          <br />
          <strong>For people</strong>, not the machine 🤖
        </p>
        <Hidden lgUp>
          <Heart src="/images/heart.svg" />
        </Hidden>
        <p className="size26">
          Good Party is for 130 million people across the political spectrum who
          want a <strong>real democracy!</strong>
        </p>
      </TextWrapper>
    </Wrapper>
  );
};

GoodPartyIs.propTypes = {};

export default GoodPartyIs;
