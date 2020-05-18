import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Hidden,
} from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import LogoCaps from 'images/logo.svg';
import { Body14, Body9 } from 'components/shared/typogrophy';
import Body from '../typography/Body';

const Wrapper = styled.div`
  position: fixed;
  height: 8rem;
  top: 0;
  left: 0;
  width: 100%;
  box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  z-index: 100;
  @media only screen and (max-width: ${({ theme }) =>
      theme.breakpoints.contentMax}) {
    height: 64px;
  }
  @media only screen and (max-width: ${({ theme }) =>
      theme.creators.breakpoints.creatorsContent}) {
    height: 88px;
  }
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
  @media only screen and (max-width: ${({ theme }) =>
      theme.breakpoints.contentMax}) {
    height: 64px;
    padding: 0 2rem;
  }
  @media only screen and (max-width: ${({ theme }) =>
      theme.creators.breakpoints.creatorsContent}) {
    height: 88px;
    padding: 0 1rem;
  }
`;

const MenuItemsWrapper = styled.div`
  display: flex;
`;

const Logo = styled.img`
  height: auto;
  cursor: pointer;
  @media only screen and (max-width: ${({ theme }) =>
      theme.breakpoints.contentMax}) {
    width: 22px;
    height: 18px;
  }
  @media only screen and (max-width: ${({ theme }) =>
      theme.creators.breakpoints.creatorsContent}) {
    width: 30px;
    height: 24px;
  }
`;

const LogoTitle = styled(Body)`
  @media only screen and (max-width: ${({ theme }) =>
      theme.breakpoints.contentMax}) {
    font-size: 1.3rem;
  }
  @media only screen and (max-width: ${({ theme }) =>
      theme.creators.breakpoints.creatorsContent}) {
    font-size: 1.5rem;
  }
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
    font: normal 600 1.5rem/1.5rem normal;
    font-family: unset;
    color: ${({ theme }) => theme.creators.colors.lightGray};
    text-transform: uppercase;
    margin-left: 2.5rem;
    &.active,
    &:hover {
      color: ${({ theme }) => theme.colors.blue};
    }
  }

  @media only screen and (max-width: ${({ theme }) =>
      theme.creators.breakpoints.creatorsContent}) {
    font-size: 1.2rem;
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
  const [menu, setMenu] = useState(false);
  return (
    <Wrapper>
      <ContentWrapper>
        <TopLink className="logo" to="/">
          <Logo src={LogoCaps} alt="logo" />
          <LogoTitle>the good party</LogoTitle>
        </TopLink>
        <MenuItemsWrapper>
          <Hidden smDown>
            <>
              <TopLink className="menu-item">About</TopLink>
              <TopLink className="menu-item active">Creators</TopLink>
              <TopLink className="menu-item">Join</TopLink>
            </>
          </Hidden>
          <Hidden mdUp>
            <TopLink className="menu-item" onClick={() => setMenu(true)}>
              <Menu />
            </TopLink>
          </Hidden>
        </MenuItemsWrapper>
        <Hidden mdUp>
          <Drawer anchor="top" open={menu} onClose={() => setMenu(false)}>
            <List>
              <ListItem button onClick={() => setMenu(false)}>
                <TopLink className="menu-item">About</TopLink>
              </ListItem>
              <ListItem button onClick={() => setMenu(false)}>
                <TopLink className="menu-item active">Creators</TopLink>
              </ListItem>
              <ListItem button onClick={() => setMenu(false)}>
                <TopLink className="menu-item">Join</TopLink>
              </ListItem>
            </List>
          </Drawer>
        </Hidden>
      </ContentWrapper>
    </Wrapper>
  );
};

CreatorsDesktopHeader.propTypes = {};

export default CreatorsDesktopHeader;
