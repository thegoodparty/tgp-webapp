/**
 *
 * TopIssues
 *
 */

import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { FaEdit, FaTrash } from 'react-icons/fa';

import { TopIssuesPageContext } from '/containers/candidate-portal/TopIssuesPage';
import EditableTopIssue from './EditableTopIssue';
import AlertDialog from '../../shared/AlertDialog';

function TopIssue({ index, candidatePosition }) {
  const [editMode, setEditMode] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const { deleteCandidatePositionCallback, candidate } =
    useContext(TopIssuesPageContext);

  const deleteIssue = () => {
    deleteCandidatePositionCallback(candidatePosition.id, candidate.id);
  };

  const handleCloseAlert = () => setShowDeleteAlert(false);

  if (editMode) {
    return (
      <EditableTopIssue
        existingIssue={candidatePosition}
        existingOrder={index + 1}
        closeEditModeCallback={() => setEditMode(false)}
      />
    );
  }
  return (
    <React.Fragment key={candidatePosition.id}>
      <Grid item xs={1}>
        <span>{index + 1}.</span>
      </Grid>
      <Grid item xs={3}>
        {candidatePosition.topIssue?.name}
      </Grid>
      <Grid item xs={3}>
        {candidatePosition.position?.name}
      </Grid>
      <Grid item xs={3}>
        {candidatePosition.description}
      </Grid>

      <Grid item xs={2}>
        <FaEdit className="pointer" onClick={() => setEditMode(true)} /> &nbsp; &nbsp; &nbsp;{' '}
        <FaTrash className="pointer" onClick={() => setShowDeleteAlert(true)} />
      </Grid>
      <AlertDialog
        open={showDeleteAlert}
        handleClose={handleCloseAlert}
        title={'Delete Policy Issue?'}
        ariaLabel={'Delete Policy Issue?'}
        description={'Are you sure you want to delete this issue?'}
        handleProceed={deleteIssue}
      />
    </React.Fragment>
  );
}
TopIssue.propTypes = {
  candidatePosition: PropTypes.object,
  index: PropTypes.number,
};

export default TopIssue;
