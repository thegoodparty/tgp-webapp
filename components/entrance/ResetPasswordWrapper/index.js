/**
 *
 * ResetPasswordWrapper
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';

import PageWrapper from '/components/shared/PageWrapper';
import { H1 } from '/components/shared/typogrophy';
import { PurpleButton } from '/components/shared/buttons';
import PasswordInput from '../../shared/PasswordInput';
import { formatToPhone } from '/helpers/phoneHelper';
import { emailRegExp } from '/helpers/userHelper';

const VerticalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    height: calc(100vh - 100px);
  }
`;

function ResetPasswordWrapper({ email, phone, token, resetPasswordCallback }) {
  const [password, setPassword] = useState('');

  const enableSubmit = () =>
    password !== '' && password.match(emailRegExp) && password.length >= 8;

  const handleSubmitForm = e => {
    e.preventDefault();
  };

  const onChangePassword = pwd => {
    setPassword(pwd);
  };

  const handleSubmit = () => {
    if (enableSubmit()) {
      resetPasswordCallback(email, phone, password, token);
    }
  };
  return (
    <PageWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <VerticalWrapper>
            <H1 data-cy="title">
              Enter a new password for
              <br />
              <strong>{email || formatToPhone(phone)}</strong>
            </H1>
          </VerticalWrapper>
        </Grid>
        <Grid item xs={12} md={6}>
          <VerticalWrapper>
            <form
              noValidate
              onSubmit={handleSubmitForm}
              data-cy="reset-password-form"
            >
              <div style={{ marginTop: '54px', marginBottom: '22px' }}>
                <PasswordInput
                  onChangeCallback={onChangePassword}
                  helperText="For security, passwords must have at least 1 capital letter, 1 lowercase, 1 special character or number, and 8 characters minimum"
                />
              </div>
              <PurpleButton
                fullWidth
                disabled={!enableSubmit()}
                onClick={handleSubmit}
                type="submit"
              >
                CHANGE PASSWORD
              </PurpleButton>
            </form>
          </VerticalWrapper>
        </Grid>
      </Grid>
    </PageWrapper>
  );
}

ResetPasswordWrapper.propTypes = {
  email: PropTypes.string,
  phone: PropTypes.string,
  token: PropTypes.string,
  resetPasswordCallback: PropTypes.func,
};

export default ResetPasswordWrapper;
