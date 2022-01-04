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
  color: #666;
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

const fields = [
  {
    label: 'Email',
    key: 'candidateEmail',
    placeholder: 'email@domain.com',
    defaultValue: '',
    type: 'email',
    required: true,
  },
  {
    label: 'Phone',
    key: 'candidatePhone',
    placeholder: '(555) 555-5555',
    defaultValue: '',
    type: 'text',
    required: true,
  },
];

const campaignFields = [
  {
    label: 'Contact Person',
    key: 'contactName',
    placeholder: 'First and last name',
    defaultValue: '',
    type: 'text',
    required: true,
  },
  {
    label: 'Role',
    key: 'contactRole',
    placeholder: 'Role in the campaign',
    defaultValue: '',
    type: 'text',
    required: true,
  },
  {
    label: 'Email',
    key: 'contactEmail',
    placeholder: 'email@domain.com',
    defaultValue: '',
    type: 'email',
    required: true,
  },
  {
    label: 'Phone',
    key: 'contactPhone',
    placeholder: '(555) 555-5555',
    defaultValue: '',
    type: 'text',
    required: true,
  },
  {
    label: 'Mailing Address',
    key: 'contactAddress',
    placeholder: 'Street, City and ZIP Code',
    defaultValue: '',
    type: 'text',
    required: true,
  },
];

const keys = {};
const requiredKeys = [];
fields.forEach(field => {
  keys[field.key] = field.defaultValue;
  if (field.required) {
    requiredKeys.push(field);
  }
});
campaignFields.forEach(field => {
  keys[field.key] = field.defaultValue;
  if (field.required) {
    requiredKeys.push(field);
  }
});

function ApplicationStep4({ step, application, updateApplicationCallback }) {
  const [state, setState] = useState(keys);

  useEffect(() => {
    if (application?.contacts) {
      setState({
        ...application.contacts,
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
        {(field.type === 'text' || field.type === 'email') && (
          <StyledTextField
            name={field.label}
            variant="outlined"
            value={state[field.key]}
            fullWidth
            type={field.type}
            required={field.required}
            placeholder={field.placeholder}
            multiline={!!field.multiline}
            rows={field.multiline ? 5 : 1}
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
    >
      <form noValidate onSubmit={handleSubmitForm}>
        <Label>
          CANDIDATE <Req>Required</Req>
        </Label>
        <GrayWrapper className="with-margin">
          {fields.map(field => (
            <React.Fragment key={field.key}>
              {renderField(field)}
            </React.Fragment>
          ))}
        </GrayWrapper>
        <Label>
          CAMPAIGN <Req>Required</Req>
        </Label>
        <GrayWrapper>
          {campaignFields.map(field => (
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
};

export default ApplicationStep4;
