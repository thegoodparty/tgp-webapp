import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Link as ScrollLink } from 'react-scroll';

import styled from 'styled-components';

import { logEvent } from '/services/AnalyticsService';
import UserAvatar from '../UserAvatar';

import AdminMenu from '../../admin/AdminMenu';
import { HEADER_LINKS } from './constants';

const Wrapper = styled.header`
  height: 80px;
  width: 100%;
  border-bottom: solid 1px #e1e2e9;
  background-color: #fff;
  z-index: 100;
  padding: 0 24px;
  box-shadow: 0 0 8px 3px rgba(0, 0, 0, 0.1);

  position: fixed;
  top: 0;
`;

const Padder = styled.div`
  height: 80px;
`;

const ContentWrapper = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 80px;
`;

const A = styled.a`
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const AvatarWrapper = styled.div`
  cursor: pointer;
  margin-left: 16px;
`;

const RightLinks = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const TopLink = styled.div`
  margin: 0 12px;
  padding: 0 4px;
  cursor: pointer;
  a {
    color: #000;
  }
`;

const DesktopHeader = ({ user, trackShareCallback = () => {} }) => {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const router = useRouter();

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const candidateRoute = router.pathname === '/candidate/[...NameIdTab]';
  let id = false;
  if (
    candidateRoute &&
    router.query['NameIdTab'] &&
    router.query['NameIdTab'].length >= 2
  ) {
    id = router.query['NameIdTab'][1];
  }

  // const handleShare = () => {
  //   // if we are on the candidate page, track the share
  //   if (router.pathname === '/candidate/[...NameIdTab]') {
  //     trackShareCallback(
  //       router.components['/candidate/[...NameIdTab]']?.props?.pageProps
  //         ?.ssrState?.id,
  //     );
  //   }
  //   router.query.share = 'true';
  //   router.push(router);
  //
  //   logEvent('Share', 'top_nav_share', 'Top Nav');
  // };
  return (
    <>
      <Wrapper>
        <ContentWrapper>
          <Link
            href="/"
            passHref
            onClick={() => {
              logEvent('Link', 'Logo', 'Top Nav');
            }}
          >
            <a id="desktop-nav-logo">
              <Image
                src="/images/black-logo.svg"
                data-cy="logo"
                width={174}
                height={20}
                alt="GOOD PARTY"
              />
            </a>
          </Link>
          <RightLinks>
            {HEADER_LINKS.map((link) => (
              <TopLink key={link.href} data-cy="header-link">
                <Link
                  href={link.href}
                  passHref
                  onClick={() => {
                    logEvent('Link', link.label, 'Top Nav');
                  }}
                >
                  <A
                    data-cy="header-link-label"
                    id={`desktop-nav-${link.label}`}
                  >
                    {link.label}
                  </A>
                </Link>
              </TopLink>
            ))}
            {user?.name ? (
              <Link
                href="/profile"
                passHref
                onClick={() => {
                  logEvent('Link', 'Profile', 'Top Nav');
                }}
              >
                <a id="desktop-nav-profile">
                  <AvatarWrapper>
                    <UserAvatar user={user} />
                  </AvatarWrapper>
                </a>
              </Link>
            ) : (
              <>
                <TopLink>
                  <Link
                    href="/login"
                    passHref
                    onClick={() => {
                      logEvent('Link', 'Login', 'Top Nav');
                    }}
                  >
                    <A data-cy="header-login" id="desktop-nav-login">
                      Login
                    </A>
                  </Link>
                </TopLink>
                <TopLink>
                  <Link
                    href="/register"
                    passHref
                    onClick={() => {
                      logEvent('Link', 'Register', 'Top Nav');
                    }}
                  >
                    <A data-cy="header-register" id="desktop-nav-register">
                      <strong>Join Us</strong>
                    </A>
                  </Link>
                </TopLink>
              </>
            )}
            {user?.isAdmin && (
              <>
                <AdminMenu />
                {candidateRoute && <AdminMenu candidateMode id={id} />}
              </>
            )}
          </RightLinks>
        </ContentWrapper>
      </Wrapper>
      <Padder />
    </>
  );
};

DesktopHeader.propTypes = {
  user: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  navigateCallback: PropTypes.func,
  trackShareCallbackk: PropTypes.func,
};

export default DesktopHeader;
