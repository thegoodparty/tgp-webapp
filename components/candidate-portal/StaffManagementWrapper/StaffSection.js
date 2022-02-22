/**
 *
 * StaffSection
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import AlertDialog from '../../shared/AlertDialog';

const Wrapper = styled.div`
  text-align: left;
  padding: 24px;
  max-width: ${({ theme }) => theme.breakpointsPixels.contentMax};
  margin: 0 auto;
`;

const roles = ['staff', 'manager', 'delete'];

function StaffSection({
  staff,
  updateStaffCallback,
  candidate,
  deleteStaffCallback,
}) {
  const [showModal, setShowModal] = useState(false);
  const onSelect = (member, role) => {
    if (role === 'delete') {
      setShowModal(member.id);
    } else {
      updateStaffCallback(member.user?.id, candidate.id, role);
    }
  };

  const handleProceedDelete = () => {
    deleteStaffCallback(showModal, candidate.id);
    setShowModal(false);
  };
  return (
    <Wrapper>
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={4}>
          <strong>Name</strong>
        </Grid>
        <Grid item xs={4}>
          <strong>Email</strong>
        </Grid>
        <Grid item xs={4}>
          <strong>Role</strong>
        </Grid>
        {staff &&
          staff.map((member) => (
            <React.Fragment key={member.id}>
              <Grid item xs={4}>
                {member.user?.name}
              </Grid>
              <Grid item xs={4}>
                {member.user?.email}
              </Grid>
              <Grid item xs={4}>
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
    </Wrapper>
  );
}

StaffSection.propTypes = {
  staff: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  updateStaffCallback: PropTypes.func,
  deleteStaffCallback: PropTypes.func,
  candidate: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

export default StaffSection;
