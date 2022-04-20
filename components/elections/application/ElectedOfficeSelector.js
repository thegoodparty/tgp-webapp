/**
 *
 * ElectedOfficeSelector
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import { FaTrash } from 'react-icons/fa';

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
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Error = styled.div`
  color: red;
  margin-top: 8px;
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

function ElectedOfficeSelector({ application, updateApplicationCallback }) {
  const [state, setState] = useState([
    {
      fromYear: '',
      toYear: '',
      office: '',
    },
  ]);

  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (
      application?.candidate?.electedOffices &&
      application.candidate.electedOffices.length > 0
    ) {
      const existingOffices = [...application.candidate.electedOffices];
      existingOffices.push({
        fromYear: '',
        toYear: '',
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
        lastRow.fromYear === '' &&
        lastRow.toYear === '' &&
        lastRow.office === ''
      ) {
        newState.push({
          fromYear: '',
          toYear: '',
          office: '',
        });
      }
    }
    newState[index] = {
      ...newState[index],
      [key]: e.target.value,
    };
    setState(newState);

    if (
      newState[index].fromYear !== '' &&
      newState[index].toYear !== '' &&
      newState[index].fromYear > newState[index].toYear
    ) {
      setShowError(index);
    } else {
      setShowError(false);
    }
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
    if (showError === false) {
      updateApplicationCallback(application.id, {
        ...application,
        candidate: {
          ...application.candidate,
          electedOffices: newState,
        },
      });
    }
  };
  return (
    <>
      {state.map((row, index) => (
        <Wrapper key={index}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={6} md={3}>
              <WhiteSelect
                native
                value={row.fromYear}
                fullWidth
                variant="outlined"
                onChange={e => {
                  onChangeField('fromYear', e, index);
                }}
                onBlur={save}
              >
                <option value="">From Year...</option>
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
                value={row.toYear}
                fullWidth
                variant="outlined"
                onChange={e => {
                  onChangeField('toYear', e, index);
                }}
                onBlur={save}
              >
                <option value="">To Year...</option>
                {years.map(op => (
                  <option value={op} key={op}>
                    {op}
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
          </Grid>{' '}
          {index === showError && (
            <Error>&quot;To Year&quot; can&apos;t be smaller than &quot;From Year&quot;</Error>
          )}
        </Wrapper>
      ))}
    </>
  );
}

ElectedOfficeSelector.propTypes = {
  application: PropTypes.object,
  updateApplicationCallback: PropTypes.func,
};

export default ElectedOfficeSelector;
