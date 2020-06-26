/**
 *
 * HomePageWrapper
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

import heartImg from 'images/heart.svg';
import Wrapper from 'components/shared/Wrapper';
import { Body13, H2 } from 'components/shared/typogrophy';

const Logo = styled.img`
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
    <div style={{ backgroundColor: '#FFF' }}>
      <Wrapper white style={wrapperStyles} noHeader>
        <div>
          <LoginLink>
            <Link to="?register=true" data-cy="register">
              Sign-Up
            </Link>
            &nbsp;&nbsp;|&nbsp;&nbsp;
            <Link to="/login" data-cy="login">
              Login
            </Link>
          </LoginLink>
          <div>
            <Logo src={heartImg} />
          </div>
          <H1 data-cy="title">

          </H1>
          <StyledH2 data-cy="subtitle">
            Imagine a simple new way to organize and vote, to replace every bad
            politician with someone <strong>Good!</strong>
          </StyledH2>
          <ButtonWrapper>
            <Link to="/intro/splash" data-cy="enter-link">
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
      </Wrapper>
    </div>
  );
}

// HomePageWrapper.propTypes = {};

export default HomePageWrapper;
