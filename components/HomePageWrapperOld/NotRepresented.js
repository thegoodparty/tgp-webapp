import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  max-width: ${({ theme }) => theme.breakpointsPixels.contentMax};
  margin: 0 auto;
  padding-bottom: 48px;
`;
const TopSection = styled.div`
  min-height: 300px;
  position: relative;
  background: url('/images/homepage/crowd.svg') bottom center no-repeat;
  background-size: contain;
  margin-bottom: 48px;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    height: 370px;
    background: url('/images/homepage/not-rep-bg.svg') bottom center no-repeat;
    background-size: contain;
  }
`;

const MixText = styled.div`
  font-size: 20px;
  line-height: 28px;
  padding: 20px;
  text-align: center;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    font-size: 25px;
    line-height: 38px;
    padding: 0 0 0 80px;
    text-align: left;
  }
  .larger {
    font-size: 30px;
    line-height: 38px;
    font-weight: 700;
  }

  .mobile-break {
    display: block;
    @media only screen and (min-width: ${({ theme }) =>
        theme.breakpointsPixels.lg}) {
      display: inline;
    }
  }
`;

const NotRepText = styled(MixText)`
  padding: 0;
  margin-top: 32px;
  text-align: center;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    position: absolute;
    bottom: 10%;
    left: 80px;
    margin-top: 0;
    text-align: left;
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

const WalkSection = styled.div`
  display: flex;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    display: block;
  }
`;

const WalkImg = styled.img`
  width: 50%;
  height: auto;
  max-width: 280px;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    position: absolute;
    width: 20%;
    height: auto;
    bottom: 80px;
    right: 80px;
    max-width: unset;
  }
`;

const NotRepresented = () => {
  return (
    <Wrapper>
      <TopSection>
        <NotRepText>
          <span className="larger mobile-break">130M+ of us</span> don’t feel
          represented by <Red>Red</Red> or <Blue>Blue</Blue>
        </NotRepText>
      </TopSection>
      <MixText>
        <span className="larger mobile-break">
          But we don’t know each other
        </span>{' '}
        (and aren’t organized, <i>yet!</i>)
      </MixText>
      <WalkSection>
        <MixText style={{ marginTop: '48px' }}>
          <span className="larger">
            So we’re building free tools and a community
          </span>{' '}
          <br />
          to mobilize and vote differently
        </MixText>
        <WalkImg src="/images/homepage/walk-social.png" />
      </WalkSection>
    </Wrapper>
  );
};

NotRepresented.propTypes = {};

export default NotRepresented;
