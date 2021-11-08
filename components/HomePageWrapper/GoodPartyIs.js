import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  max-width: ${({ theme }) => theme.breakpointsPixels.contentMax};
  margin: 0 auto;
  padding: 48px 0;
  background: url('https://assets.goodparty.org/homepage/win-bg.png') bottom
    center no-repeat;
  background-size: contain;

  .hidden {
    opacity: 0;
  }
`;

const TextWrapper = styled.div`
  position: absolute;
  bottom: 20%;
  left: 0;
  width: 50%;
  height: 50%;
  padding-left: 80px;
  font-size: 30px;
  line-height: 40px;

  .size26 {
    font-size: 26px;
  }
`;

const StyledH2 = styled.h2`
  margin: 0;
  font-size: 36px;
  font-weight: 700;
`;

const Red = styled.span`
  color: ${({ theme }) => theme.colors.red};
  font-weight: 600;
`;

const Blue = styled.span`
  color: ${({ theme }) => theme.colors.blue};
  font-weight: 600;
`;

const GoodPartyIs = () => {
  return (
    <Wrapper>
      <img
        className="hidden"
        src="https://assets.goodparty.org/homepage/win-bg.png"
      />
      <TextWrapper>
        <StyledH2>Good Party is...</StyledH2>
        <p>
          <strong>For people</strong>, not money 💰
          <br />
          <strong>For people</strong>, not <Red>red</Red> and <Blue>blue</Blue>
          <br />
          <strong>For people</strong>, not the machine 🤖
        </p>
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
