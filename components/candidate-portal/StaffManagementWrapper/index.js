/**
 *
 * StaffManagementWrapper
 *
 */

import React from 'react';
import PortalPageWrapper from '../shared/PortalPageWrapper';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { H1 } from '../../shared/typogrophy';

import InviteUser from './InviteUser';
import StaffSection from './StaffSection';
import InvitationsSection from './InvitationsSection';

const Wrapper = styled.div`
  text-align: center;
  padding: 24px;
  max-width: ${({ theme }) => theme.breakpointsPixels.contentMax};
  margin: 0 auto;
`;

function StaffManagementWrapper({
  addStaffCallback,
  candidate,
  role,
  staff,
  staffInvitations,
  updateStaffCallback,
  loading,
  deleteStaffCallback,
}) {
  return (
    <PortalPageWrapper role={role} loading={loading}>
      <Wrapper>
        <H1>Staff Management</H1>
        <br />
        <br />
        <InviteUser candidate={candidate} addStaffCallback={addStaffCallback} />
        <StaffSection
          staff={staff}
          updateStaffCallback={updateStaffCallback}
          candidate={candidate}
          deleteStaffCallback={deleteStaffCallback}
        />
        <InvitationsSection staffInvitations={staffInvitations} />
      </Wrapper>
    </PortalPageWrapper>
  );
}

StaffManagementWrapper.propTypes = {
  addStaffCallback: PropTypes.func,
  updateStaffCallback: PropTypes.func,
  deleteStaffCallback: PropTypes.func,
  candidate: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  role: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  staff: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  staffInvitations: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
};

export default StaffManagementWrapper;
