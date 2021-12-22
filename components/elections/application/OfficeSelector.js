/**
 *
 * OfficeSelector
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import { FaTrash } from 'react-icons/fa';

import { states } from 'helpers/statesHelper';

const Wrapper = styled.div`
  background-color: #f7f7f7;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 8px;
`;

const WhiteSelect = styled(Select)`
  && {
    background-color: #fff;
  }
`;

const WhiteTextField = styled(TextField)`
  && {
    background-color: #fff;
  }
`;

const Trash = styled.div`
  padding: 4px;
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.colors.purple};
  }
`;

const generateYears = () => {
  let currentYear = new Date().getFullYear();
  const years = [];
  const startYear = 1980;
  while (currentYear >= startYear) {
    years.push(currentYear--);
  }
  return years;
};

const years = generateYears();

function OfficeSelector({ application, updateApplicationCallback }) {
  const [state, setState] = useState([
    {
      year: '',
      state: '',
      office: '',
    },
  ]);

  useEffect(() => {
    if (
      application?.candidate?.offices &&
      application.candidate.offices.length > 0
    ) {
      const existingOffices = [...application.candidate.offices];
      existingOffices.push({
        year: '',
        state: '',
        office: '',
      });
      setState(existingOffices);
    }
  }, []);

  const onChangeField = (key, e, index) => {
    const newState = [...state];

    if (index === state.length - 1) {
      // updating last row
      const lastRow = state[index];
      if (
        lastRow.year === '' &&
        lastRow.state === '' &&
        lastRow.office === ''
      ) {
        newState.push({
          year: '',
          state: '',
          office: '',
        });
      }
    }
    newState[index] = {
      ...newState[index],
      [key]: e.target.value,
    };
    setState(newState);
  };

  const removeRow = index => {
    const newState = [...state];
    newState.splice(index, 1);
    setState(newState);
    save();
  };

  const save = () => {
    const newState = [...state];
    newState.splice(newState.length - 1, 1); // remove last empty row
    updateApplicationCallback(newState);
    updateApplicationCallback(application.id, {
      ...application,
      candidate: {
        ...application.candidate,
        offices: newState,
      },
    });
  };
  return (
    <>
      {state.map((row, index) => (
        <Wrapper key={index}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={6} md={3}>
              <WhiteSelect
                native
                value={row.year}
                fullWidth
                variant="outlined"
                onChange={e => {
                  onChangeField('year', e, index);
                }}
                onBlur={save}
              >
                <option value="">Year...</option>
                {years.map(op => (
                  <option value={op} key={op}>
                    {op}
                  </option>
                ))}
              </WhiteSelect>
            </Grid>
            <Grid item xs={6} md={4}>
              <WhiteSelect
                native
                value={row.state}
                fullWidth
                variant="outlined"
                onChange={e => {
                  onChangeField('state', e, index);
                }}
                onBlur={save}
              >
                <option value="">State...</option>
                {states.map(stateItem => (
                  <option
                    value={stateItem.abbreviation}
                    key={stateItem.abbreviation}
                  >
                    {stateItem.name}
                  </option>
                ))}
              </WhiteSelect>
            </Grid>
            <Grid item xs={11} md={4}>
              <WhiteTextField
                name="Office sought"
                variant="outlined"
                value={row.office}
                fullWidth
                label="Office sought"
                onChange={e => {
                  onChangeField('office', e, index);
                }}
                onBlur={save}
              />
            </Grid>
            <Grid item xs={1} className="text-center">
              {index !== state.length - 1 && (
                <Trash>
                  <FaTrash
                    onClick={() => {
                      removeRow(index);
                    }}
                  />
                </Trash>
              )}
            </Grid>
          </Grid>
        </Wrapper>
      ))}
    </>
  );
}

OfficeSelector.propTypes = {
  application: PropTypes.object,
  updateApplicationCallback: PropTypes.func,
};

export default OfficeSelector;
