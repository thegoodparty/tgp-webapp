import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getInitials } from 'helpers/userHelper';
import LogoCaps from 'images/logo.svg';
import { Body14, Body9 } from 'components/shared/typogrophy';
import UserAvatar from 'components/shared/UserAvatar';
import Body from '../typography/Body';

const Wrapper = styled.div`
  position: fixed;
  height: 132px;
  top: 0;
  left: 0;
  width: 100%;
  box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  z-index: 100;
`;

const ContentWrapper = styled.div`
  max-width: ${({ theme }) => theme.creators.breakpoints.creatorsContent};
  margin: 0 auto;
  padding: 0 3rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 132px;
`;
const MenuItemsWrapper = styled.div`
  display: flex;
`;
const Logo = styled.img`
  height: auto;
  cursor: pointer;
`;

const TopLink = styled(Link)`
  cursor: pointer;
  height: 58px;
  border-bottom: solid 2px #fff;
  display: flex;
  align-items: center;

  &.logo {
    &:hover {
      border-bottom: solid 2px #fff;
    }
    img {
      margin-right: 1.2rem;
    }
  }
  &.menu-item {
    font: normal 600 1.5rem/1.5rem ${({ theme }) => theme.typography.fontFamily};
    color: ${({ theme }) => theme.creators.colors.lightGray};
    text-transform: uppercase;
    margin-left: 2.5rem;
    &.active,
    &:hover {
      color: ${({ theme }) => theme.colors.blue};
    }
  }
`;
const AvatarWrapper = styled(Body14)`
  height: 58px;
  cursor: pointer;

  &:hover,
  &.showBorder {
    border-bottom: solid 2px ${({ theme }) => theme.colors.lightBlue};
  }
`;

const CreatorsDesktopHeader = () => {
  return (
    <Wrapper>
      <ContentWrapper>
        <TopLink className="logo">
          <Logo src={LogoCaps} /> 
          <Body>the good party</Body>
        </TopLink>
        <MenuItemsWrapper>
          <TopLink className="menu-item">About</TopLink>
          <TopLink className="menu-item active">Creators</TopLink>
          <TopLink className="menu-item">Join</TopLink>
        </MenuItemsWrapper>
      </ContentWrapper>
    </Wrapper>
  );
};

CreatorsDesktopHeader.propTypes = {};

export default CreatorsDesktopHeader;
