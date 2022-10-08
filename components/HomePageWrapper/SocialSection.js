import React, { useContext } from 'react';
import styled from 'styled-components';

import Row from '../shared/Row';
import Ticker from './Ticker';
import { HomePageContext } from '../../containers/HomePage';

const Wrapper = styled.section`
  margin: 0 0 20px;
  @media only screen and (min-width: ${({ theme }) =>
  theme.breakpointsPixels.lg}) {
   margin: 100px 0 20px;
  }
`;



const Count = styled.div`
  font-size: 30px;
  font-weight: 900;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    font-size: 42px;
  }
`;
const Label = styled.div`
  margin-left: 28px;
  font-size: 16px;
  font-weight: 900;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    font-size: 30px;
  }
`;

const Heart = styled.div`
  margin-right: 12px;
  padding-top: 12px;
`;

const SocialSection = () => {
  const { totalFollowers } = useContext(HomePageContext);
  return (
    <Wrapper>
      <Row>
        <Heart>
          <img
            src="/images/heart.svg"
            width="42"
            height="34"
            alt="good party"
            data-cy="heart-icon"
          />
        </Heart>
        <Count data-cy="people-count">
          <Ticker initTotal={totalFollowers} cookieName="ticker-people" />
        </Count>
        <Label data-cy="people-count-label">@goodparty people</Label>
      </Row>
    </Wrapper>
  );
};

export default SocialSection;
