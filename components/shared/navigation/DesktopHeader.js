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
  &.purple {
    background-color: ${({ theme }) => theme.colors.purple};
    box-shadow: none;
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

const Share = styled.div`
  padding: 0 4px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.purple};
`;

const Logo = styled.img`
  height: 20px;
  width: auto;
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

const AsCandidateWrapper = styled.div`
  @media only screen and (min-width: 768px) {
    position: absolute;
    top: 14px;
    left: 8px;
  }
  
`;

const AsCandidate = styled.div`
  background-color: white;
  padding: 16px 8px;
  color: ${({ theme }) => theme.colors.purple};
  cursor: pointer;
  display: inline-block;
  margin-right: 12px;
  border-radius: 8px;
`;

const TopLink = styled.div`
  margin: 0 12px;
  padding: 0 4px;
`;

const links = [
  { label: 'About', href: '/about' },
  { label: 'Candidates', href: '/candidates' },
];

const InnerButton = styled(Body13)`
  display: flex;
  align-items: center;
  padding: 0 12px;
  font-weight: 700;
  color: #fff;
`;

const DesktopHeader = ({
  user,
  trackShareCallback = () => {},
  purpleNav,
  asCandidate,
  logoutAsCandidateCallback,
}) => {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const router = useRouter();

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
    <Wrapper className={purpleNav && 'purple'}>

      <ContentWrapper>
        {asCandidate && (
          <AsCandidateWrapper>
            <AsCandidate onClick={logoutAsCandidateCallback}>
              Logout As candidate
            </AsCandidate>
            <Link href="candidate-portal" passHref>
              <a>
                <AsCandidate>Portal</AsCandidate>
              </a>
            </Link>
          </AsCandidateWrapper>
        )}
        <span></span>
        <Link
          href="/"
          passHref
          onClick={() => {
            logEvent('Link', 'Logo', 'Top Nav');
          }}
        >
          <a style={{position: 'absolute' }}>
            {purpleNav ? (
              <Logo
                src="/images/new-logo-white.svg"
                data-cy="logo"
                width={173}
                height={20}
                alt="GOOD PARTY"
              />
            ) : (
              <Logo
                src="/images/new-logo.svg"
                data-cy="logo"
                width={173}
                height={20}
                alt="GOOD PARTY"
              />
            )}
          </a>
        </Link>
        <RightLinks>
          {links.map(link => (
            <TopLink key={link.href}>
              <Link
                href={link.href}
                passHref
                onClick={() => {
                  logEvent('Link', link.label, 'Top Nav');
                }}
              >
                <a style={{color: purpleNav ? 'white' : '#5C00C7'}}>{link.label}</a>
              </Link>
            </TopLink>
          ))}
          {user?.name ? (
            <>
              <Share onClick={handleShare}>
                <MdIosShare size={20} />
              </Share>
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
            </>
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
                  <a>Login</a>
                </Link>
              </TopLink>
              <TopLink>
                <Link href="/register" passHref>
                  <a>
                    <PurpleButton>
                      <InnerButton>
                        <Image
                          src="/images/white-heart.svg"
                          style={{
                            marginRight: '8px',
                          }}
                          width={24}
                          height={18}
                        />
                        &nbsp; COUNT ME IN!
                      </InnerButton>
                    </PurpleButton>
                  </a>
                </Link>
              </TopLink>
              <Share onClick={handleShare}>
                <MdIosShare size={20} />
              </Share>
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
  purpleNav: PropTypes.bool,
  asCandidate: PropTypes.bool,
  logoutAsCandidateCallback: PropTypes.func,
};

export default DesktopHeader;
