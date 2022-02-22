/**
 *
 * InviteUser
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FaUserPlus } from 'react-icons/fa';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';

import { PurpleButton } from '../../shared/buttons';
import { isValidEmail } from '../../shared/EmailInput';

const roles = ['staff', 'manager'];

function InviteUser({ addStaffCallback, candidate }) {
  const [showInvite, setShowInvite] = useState(false);
  const [state, setState] = useState({ email: '', role: '' });

  const onChangeField = (key, e) => {
    setState({
      ...state,
      [key]: e.target.value,
    });
  };

  const handleSubmitForm = (e) => e.stopPropagation();

  const canSubmit = () => isValidEmail(state.email);
  const handleInviteUser = (e) => {
    e.preventDefault();
    addStaffCallback(state.email, state.role, candidate.id);
    setState({
      email: '',
      role: '',
    });
  };
  return (
    <>
      {showInvite ? (
        <form noValidate onSubmit={handleSubmitForm}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                variant="outlined"
                label="Email"
                name="Email"
                value={state.email}
                onChange={(e) => onChangeField('email', e)}
              />
            </Grid>
            <Grid item xs={12} md={4}>
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
            <Grid item xs={12} md={4}>
              <PurpleButton
                type="submit"
                onClick={handleInviteUser}
                fullWidth
                disabled={!canSubmit()}
              >
                &nbsp; Send Invitation &nbsp;
              </PurpleButton>
            </Grid>
          </Grid>
        </form>
      ) : (
        <div className="text-right">
          <PurpleButton onClick={() => setShowInvite(true)}>
            {' '}
            &nbsp; <FaUserPlus /> &nbsp; Invite a member &nbsp;
          </PurpleButton>
        </div>
      )}
    </>
  );
}

InviteUser.propTypes = {
  addStaffCallback: PropTypes.func,
  candidate: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
};

export default InviteUser;
