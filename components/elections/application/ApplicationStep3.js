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
import {
  FaTwitterSquare,
  FaFacebookSquare,
  FaYoutubeSquare,
  FaLinkedin,
  FaSnapchatSquare,
  FaTiktok,
  FaRedditSquare,
  FaGlobeAmericas,
} from 'react-icons/fa';

import ApplicationWrapper from './ApplicationWrapper';
import { Body, Body11 } from '../../shared/typogrophy';
import OfficeSelector from './OfficeSelector';
import ElectedOfficeSelector from './ElectedOfficeSelector';

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
  color: #666;
  font-weight: 500;
`;

const IconWrapper = styled.span`
  color: ${({ theme }) => theme.colors.purple};
  font-size: 24px;
  margin-right: 16px;
`;

const fields = [
  {
    label: 'What are you running for?',
    key: 'running for',
    placeholder: 'First Name',
    required: true,
    defaultValue: '',
    type: 'text',
  },
  {
    label: 'Candidate Last Name',
    key: 'lastName',
    placeholder: 'Last Name',
    required: true,
    defaultValue: '',
    type: 'text',
  },
  {
    label: 'Preferred pronouns of candidate',
    key: 'pronouns',
    defaultValue: '',
    type: 'select',
    options: ['He/Him', 'She/Her', 'They/Them'],
  },
  {
    label: 'Ethnicity of candidate',
    key: 'ethnicity',
    defaultValue: '',
    type: 'text',
    placeholder: 'Ethnicity',
  },
  {
    label: 'Race of candidate',
    key: 'race',
    defaultValue: '',
    type: 'text',
    placeholder: 'Race',
  },
  {
    label: 'Where is the primary residence of the candidate?',
    key: 'zip',
    placeholder: 'Enter Zip Code',
    required: true,
    defaultValue: '',
    type: 'text',
  },
  {
    label: 'Is the candidate a U.S. Citizen?',
    key: 'citizen',
    required: true,
    defaultValue: '',
    type: 'radio',
    options: ['Yes', 'No'],
  },
  // {
  //   label: 'Length of citizenship',
  //   key: 'citizenLength',
  //   defaultValue: '',
  //   type: 'radio',
  //   options: ['Citizen at birth', 'Select date of naturalization'],
  // },
  {
    label: 'Have you ever run for public office before?',
    key: 'ranBefore',
    defaultValue: '',
    required: true,
    type: 'radio',
    options: ['Yes', 'No'],
    toggleElement: 'publicOffice',
  },
  {
    key: 'publicOffice',
    hidden: true,
  },
  {
    label: 'Have you ever been elected or appointed to public office?',
    key: 'electedBefore',
    defaultValue: '',
    required: true,
    type: 'radio',
    options: ['Yes', 'No'],
    toggleElement: 'officeElected',
  },
  {
    key: 'officeElected',
    hidden: true,
  },

  {
    label: 'Have you ever been a registered member of a political party?',
    key: 'memberPolitical',
    defaultValue: '',
    required: true,
    type: 'radio',
    options: ['Yes', 'No'],
  },
];

const socials = [
  {
    key: 'twitter',
    adornment: 'twitter.com/',
    placeholder: 'username',
    defaultValue: '',
    icon: (
      <IconWrapper>
        <FaTwitterSquare />
      </IconWrapper>
    ),
  },
  {
    key: 'facebook',
    adornment: 'facebook.com/',
    placeholder: 'link',
    defaultValue: '',
    icon: (
      <IconWrapper>
        <FaFacebookSquare />
      </IconWrapper>
    ),
  },
  {
    key: 'youtube',
    adornment: 'youtube.com/',
    placeholder: 'username',
    defaultValue: '',
    icon: (
      <IconWrapper>
        <FaYoutubeSquare />
      </IconWrapper>
    ),
  },
  {
    key: 'linkedin',
    adornment: 'linkedin.com/',
    placeholder: 'username',
    defaultValue: '',
    icon: (
      <IconWrapper>
        <FaLinkedin />
      </IconWrapper>
    ),
  },
  {
    key: 'snap',
    adornment: 'snap.com/',
    placeholder: 'username',
    defaultValue: '',
    icon: (
      <IconWrapper>
        <FaSnapchatSquare />
      </IconWrapper>
    ),
  },
  {
    key: 'tiktok',
    adornment: 'tiktok.com/',
    placeholder: 'username',
    defaultValue: '',
    icon: (
      <IconWrapper>
        <FaTiktok />
      </IconWrapper>
    ),
  },
  {
    key: 'reddit',
    adornment: 'reddit.com/',
    placeholder: 'username',
    defaultValue: '',
    icon: (
      <IconWrapper>
        <FaRedditSquare />
      </IconWrapper>
    ),
  },
  {
    key: 'website',
    adornment: '',
    placeholder: 'website.com',
    defaultValue: '',
    icon: (
      <IconWrapper>
        <FaGlobeAmericas />
      </IconWrapper>
    ),
  },
];

const keys = {};
fields.forEach(field => {
  keys[field.key] = field.defaultValue;
});

socials.forEach(field => {
  keys[field.key] = field.defaultValue;
});

function ApplicationStep3({ step, application, updateApplicationCallback }) {
  const [state, setState] = useState(keys);
  const [hiddenElements, setHiddenElements] = useState({
    publicOffice: true,
    officeElected: true,
  });

  useEffect(() => {
    if (application?.candidate) {
      setState({
        ...application.candidate,
      });
      setHiddenElements({
        publicOffice: application.candidate.ranBefore !== 'Yes',
        officeElected: application.candidate.electedBefore !== 'Yes',
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

  const renderField = field => {
    if (field.hidden && hiddenElements[field.key]) {
      return;
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
      return <FieldWrapper>{field.customElement}</FieldWrapper>;
    }
    return (
      <FieldWrapper key={field.key}>
        <Label>
          {field.label} {field.required && <Req>required</Req>}
        </Label>
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
        {field.type === 'text' && (
          <TextField
            name={field.label}
            variant="outlined"
            value={state[field.key]}
            fullWidth
            required={field.required}
            placeholder={field.placeholder}
            onChange={e => {
              onChangeField(field.key, e);
            }}
            onBlur={e => {
              onBlurField(field.key, e);
            }}
          />
        )}
        {field.type === 'radio' && (
          <RadioGroup
            name={state[field.key]}
            value={state[field.key]}
            style={{ flexDirection: 'row' }}
            onChange={e => handleRadioChange(field.key, e, field.toggleElement)}
          >
            {field.options.map(op => (
              <FormControlLabel
                style={{ display: 'inline-block' }}
                value={op}
                key={op}
                control={<Radio color="primary" />}
                label={op}
              />
            ))}
          </RadioGroup>
        )}
      </FieldWrapper>
    );
  };
  return (
    <ApplicationWrapper step={step} canContinue id={application.id}>
      <form noValidate onSubmit={handleSubmitForm}>
        {fields.map(field => (
          <React.Fragment key={field.key}>{renderField(field)}</React.Fragment>
        ))}
        <Label>Candidate social links</Label>
        {socials.map(field => (
          <SocialFieldWrapper key={field.key}>
            <TextField
              key={field.key}
              name={field.key}
              variant="outlined"
              value={state[field.key]}
              fullWidth
              placeholder={field.placeholder}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {field.icon} &nbsp;
                    {field.adornment}
                  </InputAdornment>
                ),
              }}
              onChange={e => {
                onChangeField(field.key, e);
              }}
              onBlur={e => {
                onBlurField(field.key, e);
              }}
            />
          </SocialFieldWrapper>
        ))}
      </form>
    </ApplicationWrapper>
  );
}

ApplicationStep3.propTypes = {
  step: PropTypes.number,
  application: PropTypes.object,
  updateApplicationCallback: PropTypes.func,
};

export default ApplicationStep3;
