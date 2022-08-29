/**
 *
 * TopSection
 *
 */

import React from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { numberFormatter } from '/helpers/numberHelper';
import Row from '../shared/Row';
import BlackOutlinedButton from '../shared/buttons/BlackOutlinedButton';
import YellowButton from '../shared/buttons/YellowButton';
import { InnerButton } from '../shared/buttons/BlackButton';

const H1 = styled.h1`
  margin: 24px 0;
  font-size: 40px;
  font-weight: 900;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    margin: 64px 0 24px;
    font-size: 64px;
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
  height: 30px;
  width: calc(100% + 10px);
  bottom: 0;
  left: -5px;
  background-color: ${({ theme }) => theme.colors.yellow};
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    bottom: 4px;
    height: 30px;
  }
`;

const H2 = styled.h2`
  margin: 4px 0;
  font-weight: 300;
  font-size: 15px;
  line-height: 22px;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    font-size: 24px;
    line-height: 38px;
  }
`;

const LargeNumber = styled.div`
  font-size: 32px;
  font-weight: 900;
  line-height: 38px;

  &.green {
    color: ${({ theme }) => theme.colors.green};
    margin-left: 20px;
  }
`;

const UnderNumber = styled.div`
  font-size: 16px;
  font-weight: 900;
  line-height: 19px;
  margin-top: 6px;
`;

const Icon = styled(Image)`
  width: 38px;
  height: 38px;
`;

const ButtonWrapper = styled.div`
  margin: 16px 24px 0 0;
`;

const Why = styled(Row)`
  display: none;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    display: flex;
  }
`;

const YellowButtonWrapper = styled.div`
  margin-top: 16px;
  text-align: right;

  .smaller {
    font-size: 16px;
    color: #999;
    margin-top: 15px;
  }
`;

const AlignGrid = styled(Grid)`
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    text-align: right;
  }
`;

const AlignRow = styled(Row)`
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    justify-content: flex-end;
  }
`;

function TopSection() {
  const router = useRouter();
  return (
    <>
      <H1>
        Claim your{' '}
        <Relative>
          <Up> Independents!</Up>
          <Yellow />
        </Relative>
      </H1>
      <Grid container spacing={4}>
        <Grid item xs={12} lg={8}>
          <H2>
            Follow Honest, Independent, People-powered candidates to reclaim our
            democracy from the corrupt two-party system.{' '}
          </H2>
          <Why>
            <Link
              href={`${router.asPath}?article=FqZOWMEEYfcXbASjaRkMU`}
              passHref
            >
              <a
                className="no-underline"
                data-cy="candidates-article-link"
                id="important-link"
              >
                <ButtonWrapper>
                  <BlackOutlinedButton
                    active
                    data-cy="candidates-article-link-label"
                    style={{ textTransform: 'unset' }}
                  >
                    Why is this important?
                  </BlackOutlinedButton>
                </ButtonWrapper>
              </a>
            </Link>
            <Link href="/run" passHref>
              <a
                data-cy="candidates-run-link"
                id="run-link"
                className="underline"
              >
                <ButtonWrapper data-cy="candidates-run-link-label">
                  Want to run for office?
                </ButtonWrapper>
              </a>
            </Link>
          </Why>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Grid container spacing={3}>
            <AlignGrid item xs={6}>
              <LargeNumber>{numberFormatter(836452)}</LargeNumber>
              <UnderNumber>
                Following
                <br />
                indie candidates
              </UnderNumber>
            </AlignGrid>
            <AlignGrid item xs={6}>
              <AlignRow>
                <Icon
                  src="/images/icons/achievement.svg"
                  alt=""
                  width={38}
                  height={38}
                />
                <LargeNumber className="green">
                  {numberFormatter(347)}
                </LargeNumber>
              </AlignRow>
              <UnderNumber>
                Followers
                <br />
                from last week
              </UnderNumber>
            </AlignGrid>
          </Grid>
          {/*<YellowButtonWrapper>*/}
          {/*  <YellowButton>*/}
          {/*    <InnerButton>Follow Candidates</InnerButton>*/}
          {/*  </YellowButton>*/}
          {/*  <div className="smaller">*/}
          {/*    Follow indie candidates to increase their social capital and help*/}
          {/*    them build momentum!*/}
          {/*  </div>*/}
          {/*</YellowButtonWrapper>*/}
        </Grid>
      </Grid>
    </>
  );
}

export default TopSection;
