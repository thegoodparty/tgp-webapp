import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

import { PurpleButton } from '../shared/buttons';

const Wrapper = styled.div`
  position: relative;
  max-width: ${({ theme }) => theme.breakpointsPixels.contentMax};
  margin: 24px auto 0;
  background: url('/images/homepage/homepage-footer.png') bottom center
    no-repeat;
  background-size: contain;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    margin-top: 0;
  }
`;

const TextWrapper = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 70%;
  height: 100%;
  display: flex;
  padding: 12px;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    width: 100%;
  }
`;

const Title = styled.h3`
  font-size: 22px;
  font-weight: 700;
  margin: 0;

  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    font-size: 36px;
  }
`;

const Subtitle = styled.div`
  font-size: 20px;
  margin: 16px 0;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    font-size: 26px;
  }
`;

const InnerButton = styled.div`
  padding: 0 24px;
`;

const Img = styled.div`
  position: absolute;
  top: 0;
  right: 5%;
  width: 25%;
  height: 100%;
  background: url('/images/homepage/girl-comp.svg') center center no-repeat;
  background-size: contain;
  border: 0;

  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    width: 20%;
  }
`;

const StayTuned = () => {
  return (
    <Wrapper>
      <img src="/images/homepage/homepage-footer.png" className="full-image" />
      <TextWrapper>
        <Title>You made it this far!</Title>
        <Subtitle>Want to stay tuned?</Subtitle>
        <Link href="/register" passHref>
          <a>
            <PurpleButton className="outline">
              <InnerButton>Stay in the loop</InnerButton>
            </PurpleButton>
          </a>
        </Link>
        <br />
        &nbsp;
      </TextWrapper>
      <Img />
    </Wrapper>
  );
};

StayTuned.propTypes = {};

export default StayTuned;
