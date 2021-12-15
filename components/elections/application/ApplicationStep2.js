/**
 *
 * ApplicationStep2
 *
 */

import React, { useState } from 'react';
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
    label: 'Candidate First Name',
    key: 'firstName',
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
    customElement: <div>Office Selector</div>,
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
    customElement: <div>Office Elected</div>,
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

function ApplicationStep2({ step }) {
  const [state, setState] = useState(keys);
  const [hiddenElements, setHiddenElemtns] = useState({
    publicOffice: true,
    officeElected: true,
  });
  const handleSubmitForm = e => e.stopPropagation();

  const onChangeField = (key, e) => {
    setState({
      ...state,
      [key]: e.target.value,
    });
  };

  const handleRadioChange = (key, e, toggleElement) => {
    if (toggleElement && e.target.value === 'Yes') {
      setHiddenElemtns({
        ...hiddenElements,
        [toggleElement]: false,
      });
    }
    if (toggleElement && e.target.value === 'No') {
      setHiddenElemtns({
        ...hiddenElements,
        [toggleElement]: true,
      });
    }
    onChangeField(key, e);
  };

  const renderField = field => {
    if (field.hidden && hiddenElements[field.key]) {
      return;
    } else if (field.hidden && !hiddenElements[field.key]) {
      return <FieldWrapper>{field.customElement}</FieldWrapper>;
    }
    return (
      <FieldWrapper key={field.key}>
        <Label>
          {field.label} {field.required && <Req>required</Req>}
        </Label>
        {field.type === 'select' && (
          <Select native value={state[field.key]} fullWidth variant="outlined">
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
    <ApplicationWrapper step={step} canContinue>
      <form noValidate onSubmit={handleSubmitForm}>
        {fields.map(field => (
          <>{renderField(field)}</>
        ))}
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
            />
          </SocialFieldWrapper>
        ))}
      </form>
    </ApplicationWrapper>
  );
}

ApplicationStep2.propTypes = {
  step: PropTypes.number,
};

export default ApplicationStep2;
