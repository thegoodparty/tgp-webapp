import React from 'react';
import styled from 'styled-components';
import BlackButton, { InnerButton } from '../shared/buttons/BlackButton';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Grid from '@material-ui/core/Grid';
import MaxWidth from '../shared/MaxWidth';
import Feed from './Feed';

const Wrapper = styled.section`
  background-color: #f3f3f3;
  padding: 80px 0;
  text-align: center;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    padding: 116px 24px;
  }
`;

const H2 = styled.h2`
  margin: 0 0 40px;
  font-size: 36px;
  font-weight: 900;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    font-size: 42px;
  }
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.xl}) {
    font-size: 48px;
  }
`;

const Relative = styled.div`
  display: inline-block;
  position: relative;
`;

const Up = styled.span`
  z-index: 10;
  position: relative;
`;

const Yellow = styled.div`
  position: absolute;
  height: 20px;
  width: calc(100% + 10px);
  bottom: 0;
  left: -5px;
  background-color: #ffe600;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    bottom: 4px;
    height: 20px;
  }
`;

const Accomplish = styled.div`
  margin-top: 20px;
  text-align: center;
`;

const GrayParty = ({ openShareModalCallback }) => {
  const router = useRouter();
  return (
    <Wrapper>
      <MaxWidth>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} lg={7}>
            <Feed openShareModalCallback={openShareModalCallback} />
          </Grid>
          <Grid item xs={12} lg={5}>
            <H2 data-cy="party-on">
              We tag #goodparty{' '}
              <Relative>
                <Up> on Tuesdays</Up>
                <Yellow />
              </Relative>{' '}
              to grow the movement
            </H2>
            <Accomplish>
              <Link
                href={`${router.asPath}?article=30a4bjTYmsAtXR5vgXLRLJ`}
                passHref
              >
                <a className="no-underline">
                  <BlackButton className="outlined">
                    <InnerButton>Why Tuesdays?</InnerButton>
                  </BlackButton>
                </a>
              </Link>
            </Accomplish>
          </Grid>
        </Grid>
      </MaxWidth>
    </Wrapper>
  );
};

export default GrayParty;
