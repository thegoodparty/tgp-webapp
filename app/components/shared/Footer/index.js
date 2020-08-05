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
import { getCookie, getUserCookie } from 'helpers/cookieHelper';

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

  const electionRoute = () => {
    let zip;
    if (user?.zipCode) {
      zip = user.zipCode.zip;
    } else {
      let cookieZip = getCookie('zip');
      if (cookieZip) {
        cookieZip = JSON.parse(cookieZip);
        zip = cookieZip.zip;
      }
    }
    if (zip) {
      return `/elections/district/${zip}`;
    } else {
      return '/intro/zip-finder';
    }
  };
  return (
    <>
      <GrayWrapper>
        <GrayInnerWrapper>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Column>
                <ColumnHeader>
                  <Logo src={WhiteLogo} alt="The Good Party Logo" />
                </ColumnHeader>
                <WhiteLink to="/party">About</WhiteLink>
                <WhiteLink to={electionRoute()}>Elections</WhiteLink>
                <WhiteLink to="/you">You</WhiteLink>
              </Column>
            </Grid>
            <Grid item xs={12} md={4}>
              <Column>
                <ColumnHeader>Community</ColumnHeader>
                <WhiteHref
                  href="https://forms.gle/kydnhUp6xqF6RUpb9"
                  target="_blank"
                  rel="nofollow"
                >
                  Nominate a Candidate
                </WhiteHref>
                <WhiteLink to="#">Share with Friends</WhiteLink>
                <WhiteHref href="mailto:ask@thegoodparty.org">
                  Send Us An Email
                </WhiteHref>
              </Column>
            </Grid>
            <Grid item xs={12} md={4}>
              <Column>
                <ColumnHeader>Team</ColumnHeader>
                Want to join the volunteer team? We are always looking for
                people  to cooperate with us on this projected!
                <div>
                  <a href="mailto:ask@thegoodparty.org?subject=I'm interested!&body=[Include Bio and area of interest]">
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
                  <Hidden mdDown>
                    <WhiteLink to="/privacy">Privacy Policy</WhiteLink>
                  </Hidden>
                </Column>
              </Grid>
              <Grid item xs={12} md={4}>
                <Column>
                  <a
                    href="https://www.facebook.com/thegoodpartyorg"
                    target="_blank"
                    rel="nofollow"
                  >
                    <SocialIcon src={FacebookIcon} />
                  </a>
                  <a
                    href="https://twitter.com/thegoodpartyorg"
                    target="_blank"
                    rel="nofollow"
                  >
                    <SocialIcon src={TwitterIcon} />
                  </a>
                  <a
                    href="https://www.youtube.com/channel/UCPNp46yxggs8NPeXFuMTpGQ"
                    target="_blank"
                    rel="nofollow"
                  >
                    <SocialIcon src={YouTubeIcon} />
                  </a>
                </Column>
              </Grid>
              <Grid item xs={12} md={4}>
                <Column>
                  <WhiteLink to="/directory">Directory</WhiteLink>
                  <Hidden mdUp>
                    <WhiteLink to="/privacy">Privacy Policy</WhiteLink>
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
        <InnerWrapper className={isCreators ? ' creatorsFooterContent' : ''}>
          PAID FOR BY THE GOOD PARTY | THEGOODPARTY.ORG
          <br />
          NOT AUTHORIZED BY ANY CANDIDATE OR CANDIDATE COMMITTEE.
        </InnerWrapper>
      </Wrapper>
    </>
  );
}

Footer.propTypes = {
  isCreators: PropTypes.bool,
};

export default memo(Footer);
