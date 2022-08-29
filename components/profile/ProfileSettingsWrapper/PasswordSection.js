/**
 *
 * PasswordSection
 *
 */

import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import { ProfileSettingsPageContext } from '/containers/profile/ProfileSettingsPage';

import PortalPanel from '../../candidate-portal/shared/PortalPanel';
import { FontH3 } from '../../shared/typogrophy';
import BlackButton, { InnerButton } from '../../shared/buttons/BlackButton';
import Row from '../../shared/Row';
import { passwordRegex } from '/helpers/userHelper';

const StyledTextField = styled(TextField)`
  && {
    margin-bottom: 16px;
  }
`;

const Cancel = styled.div`
  margin-left: 20px;
  text-decoration: underline;
  cursor: pointer;
`;

function PasswordSection() {
  const { user, changePasswordCallback } = useContext(
    ProfileSettingsPageContext,
  );
  const initialState = {
    oldPassword: '',
    password: '',
  };
  const [state, setState] = useState(initialState);

  const onChangeField = (key, val) => {
    setState({
      ...state,
      [key]: val,
    });
  };

  const canSave = () => {
    if (
      user.hasPassword &&
      state.password !== '' &&
      state.oldPassword !== '' &&
      state.password.match(passwordRegex) &&
      state.password.length > 7
    ) {
      return true;
    }
    if (
      !user.hasPassword &&
      state.password !== '' &&
      state.password.length > 7
    ) {
      return true;
    }
    return false;
  };

  const reset = () => {
    setState(initialState);
  };

  const handleSavePassword = () => {
    if (canSave()) {
      changePasswordCallback(state.password, state.oldPassword);
      reset();
    }
  };

  return (
    <section>
      <PortalPanel color="#CA2CCD">
        <form noValidate onSubmit={(e) => e.preventDefault()}>
          <FontH3 style={{ margin: '0 0 70px' }} data-cy="setting-password-title">
            {user.hasPassword ? 'Change' : 'Create'} your password
          </FontH3>
          <Grid container spacing={3}>
            <Grid xs={12} lg={6}>
              {user.hasPassword && (
                <StyledTextField
                  label="Old Password"
                  fullWidth
                  variant="outlined"
                  type="password"
                  value={state.oldPassword}
                  onChange={(e) => {
                    onChangeField('oldPassword', e.target.value);
                  }}
                  style={{ marginBottom: '16px' }}
                />
              )}
              <StyledTextField
                label="Password"
                fullWidth
                variant="outlined"
                value={state.password}
                type="password"
                onChange={(e) => {
                  onChangeField('password', e.target.value);
                }}
              />
              <small>
                For security, passwords must have at least 1 capital letter, 1
                lowercase, 1 special character or number, and 8 characters
                minimum
              </small>
              <br />

              <Row style={{ marginTop: '80px' }}>
                <BlackButton
                  disabled={!canSave()}
                  onClick={handleSavePassword}
                  type="submit"
                >
                  <InnerButton>Save</InnerButton>
                </BlackButton>
                <Cancel onClick={reset}>cancel</Cancel>
              </Row>
            </Grid>
          </Grid>
        </form>
      </PortalPanel>
    </section>
  );
}

export default PasswordSection;
