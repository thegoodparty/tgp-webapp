import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  max-width: ${({ theme }) => theme.breakpointsPixels.contentMax};
  margin: 0 auto;
  padding-bottom: 48px;
`;
const TopSection = styled.div`
  height: 370px;
  position: relative;
  background: url('https://assets.goodparty.org/homepage/not-rep-bg.svg') bottom
    center no-repeat;
  background-size: contain;
  margin-bottom: 48px;
`;

const MixText = styled.div`
  padding-left: 80px;
  font-size: 25px;
  line-height: 38px;
  .larger {
    font-size: 30px;
    line-height: 38px;
    font-weight: 700;
  }
`;

const NotRepText = styled(MixText)`
  position: absolute;
  bottom: 10%;
  left: 80px;
  padding: 0;
`;

const Red = styled.span`
  color: ${({ theme }) => theme.colors.red};
  font-weight: 600;
`;

const Blue = styled.span`
  color: ${({ theme }) => theme.colors.blue};
  font-weight: 600;
`;

const WalkImg = styled.img`
  position: absolute;
  width: 20%;
  height: auto;
  bottom: 80px;
  right: 80px;
`;

const NotRepresented = () => {
  return (
    <Wrapper>
      <TopSection>
        <NotRepText>
          <span className="larger">130M+ of us</span> aren’t represented by{' '}
          <Red>Red</Red> or
          <Blue>Blue</Blue>
        </NotRepText>
      </TopSection>
      <MixText>
        <span className="larger">But we don’t know each other</span> (and aren’t
        organized)
      </MixText>
      <MixText style={{ marginTop: '48px' }}>
        <span className="larger">
          So we’re building free tools and a community
        </span>{' '}
        <br />
        to mobilize and vote differently
      </MixText>
      <WalkImg src="https://assets.goodparty.org/homepage/walk-social.svg" />
    </Wrapper>
  );
};

NotRepresented.propTypes = {};

export default NotRepresented;
