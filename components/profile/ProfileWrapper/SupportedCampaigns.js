/**
 *
 * SupportedCampaigns
 *
 */

import React, { useContext } from 'react';
// import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Link from 'next/link';

import { ProfilePageContext } from '/containers/profile/ProfilePage';

import Row from '../../shared/Row';
import PortalPanel from '../../candidate-portal/shared/PortalPanel';
import { FontH3 } from '../../shared/typogrophy';
import CandidateCard from '../../shared/CandidateCard';
import BlackOutlinedButton from '../../shared/buttons/BlackOutlinedButton';

function SupportedCampaigns() {
  const { userSupported } = useContext(ProfilePageContext);

  return (
    <PortalPanel color="#CA2CCD">
      <Row style={{ justifyContent: 'space-between' }}>
        <FontH3 style={{ margin: 0 }} data-cy="profile-support-title">Campaigns you’re supporting</FontH3>
        <Link passHref href="/candidates">
          <a data-cy="profile-support-search-link">
            <BlackOutlinedButton>Search Campaigns</BlackOutlinedButton>
          </a>
        </Link>
      </Row>
      <Grid container spacing={3} style={{ marginTop: '70px' }}>
        {!userSupported || userSupported.length === 0 ? (
          <div className="text-center">
            <FontH3 data-cy="profile-support-no-title">
              You haven&apos;t endorsed any campaign yet. Find a campaign and let&apos;s
              get the party started
            </FontH3>
            <br />
            <br />
            <Link passHref href="/candidates">
              <a data-cy="profile-support-no-link">
                <BlackOutlinedButton>Search Campaigns</BlackOutlinedButton>
              </a>
            </Link>
          </div>
        ) : (
          <>
            {(userSupported || []).map((candidate) => (
              <Grid item xs={12} md={6} key={candidate.id} data-cy="supported-campaign">
                <CandidateCard candidate={candidate} />{' '}
              </Grid>
            ))}
          </>
        )}
      </Grid>
    </PortalPanel>
  );
}

export default SupportedCampaigns;
