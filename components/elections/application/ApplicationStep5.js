/**
 *
 * ApplicationStep4
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import IssuePositionsPickerContainer from 'containers/shared/IssuePositionsPickerContainer';

import ApplicationWrapper from './ApplicationWrapper';
import { H2 } from '../../shared/typogrophy';

function ApplicationStep4({ step, application, updateApplicationCallback }) {
  const [state, setState] = useState({});

  useEffect(() => {
    if (application?.issues) {
      setState({
        ...application.issues,
      });
    }
  }, [application]);

  const handlePositionChange = positions => {
    const updatedState = {
      ...state,
      positions,
    };
    updateApplicationCallback(application.id, {
      ...application,
      issues: {
        ...updatedState,
      },
    });
  };

  return (
    <ApplicationWrapper step={step} canContinue id={application.id}>
      <H2>Select Issues and positions you are aligned with</H2>
      <br />
      <br />
      <IssuePositionsPickerContainer
        selectedPositions={state.positions || []}
        onChange={handlePositionChange}
      />
    </ApplicationWrapper>
  );
}

ApplicationStep4.propTypes = {
  step: PropTypes.number,
  application: PropTypes.object,
  updateApplicationCallback: PropTypes.func,
};

export default ApplicationStep4;
