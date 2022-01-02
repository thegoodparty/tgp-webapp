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
  FaVideo,
  FaDollarSign,
  FaImage,
} from 'react-icons/fa';

import { IoIosPeople } from 'react-icons/io';

import ApplicationWrapper from './ApplicationWrapper';
import { Body, Body11 } from '../../shared/typogrophy';
import ImageUploadContainer from '../../../containers/shared/ImageUploadContainer';

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
  color: #666;
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
  text-align: center;
  width: 100%;
  padding: 8px;
  margin: 8px;
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

const fields = [
  {
    label: 'What are you running for?',
    key: 'running for',
    placeholder: 'What are you running for?',
    defaultValue: '',
    type: 'text',
  },
  {
    label: 'Have you filed your personal disclosure with the Congress?',
    key: 'disclosure',
    defaultValue: '',
    type: 'radio',
    options: ['Yes', 'No'],
    grayBg: true,
  },
  {
    label: 'Campaign summary',
    key: 'campaignSummary',
    placeholder:
      'Why are you running as an independent or 3rd party candidate?',
    subtitle: 'Why are you running as an independent or 3rd party candidate?',
    defaultValue: '',
    type: 'text',
    multiline: true,
  },
  {
    label: 'Campaign video',
    key: 'campaignVideo',
    placeholder: 'Paste link to video...',
    subtitle:
      "A 60 second intro video about your campaign and why you're running.",
    defaultValue: '',
    type: 'text',
    subLabel: 'Optional',
    icon: (
      <IconWrapper>
        <FaVideo />
      </IconWrapper>
    ),
  },
  {
    label: 'Campaign photos',
    key: 'photos',
    defaultValue: [
      {
        key: 'headshotPhoto',
        label: 'Candidate headshot',
        value: '',
      },
      {
        key: 'trailPhoto',
        label: 'Campaign trail photo',
        value: '',
      },
      {
        key: 'bannerPhoto',
        label: 'Campaign page banner (16:9 aspect)',
        value: '',
      },
    ],
    subtitle: 'Including at least one good headshot.',
    required: true,
  },
  {
    label: 'What is the name of your candidate/campaign committee?',
    key: 'committeeName',
    placeholder: 'Enter...',
    defaultValue: '',
    type: 'text',
    subLabel: 'If already filled',
  },

  {
    label: 'Have you registered and filed financial statements with the FEC?',
    key: 'fecStatement',
    defaultValue: '',
    type: 'radio',
    options: ['Yes', 'No'],
  },

  {
    label: 'Have you filed any statement of candidacy with the State?',
    key: 'candidacyStatement',
    defaultValue: '',
    type: 'radio',
    options: ['Yes', 'No'],
  },
  {
    label: 'How much money have you raised so far?',
    required: true,
    key: 'moneyRaisedAmount',
    placeholder: '1,000.00',
    defaultValue: '',
    type: 'text',
    icon: (
      <IconWrapper>
        <FaDollarSign />
      </IconWrapper>
    ),
  },
  {
    label: '',
    noLabel: true,
    required: true,
    key: 'fromWhom',
    placeholder: 'From Whom?',
    defaultValue: '',
    type: 'text',
    icon: (
      <IconWrapper>
        <IoIosPeople />
      </IconWrapper>
    ),
  },
  {
    label:
      'How many signatures are required for your name to appear on the ballot in your election (if applicable)?',
    key: 'signatures',
    placeholder: 'Enter...',
    defaultValue: '',
    type: 'text',
  },
  {
    label:
      'How many voters do you believe are likely to support an Independent or 3rd party candidate in your election?',
    key: 'likelySupport',
    placeholder: 'Enter...',
    defaultValue: '',
    type: 'text',
  },
  {
    label:
      'How many votes do you estimate will it take to win the elected office you are interested in running for in the General election?',
    key: 'votesToWin',
    placeholder: 'Enter...',
    defaultValue: '',
    type: 'text',
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
const requiredKeys = [];
fields.forEach(field => {
  keys[field.key] = field.defaultValue;
  if (field.required) {
    requiredKeys.push(field);
  }
});

socials.forEach(field => {
  keys[field.key] = field.defaultValue;
});

function ApplicationStep3({ step, application, updateApplicationCallback }) {
  const [state, setState] = useState(keys);

  useEffect(() => {
    if (application?.campaign) {
      setState({
        ...application.campaign,
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

  const handleUploadImage = (image, key) => {
    console.log('handleUploadImage', image);

    const e = {
      target: {
        value: image,
      },
    };

    onBlurField(key, e);
  };

  const renderField = field => {
    if (field.key === 'photos') {
      return (
        <FieldWrapper key={field.key} className={field.grayBg && 'gray'}>
          <Label>
            {field.label} {field.required && <Req>required</Req>}
            {field.subLabel && <Req>{field.subLabel}</Req>}
          </Label>
          <Subtitle>{field.subtitle}</Subtitle>
          {keys.photos.map(photo => (
            <>
              {state[photo.key] ? (
                <PhotoWrapper>
                  <strong>{photo.label}</strong>
                  <br />
                  <Photo src={state[photo.key]} alt={photo.key} />
                </PhotoWrapper>
              ) : (
                <PhotoInputWrapper key={photo.key}>
                  <UploadWrapper>
                    <ImageUploadContainer
                      uploadCallback={image =>
                        handleUploadImage(image, photo.key)
                      }
                    />
                  </UploadWrapper>
                  <PhotoPlaceholder>
                    <IconWrapper>
                      <FaImage style={{ marginTop: '6px' }} />
                    </IconWrapper>
                    {photo.label}
                  </PhotoPlaceholder>
                </PhotoInputWrapper>
              )}
            </>
          ))}
        </FieldWrapper>
      );
    }
    return (
      <FieldWrapper key={field.key} className={field.grayBg && 'gray'}>
        {!field.noLabel && (
          <Label>
            {field.label} {field.required && <Req>required</Req>}
            {field.subLabel && <Req>{field.subLabel}</Req>}
          </Label>
        )}
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
        {field.type === 'radio' && (
          <RadioGroup
            name={state[field.key]}
            value={state[field.key]}
            style={{ flexDirection: 'row' }}
            onChange={e => handleRadioChange(field.key, e)}
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
    <ApplicationWrapper
      step={step}
      canContinue={canSubmit()}
      id={application.id}
    >
      <form noValidate onSubmit={handleSubmitForm}>
        {fields.map(field => (
          <React.Fragment key={field.key}>{renderField(field)}</React.Fragment>
        ))}
        <Label>Campaign social links</Label>
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
