/**
 *
 * Footer
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { Body9, Body12 } from '../typogrophy';

const Wrapper = styled.div`
  background-color: #fff;
  padding: 16px;

  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-bottom: 0;
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
  max-width: ${({ theme }) => theme.breakpoints.contentMax};
  margin: 0 auto;
  padding: 0 10px;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpoints.contentMax}) {
    padding: 0;
  }
`;

const Column = styled.div`
  color: #fff;
  text-align: center;
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    text-align: left;
  }
`;

const ColumnHeader = styled.div`
  margin-bottom: 30px;
  font-weight: 500;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-bottom: 32px;
    font-size: 16px;
  }
`;

const Logo = styled(Image)`
  width: 130px;
  height: auto;
  cursor: pointer;
`;

const WhiteLink = styled.a`
  cursor: pointer;
  display: block;
  color: #fff;
  text-decoration: underline;
  margin-bottom: 24px;
  font-size: 14px;
  line-height: 20px;
  &:hover {
    color: #ccc;
  }
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
  const router = useRouter();
  return (
    <>
      <GrayWrapper>
        <GrayInnerWrapper>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Column>
                <ColumnHeader>
                  <Link href="/">
                    <Logo
                      src="/images/white-logo.svg"
                      alt="The Good Party Logo"
                      data-cy="footer-logo"
                      width="130px"
                      height="15px"
                    />
                  </Link>
                </ColumnHeader>
                <Link
                  href={`${router.asPath}?article=1ic6T6fhH0jZLNvX5aZkDe`}
                  passHref
                >
                  <WhiteLink data-cy="footer-link-about">
                    How crowd-voting works
                  </WhiteLink>
                </Link>

                <Link href="/about" passHref>
                  <WhiteLink data-cy="footer-link-elections">
                    About Good Party
                  </WhiteLink>
                </Link>
                <Link href="/candidates" passHref>
                  <WhiteLink data-cy="footer-link-you">
                    Meet the candidates
                  </WhiteLink>
                </Link>
                <Link
                  data-cy="footer-link-creators"
                  href="/faqs"
                  passHref
                >
                  <WhiteLink data-cy="footer-link-creators">
                    Frequently asked questions
                  </WhiteLink>
                </Link>
              </Column>
            </Grid>
            <Grid item xs={12} md={4}>
              <Column>
                <ColumnHeader data-cy="footer-community-title">
                  Community
                </ColumnHeader>
                <Link href={`${router.asPath}?share=true`} passHref>
                  <WhiteLink data-cy="footer-link-share">
                    Share with friends
                  </WhiteLink>
                </Link>
                <WhiteLink
                  href="mailto:ask@goodparty.org"
                  data-cy="footer-link-email"
                >
                  Email us
                </WhiteLink>
              </Column>
            </Grid>
            <Grid item xs={12} md={4}>
              <Column data-cy="footer-team">
                <ColumnHeader data-cy="footer-team-title">Team</ColumnHeader>
                Want to join the Good Party? We are always looking for good
                people to collaborate with!
                <div>
                  <a
                    href="mailto:ask@goodparty.org?subject=I'm interested!&body=[Include Bio and area of interest]"
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
                    <Link href="/privacy" passHref>
                      <WhiteLink data-cy="footer-link-policy">
                        Privacy Policy
                      </WhiteLink>
                    </Link>
                  </Hidden>
                </Column>
              </Grid>
              <Grid item xs={12} md={4}>
                <Column>
                  <a
                    href="https://www.facebook.com/goodpartyorg"
                    target="_blank"
                    rel="nofollow"
                    data-cy="footer-link-facebook"
                  >
                    <SocialIcon src="/images/icons/facebook-white.svg" />
                  </a>
                  <a
                    href="https://twitter.com/goodpartyorg"
                    target="_blank"
                    rel="nofollow"
                    data-cy="footer-link-twitter"
                  >
                    <SocialIcon src="/images/icons/twitter.svg" />
                  </a>
                  <a
                    href="https://www.tiktok.com/@goodparty"
                    target="_blank"
                    rel="nofollow"
                    data-cy="footer-link-tiktok"
                  >
                    <SocialIcon src="/images/icons/tiktok-white.svg" />
                  </a>
                </Column>
              </Grid>
              <Grid item xs={12} md={4}>
                <Column>
                  <Link href="/directory" passHref>
                    <WhiteLink data-cy="footer-link-directory">
                      Directory
                    </WhiteLink>
                  </Link>
                  <Hidden mdUp>
                    <Link href="/privacy">
                      <WhiteLink data-cy="footer-link-policy">
                        Privacy Policy
                      </WhiteLink>
                    </Link>
                  </Hidden>
                </Column>
              </Grid>
            </Grid>
          </SecondRow>
        </GrayInnerWrapper>
      </GrayWrapper>

      <Wrapper>
        <InnerWrapper
          className={isCreators ? ' creatorsFooterContent' : ''}
          data-cy="footer-description"
        >
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
