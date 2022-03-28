/**
 *
 * TopIssues
 *
 */

import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { FaEdit, FaTrash } from 'react-icons/fa';
import EditableTopIssue from './EditableTopIssue';
import { TopIssuesPageContext } from '../../../containers/candidate-portal/TopIssuesPage';

function TopIssue({ index, candidatePosition }) {
  const [editMode, setEditMode] = useState(false);
  const { deleteCandidatePositionCallback, candidate } =
    useContext(TopIssuesPageContext);

  const deleteIssue = () => {
    deleteCandidatePositionCallback(candidatePosition.id, candidate.id);
  };
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
    <React.Fragment>
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
        <FaEdit onClick={() => setEditMode(true)} /> &nbsp; &nbsp; &nbsp;{' '}
        <FaTrash onClick={deleteIssue} />
      </Grid>
      <Grid item xs={12}>
        <hr />
      </Grid>
    </React.Fragment>
  );
}
TopIssue.propTypes = {
  candidatePosition: PropTypes.object,
  index: PropTypes.number,
};

export default TopIssue;
