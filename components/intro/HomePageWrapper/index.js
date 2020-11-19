/**
 *
 * HomePageWrapper
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';
import Button from '@material-ui/core/Button';
import Image from 'next/image';

import PageWrapper from 'components/shared/PageWrapper';
import { Body13, H2 } from 'components/shared/typogrophy';

const Logo = styled(Image)`
  width: 63px;
  height: auto;
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 100px;
    height: auto;
  }
`;

const LoginLink = styled(Body13)`
  text-align: right;
  padding: 1rem;
  color: ${({ theme }) => theme.colors.blue};
`;

const H1 = styled.h1`
  color: ${({ theme }) => theme.colors.gray2};
  font-weight: 700;
  font-size: 33px;
  line-height: 43px;
  margin: 24px 0;
`;

const StyledH2 = styled(H2)`
  font-weight: 400;
`;

const ButtonWrapper = styled.div`
  margin-top: 2rem;
  text-align: center;
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-bottom: 2rem;
  }
`;

const BlueButton = styled(Button)`
  && {
    margin-bottom: 24px;
    border-radius: 30px;
    padding: 16px 60px;
    font-family: ${({ theme }) => theme.typography.fontFamily};
    letter-spacing: '0.2px';
  }
`;
const wrapperStyles = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
};
function HomePageWrapper() {
  return (
    <PageWrapper white wrapperStyles={wrapperStyles} hideNav>
      <div>
        <LoginLink>
          <Link href="?register=true" data-cy="register">
            Sign-Up
          </Link>
          &nbsp;&nbsp;|&nbsp;&nbsp;
          <Link href="/login" data-cy="login">
            Login
          </Link>
        </LoginLink>
        <div>
          <Logo src="images/heart.svg" />
        </div>
        <H1 data-cy="title">
          Power and Money have corrupted <u>both</u> major political parties
        </H1>
        <StyledH2 data-cy="subtitle">
          Imagine a simple new way to organize and vote, to replace bad career
          politicians with someone new and <strong>Good!</strong>
        </StyledH2>
        <ButtonWrapper>
          <Link href="/intro/splash" data-cy="enter-link">
            <BlueButton
              variant="contained"
              color="primary"
              size="large"
              data-cy="enter-button"
            >
              ENTER THE GOOD PARTY
            </BlueButton>
          </Link>
        </ButtonWrapper>
      </div>
    </PageWrapper>
  );
}

// HomePageWrapper.propTypes = {};

export default HomePageWrapper;
