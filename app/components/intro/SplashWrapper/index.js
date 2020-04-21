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
import GrayWrapper from 'components/shared/GrayWrapper';

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
  padding: '0 40px 6rem',
  minHeight: '100vh',
};

function SplashWrapper() {
  return (
    <GrayWrapper>
      <Wrapper style={wrapperStyles}>
        <Centered>
          <Logo src={heartImg} />
          <H1>THE GOOD PARTY</H1>
          <SubTitle>FIXING POLITICS FOR GOOD</SubTitle>
        </Centered>
        <Card>
          <Icon src={heartImg} className="heart" />
          <TextWrapper>
            <SmallTitle>Show Good Candidates</SmallTitle>
            <Body14>
              We find and vet, good grass-roots candidates who are challenging
              Big Money incumbents and the corrupt two-party system.
            </Body14>
          </TextWrapper>
        </Card>

        <Card>
          <Icon src={peopleImg} />
          <TextWrapper>
            <SmallTitle>Pre-Count Needed Votes</SmallTitle>
            <Body14>
              We count all the votes they need to win{' '}
              <strong>
                <i>before</i>
              </strong>{' '}
              we take any action, so we don’t waste any votes.
            </Body14>
          </TextWrapper>
        </Card>

        <Card>
          <Icon src={writeinImg} />
          <TextWrapper>
            <SmallTitle>Vote or Write-in, FTW!</SmallTitle>
            <Body14>
              Only where we have enough votes to win, we’ll help you cast your
              vote, or
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
    </GrayWrapper>
  );
}

SplashWrapper.propTypes = {};

export default SplashWrapper;
