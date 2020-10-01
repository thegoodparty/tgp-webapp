import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
}));


export default function HorizontalStepper({ steps, activeStep = 0 }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label.toUpperCase()}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}