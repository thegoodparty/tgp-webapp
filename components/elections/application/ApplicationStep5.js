/**
 *
 * ApplicationStep5
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import IssuePositionsPickerContainer from 'containers/shared/IssuePositionsPickerContainer';

import ApplicationWrapper from './ApplicationWrapper';
import { Body, H2 } from '../../shared/typogrophy';

const SubTitle = styled(Body)`
  margin-top: 8px;
  color: #666;
`;

function ApplicationStep5({
  step,
  application,
  updateApplicationCallback,
  reviewMode,
}) {
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

  const canSubmit = () => state.positions?.length > 0;

  return (
    <ApplicationWrapper
      step={step}
      canContinue={canSubmit()}
      id={application.id}
    >
      <H2>Top Issues for your Campaign</H2>
      <SubTitle>
        Please select any position tags you are aligned with to help distinguish
        your campaign.
      </SubTitle>
      <br />
      <br />
      <IssuePositionsPickerContainer
        selectedPositions={state.positions || []}
        onChange={handlePositionChange}
      />
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
