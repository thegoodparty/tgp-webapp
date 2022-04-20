/**
 *
 * StaffManagementWrapper
 *
 */

import React, { useContext } from 'react';
import PortalPageWrapper from '../shared/PortalPageWrapper';
// import styled from 'styled-components';

import InviteUser from './InviteUser';
import StaffSection from './StaffSection';
import InvitationsSection from './InvitationsSection';
import PortalPanel from '../shared/PortalPanel';
import { StaffManagementPageContext } from '../../../containers/candidate-portal/StaffManagementPage';

function StaffManagementWrapper() {
  const { role, staffInvitations, loading } = useContext(
    StaffManagementPageContext,
  );
  return (
    <PortalPageWrapper
      role={role}
      loading={loading}
      title="Invite Team Members"
    >
      <PortalPanel color="#009DDC">
        <InviteUser />
      </PortalPanel>
      <PortalPanel color="#009DDC">
        <StaffSection />
        <InvitationsSection />
      </PortalPanel>
    </PortalPageWrapper>
  );
}

export default StaffManagementWrapper;
