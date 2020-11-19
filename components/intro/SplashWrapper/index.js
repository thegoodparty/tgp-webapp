/**
 *
 * SplashWrapper
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';

import PageWrapper from 'components/shared/PageWrapper';

import heartImg from 'public/images/heart.svg';
import peopleImg from 'public/images/icons/people.svg';
import writeinImg from 'public/images/icons/writein.svg';

import { H1, Body14, Body12 } from 'components/shared/typogrophy';
import { NextButton } from 'components/shared/buttons';

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
    width: 24px;
    height: 19px;
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
};

function SplashWrapper() {
  return (
    <PageWrapper wrapperStyles={wrapperStyles} hideNav>
      <Centered>
        <Logo src={heartImg} />
        <H1 data-cy="title">THE GOOD PARTY</H1>
        <SubTitle data-cy="subtitle">FIXING POLITICS FOR GOOD</SubTitle>
      </Centered>
      <Card data-cy="card-item">
        <Icon src={heartImg} className="heart" data-cy="card-icon" />
        <TextWrapper>
          <SmallTitle data-cy="card-title">See Good Candidates</SmallTitle>
          <Body14 data-cy="card-text">
            See good grass-roots candidates who are challenging the Big Money
            politicians of two-party system.
          </Body14>
        </TextWrapper>
      </Card>

      <Card data-cy="card-item">
        <Icon src={peopleImg} data-cy="card-icon" />
        <TextWrapper>
          <SmallTitle data-cy="card-title">Join Voting Blocs</SmallTitle>
          <Body14 data-cy="card-text">
            Privately join candidate voting blocs to be notified if any bloc
            grows big enough to win,{' '}
            <strong>
              <i>before</i>
            </strong>{' '}
            the election.
          </Body14>
        </TextWrapper>
      </Card>

      <Card data-cy="card-item">
        <Icon src={writeinImg} data-cy="card-icon" />
        <TextWrapper>
          <SmallTitle data-cy="card-title">Never Waste Your Vote</SmallTitle>
          <Body14 data-cy="card-text">
            We only activate a candidate bloc vote, when we’ve confirmed the
            bloc has enough votes to win for sure.
          </Body14>
        </TextWrapper>
      </Card>
      <Link href="/intro/zip-finder" data-cy="start-link">
        <ButtonWrppaer>
          <NextButton active>
            <SeeHow data-cy="start-button">GET STARTED</SeeHow>
          </NextButton>
        </ButtonWrppaer>
      </Link>
    </PageWrapper>
  );
}

SplashWrapper.propTypes = {};

export default SplashWrapper;
