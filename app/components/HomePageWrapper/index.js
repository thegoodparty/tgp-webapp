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

const RedBlue = styled.div`
  color: ${({ theme }) => theme.colors.gray2};
  font-size: 27px;
  line-height: 35px;
  margin-bottom: 40px;
`;

const Red = styled.span`
  color: ${({ theme }) => theme.colors.red};
  font-weight: 700;
`;

const Blue = styled.span`
  color: ${({ theme }) => theme.colors.blue};
  font-weight: 700;
`;

const Black = styled.span`
  color: #000;
  font-weight: 700;
`;

const LightGray = styled.span`
  color: #999;
  font-weight: 700;
`;

const ButtonWrapper = styled.div`
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
    <div>
      <Wrapper white style={wrapperStyles}>
        <div>
          <LoginLink>
            <Link to="/login">Login</Link>
          </LoginLink>
          <div>
            <Logo src={heartImg} />
          </div>
          <H1>99% of Congress has been corrupted by Big Money donors</H1>
          <H2>
            Imagine a free crowd- voting app that returns the{' '}
            <strong>Power to the People!</strong>
          </H2>
          <ButtonWrapper>
            <Link to="/intro/splash">
              <BlueButton variant="contained" color="primary" size="large">
                ENTER THE GOOD PARTY
              </BlueButton>
            </Link>
          </ButtonWrapper>
        </div>
      </Wrapper>
    </div>
  );
}

HomePageWrapper.propTypes = {};

export default HomePageWrapper;
