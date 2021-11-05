import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { BsChevronDown } from 'react-icons/bs';
import Image from 'next/image';
import { MdIosShare } from 'react-icons/md';
import Grid from '@material-ui/core/Grid';
import Grow from '@material-ui/core/Grow';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MenuList from '@material-ui/core/MenuList';
import styled from 'styled-components';

import { logEvent } from 'services/AnalyticsService';
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

const Works = styled.div`
  font-size: 16px;
  letter-spacing: 0.2px;
  color: ${({ theme }) => theme.colors.purple};
  display: flex;
  align-items: center;
  cursor: pointer;
  align-self: flex-start;
  span {
    margin-right: 10px;
  }

  &.purple {
    color: #fff;
  }
`;

const ChevronDown = styled(BsChevronDown)`
  transition: transform 0.3s;
  &.open {
    transform: rotate(180deg);
  }
`;

const Share = styled.div`
  padding: 0 4px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.purple};
`;

const ShareWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  text-align: right;
`;

const Logo = styled.img`
  height: 20px;
  width: auto;
`;

const AvatarWrapper = styled.div`
  cursor: pointer;
  margin-left: 32px;
`;

const StyledMenuItem = styled(MenuItem)`
  && {
    color: ${({ theme }) => theme.colors.purple};
    font-size: 16px;
    padding-top: 12px;
    padding-bottom: 12px;

    &.Mui-focusVisible {
      background-color: #fff;
      &:hover {
        background-color: rgba(0, 0, 0, 0.04);
      }
    }
  }
`;

const RightLinks = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const AsCandidate = styled.div`
  position: absolute;
  background-color: white;
  padding: 16px 8px;
  color: ${({ theme }) => theme.colors.purple};
  top: 14px;
  left: 8px;
  cursor: pointer;
`;

const TopLink = styled.div`
  margin: 0 12px;
  padding: 0 4px;
