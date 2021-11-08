import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  max-width: ${({ theme }) => theme.breakpointsPixels.contentMax};
  margin: 24px auto 0;
  padding: 48px 0;
  background: url('https://assets.goodparty.org/homepage/campaign-bg.svg')
    center center no-repeat;
  background-size: contain;

  .hidden {
    opacity: 0;
  }
`;

const TextWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  font-size: 36px;
  font-weight: 700;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FeaturedCampaings = () => {
  return (
    <Wrapper>
      <img
        src="https://assets.goodparty.org/homepage/campaign-bg.svg"
        className="hidden"
      />
      <TextWrapper> Featured Campaings</TextWrapper>
    </Wrapper>
  );
};

FeaturedCampaings.propTypes = {};

export default FeaturedCampaings;
