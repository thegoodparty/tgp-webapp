/**
 *
 * Footer
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import Grid from '@material-ui/core/Grid';
import FeedbackContainer from '/containers/shared/FeedbackContainer';
import MaxWidth from '../MaxWidth';
import { FOOTER_COLUMNS } from './constants';

const Wrapper = styled.div`
  margin-top: 400px;
  padding: 40px 32px;
  border-top: solid 1px #e1e2e9;
  background-color: #fff;
  position: relative;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    padding: 40px 24px;
  }
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.sm}) {
    padding: 40px 18px;
  }
`;

const Aligner = styled.div`
  text-align: center;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    text-align: left;
  }
`;

const Title = styled.div`
  color: #888;
  font-weight: 900;
  margin-bottom: 20px;
`;

const FooterLink = styled.div`
  font-weight: 600;
  margin-bottom: 20px;
  a {
    color: #000;
  }
`;

const Italic = styled.div`
  font-style: italic;
  line-height: 27px;
  font-size: 17px;
  padding: 20px;
`;

const SecondRow = styled.div`
  &.footer-row {
    margin-top: 48px;
    color: #777;
    @media only screen and (min-width: ${({ theme }) =>
        theme.breakpointsPixels.lg}) {
      margin-top: 120px;
    }

    a {
      color: #000;
      font-weight: 600;
    }
  }
`;

const year = new Date().getFullYear();

function Footer() {
  
  return (
    <Wrapper>
      <MaxWidth>
        <Aligner>
          <FeedbackContainer mode="mobile" />
        </Aligner>
        <Grid container spacing={2}>
          {FOOTER_COLUMNS.map((column) => (
            <Grid item xs={12} lg={2} key={column.title} data-cy="footer-column">
              <Aligner>
                <Title data-cy="footer-column-title">{column.title}</Title>
                {column.links.map((link) => (
                  <FooterLink key={link.label} data-cy="footer-link-wrapper">
                    {link.isExternal ? (
                      <a
                        href={link.link}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        title={link.label}
                        data-cy="footer-link"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link href={link.link} passHref>
                        <a data-cy="footer-link">{link.label}</a>
                      </Link>
                    )}
                  </FooterLink>
                ))}
              </Aligner>
            </Grid>
          ))}
          <Grid item xs={12} lg={4} className="text-center">
            <Image
              src="/images/black-logo.svg"
              data-cy="logo"
              width={174}
              height={20}
              alt="GOOD PARTY"
              style={{ matginBottom: '30px' }}
            />
            <br />
            <Italic data-cy="footer-join-us">
              Not a political party. We’re building free tools to change the
              rules, so good independent candidates can run and win!{' '}
              <Link href="/register" passHref>
                <a data-cy="footer-join-us-link">Join us!</a>
              </Link>
            </Italic>
          </Grid>
        </Grid>
        <SecondRow className="footer-row" data-cy="footer-copyright">
          <Aligner>
            &copy; {year} Good Party. All rights reserved. &nbsp;
            <Link href="/privacy" passHref>
              <a data-cy="footer-privacy-link">Privacy Policy</a>
            </Link>
          </Aligner>
        </SecondRow>
      </MaxWidth>
    </Wrapper>
  );
}

Footer.propTypes = {};

export default memo(Footer);
