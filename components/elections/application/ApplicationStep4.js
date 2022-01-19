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
import InputAdornment from '@material-ui/core/InputAdornment';

import ApplicationWrapper from './ApplicationWrapper';
import { Body, Body11 } from '../../shared/typogrophy';

import { step4Fields, step4CampaignFields } from './fields';
import PhoneInput, { isValidPhone } from '../../shared/PhoneInput';

const FieldWrapper = styled.div`
  margin-bottom: 32px;
  &.gray {
    background-color: #f7f7f7;
    padding: 16px;
    border-radius: 8px;
  }
`;

const StyledTextField = styled(TextField)`
  && {
    background-color: #fff;
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

const GrayWrapper = styled.div`
  background-color: #f7f7f7;
  padding: 16px;
  border-radius: 8px;
  &.with-margin {
    margin-bottom: 48px;
  }
`;

const keys = {};
const requiredKeys = [];
step4Fields.forEach(field => {
  keys[field.key] = field.defaultValue;
  if (field.required) {
    requiredKeys.push(field);
  }
});
step4CampaignFields.forEach(field => {
  keys[field.key] = field.defaultValue;
  if (field.required) {
    requiredKeys.push(field);
  }
});

function ApplicationStep4({
  step,
  application,
  updateApplicationCallback,
  reviewMode,
}) {
  const [state, setState] = useState(keys);
  const [validPhones, setValidPhones] = useState({
    candidatePhone: false,
    contactPhone: false,
  });

  useEffect(() => {
    if (application?.contacts) {
      setState({
        ...application.contacts,
      });
      setValidPhones({
        candidatePhone: isValidPhone(application.contacts.candidatePhone),
        contactPhone: isValidPhone(application.contacts.contactPhone),
      });
    }
  }, [application]);

  const handleSubmitForm = e => e.stopPropagation();

  const onChangeField = (key, e) => {
    setState({
      ...state,
      [key]: e.target.value,
    });
  };

  const handlePhoneChange = (key, val, isValid) => {
    setState({
      ...state,
      [key]: val,
    });
  };

  const onBlurField = (key, e) => {
    const updatedState = {
      ...state,
      [key]: e.target.value,
    };
    updateApplicationCallback(application.id, {
      ...application,
      contacts: {
        ...updatedState,
      },
    });
  };

  const canSubmit = () => {
    let returnVal = true;
    requiredKeys.forEach(field => {
      if (
        typeof state[field.key] === 'undefined' ||
        state[field.key] === field.defaultValue
      ) {
        returnVal = false;
      }
    });
    if (!validPhones.candidatePhone || !validPhones.contactPhone) {
      returnVal = false;
    }
    return returnVal;
  };

  const renderField = field => {
    return (
      <FieldWrapper key={field.key} className={field.grayBg && 'gray'}>
        <Label>{field.label}</Label>
        {field.type === 'select' && (
          <Select
            native
            value={state[field.key]}
            fullWidth
            variant="outlined"
            disabled={reviewMode}
            onChange={e => {
              onChangeField(field.key, e);
            }}
            onBlur={e => {
              onBlurField(field.key, e);
            }}
          >
            <option value="">Select</option>
            {field.options.map(op => (
              <option value={op} key={op}>
                {op}
              </option>
            ))}
          </Select>
        )}
        {field.type === 'phone' && (
          <PhoneInput
            onChangeCallback={(val, isValid) => {
              handlePhoneChange(field.key, val, isValid);
            }}
            onBlurCallback={val => {
              const e = { target: { value: val } };
              onBlurField(field.key, e);
            }}
          />
        )}
        {(field.type === 'text' || field.type === 'email') && (
          <StyledTextField
            name={field.label}
            variant="outlined"
            value={state[field.key]}
            fullWidth
            disabled={reviewMode}
            type={field.type}
            required={field.required}
            placeholder={field.placeholder}
            inputProps={{ maxLength: field.maxLength || 30 }}
            InputProps={
              field.icon && {
                startAdornment: (
                  <InputAdornment position="start">{field.icon}</InputAdornment>
                ),
              }
            }
            onChange={e => {
              onChangeField(field.key, e);
            }}
            onBlur={e => {
              onBlurField(field.key, e);
            }}
          />
        )}
      </FieldWrapper>
    );
  };
  return (
    <ApplicationWrapper
      step={step}
      canContinue={canSubmit()}
      id={application.id}
      reviewMode={reviewMode}
    >
      <form noValidate onSubmit={handleSubmitForm}>
        <Label>
          CANDIDATE <Req>Required</Req>
        </Label>
        <GrayWrapper className="with-margin">
          {step4Fields.map(field => (
            <React.Fragment key={field.key}>
              {renderField(field)}
            </React.Fragment>
          ))}
        </GrayWrapper>
        <Label>
          CAMPAIGN <Req>Required</Req>
        </Label>
        <GrayWrapper>
          {step4CampaignFields.map(field => (
            <React.Fragment key={field.key}>
              {renderField(field)}
            </React.Fragment>
          ))}
        </GrayWrapper>
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
