import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import QueryModal from 'components/shared/QueryModal';
import { H2, Body } from 'components/shared/typogrophy';
import PasswordInput from 'components/shared/PasswordInput';
import { OutlinedButton } from 'components/shared/buttons';

const ChangePasswordModal = ({
  hasPassword,
  closeModalCallback,
  changePasswordCallback,
}) => {
  const [newPassword, setNewPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const newPasswordChange = pwd => {
    setNewPassword(pwd);
  };
  const oldPasswordChange = pwd => {
    setOldPassword(pwd);
  };

  const handleSubmitForm = e => {
    e.preventDefault();
    // handleSubmit();
  };

  const enableSubmit = () => {
    if (hasPassword) {
      return newPassword.length >= 8 && oldPassword.length >= 8;
    } else {
      return newPassword.length >= 8;
    }
  };

  const handleSubmit = () => {
    if (enableSubmit()) {
      changePasswordCallback(newPassword, oldPassword, hasPassword);
      closeModalCallback();
    }
  };
  return (
    <QueryModal closeModalCallback={closeModalCallback}>
      <H2>{hasPassword ? 'Change' : 'Add'} Password</H2>
      <Body style={{ marginTop: '8px', marginBottom: '24px' }}>
        {hasPassword
          ? 'Enter a new password'
          : 'Add a password to login with email and password'}
      </Body>
      <form noValidate onSubmit={handleSubmitForm} data-cy="email-form">
        <PasswordInput
          onChangeCallback={newPasswordChange}
          label="New Password"
        />
        <div style={{ margin: '24px 0' }}>
          {hasPassword && (
            <PasswordInput
              onChangeCallback={oldPasswordChange}
              label="Current Password"
            />
          )}
          <div className="text-right">
            <OutlinedButton
              active={enableSubmit()}
              onClick={handleSubmit}
              type="submit"
            >
              SAVE NEW PASSWORD <ChevronRightIcon />
            </OutlinedButton>
          </div>
        </div>
      </form>
    </QueryModal>
  );
};

ChangePasswordModal.propTypes = {
  hasPassword: PropTypes.bool,
  closeModalCallback: PropTypes.func,
  changePasswordCallback: PropTypes.func,
};

export default ChangePasswordModal;
