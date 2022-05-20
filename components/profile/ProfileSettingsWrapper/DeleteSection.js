/**
 *
 * DeleteSection
 *
 */

import React, { useContext, useState } from 'react';
import styled from 'styled-components';

import { ProfileSettingsPageContext } from '/containers/profile/ProfileSettingsPage';

import PortalPanel from '../../candidate-portal/shared/PortalPanel';
import { FontH3 } from '../../shared/typogrophy';
import { InnerButton } from '../../shared/buttons/BlackButton';
import AlertDialog from '../../shared/AlertDialog';
import { PurpleButton } from '../../shared/buttons';

const RedButton = styled(PurpleButton)`
  && {
    background: red;
    color: #fff;
    border-color: red;
    transition: background-color 0.4s, color 0.4s;

    &:hover {
      background: #ea3030;
      color: #fff;
      border-color: #ea3030;
    }
  }
`;

function DeleteSection() {
  const { deleteAccountCallback } = useContext(ProfileSettingsPageContext);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  return (
    <section>
      <PortalPanel color="red">
        <FontH3 style={{ margin: '0 0 70px' }} data-cy="delete-account-title">
          Danger Zone - Delete your account
        </FontH3>
        <RedButton onClick={() => setShowConfirmDelete(true)}>
          <InnerButton>Delete Account</InnerButton>
        </RedButton>
      </PortalPanel>
      <AlertDialog
        open={showConfirmDelete}
        handleClose={() => setShowConfirmDelete(false)}
        title="Delete Account"
        ariaLabel="Delete Account"
        description="Are you sure you want to delete your account? This cannot be undone."
        handleProceed={deleteAccountCallback}
      />
    </section>
  );
}

export default DeleteSection;
