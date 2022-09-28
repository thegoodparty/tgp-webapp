/**
 *
 * InvitationsSection
 *
 */

import React, { useContext } from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import { FaTrash } from 'react-icons/fa';

import { StaffManagementPageContext } from '/containers/candidate-portal/StaffManagementPage';

const Orange = styled.div`
  color: #98761f;
`;
const Height = styled.div`
  height: 4rem;
  line-height: 4rem;
`;

const Delete = styled.div`
  cursor: pointer;
`;

function InvitationsSection() {
  const { staffInvitations, deleteInvitationCallback, candidate } = useContext(
    StaffManagementPageContext,
  );
  if (!staffInvitations || staffInvitations.length === 0) {
    return <></>;
  }
  return (
    <Grid container spacing={3} alignItems="center">
      {staffInvitations &&
        staffInvitations.map((invitation) => (
          <React.Fragment key={invitation.id}>
            <Grid item xs={12} lg={3} data-cy="invitation-row-name">
              {invitation.name}
            </Grid>
            <Grid item xs={12} lg={3} data-cy="invitation-row-email">
              {invitation.email}
            </Grid>
            <Grid item xs={12} lg={2} data-cy="invitation-row-role">
              <Height>{invitation.role}</Height>
            </Grid>
            <Grid item xs={12} lg={2} data-cy="invitation-row-status">
              <Orange>Pending</Orange>
            </Grid>
            <Grid item xs={12} lg={2}>
              <Delete
                className="text-center"
                onClick={() =>
                  deleteInvitationCallback(invitation.id, candidate.id)
                }
              >
                <FaTrash />
              </Delete>
            </Grid>
          </React.Fragment>
        ))}
    </Grid>
  );
}

export default InvitationsSection;
