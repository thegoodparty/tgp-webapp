/**
 *
 * ComparedCandidates
 *
 */

import React, { useState, useCallback } from 'react';
import { debounce } from 'lodash.debounce';

import PropTypes from 'prop-types';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import { BlueButton } from 'components/shared/buttons';
import TextField from '@material-ui/core/TextField';

const Wrapper = styled.div`
  margin: 1rem 0;
`;

function ComparedCandidates({ candidate, candidatesCallback }) {
  const [candidates, setCandidates] = useState([
    {
      name: candidate ? `${candidate.firstName} ${candidate.lastName}` : '',
      party: candidate ? candidate.party : '',
    },
  ]);
  const [criteria, setCriteria] = useState([
    { name: 'Name', key: 'name' },
    { name: 'Party', key: 'party' },
  ]);

  const addCandidate = () => {
    const newCandidates = [...candidates];
    newCandidates.push({
      name: '',
    });
    setCandidates(newCandidates);
  };

  const addCriteria = () => {
    const newCriteria = [...criteria];
    newCriteria.push({ name: 'New Criteria', key: 'New Criteria' });
    setCriteria(newCriteria);
  };

  const onChangeCand = (key, val, index) => {
    const newCandidates = [...candidates];
    newCandidates[index][key] = val;
    setCandidates(newCandidates);
    updateResult();
  };

  const onChangeCriteria = (val, index) => {
    const newCriteria = [...criteria];
    newCriteria[index] = { name: val, key: val };
    setCriteria(newCriteria);
    updateResult();
  };

  const updateResult = () => {
    candidatesCallback(candidates);
  };

  return (
    <Wrapper>
      {criteria.map((crit, index) => (
        <Grid container spacing={3} key={crit.name}>
          <Grid item xs style={{ border: 'solid 1px #BBB' }}>
            <TextField
              fullWidth
              variant="outlined"
              value={crit.name}
              onChange={e => onChangeCriteria(e.target.value, index)}
              disabled={index === 0 || index === 1}
            />
          </Grid>
          {candidates.map((cand, index2) => (
            <Grid item xs style={{ border: 'solid 1px #EEE' }} key={cand.key}>
              <TextField
                fullWidth
                label={crit.name}
                variant="outlined"
                value={cand[crit.key]}
                onChange={e => onChangeCand(crit.key, e.target.value, index2)}
                disabled={index2 === 0 && index < 2}
              />
            </Grid>
          ))}
        </Grid>
      ))}
      <br />
      <br />
      <BlueButton onClick={addCandidate}>
        Add a Candidate to compare (Column)
      </BlueButton>{' '}
      <BlueButton onClick={addCriteria}>Add a Criteria (Row)</BlueButton>
    </Wrapper>
  );
}

ComparedCandidates.propTypes = {
  candidate: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
};

export default ComparedCandidates;
