/**
 *
 * Footer
 *
 */

import React, { memo } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Grid from '@material-ui/core/Grid';
import { useRouter } from 'next/router';

import FeedbackContainer from '/containers/shared/FeedbackContainer';
import styles from './Footer.module.scss';

import MaxWidth from '../MaxWidth';
import { FOOTER_COLUMNS } from './constants';

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
  const router = useRouter();
  const isHome = router.pathname === '/';
  return (
    <div className={`${styles.wrapper} ${isHome && 'no-margin'}`}>
      <MaxWidth>
        <div className={styles.aligner}>
          <FeedbackContainer mode="mobile" />
        </div>
        <Grid container spacing={2}>
          {FOOTER_COLUMNS.map((column) => (
            <Grid
              item
              xs={12}
              lg={2}
              key={column.title}
              data-cy="footer-column"
            >
              <div className={styles.aligner}>
                <div className={styles.title} data-cy="footer-column-title">
                  {column.title}
                </div>
                {column.links.map((link) => (
                  <div
                    className={styles.footerLink}
                    key={link.label}
                    data-cy="footer-link-wrapper"
                  >
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
                  </div>
                ))}
              </div>
            </Grid>
          ))}
          <Grid item xs={12} lg={4} className="text-center">
            <img
              src="/images/black-logo.svg"
              data-cy="logo"
              width={174}
              height={20}
              alt="GOOD PARTY"
            />
            <br />
            <div className={styles.italic} data-cy="footer-join-us">
              Not a political party. We’re building free tools to change the
              rules, so good independent candidates can run and win!{' '}
              <Link href="/register" passHref>
                <a data-cy="footer-join-us-link">Join us!</a>
              </Link>
            </div>
          </Grid>
        </Grid>
        <div className={styles.footerRow} data-cy="footer-copyright">
          <div className={styles.aligner}>
            &copy; {year} Good Party. All rights reserved. &nbsp;
            <Link href="/privacy" passHref>
              <a data-cy="footer-privacy-link">Privacy Policy</a>
            </Link>
          </div>
        </div>
      </MaxWidth>
    </div>
  );
}

Footer.propTypes = {};

export default memo(Footer);
