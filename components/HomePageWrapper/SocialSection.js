import React, { useContext } from 'react';
import styled from 'styled-components';

import Row from '../shared/Row';
import BlackButton, { InnerButton } from '../shared/buttons/BlackButton';
import Emoji from '../shared/Emoji';
import Ticker from './Ticker';

const Wrapper = styled.section``;

const TopRow = styled.div`
  margin: 30px 0;
`;

const Stat = styled.div`
  display: flex;
  align-items: flex-start;
  color: #000;
  cursor: pointer;

  &.first {
    margin-right: 16px;
  }

  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.xl}) {
    margin-bottom: 24px;

    &.first {
      margin-right: 70px;
    }
  }
`;

const Icon = styled.div`
  font-size: 40px;
  margin-right: 16px;
`;
const Count = styled.div`
  font-size: 30px;
  font-weight: 900;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.xl}) {
    font-size: 48px;
  }
`;
const Label = styled.div`
  font-size: 16px;
  font-weight: 900;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.xl}) {
    font-size: 19px;
  }
`;

const Heart = styled.div`
  margin-right: 12px;
  padding-top: 12px;
`;

const InlineBlock = styled.div`
  display: inline-block;
`;

const ButtonWrapper = styled.div`
  margin-top: 24px;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.xl}) {
    margin-top: 0;
  }
`;

const SocialSection = ({ openModalCallback, openInvolvedModalCallback }) => {
  return (
    <Wrapper>
      <TopRow>
        <InlineBlock>
          <Row style={{ alignItems: 'initial' }}>
            <Stat className="first" onClick={openModalCallback} id="homepage-goodparty-posts">
              <Icon>
                <Emoji symbol="🎉" label="Party Popper" />
              </Icon>
              <div>
                <Count data-cy="post-count">89,852</Count>
                <Label data-cy="post-count-label">#goodparty posts</Label>
              </div>
            </Stat>

            <Stat onClick={openModalCallback} id="homepage-goodparty-people">
              <Heart>
                <img
                  src="/images/heart.svg"
                  width="42"
                  height="34"
                  alt=""
                  data-cy="heart-icon"
                />
              </Heart>
              <div>
                <Count data-cy="people-count">
                  <Ticker />
                </Count>
                <Label data-cy="people-count-label">@goodparty people</Label>
              </div>
            </Stat>
          </Row>
          <ButtonWrapper>
            <BlackButton fullWidth onClick={openInvolvedModalCallback} id="get-involved-button-top">
              <InnerButton>GET INVOLVED</InnerButton>
            </BlackButton>
          </ButtonWrapper>
        </InlineBlock>
      </TopRow>
    </Wrapper>
  );
};

export default SocialSection;
