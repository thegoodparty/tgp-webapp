/**
 *
 * PersonalSection
 *
 */

import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import { ProfileSettingsPageContext } from '/containers/profile/ProfileSettingsPage';

import PortalPanel from '../../candidate-portal/shared/PortalPanel';
import { FontH3 } from '../../shared/typogrophy';
import { isValidEmail } from '../../shared/EmailInput';
import PhoneInput from '../../shared/PhoneInput';
import BlackButton, { InnerButton } from '../../shared/buttons/BlackButton';
import Row from '../../shared/Row';
import { USER_SETTING_FIELDS } from '../../../utils/constants';


const Section = styled.section`
  .MuiInputBase-input {
    @media only screen and (min-width: ${({ theme }) =>
        theme.breakpointsPixels.md}) {
      font-size: 16px !important;
      line-height: 22px !important;
    }
  }
`;

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

function PersonalSection() {
  const { user, updateUserCallback } = useContext(ProfileSettingsPageContext);
  const initialState = {};
  
  USER_SETTING_FIELDS.forEach((field) => {
    initialState[field.key] = field.initialValue;
  });
  const [state, setState] = useState(initialState);
  const [isPhoneValid, setIsPhoneValid] = useState(true);

  useEffect(() => {
    if (user) {
      const updatedState = {};
      USER_SETTING_FIELDS.forEach((field) => {
        updatedState[field.key] = user[field.key] || field.initialValue;
      });
      setState(updatedState);
    }
  }, [user]);

  const onChangeField = (key, val) => {
    setState({
      ...state,
      [key]: val,
    });
  };

  const cancel = () => {
    const updatedState = {};
    USER_SETTING_FIELDS.forEach((field) => {
      updatedState[field.key] = user[field.key] || field.initialValue;
    });
    setState(updatedState);
    setIsPhoneValid(true);
  };

  const canSave = () => {
    if (state.phone !== '' && !isPhoneValid) {
      return false;
    }
    // required field
    if (state.name === '' || state.zip === '') {
      return false;
    }
    // one required
    if (state.email === '' && state.phone === '') {
      return false;
    }
    if (state.email !== '' && !isValidEmail(state.email)) {
      return false;
    }
    if (state.zip !== '' && state.zip.length !== 5) {
      return false;
    }
    return true;
  };

  const submit = () => {
    const fields = { ...state };
    if (fields.phone) {
      fields.phone = fields.phone.replace(/\D+/g, '');
    }

    updateUserCallback(fields);
  };
  return (
    <Section>
      <PortalPanel color="#EE6C3B">
        <FontH3 style={{ margin: '0 0 70px' }} data-cy="settings-title">Settings</FontH3>
        <form noValidate onSubmit={(e) => e.preventDefault()}>
          <Grid container spacing={3}>
            <Grid xs={12} lg={6}>
              {USER_SETTING_FIELDS.map((field) => (
                <>
                  {field.type === 'phone' ? (
                    <PhoneInput
                      value={state[field.key]}
                      onChangeCallback={(phone, isValid) => {
                        onChangeField(field.key, phone);
                        setIsPhoneValid(isValid);
                      }}
                      hideIcon
                    />
                  ) : (
                    <StyledTextField
                      key={field.label}
                      value={state[field.key]}
                      fullWidth
                      variant="outlined"
                      label={field.label}
                      onChange={(e) => onChangeField(field.key, e.target.value)}
                      required={field.required}
                    />
                  )}
                </>
              ))}
              <Row style={{ marginTop: '80px' }}>
                <BlackButton
                  disabled={!canSave()}
                  type="submit"
                  onClick={submit}
                >
                  <InnerButton>Save</InnerButton>
                </BlackButton>
                <Cancel onClick={cancel}>cancel</Cancel>
              </Row>
            </Grid>
          </Grid>
        </form>
      </PortalPanel>
    </Section>
  );
}

export default PersonalSection;
