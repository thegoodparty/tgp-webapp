import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Hidden from '@material-ui/core/Hidden';
import Menu from '@material-ui/icons/Menu';
import Link from 'next/link';
import styled from 'styled-components';
import LogoCaps from 'public/images/logo-caps.svg';
import { Body14 } from 'components/shared/typogrophy';
import { deleteSignupRedirectCookie } from 'helpers/cookieHelper';
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
      theme.creators.breakpoints.creatorsTablet}) {
    height: 88px;
  }
  @media only screen and (max-width: ${({ theme }) =>
      theme.creators.breakpoints.creatorsMobile}) {
    height: 64px;
  }
`;

const ContentWrapper = styled.div`
  margin: 0 auto;
  padding: 0 3rem 0 1.5rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 132px;

  @media only screen and (max-width: ${({ theme }) =>
      theme.creators.breakpoints.creatorsTablet}) {
    height: 88px;
    padding: 0 2rem 0 0.5rem;
  }
  @media only screen and (max-width: ${({ theme }) =>
      theme.creators.breakpoints.creatorsMobile}) {
    height: 64px;
    padding: 0 1rem;
  }
`;

const MenuItemsWrapper = styled.div`
  &.desktop {
    display: none;
  }
  &.mobile {
    display: flex;
  }
  @media only screen and (min-width: ${({ theme }) =>
      theme.creators.breakpoints.creatorsTabletValue - 250}px) {
    &.desktop {
      display: flex;
    }
    &.mobile {
      display: none;
    }
  }
`;

const Logo = styled.img`
  height: auto;
  cursor: pointer;
  width: 343px;
  height: 32px;
  @media only screen and (max-width: ${({ theme }) =>
      theme.creators.breakpoints.creatorsTablet}) {
    width: 343px;
    height: 32px;
  }
  @media only screen and (max-width: ${({ theme }) =>
      theme.creators.breakpoints.creatorsMobile}) {
    width: 220px;
    height: 24px;
  }
`;

const LogoTitle = styled(Body)`
  @media only screen and (max-width: ${({ theme }) =>
      theme.creators.breakpoints.creatorsMobile}) {
    font-size: 1.3rem;
  }
  @media only screen and (max-width: ${({ theme }) =>
      theme.creators.breakpoints.creatorsTablet}) {
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
    font: normal 600 24px normal;
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
      theme.creators.breakpoints.creatorsTablet}) {
    &.menu-item {
      font-size: 20px;
      margin-left: 1.5rem;
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

const CreatorsDesktopHeader = ({ toggleJoin, user }) => {
  const [menu, setMenu] = useState(false);
  const onClickJoin = () => {
    setMenu(false);
    if (!user) {
      toggleJoin(true);
    }
    deleteSignupRedirectCookie();
  };
  return (
    <Wrapper>
      <ContentWrapper>
        <TopLink className="logo" href="/">
          <Logo src={LogoCaps} alt="logo" />
        </TopLink>
        <MenuItemsWrapper className="desktop">
          <TopLink className="menu-item active">Creators</TopLink>
          {user ? (
            <TopLink
              className="menu-item"
              href="/you"
              onClick={deleteSignupRedirectCookie}
            >
              You
            </TopLink>
          ) : (
            <TopLink className="menu-item" onClick={onClickJoin}>
              Join
            </TopLink>
          )}
        </MenuItemsWrapper>
        <MenuItemsWrapper className="mobile">
          <TopLink className="menu-item" onClick={() => setMenu(true)}>
            <Menu />
          </TopLink>
        </MenuItemsWrapper>

        <Hidden smUp>
          <Drawer anchor="top" open={menu} onClose={() => setMenu(false)}>
            <List>
              {/* <ListItem button onClick={() => setMenu(false)}>
                <TopLink className="menu-item">About</TopLink>
              </ListItem> */}
              <ListItem button onClick={() => setMenu(false)}>
                <TopLink className="menu-item active">Creators</TopLink>
              </ListItem>
              {user ? (
                <ListItem button>
                  <TopLink className="menu-item" href="/you">
                    You
                  </TopLink>
                </ListItem>
              ) : (
                <ListItem button onClick={onClickJoin}>
                  <TopLink className="menu-item">Join</TopLink>
                </ListItem>
              )}
            </List>
          </Drawer>
        </Hidden>
      </ContentWrapper>
    </Wrapper>
  );
};

CreatorsDesktopHeader.propTypes = {
  user: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  toggleJoin: PropTypes.func,
};

export default CreatorsDesktopHeader;
