/**
 *
 * Footer
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import history from 'utils/history';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import WhiteLogo from 'images/white-logo.svg';
import FacebookIcon from 'images/icons/facebook-white.svg';
import TwitterIcon from 'images/icons/twitter.svg';
import YouTubeIcon from 'images/icons/youtube-white.svg';
import { getUserCookie } from 'helpers/cookieHelper';
import ShareModal from 'components/you/ProfileWrapper/ShareModal/Loadable';
import { electionRoute } from 'helpers/electionsHelper';

import { Body9, Body12 } from '../typogrophy';

const Wrapper = styled.div`
  background-color: #fff;
  padding: 16px;

  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-bottom: 0;
  }
  &.creatorsFooter {
    background-color: ${({ theme }) => theme.colors.blue};
    && {
      margin-bottom: 0;
    }
  }
  &.withNav {
    margin-bottom: 4rem;

    @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
      margin-bottom: 0;
    }
  }
`;
const InnerWrapper = styled(Body9)`
  max-width: ${({ theme }) => theme.breakpoints.contentMax};
  margin: auto auto;
  padding: 8px;
  color: ${({ theme }) => theme.colors.gray10};
  text-align: center;
  border: solid 1px ${({ theme }) => theme.colors.gray10};

  &.creatorsFooterContent {
    color: ${({ theme }) => theme.creators.colors.gray11};
    border: solid 1px ${({ theme }) => theme.creators.colors.gray11};
  }
`;

const GrayWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.gray3};
  padding: 40px 16px;

  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 60px 16px;
  }
`;

const GrayInnerWrapper = styled(Body12)`
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    max-width: 80%;
    margin: 0 auto;
  }
`;

const Column = styled.div`
  text-align: center;
  color: #fff;
`;

const ColumnHeader = styled.div`
  margin-bottom: 14px;
  font-weight: 500;
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-bottom: 32px;
  }
`;

const Logo = styled.img`
  width: 130px;
  height: auto;
`;

const WhiteLink = styled(Link)`
  display: block;
  color: #fff;
  text-decoration: underline;
  margin-bottom: 14px;
`;

const WhiteHref = styled.a`
  display: block;
  color: #fff;
  text-decoration: underline;
  margin-bottom: 14px;
`;

const Apply = styled.div`
  margin-top: 20px;
  display: inline-block;
  padding: 6px 16px;
  border: solid 1px #fff;
  border-radius: 30px;
  color: #fff;
`;

const SecondRow = styled.div`
  margin-top: 60px;
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-top: 100px;
  }
`;

const SocialIcon = styled.img`
  margin: 0 20px;
`;

function Footer({ isCreators = false }) {
  const [withMobileNav, setWithMobileNav] = useState(true);
  const [currentPath, setCurrentPath] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const onCloseShareModal = () => {
    setShowShareModal(false);
  };
  const onClickShareButton = () => {
    setShowShareModal(true);
  };
  useEffect(() => {
    history.listen(location => {
      updateMobileNav(location);
      setCurrentPath(location.pathname);
    });
    updateMobileNav(window.location);
    setCurrentPath(window.location.pathname);
  }, []);

  const updateMobileNav = location => {
    const { pathname } = location;
    if (
      pathname === '/' ||
      pathname === '/intro/splash' ||
      pathname === '/intro/zip-finder'
    ) {
      setWithMobileNav(false);
    } else {
      setWithMobileNav(true);
    }
  };

  if (currentPath === '/creators' && !isCreators) {
    return <></>;
  }

  let user = getUserCookie();
  if (user) {
    user = JSON.parse(user);
  }

  return (
    <>
      <GrayWrapper>
        <GrayInnerWrapper>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Column>
                <ColumnHeader>
                  <Logo
                    src={WhiteLogo}
                    alt="The Good Party Logo"
                    data-cy="footer-logo"
                  />
                </ColumnHeader>
                <WhiteLink data-cy="footer-link-about" to="/party">
                  About
                </WhiteLink>
                <WhiteLink
                  data-cy="footer-link-elections"
                  to={electionRoute(user)}
                >
                  Elections
                </WhiteLink>
                <WhiteLink data-cy="footer-link-you" to="/you">
                  You
                </WhiteLink>
                <WhiteLink data-cy="footer-link-creators" to="/creators">
                  Creators
                </WhiteLink>
              </Column>
            </Grid>
            <Grid item xs={12} md={4}>
              <Column>
                <ColumnHeader data-cy="footer-community-title">
                  Community
                </ColumnHeader>
                <WhiteLink
                  to="#"
                  data-cy="footer-link-share"
                  onClick={onClickShareButton}
                >
                  Share with Friends
                </WhiteLink>
                <WhiteHref
                  href="mailto:ask@thegoodparty.org"
                  data-cy="footer-link-email"
                >
                  Send Us An Email
                </WhiteHref>
              </Column>
            </Grid>
            <Grid item xs={12} md={4}>
              <Column data-cy="footer-team">
                <ColumnHeader data-cy="footer-team-title">Team</ColumnHeader>
                Want to join The Good Party? We are always looking for good
                people to collaborate with.
                <div>
                  <a
                    href="mailto:ask@thegoodparty.org?subject=I'm interested!&body=[Include Bio and area of interest]"
                    data-cy="footer-link-join"
                  >
                    <Apply>APPLY TO JOIN</Apply>
                  </a>
                </div>
              </Column>
            </Grid>
          </Grid>
          <SecondRow>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Column>
                  <Hidden smDown>
                    <WhiteLink to="/privacy" data-cy="footer-link-policy">
                      Privacy Policy
                    </WhiteLink>
                  </Hidden>
                </Column>
              </Grid>
              <Grid item xs={12} md={4}>
                <Column>
                  <a
                    href="https://www.facebook.com/thegoodpartyorg"
                    target="_blank"
                    rel="nofollow"
                    data-cy="footer-link-facebook"
                  >
                    <SocialIcon src={FacebookIcon} />
                  </a>
                  <a
                    href="https://twitter.com/thegoodpartyorg"
                    target="_blank"
                    rel="nofollow"
                    data-cy="footer-link-twitter"
                  >
                    <SocialIcon src={TwitterIcon} />
                  </a>
                  <a
                    href="https://www.youtube.com/channel/UCPNp46yxggs8NPeXFuMTpGQ"
                    target="_blank"
                    rel="nofollow"
                    data-cy="footer-link-youtube"
                  >
                    <SocialIcon src={YouTubeIcon} />
                  </a>
                </Column>
              </Grid>
              <Grid item xs={12} md={4}>
                <Column>
                  <WhiteLink to="/directory" data-cy="footer-link-directory">
                    Directory
                  </WhiteLink>
                  <Hidden mdUp>
                    <WhiteLink to="/privacy" data-cy="footer-link-policy">
                      Privacy Policy
                    </WhiteLink>
                  </Hidden>
                </Column>
              </Grid>
            </Grid>
          </SecondRow>
        </GrayInnerWrapper>
      </GrayWrapper>

      <Wrapper
        className={
          (withMobileNav ? 'withNav' : '') +
          (isCreators ? ' creatorsFooter' : '')
        }
      >
        <InnerWrapper
          className={isCreators ? ' creatorsFooterContent' : ''}
          data-cy="footer-description"
        >
          PAID FOR BY THE GOOD PARTY | THEGOODPARTY.ORG
          <br />
          NOT AUTHORIZED BY ANY CANDIDATE OR CANDIDATE COMMITTEE.
        </InnerWrapper>
      </Wrapper>
      {showShareModal && (
        <ShareModal
          open={showShareModal}
          closeCallback={onCloseShareModal}
          user={user}
        />
      )}
    </>
  );
}

Footer.propTypes = {
  isCreators: PropTypes.bool,
};

export default memo(Footer);
