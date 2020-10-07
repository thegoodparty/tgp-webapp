import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

const TgpStepper = styled(Stepper)`
  && {
    &.MuiStepper-root {
      padding: 24px 0;
    }
  }
`;

function HorizontalStepper({ steps, activeStep = 0 }) {
  return (
    <TgpStepper activeStep={activeStep} alternativeLabel>
      {steps.map(label => (
        <Step key={label}>
          <StepLabel>{label.toUpperCase()}</StepLabel>
        </Step>
      ))}
    </TgpStepper>
  );
}

HorizontalStepper.propTypes = {
  steps: PropTypes.array,
  activeStep: PropTypes.number,
};

export default HorizontalStepper;
