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
import MaxWidth from '../../profile/ProfileWrapper/MaxWidth';

const Wrapper = styled.div`
  padding: 40px 0;
  border-top: solid 1px #e1e2e9;
  background-color: #fff;
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
`;

const columns = [
  {
    title: 'ORGANIZATION',
    links: [
      { label: 'About Us', link: '/about' },
      { label: 'Meet the Team', link: '/team' },
      { label: 'Careers', link: '/work-with-us' },
    ],
  },
  {
    title: 'SUPPORT',
    links: [
      {
        label: 'Contact Us',
        link: 'mailto:ask@goodparty.org',
        isExternal: true,
      },
    ],
  },
  {
    title: 'CAMPAIGNS',
    links: [
      { label: 'Meet the Candidates', link: '/candidates' },
      { label: 'FAQs', link: '/faqs' },
      { label: 'How To Run', link: '/run' },
    ],
  },
  {
    title: 'CONNECT',
    links: [
      {
        label: 'Twitter',
        link: 'https://twitter.com/goodpartyorg',
        isExternal: true,
      },
      {
        label: 'Facebook',
        link: 'https://www.facebook.com/goodpartyorg',
        isExternal: true,
      },
      {
        label: 'Instagram',
        link: 'https://www.instagram.com/goodpartyorg/',
        isExternal: true,
      },
      {
        label: 'TikTok',
        link: 'https://www.tiktok.com/@goodparty',
        isExternal: true,
      },
    ],
  },
];

const year = new Date().getFullYear();

function Footer() {
  return (
    <Wrapper>
      <MaxWidth>
        <Grid container spacing={2}>
          {columns.map((column) => (
            <Grid item xs={12} lg={2} key={column.title}>
              <Aligner>
                <Title>{column.title}</Title>
                {column.links.map((link) => (
                  <FooterLink key={link.label}>
                    {link.isExternal ? (
                      <a
                        href={link.link}
                        target="_blank"
                        rel="noreferrer"
                        title={link.label}
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link href={link.link} passHref>
                        <a>{link.label}</a>
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
            <Italic>
              Not a political party. We’re building free tools to change the
              rules, so good independent candidates can run and win!{' '}
              <Link href="/register" passHref>
                <a>Join us!</a>
              </Link>
            </Italic>
          </Grid>
        </Grid>
        <SecondRow>
          <Aligner>
            &copy; {year} Good Party. All rights reserved. &nbsp;
            <Link href="/privacy" passHref>
              <a>Privacy Policy</a>
            </Link>
          </Aligner>
        </SecondRow>
      </MaxWidth>
    </Wrapper>
  );
}

Footer.propTypes = {};

export default memo(Footer);
