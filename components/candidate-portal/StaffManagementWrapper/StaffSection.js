/**
 *
 * StaffSection
 *
 */

import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import { FaTrash } from 'react-icons/fa';

import { StaffManagementPageContext } from '/containers/candidate-portal/StaffManagementPage';

import AlertDialog from '../../shared/AlertDialog';
import { FontH3 } from '../../shared/typogrophy';

const Green = styled.div`
  color: #19a189;
`;

const Delete = styled.div`
  cursor: pointer;
`;

const roles = ['staff', 'manager'];

function StaffSection() {
  const { candidate, staff, updateStaffCallback, deleteStaffCallback } =
    useContext(StaffManagementPageContext);
  const [showModal, setShowModal] = useState(false);
  const onSelect = (member, role) => {
    updateStaffCallback(member.user?.id, candidate.id, role);
  };

  const handleProceedDelete = () => {
    deleteStaffCallback(showModal, candidate.id);
    setShowModal(false);
  };

  return (
    <>
      <FontH3 style={{ margin: '0 0 45px 0' }} data-cy="staff-section-title">Team Members</FontH3>
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={12} lg={3}>
          <strong data-cy="member-col-name">Name</strong>
        </Grid>
        <Grid item xs={12} lg={3}>
          <strong data-cy="member-col-email">Email</strong>
        </Grid>
        <Grid item xs={12} lg={2}>
          <strong data-cy="member-col-role">Role</strong>
        </Grid>
        <Grid item xs={12} lg={2}>
          <strong data-cy="member-col-status">Status</strong>
        </Grid>
        <Grid item xs={12} lg={2}>
          <div className="text-center">
            <strong data-cy="member-col-action">Action</strong>
          </div>
        </Grid>
        {staff &&
          staff.map((member) => (
            <React.Fragment key={member.id}>
              <Grid item xs={12} lg={3} data-cy="member-info-name">
                {member.user?.name}
              </Grid>
              <Grid item xs={12} lg={3} data-cy="member-info-email">
                {member.user?.email}
              </Grid>
              <Grid item xs={12} lg={2}>
                <Select
                  fullWidth
                  variant="outlined"
                  native
                  onChange={(e) => onSelect(member, e.target.value)}
                  value={member.role}
                >
                  {roles.map((role) => (
                    <option value={role} key={role}>
                      {role}
                    </option>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={12} lg={2} data-cy="member-info-status">
                <Green>Accepted</Green>
              </Grid>
              <Grid item xs={12} lg={2}>
                <Delete
                  className="text-center"
                  onClick={() => setShowModal(member.id)}
                >
                  <FaTrash />
                </Delete>
              </Grid>
            </React.Fragment>
          ))}
      </Grid>
      <AlertDialog
        title="Delete Staff Role?"
        description="This can't be undone, and you will have to deal with it in your afterlife"
        open={showModal}
        handleClose={() => {
          setShowModal(false);
        }}
        handleProceed={handleProceedDelete}
      />
    </>
  );
}

export default StaffSection;
