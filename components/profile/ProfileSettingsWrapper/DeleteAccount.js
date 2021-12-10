/**
 *
 * DeleteAccount
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import AlertDialog from '../../shared/AlertDialog';

const Delete = styled.div`
  color: red;
  margin-bottom: 24px;
  cursor: pointer;
`;

function DeleteAccount({ deleteAccountCallback }) {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  return (
    <>
      <Delete onClick={() => setShowConfirmDelete(true)}>
        Delete my account
      </Delete>
      <AlertDialog
        open={showConfirmDelete}
        handleClose={() => setShowConfirmDelete(false)}
        title="Delete Account"
        ariaLabel="Delete Account"
        description="Are you sure you want to delete your account? This cannot be undone."
        handleProceed={deleteAccountCallback}
      />
    </>
  );
}

DeleteAccount.propTypes = {
  deleteAccountCallback: PropTypes.func,
};

export default DeleteAccount;
