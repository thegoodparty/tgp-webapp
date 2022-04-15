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
import PortalPanel from '../../candidate-portal/shared/PortalPanel';
import { FontH3 } from '../../shared/typogrophy';
import CandidateCard from '../../shared/CandidateCard';
import BlackOutlinedButton from '../../shared/buttons/BlackOutlinedButton';
import SupportedCampaigns from './SupportedCampaigns';
import CampaignStaff from './CampaignStaff';

const Name = styled.div`
  margin-left: 24px;
`;

const A = styled.a`
  text-decoration: underline;
`;

function ProfileWrapper() {
  const { user, signoutCallback } = useContext(ProfilePageContext);

  return (
    <ProfilePageWrapper>
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
      <CampaignStaff />
      <SupportedCampaigns />
    </ProfilePageWrapper>
  );
}

export default ProfileWrapper;
