/**
 *
 * TopIssueRow
 *
 */

import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { FaTrash } from 'react-icons/fa';

const Wrapper = styled.div`
  margin-bottom: 32px;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    margin-bottom: 16px;
  }
`;

const initialState = {
  selectedTopic: null,
  selectedPosition: null,
  description: '',
};
function TopIssueRow({ index, issues, updateCallback, row }) {
  const [state, setState] = useState(row);
  useEffect(() => {
    setState(row);
  }, [row]);

  const topicAuto = useRef(null);
  const positionAuto = useRef(null);

  if (!issues) {
    return <></>;
  }

  const onChangeField = (item, key) => {
    const newState = {
      ...state,
      [key]: item,
    };
    if (key === 'selectedTopic') {
      newState.selectedPosition = null;
    }
    setState(newState);
    if (key !== 'description') {
      updateCallback(newState, index);
    }
  };

  const onBlurField = (val, key) => {
    onChangeField(val, key);
    const newState = {
      ...state,
      [key]: val,
    };

    updateCallback(newState, index);
  };

  const clearRow = () => {
    setState(initialState);
    const ele = topicAuto.current.getElementsByClassName(
      'MuiAutocomplete-clearIndicator',
    )[0];
    if (ele) ele.click();

    const ele2 = positionAuto.current.getElementsByClassName(
      'MuiAutocomplete-clearIndicator',
    )[0];
    if (ele2) ele2.click();
    updateCallback(initialState, index);
  };

  return (
    <Wrapper key={index}>
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={1}>
          {index + 1}.
        </Grid>
        <Grid item xs={11} md={3}>
          <Autocomplete
            size="small"
            options={issues}
            getOptionLabel={(item) => item?.topic}
            fullWidth
            ref={topicAuto}
            value={state.selectedTopic}
            renderInput={(params) => (
              <TextField {...params} label="Topic" variant="outlined" />
            )}
            onChange={(e, item) => onChangeField(item, 'selectedTopic')}
          />
        </Grid>
        <Grid item xs={6} md={3}>
          <Autocomplete
            size="small"
            options={state.selectedTopic?.positions || []}
            getOptionLabel={(item) => item?.name}
            fullWidth
            ref={positionAuto}
            value={state.selectedPosition}
            renderInput={(params) => (
              <TextField {...params} label="Position" variant="outlined" />
            )}
            onChange={(e, item) => onChangeField(item, 'selectedPosition')}
            disabled={!state.selectedTopic}
          />
        </Grid>
        <Grid item xs={5} md={4}>
          <TextField
            size="small"
            fullWidth
            multiline
            inputProps={{ maxLength: 300 }}
            value={state.description}
            label="Description"
            variant="outlined"
            onChange={(e) => onChangeField(e.target.value, 'description')}
            onBlur={(e) => onBlurField(e.target.value, 'description')}
          />
        </Grid>
        <Grid item xs={1}>
          <FaTrash size={18} onClick={clearRow} />
        </Grid>
      </Grid>
    </Wrapper>
  );
}

TopIssueRow.propTypes = {
  index: PropTypes.number,
  issues: PropTypes.array,
  updateCallback: PropTypes.func,
};

export default TopIssueRow;
