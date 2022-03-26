/**
 *
 * GoalsPanel
 *
 */

import React from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Link from 'next/link';
import { useRouter } from 'next/router';

import PortalPanel from '../shared/PortalPanel';
import { Font16, FontH3 } from '../../shared/typogrophy';
import BlackButton, { InnerButton } from '../../shared/buttons/BlackButton';
import GoalsChart from './GoalsChart';

const Title = styled(Font16)`
  font-weight: 700;
  margin-bottom: 10px;
`;

const Stat = styled(Font16)`
  display: inline-block;
  margin-right: 12px;
  color: #636363;
`;

const GrayLink = styled.a`
  color: #6a6a6a;
  text-decoration: underline;
`;

const ResponsiveAlign = styled.div`
  display: flex;
  justify-content: initial;

  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    justify-content: flex-end;
  }
`;

function GoalsPanel() {
  const router = useRouter();
  return (
    <PortalPanel color="#422CCD">
      <FontH3 style={{ margin: '0 0 45px 0' }}>Campaign Goals</FontH3>
      <Grid container spacing={4}>
        <Grid item xs={12} lg={7}>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={6}>
              <Title>VOTES NEEDED TO WIN 🎉</Title>
              <Stat>7,432,234</Stat>
            </Grid>
            <Grid item xs={12} lg={6}>
              <Title>LIKELY VOTES SO FAR 🗳</Title>
              <Stat>4,665,297</Stat>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} lg={5} style={{ height: '100%' }}>
          <GoalsChart />
        </Grid>
        <Grid item xs={12} lg={6}>
          Good Party projects <strong>1,234,567</strong> voters are available
          for the right independent or 3rd party in this race. That’s{' '}
          <strong>3.7x</strong> the number of voters needed to win!
        </Grid>
        <Grid item xs={12} lg={6}>
          {' '}
          &nbsp;
        </Grid>
        <Grid item xs={12} lg={6}>
          <Link href={`${router.asPath}?article=4KOzae6PB45c9GQY9Xi9UX`}>
            <GrayLink>Methodology</GrayLink>
          </Link>
        </Grid>
        <Grid item xs={12} lg={6}>
          <ResponsiveAlign>
            <div>
              Have a question?
              <br />
              <GrayLink href="mailto:ask@goodparty.org">Ask us</GrayLink>
            </div>
          </ResponsiveAlign>
        </Grid>
      </Grid>
    </PortalPanel>
  );
}

export default GoalsPanel;
