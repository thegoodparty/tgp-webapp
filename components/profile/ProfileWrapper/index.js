/**
 *
 * ProfileWrapper
 *
 */

import React, { useContext } from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Link from 'next/link';

import { ProfilePageContext } from '/containers/profile/ProfilePage';

import ProfilePageWrapper from '../shared/ProfilePageWrapper';
import UserAvatar from '../../shared/UserAvatar';
import Row from '../../shared/Row';
import { FontH3 } from '../../shared/typogrophy';
import SupportedCampaigns from './SupportedCampaigns';

const Name = styled.div`
  margin-left: 24px;
`;

const A = styled.a`
  text-decoration: underline;
`;

const SmallPadder = styled.div`
  padding: 0 16px;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    padding: 0;
  }
`;

function ProfileWrapper() {
  const { user, signoutCallback } = useContext(ProfilePageContext);

  return (
    <ProfilePageWrapper>
      <SmallPadder>
        <Grid container spacing={3} style={{ marginBottom: '40px' }}>
          <Grid item xs={9}>
            <Row>
              <UserAvatar user={user} size="large" />
              <Name>
                <FontH3 style={{ margin: '0 0 8px' }}>{user.name}</FontH3>
                <Link href="/profile/settings" passHref>
                  <A>Edit</A>
                </Link>
              </Name>
            </Row>
          </Grid>
          <Grid item xs={3}>
            <div className="text-right">
              <A href="#" onClick={signoutCallback}>
                Sign Out
              </A>
            </div>
          </Grid>
        </Grid>
      </SmallPadder>

      <SupportedCampaigns />
    </ProfilePageWrapper>
  );
}

export default ProfileWrapper;
