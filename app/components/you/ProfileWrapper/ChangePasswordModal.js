import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import QueryModal from 'components/shared/QueryModal';
import { H2, Body } from 'components/shared/typogrophy';
import PasswordInput from 'components/shared/PasswordInput';
import { OutlinedButton } from 'components/shared/buttons';

const ChangePasswordModal = ({
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
    return newPassword.length >= 8 && oldPassword.length >= 8;
  };

  const handleSubmit = () => {
    if (enableSubmit()) {
      changePasswordCallback(newPassword, oldPassword);
      closeModalCallback();
    }
  };
  return (
    <QueryModal closeModalCallback={closeModalCallback}>
      <H2>Change Password</H2>
      <Body style={{ marginTop: '8px', marginBottom: '24px' }}>
        Enter a new password
      </Body>
      <form noValidate onSubmit={handleSubmitForm} data-cy="email-form">
        <PasswordInput
          onChangeCallback={newPasswordChange}
          label="New Password"
        />
        <div style={{ margin: '24px 0' }}>
          <PasswordInput
            onChangeCallback={oldPasswordChange}
            label="Current Password"
          />
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
  closeModalCallback: PropTypes.func,
  changePasswordCallback: PropTypes.func,
};

export default ChangePasswordModal;