`;

const links = [
  { label: 'About', href: '/about' },
  // { label: 'Crowd Voting', href: '/about' },
  { label: 'Candidates', href: '/candidates' },
  // { label: 'Good Practices', href: '/good-practices' },
  // { label: 'FAQs', href: '/faqs' },
  { label: 'Login', href: '/login' },
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
      {asCandidate && (
        <AsCandidate onClick={logoutAsCandidateCallback}>
          Logout As candidate
        </AsCandidate>
      )}
      <ContentWrapper>
        <Link
          href="/"
          passHref
          onClick={() => {
            logEvent('Link', 'Logo', 'Top Nav');
          }}
        >
          <a>
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
            <TopLink>
              <Link
                href={link.href}
                passHref
                onClick={() => {
                  logEvent('Link', link.label, 'Top Nav');
                }}
              >
                <a>{link.label}</a>
              </Link>
            </TopLink>
          ))}
          <TopLink>
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
          </TopLink>
          <Share onClick={handleShare}>
            <MdIosShare size={20} />
          </Share>
        </RightLinks>
        {/*<Grid container alignItems="center">*/}
        {/*  <Grid item xs={4}>*/}
        {/*    <Works*/}
        {/*      ref={anchorRef}*/}
        {/*      aria-controls={open ? 'menu-list-grow' : undefined}*/}
        {/*      aria-haspopup="true"*/}
        {/*      onClick={handleToggle}*/}
        {/*      className={purpleNav && 'purple'}*/}
        {/*    >*/}
        {/*      <span>HOW THIS WORKS</span>*/}
        {/*      <ChevronDown size={14} className={open ? 'open' : 'closed'} />*/}
        {/*    </Works>*/}
        {/*    <Popper*/}
        {/*      open={open}*/}
        {/*      anchorEl={anchorRef.current}*/}
        {/*      role={undefined}*/}
        {/*      transition*/}
        {/*      disablePortal*/}
        {/*      placement="top-start"*/}
        {/*      style={{ zIndex: 1000 }}*/}
        {/*    >*/}
        {/*      {({ TransitionProps, placement }) => (*/}
        {/*        <Grow*/}
        {/*          {...TransitionProps}*/}
        {/*          style={{*/}
        {/*            transformOrigin:*/}
        {/*              placement === 'bottom' ? 'center top' : 'center bottom',*/}
        {/*          }}*/}
        {/*        >*/}
        {/*          <Paper style={{ marginTop: '10px' }}>*/}
        {/*            <ClickAwayListener onClickAway={handleClose}>*/}
        {/*              <MenuList*/}
        {/*                autoFocusItem={open}*/}
        {/*                id="menu-list-grow"*/}
        {/*                onKeyDown={handleListKeyDown}*/}
        {/*              >*/}
        {/*                <StyledMenuItem onClick={handleClose}>*/}
        {/*                  <Link*/}
        {/*                    href="/about"*/}
        {/*                    passHref*/}
        {/*                    onClick={() => {*/}
        {/*                      logEvent('Link', 'About', 'Top Nav');*/}
        {/*                    }}*/}
        {/*                  >*/}
        {/*                    <a>About Good Party</a>*/}
        {/*                  </Link>*/}
        {/*                </StyledMenuItem>*/}
        {/*                <StyledMenuItem onClick={handleClose}>*/}
        {/*                  <Link*/}
        {/*                    href={`${*/}
        {/*                      router.asPath*/}
        {/*                    }?article=1ic6T6fhH0jZLNvX5aZkDe`}*/}
        {/*                    passHref*/}
        {/*                    onClick={() => {*/}
        {/*                      logEvent(*/}
        {/*                        'Link',*/}
        {/*                        'How crowd-voting works',*/}
        {/*                        'Top Nav',*/}
        {/*                      );*/}
        {/*                    }}*/}
        {/*                  >*/}
        {/*                    <a>How crowd-voting works</a>*/}
        {/*                  </Link>*/}
        {/*                </StyledMenuItem>*/}
        {/*                <StyledMenuItem onClick={handleClose}>*/}
        {/*                  <Link*/}
        {/*                    href="/candidates"*/}
        {/*                    passHref*/}
        {/*                    onClick={() => {*/}
        {/*                      logEvent('Link', 'Candidates', 'Top Nav');*/}
        {/*                    }}*/}
        {/*                  >*/}
        {/*                    <a>Meet the candidates</a>*/}
        {/*                  </Link>*/}
        {/*                </StyledMenuItem>*/}
        {/*                <StyledMenuItem>*/}
        {/*                  <Link*/}
        {/*                    href="/good-practices"*/}
        {/*                    passHref*/}
        {/*                    onClick={() => {*/}
        {/*                      logEvent('Link', 'Good-Practices', 'Top Nav');*/}
        {/*                    }}*/}
        {/*                  >*/}
        {/*                    <a>Good practices</a>*/}
        {/*                  </Link>*/}
        {/*                </StyledMenuItem>*/}
        {/*                <StyledMenuItem>*/}
        {/*                  <Link*/}
        {/*                    href="/faqs"*/}
        {/*                    passHref*/}
        {/*                    onClick={() => {*/}
        {/*                      logEvent('Link', 'FAQs', 'Top Nav');*/}
        {/*                    }}*/}
        {/*                  >*/}
        {/*                    <a>FAQs</a>*/}
        {/*                  </Link>*/}
        {/*                </StyledMenuItem>*/}
        {/*                {!user && (*/}
        {/*                  <StyledMenuItem onClick={handleClose}>*/}
        {/*                    <Link*/}
        {/*                      href="/register"*/}
        {/*                      passHref*/}
        {/*                      onClick={() => {*/}
        {/*                        logEvent('Link', 'Sign up', 'Top Nav');*/}
        {/*                      }}*/}
        {/*                    >*/}
        {/*                      <a>Sign up / Login</a>*/}
        {/*                    </Link>*/}
        {/*                  </StyledMenuItem>*/}
        {/*                )}*/}
        {/*              </MenuList>*/}
        {/*            </ClickAwayListener>*/}
        {/*          </Paper>*/}
        {/*        </Grow>*/}
        {/*      )}*/}
        {/*    </Popper>*/}
        {/*  </Grid>*/}
        {/*  <Grid item xs={4} className="text-center">*/}
        {/*    <Link*/}
        {/*      href="/"*/}
        {/*      passHref*/}
        {/*      onClick={() => {*/}
        {/*        logEvent('Link', 'Logo', 'Top Nav');*/}
        {/*      }}*/}
        {/*    >*/}
        {/*      <a>*/}
        {/*        {purpleNav ? (*/}
        {/*          <Logo*/}
        {/*            src="/images/new-logo-white.svg"*/}
        {/*            data-cy="logo"*/}
        {/*            width={173}*/}
        {/*            height={20}*/}
        {/*            alt="GOOD PARTY"*/}
        {/*          />*/}
        {/*        ) : (*/}
        {/*          <Logo*/}
        {/*            src="/images/new-logo.svg"*/}
        {/*            data-cy="logo"*/}
        {/*            width={173}*/}
        {/*            height={20}*/}
        {/*            alt="GOOD PARTY"*/}
        {/*          />*/}
        {/*        )}*/}
        {/*      </a>*/}
        {/*    </Link>*/}
        {/*  </Grid>*/}
        {/*  <Grid item xs={4}>*/}
        {/*    <ShareWrapper>*/}
        {/*      <Share onClick={handleShare} className={purpleNav && 'purple'}>*/}
        {/*        {purpleNav ? (*/}
        {/*          <img*/}
        {/*            src="/images/icons/share-icon-white.svg"*/}
        {/*            alt="Share"*/}
        {/*            width={20}*/}
        {/*            height={20}*/}
        {/*          />*/}
        {/*        ) : (*/}
        {/*          <img*/}
        {/*            src="/images/icons/share-icon.svg"*/}
        {/*            alt="Share"*/}
        {/*            width={20}*/}
        {/*            height={20}*/}
        {/*          />*/}
        {/*        )}*/}
        {/*        <span>SHARE</span>*/}
        {/*      </Share>*/}

        {/*      {user?.name && (*/}
        {/*        <Link*/}
        {/*          href="/profile"*/}
        {/*          passHref*/}
        {/*          onClick={() => {*/}
        {/*            logEvent('Link', 'Profile', 'Top Nav');*/}
        {/*          }}*/}
        {/*        >*/}
        {/*          <a>*/}
        {/*            <AvatarWrapper>*/}
        {/*              <UserAvatar user={user} />*/}
        {/*            </AvatarWrapper>*/}
        {/*          </a>*/}
        {/*        </Link>*/}
        {/*      )}*/}
        {/*    </ShareWrapper>*/}
        {/*  </Grid>*/}
        {/*</Grid>*/}
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
