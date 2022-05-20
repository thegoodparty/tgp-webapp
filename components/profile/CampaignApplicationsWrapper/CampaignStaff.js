/**
 *
 * CampaignStaff
 *
 */

import React, { useContext } from 'react';
// import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Link from 'next/link';

import { CampaignApplicationsPageContext } from '/containers/profile/CampaignApplicationsPage';

import PortalPanel from '../../candidate-portal/shared/PortalPanel';
import { FontH3 } from '../../shared/typogrophy';
import StaffCard from './StaffCard';

function CampaignStaff() {
  const { staff } = useContext(CampaignApplicationsPageContext);

  if (!staff || staff.length === 0) {
    return <></>;
  }

  return (
    <PortalPanel color="#EE6C3B">
      <FontH3 style={{ margin: '0 0 70px' }} data-cy="campaign-staff-title">Campaigns</FontH3>
      <Grid container spacing={3}>
        {staff.map((candidateStaff) => (
          <Grid item xs={12} md={6} lg={4} key={candidateStaff.id} data-cy="campaign-staff-wrapper">
            <StaffCard
              candidate={candidateStaff.candidate}
              role={candidateStaff.role}
            />
          </Grid>
        ))}
      </Grid>
    </PortalPanel>
  );
}

export default CampaignStaff;
