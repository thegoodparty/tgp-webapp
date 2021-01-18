import React, { useState } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import Hidden from '@material-ui/core/Hidden';
import MenuItem from '@material-ui/core/MenuItem';
import Drawer from '@material-ui/core/Drawer';
import styled from 'styled-components';
import { connect } from 'react-redux';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import RegisterBannerContainer from 'containers/shared/RegisterBannerContainer';
import UserAvatar from '../UserAvatar';

import { Body9, Body14 } from '../typogrophy';

const Wrapper = styled.div`
  padding: 20px 18px;
  padding-bottom: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.img`
  height: 10px;
  height: auto;
  align-self: center;
  justify-self: center;
`;

const AuthButtonWrapper = styled.div`
  && {
    display: flex;
    padding: 10px 0px;
    &.auth-button {
      justify-content: space-around;
    }
  }
`;
const MenuIconButton = styled(MenuIcon)`
  && {
    color: ${({ theme }) => theme.colors.purple};
    font-size: 2rem;
  }
`;
const CloseIconButton = styled(CloseIcon)`
  && {
    color: ${({ theme }) => theme.colors.purple};
    font-size: 2rem;
  }
`;
const TopLink = styled(Body9)`
  cursor: pointer;
  font-size: 12px;
  border-bottom: solid 2px #fff;
  margin-left: 1rem;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.purple};
  &.menu-items {
    font-size: 1rem;
    padding-top: 20px;
    padding-bottom: 20px;
  }
  &.button {
    color: white;
    padding: 15px 20px;
    border-radius: 20px;
    background: linear-gradient(
        103.63deg,
        rgba(255, 15, 19, 0.15) -3.51%,
        rgba(191, 0, 32, 0) 94.72%
      ),
      linear-gradient(
        257.82deg,
        rgba(67, 0, 211, 0.25) -11.17%,
        rgba(67, 0, 211, 0) 96.34%
      ),
      linear-gradient(0deg, #5c00c7, #5c00c7), #117cb6;
  }
  &.button:hover {
    border-bottom: solid 2px #fff;
  }
`;
const MenuItemWrapper = styled(Drawer)`
  && {
    inset: auto !important;
    .MuiBackdrop-root {
      display: none;
    }
    .MuiDrawer-paper {
      top: 70px;
    }
  }
`;
const AvatarWrapper = styled(Body14)`
  height: 58px;
  cursor: pointer;
  display: flex;
  margin-left: 2rem;
`;

const LinkContainer = styled.div`
  display: flex;
`;
function MobileHeader({ user, navigateCallback }) {
  const [open, setOpen] = useState(false);
  const handleNavigate = screen => {
    navigateCallback(screen, user);
  };
  return (
    <Hidden mdUp>
      <Wrapper>
        <Link href="/home" className="text-center">
          <Logo
            src="/images/new-logo.svg"
            alt="The Good Party"
            data-cy="logo"
          />
        </Link>
        <LinkContainer>
          {!(user && user.name) && !open && (
            <TopLink
              onClick={() => handleNavigate('/you?register=true')}
              data-cy="you"
              className="button"
            >
              SIGN UP
            </TopLink>
          )}
          <TopLink data-cy="you">
            {open ? (
              <CloseIconButton onClick={() => setOpen(false)} />
            ) : (
              <MenuIconButton onClick={() => setOpen(true)} />
            )}
          </TopLink>
        </LinkContainer>
      </Wrapper>
      <MenuItemWrapper
        transitionDuration={{ appear: 0, enter: 0, exit: 0 }}
        anchor="top"
        open={open}
        onClose={() => setOpen(false)}
      >
        <MenuItem>
          <TopLink
            onClick={() => handleNavigate('/party')}
            data-cy="party"
            className="menu-items"
          >
            CANDIDATES
          </TopLink>
        </MenuItem>
        <MenuItem>
          <TopLink
            onClick={() => handleNavigate('/party')}
            data-cy="party"
            className="menu-items"
          >
            ABOUT
          </TopLink>
        </MenuItem>
        <AuthButtonWrapper className={!(user && user.name) && 'auth-button'}>
          {user && user.name ? (
            <MenuItem style={{ width: '100%' }}>
              <AvatarWrapper
                onClick={() => handleNavigate('/you')}
                style={{ marginLeft: 20 }}
              >
                <UserAvatar
                  user={user}
                  onClick={() => handleNavigate('/you')}
                />
                <TopLink className="menu-items">{user.name}</TopLink>
              </AvatarWrapper>
            </MenuItem>
          ) : (
            <>
              <TopLink
                onClick={() => handleNavigate('/you?register=true')}
                data-cy="you"
                className="button menu-items"
              >
                SIGN UP
              </TopLink>
              <TopLink
                onClick={() => handleNavigate('/login')}
                data-cy="you"
                className="button menu-items"
              >
                LOG IN
              </TopLink>
            </>
          )}
        </AuthButtonWrapper>
      </MenuItemWrapper>

      <RegisterBannerContainer />
    </Hidden>
  );
}

MobileHeader.propTypes = {
  user: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  navigateCallback: PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(
  null,
  mapDispatchToProps,
)(MobileHeader);
