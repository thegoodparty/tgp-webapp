/**
 *
 * ApplicationStep6
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

import { FaLink } from 'react-icons/fa';

import ApplicationWrapper from './ApplicationWrapper';
import { Body, Body11 } from '../../shared/typogrophy';
import { PurpleButton } from '../../shared/buttons';

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

const Subtitle = styled.div`
  margin-bottom: 12px;
  color: #666;
`;

const IconWrapper = styled.span`
  background-color: #bb91e4;
  color: #fff;
  border-radius: 2px;
  padding: 4px 4px 2px;
  font-size: 18px;
  margin-right: 16px;
`;

const EndorsementWrapper = styled.div`
  background-color: #fff;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.04), 0 0 2px rgba(0, 0, 0, 0.06),
    0 0 1px rgba(0, 0, 0, 0.04);
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    padding: 24px;
  }
`;

const fields = [
  {
    body: {
      key: 'body',
      label: 'Endorsement',
      subtitle: 'A snippet or summary of the endorsement.',
      placeholder: 'Enter...',
      defaultValue: '',
      type: 'text',
      multiline: true,
    },
    link: {
      key: 'link',
      label: 'Proof of endorsement',
      subtitle: 'For example a statement on the organization’s website or a newspaper article',
      placeholder: 'Enter...',
      defaultValue: '',
      type: 'text',
      icon: (
        <IconWrapper>
          <FaLink />
        </IconWrapper>
      ),
    },
  },
];
const emptyKeys = { body: '', link: '' };

const keys = [emptyKeys];

function ApplicationStep6({
  step,
  application,
  updateApplicationCallback,
  reviewMode,
}) {
  const [state, setState] = useState(keys);
  const [fieldsState, setFieldsState] = useState(fields);

  useEffect(() => {
    if (application?.endorsements) {
      setState(application.endorsements);
      if (application.endorsements.length > 1) {
        // we need to add fields
        const newFields = [];

        for (let i = 0; i < application.endorsements.length; i++) {
          newFields.push(fields[0]);
        }
        setFieldsState(newFields);
      }
    }
  }, [application]);

  const handleSubmitForm = e => e.stopPropagation();

  const onChangeField = (key, e, index) => {
    const updatedState = [...state];
    updatedState[index][key] = e.target.value;
    setState(updatedState);
  };

  const onBlurField = (key, e, index) => {
    const updatedState = [...state];
    updatedState[index][key] = e.target.value;

    updateApplicationCallback(application.id, {
      ...application,
      endorsements: updatedState,
    });
  };

  const handleAddMore = () => {
    const newFields = { ...fields[0] };
    const updatedFieldState = [...fieldsState, newFields];
    setFieldsState(updatedFieldState);

    const updatedSate = [...state, emptyKeys];
    setState(updatedSate);
  };

  const renderField = (field, index) => {
    return (
      <FieldWrapper key={field.key} className={field.grayBg && 'gray'}>
        <Label>{field.label}</Label>
        <Subtitle>{field.subtitle}</Subtitle>
        {(field.type === 'text' || field.type === 'email') && (
          <StyledTextField
            name={field.label}
            variant="outlined"
            value={state[index][field.key]}
            fullWidth
            type={field.type}
            required={field.required}
            placeholder={field.placeholder}
            multiline={!!field.multiline}
            rows={field.multiline ? 5 : 1}
            inputProps={{ maxLength: field.multiline ? 300 : 30 }}
            disabled={reviewMode}
            InputProps={
              field.icon && {
                startAdornment: (
                  <InputAdornment position="start">{field.icon}</InputAdornment>
                ),
              }
            }
            onChange={e => {
              onChangeField(field.key, e, index);
            }}
            onBlur={e => {
              onBlurField(field.key, e, index);
            }}
          />
        )}
      </FieldWrapper>
    );
  };
  return (
    <ApplicationWrapper
      step={step}
      canContinue
      id={application.id}
      withWhiteBg={false}
      reviewMode={reviewMode}
    >
      <form noValidate onSubmit={handleSubmitForm}>
        <Body>
          Use this page to add any institutional endorsements you may have
          received and want to highlight to voters. For example, your local
          rotary club, labor union, chamber of commerce, etc. Add endorsements
          one at a time.
        </Body>
        <br />
        {fieldsState.map((field, index) => (
          <EndorsementWrapper key={index}>
            {renderField(field.body, index)}
            {renderField(field.link, index)}
          </EndorsementWrapper>
        ))}
        {!reviewMode && (
          <PurpleButton onClick={handleAddMore}>
            <Body11 style={{ color: 'white' }}>
              &nbsp;&nbsp;Add more endorsements&nbsp;&nbsp;
            </Body11>
          </PurpleButton>
        )}
      </form>
    </ApplicationWrapper>
  );
}

ApplicationStep6.propTypes = {
  step: PropTypes.number,
  application: PropTypes.object,
  updateApplicationCallback: PropTypes.func,
  reviewMode: PropTypes.func,
};

export default ApplicationStep6;
