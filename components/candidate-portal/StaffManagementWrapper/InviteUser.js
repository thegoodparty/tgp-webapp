/**
 *
 * InviteUser
 *
 */

import React, { useState, useContext } from 'react';
// import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';

import { PurpleButton } from '../../shared/buttons';
import { isValidEmail } from '../../shared/EmailInput';
import { FontH3 } from '../../shared/typogrophy';
import { StaffManagementPageContext } from '../../../containers/candidate-portal/StaffManagementPage';
import BlackButton from '../../shared/buttons/BlackButton';

const roles = ['staff', 'manager'];

function InviteUser() {
  const { addStaffCallback, candidate } = useContext(
    StaffManagementPageContext,
  );

  const [state, setState] = useState({ name: '', email: '', role: 'staff' });

  const onChangeField = (key, e) => {
    setState({
      ...state,
      [key]: e.target.value,
    });
  };

  const handleSubmitForm = (e) => e.stopPropagation();

  const canSubmit = () => state.name !== '' && isValidEmail(state.email);
  const handleInviteUser = (e) => {
    e.preventDefault();
    addStaffCallback(state.name, state.email, state.role, candidate.id);
    setState({
      name: '',
      email: '',
      role: 'staff',
    });
  };
  return (
    <form noValidate onSubmit={handleSubmitForm}>
      <FontH3 style={{ margin: '0 0 45px 0' }}>Invite Team Member</FontH3>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={4}>
          <TextField
            fullWidth
            variant="outlined"
            label="Full Name"
            name="name"
            value={state.name}
            onChange={(e) => onChangeField('name', e)}
          />
        </Grid>
        <Grid item xs={12} lg={3}>
          <TextField
            fullWidth
            variant="outlined"
            label="Email"
            name="Email"
            value={state.email}
            onChange={(e) => onChangeField('email', e)}
          />
        </Grid>
        <Grid item xs={12} lg={3}>
          <Select
            fullWidth
            variant="outlined"
            native
            onChange={(e) => onChangeField('role', e)}
            value={state.role}
          >
            {roles.map((role) => (
              <option value={role} key={role}>
                {role}
              </option>
            ))}
          </Select>
        </Grid>
        <Grid item xs={12} lg={2}>
          <BlackButton
            type="submit"
            onClick={handleInviteUser}
            fullWidth
            disabled={!canSubmit()}
          >
            Invite
          </BlackButton>
        </Grid>
      </Grid>
    </form>
  );
}

export default InviteUser;
