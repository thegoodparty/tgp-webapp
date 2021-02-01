/**
 *
 * RecentlyJoined
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { PurpleButton } from 'components/shared/buttons';
import { Body9, Body11, Body13, Body19 } from '../../shared/typogrophy';
const PeopleJoinedIconPurple = '/images/people-joined-purple.svg';
const AnonymousIconPurple = '/images/anonymous-icon-purple.svg';

const InnerButton = styled.div`
  font-size: 14px;
`;

const RecentActivity = styled.div`
  margin-top: 32px;
`;
const RecentActivityTitle = styled(Body13)`
  color: ${({ theme }) => theme.colors.gray4};
  margin-bottom: 18px;
  font-weight: 600;
  text-align: left;
`;

const JoinedCount = styled(Body13)`
  color: ${({ theme }) => theme.colors.gray4};
  text-align: left;
  margin-left: 16px;
`;
const JoinName = styled(Body13)`
  color: ${({ theme }) => theme.colors.gray3};
  text-align: left;
  margin-left: 16px;
  font-size: 15px;
  &.joined-time {
    color: ${({ theme }) => theme.colors.gray4};
  }
`;
const JoinChamber = styled(Body11)`
  color: ${({ theme }) => theme.colors.gray4};
  text-align: left;
  margin-left: 6px;
  font-size: 13px;
`;

const RecentJoin = styled(Grid)`
  && {
    padding-top: 10px;
    padding-bottom: 10px;
    border-top: 1px solid ${({ theme }) => theme.colors.grayD};
  }
`;
function RecentlyJoined({ }) {
  return (
    <>
      <RecentActivity>
        <RecentActivityTitle>Recently Joined</RecentActivityTitle>
      </RecentActivity>
      <Grid container alignItems="center" style={{ marginBottom: 14 }}>
        <img src={PeopleJoinedIconPurple} alt="share" />
        <JoinedCount>772 people just joined</JoinedCount>
      </Grid>
      <RecentJoin container alignItems="center">
        <Grid item>
          <img src={AnonymousIconPurple} alt="share" />
        </Grid>
        <Grid item>
          <Grid item container alignItems="center">
            <JoinName>Michele C.</JoinName>
            <JoinChamber>Beverly Hills CA-33</JoinChamber>
          </Grid>
          <Grid item>
            <JoinName className="joined-time">7 mins ago</JoinName>
          </Grid>
        </Grid>
      </RecentJoin>
      <Box style={{ marginTop: 24 }}>
        <PurpleButton fullWidth className="outline">
          <InnerButton>
            <span>SEE ALL</span>
          </InnerButton>
        </PurpleButton>
      </Box>
    </>
  );
}

RecentlyJoined.propTypes = {
  candidate: PropTypes.object,
};

export default RecentlyJoined;
