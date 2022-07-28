/**
 *
 * GoalsPanel
 *
 */

import React, { useContext } from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { CandidatePortalHomePageContext } from '/containers/candidate-portal/CandidatePortalHomePage';

import PortalPanel from '../shared/PortalPanel';
import { Font16, FontH3 } from '../../shared/typogrophy';
import GoalsChart from './GoalsChart';
import { numberFormatter } from '/helpers/numberHelper';
import { dateUsHelper } from '/helpers/dateHelper';
import { CONTACT_EMAIL } from '../../../utils/constants';

const Title = styled(Font16)`
  font-weight: 700;
  margin-bottom: 10px;
`;

const AsOf = styled.span`
  font-weight: 400;
  font-size: 18px;
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
  const { candidate } = useContext(CandidatePortalHomePageContext);
  const { votesNeeded, likelyVoters, unrepVoters } = candidate;

  const votersX =
    unrepVoters && votesNeeded && votesNeeded !== 0
      ? Math.round((unrepVoters * 100) / votesNeeded) / 100 // to add decimal if needed
      : 1;

  const today = new Date();
  return (
    <PortalPanel color="#422CCD">
      <FontH3 style={{ margin: '0 0 45px 0' }}>
        Voter Projections{' '}
        <AsOf>
          (as of {dateUsHelper(today)}{' '}
          {today.toLocaleTimeString().replace(/(.*)\D\d+/, '$1')})
        </AsOf>
      </FontH3>
      <Grid container spacing={4}>
        <Grid item xs={12} lg={7}>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={6}>
              <Title>VOTES NEEDED TO WIN 🎉</Title>
              <Stat>{numberFormatter(votesNeeded)}</Stat>
            </Grid>
            <Grid item xs={12} lg={6}>
              <Title>LIKELY VOTES SO FAR 🗳</Title>
              <Stat>{numberFormatter(likelyVoters)}</Stat>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} lg={5} style={{ height: '100%' }}>
          <GoalsChart candidate={candidate} />
        </Grid>
        <Grid item xs={12} lg={6}>
          Good Party projects <strong>{numberFormatter(unrepVoters)}</strong>{' '}
          voters are not going to vote Red or Blue in this race. That means{' '}
          <strong>{votersX}x</strong> the number of votes needed to win are
          available for a good independent or 3rd party candidate in this race!
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
              <GrayLink href={`mailto:${CONTACT_EMAIL}`}>Ask us</GrayLink>
            </div>
          </ResponsiveAlign>
        </Grid>
      </Grid>
    </PortalPanel>
  );
}

export default GoalsPanel;
