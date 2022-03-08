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
import { Body, Body11 } from '../../shared/typogrophy';
import { step2Socials, step3Socials } from './fields';
import { Title } from './ApplicationStep1';

const FieldWrapper = styled.div`
  margin-bottom: 32px;
  &.gray {
    background-color: #f7f7f7;
    padding: 16px;
    border-radius: 8px;
  }
`;
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

const Req = styled(Body11)`
  display: inline-block;
  margin-left: 8px;
  color: #cc3366;
  font-weight: 500;
`;

const IconWrapper = styled.span`
  color: ${({ theme }) => theme.colors.purple};
  font-size: 24px;
  margin-right: 16px;
`;

const Subtitle = styled.div`
  margin-bottom: 12px;
  color: #666;
`;

const PhotoInputWrapper = styled.div`
  padding: 10px 16px;
  border: solid 1px #ccc;
  border-radius: 4px;
  text-align: right;
  position: relative;
  margin-bottom: 12px;
`;

const PhotoPlaceholder = styled.div`
  position: absolute;
  opacity: 0.4;
  top: 6px;
  left: 12px;
  height: 44px;
  display: flex;
  align-items: center;
`;

const UploadWrapper = styled.div`
  position: relative;
  z-index: 5;
`;

const PhotoWrapper = styled.div`
  position: relative;
  text-align: center;
  width: 100%;
  display: inline-block;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    width: 33%;
  }
`;

const Photo = styled.img`
  width: 100%;
  height: auto;
  border-radius: 12px;
`;

const DeletePhoto = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px;
  color: red;
  text-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
  cursor: pointer;
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
        <Label>Candidate’s personal social media links</Label>
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
