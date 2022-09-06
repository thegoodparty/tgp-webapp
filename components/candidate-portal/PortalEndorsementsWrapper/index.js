/**
 *
 * PortalEndorsementsWrapper
 *
 */

import React, { useContext, useState } from 'react';
import styled from 'styled-components';

import { EndorsementsContext } from '/containers/candidate-portal/PortalEndorsementsPage';
import PortalPageWrapper from '../shared/PortalPageWrapper';
import {  FontH3 } from '../../shared/typogrophy';
import NewEndorsementForm from './NewEndorsementForm';
import PortalPanel from '../shared/PortalPanel';
import BlackButton, { InnerButton } from '../../shared/buttons/BlackButton';
import Endorsement from './Endorsement';
import AlertDialog from '../../shared/AlertDialog';

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

function PortalEndorsementsWrapper() {
  const { candidate, role, endorsements, deleteEndorsementCallback } =
    useContext(EndorsementsContext);
  const [showAdd, setShowAdd] = useState(false);
  const [deleteEndorsement, setDeleteEndorsement] = useState(false);

  const deleteCallback = (endorsement) => setDeleteEndorsement(endorsement);
  const cancelDeleteCallback = () => setDeleteEndorsement(false);

  const handleDelete = () => {
    deleteEndorsementCallback(deleteEndorsement.id, candidate.id);
    setDeleteEndorsement(false);
  };

  return (
    <PortalPageWrapper role={role} key="Edit Key Endorsers">
      <PortalPanel color="#FF00DA">
        <Row>
          <FontH3 style={{ margin: '0 0 45px 0' }} data-cy="endorsements-title">Endorsements</FontH3>
          <BlackButton onClick={() => setShowAdd(true)} dataCy="add-endorsement">
            <InnerButton>Add Endorsement</InnerButton>
          </BlackButton>
        </Row>
        {showAdd && <NewEndorsementForm closeAdd={() => setShowAdd(false)} />}
        <br />
        {endorsements.map((endorsement, index) => (
          <Endorsement
            endorsement={endorsement}
            last={index === endorsements.length - 1}
            deleteCallback={deleteCallback}
            key={endorsement.id}
          />
        ))}
      </PortalPanel>
      <AlertDialog
        open={deleteEndorsement}
        handleClose={cancelDeleteCallback}
        title="Delete Endorsement"
        ariaLabel="Delete Endorsement"
        description="Are you sure you want to delete this endorsement? This cannot be undone."
        handleProceed={handleDelete}
      />
    </PortalPageWrapper>
  );
}

PortalEndorsementsWrapper.propTypes = {};

export default PortalEndorsementsWrapper;
