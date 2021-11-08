import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  max-width: ${({ theme }) => theme.breakpointsPixels.contentMax};
  margin: 0 auto;
  text-align: center;
`;

const Title = styled.h2`
  background-color: #3a3a48;
  padding: 24px;
  margin: -24px 0 0;
  color: #fff;
  font-size: 36px;
`;

const P = styled.p`
  font-size: 25px;
  line-height: 38px;
  max-width: 720px;
  margin: 0 auto;
  padding: 48px 12px;
`;

const HowWorks = () => {
  return (
    <Wrapper>
      <Title>How does it work?</Title>
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
