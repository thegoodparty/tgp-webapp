/**
 *
 * ApplicationStep5
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import IssuePositionsPickerContainer from '/containers/shared/IssuePositionsPickerContainer';

import ApplicationWrapper from './ApplicationWrapper';
import { Body, H2 } from '../../shared/typogrophy';
import TopIssue from '../../candidate-portal/TopIssuesWrapper/TopIssue';
import TopIssueRow from './TopIssueRow';

const SubTitle = styled(Body)`
  margin-top: 8px;
  color: #666;
`;

const initialState = {
  selectedTopic: null,
  selectedPosition: null,
  description: '',
};

function ApplicationStep5({
  step,
  application,
  updateApplicationCallback,
  reviewMode,
  issues,
}) {
  const [state, setState] = useState([
    initialState,
    initialState,
    initialState,
    initialState,
    initialState,
  ]);

  const [validIssues, setValidIssues] = useState(issues);

  useState(() => {
    setValidIssues(issues);
  }, [issues]);

  useEffect(() => {
    if (application?.topIssues) {
      setState(application.topIssues);
    }
  }, [application]);

  const canSubmit = () =>
    state &&
    state.length > 0 &&
    state[0].selectedTopic &&
    state[0].selectedPosition;

  const handleRowUpdate = (updatedRow, index) => {
    const newState = [...state];
    newState[index] = updatedRow;
    setState(newState);
    updateApplicationCallback(application.id, {
      ...application,
      topIssues: newState,
    });

    const filteredIssues = issues.filter((issue) => {
      let found = false;
      newState.forEach((row) => {
        if (row.selectedTopic?.id === issue.id) {
          found = true;
        }
      });
      return !found;
    });

    setValidIssues(filteredIssues);
  };

  return (
    <ApplicationWrapper
      step={step}
      canContinue={canSubmit()}
      id={application.id}
    >
      <H2>Top Issues for your Campaign</H2>
      <SubTitle>
        Please select up to top five (5) issue tags you are aligned with to help
        supporters distinguish your campaign.
      </SubTitle>
      <br />
      <br />
      {(state || []).map((row, index) => (
        <TopIssueRow
          issues={validIssues}
          row={row}
          index={index}
          updateCallback={handleRowUpdate}
        />
      ))}
    </ApplicationWrapper>
  );
}

ApplicationStep5.propTypes = {
  step: PropTypes.number,
  application: PropTypes.object,
  updateApplicationCallback: PropTypes.func,
  reviewMode: PropTypes.bool,
};

export default ApplicationStep5;
