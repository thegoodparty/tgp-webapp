/**
 *
 * ResetPasswordWrapper
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import PageWrapper from 'components/shared/PageWrapper';
import { H2, Body } from 'components/shared/typogrophy';
import { OutlinedButton } from 'components/shared/buttons';
import PasswordInput from '../../shared/PasswordInput';

function ResetPasswordWrapper({ email, token, resetPasswordCallback }) {
  const [password, setPassword] = useState('');

  const enableSubmit = () => {
    return password.length >= 8;
  };

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
      <H2>New Password</H2>
      <Body style={{ marginTop: '8px' }}>
        Enter a new password for <strong>{email}</strong>
      </Body>
      <form
        noValidate
        onSubmit={handleSubmitForm}
        data-cy="reset-password-form"
      >
        <div style={{ marginTop: '54px', marginBottom: '22px' }}>
          <PasswordInput onChangeCallback={onChangePassword} />
        </div>
        <div className="text-right">
          <OutlinedButton
            active={enableSubmit()}
            onClick={handleSubmit}
            type="submit"
          >
            CHANGE PASSWORD <ChevronRightIcon />
          </OutlinedButton>
        </div>
      </form>
    </PageWrapper>
  );
}

ResetPasswordWrapper.propTypes = {
  email: PropTypes.string,
  token: PropTypes.string,
  resetPasswordCallback: PropTypes.func,
};

export default ResetPasswordWrapper;
