import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { MdIosShare } from 'react-icons/md';

import styled from 'styled-components';

import { logEvent } from '/services/AnalyticsService';
import UserAvatar from '../UserAvatar';
import { PurpleButton } from '../buttons';
import { Body13 } from '../typogrophy';

const Wrapper = styled.div`
  height: 80px;
  width: 100%;
  border-bottom: solid 1px #e1e2e9;
  background-color: #fff;
  z-index: 100;
  padding: 0 32px;
  position: relative;
  @media only screen and (max-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    padding: 0 24px;
  }
  @media only screen and (max-width: ${({ theme }) =>
      theme.breakpointsPixels.sm}) {
    padding: 0 18px;
  }
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
  a {
    color: #000;
  }
`;

const links = [
  { label: 'About', href: '/about' },
  { label: 'Candidates', href: '/candidates' },
];



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

  const handleShare = () => {
    // if we are on the candidate page, track the share
    if (router.pathname === '/candidate/[...NameIdTab]') {
      trackShareCallback(
        router.components['/candidate/[...NameIdTab]']?.props?.pageProps
          ?.ssrState?.id,
      );
    }
    router.query.share = 'true';
    router.push(router);

    logEvent('Share', 'top_nav_share', 'Top Nav');
  };
  return (
    <Wrapper>
      <ContentWrapper>
        <Link
          href="/"
          passHref
          onClick={() => {
            logEvent('Link', 'Logo', 'Top Nav');
          }}
        >
          <a>
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
          {links.map((link) => (
            <TopLink key={link.href}>
              <Link
                href={link.href}
                passHref
                onClick={() => {
                  logEvent('Link', link.label, 'Top Nav');
                }}
              >
                <A>{link.label}</A>
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
              <a>
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
                  <A>Login</A>
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
                  <A>
                    <strong>Join Us</strong>
                  </A>
                </Link>
              </TopLink>
            </>
          )}
        </RightLinks>
      </ContentWrapper>
    </Wrapper>
  );
};

DesktopHeader.propTypes = {
  user: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  navigateCallback: PropTypes.func,
  trackShareCallbackk: PropTypes.func,
};

export default DesktopHeader;
