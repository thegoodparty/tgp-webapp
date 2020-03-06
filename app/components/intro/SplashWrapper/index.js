/**
 *
 * SplashWrapper
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Wrapper from 'components/shared/Wrapper';

import heartImg from 'images/heart.svg';
import peopleImg from 'images/icons/people.svg';
import writeinImg from 'images/icons/writein.svg';

import { H1, Body14, Body12 } from 'components/shared/typogrophy';
import { NextButton } from 'components/shared/buttons';

const GrayPage = styled.div`
  background-color: ${({ theme }) => theme.colors.grayBg};
`;

const Logo = styled.img`
  width: 63px;
  height: auto;
  margin-top: 20px;
`;

const Centered = styled.div`
  text-align: center;
  width: 100%;
`;

const SubTitle = styled.div`
  font-size: 18px;
  line-height: 26px;
  color: ${({ theme }) => theme.colors.gray6};
  margin-top: 4px;
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 22px;
    line-height: 28px;
  }
`;

const Card = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 20px;
`;

const Icon = styled.img`
  width: 23px;
  height: 23px;
  margin-right: 18px;
  align-self: center;
  &.heart {
    width: 23px;
    height: 21px;
  }
`;

const TextWrapper = styled.div`
  flex-grow: 1;
`;

const SmallTitle = styled.div`
  font-size: 19px;
  line-height: 30px;
  font-weight: 500;
  letter-spacing: 0.5px;
  color: ${({ theme }) => theme.colors.gray4};

  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 24px;
    line-height: 34px;
  }
`;

const ButtonWrppaer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const SeeHow = styled(Body12)`
  color: ${({ theme }) => theme.colors.blue};
  font-weight: 500;
`;

const wrapperStyles = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
  padding: '0 26px 4rem 12px',
};

function SplashWrapper() {
  return (
    <GrayPage>
      <Wrapper style={wrapperStyles}>
        <Centered>
          <Logo src={heartImg} />
          <H1>THE GOOD PARTY</H1>
          <SubTitle>WRITE-IN, FOR THE WIN!</SubTitle>
        </Centered>
        <Card>
          <Icon src={peopleImg} />
          <TextWrapper>
            <SmallTitle>Pre-organize Support</SmallTitle>
            <Body14>
              We count all the votes we need to win{' '}
              <i>
                <strong>before</strong>
              </i>{' '}
              we take any action, so no wasted energy or votes!
            </Body14>
          </TextWrapper>
        </Card>

        <Card>
          <Icon src={heartImg} className="heart" />
          <TextWrapper>
            <SmallTitle>Choose a Good Candidate</SmallTitle>
            <Body14>
              We find and vet, good indy and citizen candidates who have not
              been corrupted by big money.
            </Body14>
          </TextWrapper>
        </Card>

        <Card>
          <Icon src={writeinImg} />
          <TextWrapper>
            <SmallTitle>Write-in, for the Win!</SmallTitle>
            <Body14>
              Only where we have enough support to win, we flash mob to vote and{' '}
              <i>write-in, for the win!</i>
            </Body14>
          </TextWrapper>
        </Card>
        <Link to="/intro/three-steps">
          <ButtonWrppaer>
            <NextButton active>
              <SeeHow>SEE HOW</SeeHow>
            </NextButton>
          </ButtonWrppaer>
        </Link>
      </Wrapper>
    </GrayPage>
  );
}

SplashWrapper.propTypes = {};

export default SplashWrapper;
