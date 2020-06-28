import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import PageWrapper from 'components/shared/PageWrapper';
import Wrapper from 'components/shared/Wrapper';
import MobileHeader from 'components/shared/navigation/MobileHeader';
import Nav from 'containers/shared/Nav';
import { H3 } from 'components/shared/typogrophy/index';
import OutlinedButton from 'components/shared/buttons/OutlinedButton';
import CapitalImage from 'images/capital.svg';
import TopQuestions from 'components/shared/TopQuestions';
import { AmaContainer } from 'containers/shared/AmaContainer';

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
  padding: 16px;
  color: ${({ theme }) => theme.colors.blue};
  cursor: pointer;
  text-align: right;
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

const YouWrapper = ({ articles }) => (
  <PageWrapper white>
    <Login>
      <Link to="?register=true">Sign-Up</Link>&nbsp;&nbsp;|&nbsp;&nbsp;
      <Link to="login">Login</Link>
    </Login>
    <InnerWrapper>
      <Img src={CapitalImage} alt="Capital" aria-label="Capital" />
      <H3Title>Create a profile and get counted!</H3Title>
      <H3Body>
        First we count the people needed for a good indy candidate to win, then
        we all vote to get them in.
      </H3Body>
      <ButtonWrapper to="?register=true">
        <OutlinedButton active fullWidth>
          COUNT ME IN!
        </OutlinedButton>
      </ButtonWrapper>
    </InnerWrapper>
    <TopQuestions articles={articles} />
    <AmaContainer />
  </PageWrapper>
);

YouWrapper.propTypes = {
  articles: PropTypes.array,
};

export default YouWrapper;
