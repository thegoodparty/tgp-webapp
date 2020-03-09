import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Wrapper from 'components/shared/Wrapper';
import MobileHeader from 'components/shared/navigation/MobileHeader';
import Nav from 'containers/Nav';
import { H3 } from 'components/shared/typogrophy/index';
import OutlinedButton from 'components/shared/buttons/OutlinedButton';
import CapitalImage from 'images/capital.svg';

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  min-height: calc(100vh);
  min-height: calc(var(--vh, 1vh) * 100 - 150px);
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    justify-content: flex-start;
    min-height: auto;
  }
`;

const Login = styled.div`
  position: absolute;
  top: 40px;
  right: 0;
  padding: 16px;
  color: ${({ theme }) => theme.colors.blue};
  cursor: pointer;

  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    position: static;
    text-align: right;
    width: 100%;
    margin-top: -20px;
  }
`;

const Img = styled.img`
  width: calc(100% - 100px);
  max-width: 350px;
  height: auto;
`;

const H3Title = styled(H3)`
  text-align: center;
  margin-top: 26px;
`;

const H3Body = styled(H3)`
  text-align: center;
  margin-top: 16px;
  font-weight: 400;
`;

const ButtonWrapper = styled(Link)`
  margin: 24px 0;
  width: 100%;
`;

const YouWrapper = () => (
  <div>
    <Nav />
    <Wrapper white>
      <MobileHeader />
      <InnerWrapper>
        <Login>
          <Link to="login">Login</Link>
        </Login>
        <Img src={CapitalImage} alt="Capital" aria-label="Capital" />
        <H3Title>Create a profile and get counted!</H3Title>
        <H3Body>
          First we count the people needed for a good indy candidate to win,
          then we all vote to get them in.
        </H3Body>
        <ButtonWrapper to="/you/register">
          <OutlinedButton active fullWidth>
            COUNT ME IN!
          </OutlinedButton>
        </ButtonWrapper>
      </InnerWrapper>
    </Wrapper>
  </div>
);

export default YouWrapper;
