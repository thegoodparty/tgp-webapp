/**
 *
 * ApplicationStep3
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
import { step3Fields } from './fields';
import { Title } from './ApplicationStep1';

const FieldWrapper = styled.div`
  margin-bottom: 32px;
  &.gray {
    background-color: #f7f7f7;
    padding: 16px;
    border-radius: 8px;
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
  color: #000;
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
const requiredKeys = [{ key: 'headshotPhoto', defaultValue: '' }];
step3Fields.forEach((field) => {
  keys[field.key] = field.defaultValue;
  if (field.required) {
    requiredKeys.push(field);
  }
});

function ApplicationStep3({
  step,
  application,
  updateApplicationCallback,
  reviewMode,
}) {
  const [state, setState] = useState(keys);

  useEffect(() => {
    if (application?.campaign) {
      setState({
        ...application.campaign,
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
      campaign: {
        ...updatedState,
      },
    });
  };

  const handleRadioChange = (key, e) => {
    onChangeField(key, e);
    onBlurField(key, e);
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

  const handleUploadImage = (image, key) => {
    const e = {
      target: {
        value: image,
      },
    };

    onBlurField(key, e);
  };

  const handleDeleteImage = (key) => {
    const e = {
      target: {
        value: '',
      },
    };

    onBlurField(key, e);
  };

  const handleDateChange = (key, date) => {
    // const formatted = dateUsHelper(date);
    const e = { target: { value: date } };
    onChangeField(key, e);
    onBlurField(key, e);
  };

  const renderField = (field) => {
    if (field.key === 'headshotPhoto') {
      return (
        <FieldWrapper key={field.key} className={field.grayBg && 'gray'}>
          <Label>
            {field.label} {field.required && <Req>Required</Req>}
            {field.subLabel && <Req>{field.subLabel}</Req>}
          </Label>
          <Subtitle>{field.subtitle}</Subtitle>
          {state[field.key] ? (
            <PhotoWrapper>
              <Photo src={state[field.key]} alt={field.key} />
              <DeletePhoto onClick={() => handleDeleteImage(field.key)}>
                <FaTrash />
              </DeletePhoto>
            </PhotoWrapper>
          ) : (
            <>
              {!reviewMode && (
                <PhotoInputWrapper key={field.key}>
                  <UploadWrapper>
                    <ImageUploadContainer
                      uploadCallback={(image) =>
                        handleUploadImage(image, field.key)
                      }
                      maxFileSize={1000000}
                    />
                  </UploadWrapper>
                  <PhotoPlaceholder>
                    <IconWrapper>
                      <FaImage style={{ marginTop: '6px' }} />
                    </IconWrapper>
                    {field.label}
                  </PhotoPlaceholder>
                </PhotoInputWrapper>
              )}{' '}
            </>
          )}
        </FieldWrapper>
      );
    }
    let maxLength = field.maxLength || 120;
    if (field.multiline) {
      maxLength = 300;
    }

    return (
      <FieldWrapper key={field.key} className={field.grayBg && 'gray'}>
        {!field.noLabel && (
          <Label>
            {field.label} {field.required && <Req>Required</Req>}
            {field.subLabel && <Req>{field.subLabel}</Req>}
          </Label>
        )}
        {field.type === 'select' && (
          <>
            {field.key === 'state' ? (
              <Autocomplete
                options={field.options}
                value={state[field.key]}
                // getOptionLabel={item => item.name}
                fullWidth
                variant="outlined"
                renderInput={(params) => (
                  <TextField {...params} label="State" variant="outlined" />
                )}
                onChange={(event, item) => {
                  const e = { target: { value: item } };
                  onChangeField(field.key, e);
                  onBlurField(field.key, e);
                }}
              />
            ) : (
              <Select
                native
                value={state[field.key]}
                fullWidth
                variant="outlined"
                disabled={reviewMode}
                onChange={(e) => {
                  onChangeField(field.key, e);
                }}
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
          </>
        )}
        {field.subtitle && <Subtitle>{field.subtitle}</Subtitle>}
        {field.type === 'text' && (
          <TextField
            name={field.label}
            variant="outlined"
            value={state[field.key]}
            fullWidth
            required={field.required}
            placeholder={field.placeholder}
            multiline={!!field.multiline}
            rows={field.multiline ? 5 : 1}
            disabled={reviewMode}
            inputProps={{
              maxLength,
            }}
            InputProps={
              field.icon && {
                startAdornment: (
                  <InputAdornment position="start">{field.icon}</InputAdornment>
                ),
              }
            }
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
            onChange={(e) => handleRadioChange(field.key, e)}
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
        {/* TODO: Fix this! */}

        {field.type === 'date' && (
          <TextField
            variant="outlined"
            fullWidth
            type="date"
            value={state[field.key]}
            onChange={(ev) => {
              handleDateChange(field.key, ev.target.value);
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
      <Title>Step 3: Add Campaign Details</Title>
      <form noValidate onSubmit={handleSubmitForm}>
        {step3Fields.map((field) => (
          <React.Fragment key={field.key}>{renderField(field)}</React.Fragment>
        ))}
      </form>
    </ApplicationWrapper>
  );
}

ApplicationStep3.propTypes = {
  step: PropTypes.number,
  application: PropTypes.object,
  updateApplicationCallback: PropTypes.func,
  reviewMode: PropTypes.bool,
};

export default ApplicationStep3;
