/**
 *
 * NewTopIssues
 *
 */

import React, { useState, useContext, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { FaSave } from 'react-icons/fa';

import { TopIssuesPageContext } from '/containers/candidate-portal/TopIssuesPage';

import BlackButton from '../../shared/buttons/BlackButton';

function EditableTopIssue({
  existingIssue,
  existingOrder,
  closeEditModeCallback,
}) {
  const {
    candidatePositions,
    topIssues,
    candidate,
    saveIssueCallback,
    updateIssueCallback,
  } = useContext(TopIssuesPageContext);

  console.log('existin', existingIssue);

  const order = existingOrder
    ? existingOrder
    : candidatePositions?.length + 1 || 1;

  const [state, setState] = useState({
    topic: existingIssue ? existingIssue.topIssue : '',
    position: existingIssue ? existingIssue.position : '',
    description: existingIssue ? existingIssue.description : '',
  });

  const [availableIssues, setAvailableIssues] = useState(topIssues);

  useEffect(() => {
    const available = topIssues.filter((issue) => {
      return candidatePositions.find(
        (position) => position.topIssue.id !== issue.id,
      );
    });
    setAvailableIssues(available);
  }, [candidatePositions]);

  const save = () => {
    if (existingIssue) {
      updateIssueCallback(
        existingIssue.id,
        state.topic.id,
        state.position.id,
        state.description,
        candidate.id,
      );
      closeEditModeCallback();
    } else {
      saveIssueCallback(
        state.topic.id,
        state.position.id,
        state.description,
        candidate.id,
        order,
      );

      setState({
        topic: '',
        position: '',
        description: '',
      });
    }
  };

  const canSubmit = () =>
    state.topic !== '' && state.position !== '' && state.description !== '';

  const onChangeField = (value, key) => {
    const updatedState = {
      ...state,
      [key]: value,
    };
    if (key === 'topic') {
      updatedState.position = '';
    }
    setState(updatedState);
  };
  return (
    <React.Fragment>
      <Grid item xs={1}>
        <span>{order}.</span>
      </Grid>
      <Grid item xs={3}>
        <Autocomplete
          size="small"
          options={availableIssues}
          value={state.topic}
          getOptionLabel={(item) => item?.name}
          fullWidth
          renderInput={(params) => (
            <TextField {...params} label="Topic" variant="outlined" />
          )}
          onChange={(event, item) => {
            onChangeField(item, 'topic');
          }}
        />
      </Grid>
      <Grid item xs={3}>
        <Autocomplete
          size="small"
          options={state.topic.positions || []}
          value={state.position}
          getOptionLabel={(item) => item.name}
          fullWidth
          renderInput={(params) => (
            <TextField {...params} label="Position" variant="outlined" />
          )}
          onChange={(event, item) => {
            onChangeField(item, 'position');
          }}
        />
      </Grid>
      <Grid item xs={3}>
        <TextField
          fullWidth
          size="small"
          primary
          label="Description"
          name="Description"
          variant="outlined"
          value={state.description}
          onChange={(e) => {
            onChangeField(e.target.value, 'description');
          }}
        />
      </Grid>

      <Grid item xs={2}>
        <BlackButton onClick={save} disabled={!canSubmit()} fullWidth>
          <FaSave /> &nbsp; {existingIssue ? 'UPDATE' : 'SAVE'}
        </BlackButton>
      </Grid>
      <Grid item xs={12}>
        <hr />
      </Grid>
    </React.Fragment>
  );
}

export default EditableTopIssue;
