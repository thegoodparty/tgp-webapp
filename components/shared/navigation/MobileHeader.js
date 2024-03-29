import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import RegisterBannerContainer from '/containers/shared/RegisterBannerContainer';
import { logEvent } from '/services/AnalyticsService';
import Hamburger from 'hamburger-react';

import UserAvatar from '../UserAvatar';
import { HEADER_LINKS } from './constants';
import { SmOnly } from './NavWrapper';

const Wrapper = styled.div`
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 64px;
  height: 64px;
  z-index: 100;
  border-radius: 50%;
  display: flex;
  align-items: center;
  box-shadow: 0 0 24px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  justify-content: center;

  @keyframes growDown {
    0% {
      transform: scaleY(0);
    }
    80% {
      transform: scaleY(1.1);
    }
    100% {
      transform: scaleY(1);
    }
  }
`;

const Logo = styled.img`
  height: 18px;
  align-self: center;
  justify-self: center;
`;
const MenuWrapper = styled.div`
  position: fixed;
  bottom: 110px;
  right: 30px;
  padding: 30px;
  background-color: #fff;
  text-align: center;
  z-index: 2000;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  perspective: 1000px;
  display: none;
  animation: growDown 300ms ease-in-out forwards;
  transform-origin: bottom center;
  &.open {
    display: block;
  }
`;

const TopLink = styled.div`
  margin-top: 28px;

  &.active {
    font-weight: 900;
  }
`;

const PushAvatarWrapper = styled.div`
  margin-top: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  &.active {
    font-weight: 900;
  }
`;

function MobileHeader({ user }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const path = router.asPath;

  return (
    <SmOnly>
      <Wrapper>
        <Hamburger
          toggled={open}
          toggle={setOpen}
          size={26}
          color="#747779"
          rounded
          label="Show menu"
        />
      </Wrapper>
      <MenuWrapper className={open && 'open'}>
        <Link href="/" className="text-center" passHref>
          <a id="mobile-nav-logo">
            <Logo
              src="/images/black-logo.svg"
              alt="The Good Party"
              data-cy="logo"
            />
          </a>
        </Link>
        <TopLink className={path === '/' && 'active'}>
          <Link href="/" passHref>
            <a id="mobile-nav-home">Home</a>
          </Link>
        </TopLink>
        {HEADER_LINKS.map((link) => (
          <TopLink key={link.href} className={path === link.href && 'active'}>
            <Link href={link.href} passHref>
              <a id={`mobile-nav-${link.label.replace(' ', '-')}`}>
                {link.label}
              </a>
            </Link>
          </TopLink>
        ))}
        {user?.name ? (
          <Link href="/profile" passHref>
            <a style={{ width: '100%' }} id="mobile-nav-profile">
              <PushAvatarWrapper className={path === '/profile' && 'active'}>
                <UserAvatar user={user} />
                <div style={{ marginLeft: 6 }}>{user.name}</div>
              </PushAvatarWrapper>
            </a>
          </Link>
        ) : (
          <TopLink>
            <Link
              href="/register"
              passHref
              className={path === '/register' && 'active'}
            >
              <a id="mobile-nav-register">Sign Up</a>
            </Link>
          </TopLink>
        )}
        {user?.isAdmin && (
          <div style={{ marginTop: '12px' }}>
            <Link href="/admin" className="text-center" passHref>
              <a>Admin</a>
            </Link>
          </div>
        )}
      </MenuWrapper>

      <RegisterBannerContainer />
    </SmOnly>
  );
}

MobileHeader.propTypes = {
  user: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(null, mapDispatchToProps)(MobileHeader);
