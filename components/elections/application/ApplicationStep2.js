/**
 *
 * ApplicationStep2
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

import ApplicationWrapper from './ApplicationWrapper';
import { Body, Body11 } from '../../shared/typogrophy';
import OfficeSelector from './OfficeSelector';
import ElectedOfficeSelector from './ElectedOfficeSelector';

import { step2fields, step2Socials } from './fields';
import { Title } from './ApplicationStep1';
import PhoneInput from '../../shared/PhoneInput';

const FieldWrapper = styled.div`
  margin-bottom: 32px;
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

const keys = {};
const requiredKeys = [];
step2fields.forEach((field) => {
  keys[field.key] = field.defaultValue;
  if (field.required) {
    requiredKeys.push(field);
  }
});

step2Socials.forEach((field) => {
  keys[field.key] = field.defaultValue;
});

function ApplicationStep2({
  step,
  application,
  updateApplicationCallback,
  reviewMode,
}) {
  const [state, setState] = useState(keys);
  const [hiddenElements, setHiddenElements] = useState({
    publicOffice: true,
    officeElected: true,
    partyHistory: true,
  });

  useEffect(() => {
    if (application?.candidate) {
      setState({
        ...application.candidate,
      });
      setHiddenElements({
        publicOffice: application.candidate.ranBefore !== 'Yes',
        officeElected: application.candidate.electedBefore !== 'Yes',
        partyHistory: application.candidate.memberPolitical !== 'Yes',
        otherParty: application.candidate.party !== 'Other',
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
      candidate: {
        ...updatedState,
      },
    });
  };

  const handleRadioChange = (key, e, toggleElement) => {
    if (toggleElement && e.target.value === 'Yes') {
      setHiddenElements({
        ...hiddenElements,
        [toggleElement]: false,
      });
    }
    if (toggleElement && e.target.value === 'No') {
      setHiddenElements({
        ...hiddenElements,
        [toggleElement]: true,
      });
    }
    onChangeField(key, e);
    onBlurField(key, e);
  };

  const handleSelectChange = (key, e, toggleElement) => {
    console.log('select1');
    if (key === 'party') {
      console.log('select2', toggleElement);
      if (toggleElement && e.target.value === 'Other') {
        console.log('select3');
        setHiddenElements({
          ...hiddenElements,
          [toggleElement]: false,
        });
      } else if (toggleElement && e.target.value !== 'Other') {
        console.log('select4');
        setHiddenElements({
          ...hiddenElements,
          [toggleElement]: true,
        });
      }
    }
    console.log('select5');
    onChangeField(key, e);
    onBlurField(key, e);
  };

  const handlePhoneChange = (key, val) => {
    setState({
      ...state,
      [key]: val,
    });
  };

  const canSubmit = () => {
    let returnVal = true;
    requiredKeys.forEach((field) => {
      if (
        typeof state[field.key] === 'undefined' ||
        state[field.key] === field.defaultValue
      ) {
        returnVal = false;
      }
    });
    return returnVal;
  };

  const renderField = (field) => {
    if (field.hidden && hiddenElements[field.key]) {
      return;
    }
    let maxLength = field.maxLength || 120;
    if (field.multiline) {
      maxLength = 300;
    }
    if (field.hidden && !hiddenElements[field.key]) {
      if (field.key === 'publicOffice') {
        return (
          <FieldWrapper>
            <OfficeSelector
              application={application}
              updateApplicationCallback={updateApplicationCallback}
            />
          </FieldWrapper>
        );
      }
      if (field.key === 'officeElected') {
        return (
          <FieldWrapper>
            <ElectedOfficeSelector
              application={application}
              updateApplicationCallback={updateApplicationCallback}
            />
          </FieldWrapper>
        );
      }
      if (field.key === 'partyHistory' || field.key === 'otherParty') {
        console.log('field.key', field.key, hiddenElements);
        return (
          <FieldWrapper key={field.key}>
            <Label>
              {field.label} {field.required && <Req>Required</Req>}
            </Label>
            <TextField
              name={field.label}
              variant="outlined"
              value={state[field.key]}
              fullWidth
              required={field.required}
              disabled={reviewMode}
              placeholder={field.placeholder}
              inputProps={{ maxLength }}
              multiline={!!field.multiline}
              rows={field.multiline ? 5 : 1}
              onChange={(e) => {
                onChangeField(field.key, e);
              }}
              onBlur={(e) => {
                onBlurField(field.key, e);
              }}
            />
          </FieldWrapper>
        );
      }

      return <FieldWrapper>{field.customElement}</FieldWrapper>;
    }

    return (
      <FieldWrapper key={field.key}>
        <Label>
          {field.label} {field.required && <Req>Required</Req>}
        </Label>
        {field.type === 'select' && (
          <Select
            native
            value={state[field.key]}
            fullWidth
            variant="outlined"
            disabled={reviewMode}
            onChange={(e) =>
              handleSelectChange(field.key, e, field.toggleElement)
            }
            onBlur={(e) => {
              onBlurField(field.key, e);
            }}
          >
            <option value="">Select</option>
            {field.options.map((op) => (
              <option value={op} key={op}>
                {op}
              </option>
            ))}
          </Select>
        )}
        {field.type === 'phone' && (
          <PhoneInput
            value={state[field.key]}
            onChangeCallback={(val, isValid) => {
              handlePhoneChange(field.key, val, isValid);
            }}
            onBlurCallback={(val) => {
              const e = { target: { value: val } };
              onBlurField(field.key, e);
            }}
          />
        )}
        {(field.type === 'text' || field.type === 'email' || field.type === 'date') && (
          <TextField
            name={field.label}
            variant="outlined"
            value={state[field.key]}
            type={field.type}
            fullWidth
            required={field.required}
            disabled={reviewMode}
            placeholder={field.placeholder}
            inputProps={{ maxLength }}
            multiline={!!field.multiline}
            rows={field.multiline ? 5 : 1}
            onChange={(e) => {
              onChangeField(field.key, e);
            }}
            onBlur={(e) => {
              onBlurField(field.key, e);
            }}
          />
        )}
        {field.type === 'radio' && (
          <RadioGroup
            name={state[field.key]}
            value={state[field.key]}
            style={{ flexDirection: 'row' }}
            onChange={(e) =>
              handleRadioChange(field.key, e, field.toggleElement)
            }
          >
            {field.options.map((op) => (
              <FormControlLabel
                style={{ display: 'inline-block' }}
                value={op}
                key={op}
                control={<Radio color="primary" />}
                label={op}
                disabled={reviewMode}
              />
            ))}
          </RadioGroup>
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
      <Title>Step 2: Add Candidate Details</Title>
      <form noValidate onSubmit={handleSubmitForm}>
        {step2fields.map((field) => (
          <React.Fragment key={field.key}>{renderField(field)}</React.Fragment>
        ))}
      </form>
    </ApplicationWrapper>
  );
}

ApplicationStep2.propTypes = {
  step: PropTypes.number,
  application: PropTypes.object,
  updateApplicationCallback: PropTypes.func,
  reviewMode: PropTypes.bool,
};

export default ApplicationStep2;
