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
import { useRouter } from 'next/router';

import { Body12 } from '../typogrophy';

const GrayWrapper = styled.div`
  background-color: #3a3a48;
  padding: 40px 16px;

  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    padding: 60px 16px;
  }
`;

const GrayInnerWrapper = styled(Body12)`
  max-width: ${({ theme }) => theme.breakpointsPixels.contentMax};
  margin: 0 auto;
  padding: 0 10px;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.contentMax}) {
    padding: 0;
  }
`;

const Column = styled.div`
  color: #fff;
  text-align: center;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    text-align: left;
  }
`;

const Work = styled.div`
  font-size: 16px;
  line-height: 20px;
`;

const WhiteLink = styled.a`
  cursor: pointer;
  display: block;
  color: #fff;
  text-decoration: underline;
  margin-bottom: 24px;
  font-size: 16px;
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
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    margin-top: 100px;
  }
`;

const SocialIcon = styled.img`
  margin: 0 20px;
`;

const Row = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  color: #fff;
`;

const Rights = styled.div`
  font-size: 11px;
`;

function Footer() {
  const router = useRouter();
  return (
    <>
      <GrayWrapper>
        <GrayInnerWrapper>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Column>
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
                <Link data-cy="footer-link-creators" href="/faqs" passHref>
                  <WhiteLink data-cy="footer-link-creators">
                    Frequently asked questions
                  </WhiteLink>
                </Link>
              </Column>
            </Grid>
            <Grid item xs={12} md={4}>
              <Column>
                <Link href="/team" passHref>
                  <WhiteLink>Meet the team</WhiteLink>
                </Link>
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
                <a
                  href="https://www.tiktok.com/@goodparty"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  data-cy="footer-link-tiktok"
                  title="TikTok"
                >
                  <SocialIcon
                    src="/images/icons/tiktok-white.svg"
                    width={24}
                    height={20}
                    alt="TikTok"
                    style={{ marginLeft: 0 }}
                  />
                </a>
                <a
                  href="https://www.instagram.com/goodpartyorg/"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  data-cy="footer-link-instagram"
                  title="Instagram"
                >
                  <SocialIcon
                    src="/images/icons/instagram-white.svg"
                    width={20}
                    height={20}
                    alt="Instagram"
                  />
                </a>
                <a
                  href="https://www.facebook.com/goodpartyorg"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  data-cy="footer-link-facebook"
                  title="Facebook"
                >
                  <SocialIcon
                    src="/images/icons/facebook-white.svg"
                    width={12}
                    height={20}
                    alt="Facebook"
                  />
                </a>
                <a
                  href="https://twitter.com/goodpartyorg"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  data-cy="footer-link-twitter"
                  title="Twitter"
                >
                  <SocialIcon
                    src="/images/icons/twitter.svg"
                    width={23}
                    height={20}
                    alt="Twitter"
                  />
                </a>
              </Column>
            </Grid>
            <Grid item xs={12} md={4}>
              <Column data-cy="footer-team">
                <Work>
                  Want to work at Good Party?
                  <br />
                  We’re always looking for Good People!
                  <div>
                    <Link href="/work-with-us" passHref>
                      <a data-cy="footer-link-join">
                        <Apply>&nbsp;Learn More&nbsp;</Apply>
                      </a>
                    </Link>
                  </div>
                </Work>
              </Column>
            </Grid>
          </Grid>
          <SecondRow>
            <Grid container spacing={3} alignItems="flex-end">
              <Grid item xs={12}>
                <Hidden smDown>
                  <Row>
                    <Rights>
                      &copy; 2019-2021 Good Party. All rights reserved.
                    </Rights>
                    <Link href="/privacy" passHref>
                      <WhiteLink data-cy="footer-link-policy">
                        Privacy Policy
                      </WhiteLink>
                    </Link>{' '}
                  </Row>
                </Hidden>
              </Grid>
              <Grid item xs={12} md={4}>
                <Column>
                  <Hidden mdUp>
                    <Link href="/privacy">
                      <WhiteLink data-cy="footer-link-policy">
                        Privacy Policy
                      </WhiteLink>
                    </Link>{' '}
                    &copy; 2019-2021 Good Party. All rights reserved.
                  </Hidden>
                </Column>
              </Grid>
            </Grid>
          </SecondRow>
        </GrayInnerWrapper>
      </GrayWrapper>
    </>
  );
}

Footer.propTypes = {
  isCreators: PropTypes.bool,
};

export default memo(Footer);
