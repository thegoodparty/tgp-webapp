/**
 *
 * ResetPasswordWrapper
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Grid from '@material-ui/core/Grid';

import PageWrapper from 'components/shared/PageWrapper';
import { H1 } from 'components/shared/typogrophy';
import { PurpleButton } from 'components/shared/buttons';
import PasswordInput from '../../shared/PasswordInput';

const VerticalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    height: calc(100vh - 100px);
  }
`;

function ResetPasswordWrapper({ email, token, resetPasswordCallback }) {
  const [password, setPassword] = useState('');

  const enableSubmit = () => password.length >= 8;

  const handleSubmitForm = e => {
    e.preventDefault();
  };

  const onChangePassword = pwd => {
    setPassword(pwd);
  };

  const handleSubmit = () => {
    if (enableSubmit()) {
      resetPasswordCallback(email, password, token);
    }
  };
  return (
    <PageWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <VerticalWrapper>
            <H1 data-cy="title">
              Enter a new password for <strong>{email}</strong>
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
                <PasswordInput onChangeCallback={onChangePassword} />
              </div>
              <PurpleButton
                fullWidth
                disabled={!enableSubmit()}
                onClick={handleSubmit}
                type="submit"
              >
                CHANGE PASSWORD <ChevronRightIcon />
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
  token: PropTypes.string,
  resetPasswordCallback: PropTypes.func,
};

export default ResetPasswordWrapper;
