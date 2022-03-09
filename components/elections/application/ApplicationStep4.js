/**
 *
 * ApplicationStep4
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import InputAdornment from '@material-ui/core/InputAdornment';
import { FaImage } from 'react-icons/fa';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { FaTrash } from 'react-icons/fa';

import ImageUploadContainer from '/containers/shared/ImageUploadContainer';

import ApplicationWrapper from './ApplicationWrapper';
import { Body } from '../../shared/typogrophy';
import { step2Socials, step3Socials } from './fields';
import { Title } from './ApplicationStep1';

const SocialFieldWrapper = styled.div`
  margin-bottom: 12px;
  .MuiInputAdornment-positionStart {
    margin-right: 0;
  }
  .MuiTypography-colorTextSecondary {
    color: #000;
    font-weight: 500;
  }
`;

const Label = styled(Body)`
  margin-bottom: 8px;
  font-weight: 600;
`;

const keys = {};

step2Socials.forEach((field) => {
  keys[field.key] = field.defaultValue;
});
step3Socials.forEach((field) => {
  keys[field.key] = field.defaultValue;
});

function ApplicationStep4({
  step,
  application,
  updateApplicationCallback,
  reviewMode,
}) {
  const [state, setState] = useState(keys);

  useEffect(() => {
    if (application?.socialMedia) {
      setState({
        ...application.socialMedia,
      });
    }
  }, [application]);

  const handleSubmitForm = (e) => e.stopPropagation();

  const onChangeField = (key, e) => {
    setState({
      ...state,
      [key]: e.target.value,
    });
  };

  const onBlurField = (key, e) => {
    const updatedState = {
      ...state,
      [key]: e.target.value,
    };
    updateApplicationCallback(application.id, {
      ...application,
      socialMedia: {
        ...updatedState,
      },
    });
  };
  return (
    <ApplicationWrapper
      step={step}
      canContinue={true}
      id={application.id}
      reviewMode={reviewMode}
    >
      <Title>Step 4: Add Social Media</Title>
      <form noValidate onSubmit={handleSubmitForm}>
        <Label>Official Campaign social media links</Label>
        {step3Socials.map((field) => (
          <SocialFieldWrapper key={field.key}>
            <TextField
              key={field.key}
              name={field.key}
              variant="outlined"
              value={state[field.key]}
              fullWidth
              placeholder={field.placeholder}
              disabled={reviewMode}
              inputProps={{
                maxLength: 50,
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {field.icon} &nbsp;
                    {field.adornment}
                  </InputAdornment>
                ),
              }}
              onChange={(e) => {
                onChangeField(field.key, e);
              }}
              onBlur={(e) => {
                onBlurField(field.key, e);
              }}
            />
          </SocialFieldWrapper>
        ))}
        <br />
        <br />
        <Label>Personal social media links for the Candidate</Label>
        {step2Socials.map((field) => (
          <SocialFieldWrapper key={field.key}>
            <TextField
              key={field.key}
              name={field.key}
              variant="outlined"
              value={state[field.key]}
              fullWidth
              placeholder={field.placeholder}
              disabled={reviewMode}
              inputProps={{
                maxLength: 50,
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {field.icon} &nbsp;
                    {field.adornment}
                  </InputAdornment>
                ),
              }}
              onChange={(e) => {
                onChangeField(field.key, e);
              }}
              onBlur={(e) => {
                onBlurField(field.key, e);
              }}
            />
          </SocialFieldWrapper>
        ))}
      </form>
    </ApplicationWrapper>
  );
}

ApplicationStep4.propTypes = {
  step: PropTypes.number,
  application: PropTypes.object,
  updateApplicationCallback: PropTypes.func,
  reviewMode: PropTypes.bool,
};

export default ApplicationStep4;
