import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { BsChevronDown } from 'react-icons/bs';
import Grow from '@material-ui/core/Grow';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MenuList from '@material-ui/core/MenuList';

import styled from 'styled-components';
import { Body14 } from '../typogrophy';
import UserAvatar from '../UserAvatar';

const Wrapper = styled.div`
  height: 60px;
  width: 100%;
  box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  z-index: 100;
`;

const ContentWrapper = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 60px;
`;

const Works = styled.div`
  font-size: 16px;
  letter-spacing: 0.2px;
  color: ${({ theme }) => theme.colors.purple};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  span {
    margin-right: 10px;
  }
`;

const Share = styled.div`
  font-size: 16px;
  letter-spacing: 0.2px;
  color: ${({ theme }) => theme.colors.purple};
  padding: 10px 22px;
  height: 44px;
  margin-top: 8px;
  border: solid 2px ${({ theme }) => theme.colors.purple};
  display: flex;
  border-radius: 8px;
  font-weight: 600;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  img {
    height: 20px;
    width: auto;
    margin-right: 8px;
  }
  transition: box-shadow 0.3s;
  &:hover {
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
  }
`;

const ShareWrapper = styled.div`
  display: flex;
`;

const Logo = styled.img`
  height: 20px;
  width: auto;
`;

const AvatarWrapper = styled(Body14)`
  height: 60px;
  cursor: pointer;
  margin-left: 12px;
`;

const StyledMenuItem = styled(MenuItem)`
  && {
    color: ${({ theme }) => theme.colors.purple};
    font-size: 16px;
    padding-top: 12px;
    padding-bottom: 12px;
  }
`;

const DesktopHeader = ({ user }) => {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <Wrapper>
      <ContentWrapper>
        <div>
          <Works
            ref={anchorRef}
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
          >
            <span>HOW THIS WORKS</span>
            <BsChevronDown size={14} />
          </Works>
          <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            transition
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === 'bottom' ? 'center top' : 'center bottom',
                }}
              >
                <Paper style={{ marginTop: '10px' }}>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList
                      autoFocusItem={open}
                      id="menu-list-grow"
                      onKeyDown={handleListKeyDown}
                    >
                      <StyledMenuItem onClick={handleClose}>
                        How crowd-voting works
                      </StyledMenuItem>
                      <StyledMenuItem onClick={handleClose}>
                        About Good Party
                      </StyledMenuItem>
                      <StyledMenuItem onClick={handleClose}>
                        Candidates
                      </StyledMenuItem>
                      <StyledMenuItem onClick={handleClose}>
                        FAQs
                      </StyledMenuItem>
                      <StyledMenuItem onClick={handleClose}>
                        Sign up / Login
                      </StyledMenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
        <Link href="/" passHref>
          <a>
            <Logo src="/images/new-logo.svg" data-cy="logo" />
          </a>
        </Link>
        <ShareWrapper>
          <Share>
            <Logo src="/images/icons/share-icon.svg" alt="Good Party" />
            <span>SHARE</span>
          </Share>
          {user?.name && (
            <Link href="/you" passHref>
              <a>
                <AvatarWrapper>
                  <UserAvatar user={user} />
                </AvatarWrapper>
              </a>
            </Link>
          )}
        </ShareWrapper>
      </ContentWrapper>
    </Wrapper>
  );
};

DesktopHeader.propTypes = {
  user: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  navigateCallback: PropTypes.func,
};

export default DesktopHeader;
