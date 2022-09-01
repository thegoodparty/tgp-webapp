/**
 *
 * PortalCampaignManagerWrapper
 *
 */

import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import Sticky from 'react-sticky-el';

import { FontH3 } from '/components/shared/typogrophy';
import JoditEditorWrapper from '/components/admin/shared/JoditEditor';
import { flatStates } from '/helpers/statesHelper';
import { PortalCampaignManagerPageContext } from '/containers/candidate-portal/PortalCampaignManagerPage';
import { partyResolver } from '/helpers/electionsHelper';

import ImageUploadContainer from '/containers/shared/ImageUploadContainer';

import PortalPageWrapper from '../shared/PortalPageWrapper';
import PortalPanel from '../shared/PortalPanel';
import BlackButton, { InnerButton } from '../../shared/buttons/BlackButton';
import { isValidUrl } from '/helpers/linkHelper';
import PhoneInput from '../../shared/PhoneInput';
import CampaignColorPicker from './CampaignColorPicker';

const Inner = styled.div`
  width: 100%;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    width: 60%;
  }

  .jodit-status-bar__item.jodit-status-bar__item-right:last-child {
    display: none;
  }
`;

const SaveWrapper = styled.div`
  text-align: right;
  padding: 20px 0;
`;

const ImageWrapper = styled.div`
  max-width: 250px;
  margin: 24px 0;
`;

const Err = styled.div`
  color: red;
  margin-top: 8px;
`;

const StickyWrapper = styled.div`
  .sticky {
    z-index: 10;
  }
  .sticky .sticky-el {
    box-shadow: 0 0 6px 2px rgba(0, 0, 0, 0.2);
  }
`;

export const fields = [
  { label: 'First Name', key: 'firstName', required: true },
  { label: 'Last Name', key: 'lastName', required: true },
  { label: 'Zip Code', key: 'zip' },
  {
    label: 'Political party affiliation',
    key: 'party',
    type: 'select',
    options: ['I', 'GP', 'L', 'W', 'F', 'Other'],
    required: true,
  },

  { label: 'Other Party', key: 'otherParty', isHidden: true },
  { label: 'Twitter', key: 'twitter', isUrl: true },
  { label: 'Facebook', key: 'facebook', isUrl: true },
  { label: 'YouTube', key: 'youtube', isUrl: true },
  { label: 'LinkedIn', key: 'linkedin', isUrl: true },
  { label: 'Snap', key: 'snap', isUrl: true },
  { label: 'TikTok', key: 'tiktok', isUrl: true },
  { label: 'Instagram', key: 'instagram', isUrl: true },
  { label: 'Twitch', key: 'twitch', isUrl: true },
  { label: 'Website', key: 'website', isUrl: true },
];

export const fields2 = [
  { label: 'Office being sought ', key: 'race', required: true },
  {
    label: 'Date of election ',
    key: 'raceDate',
    isDate: true,
    columns: 6,
    required: true,
  },
  {
    label: 'State ',
    key: 'state',
    columns: 6,
    type: 'select',
    options: flatStates,
    required: true,
  },
  {
    label: 'Ballot filing deadline ',
    key: 'ballotDate',
    isDate: true,
    columns: 6,
  },
  {
    label: 'Early voting date',
    key: 'earlyVotingDate',
    isDate: true,
    columns: 6,
  },
  { label: 'District (if applicable)', key: 'district' },
  { label: 'Headline', key: 'headline', required: true },
  { label: 'Summary', key: 'about', isRichText: true, required: true },
  { label: 'Committee name', key: 'committeeName' },
  { label: 'Campaign Video (YouTube Id)', key: 'heroVideo' },
];

export const fields3 = [
  { label: 'First Name ', key: 'contactFirstName' },
  { label: 'Last Name ', key: 'contactLastName' },
  { label: 'Email ', key: 'contactEmail', type: 'email' },
  { label: 'Phone ', key: 'contactPhone', type: 'phone' },
];

export const panels = [
  { fields, label: 'Candidate Information' },
  { fields: fields2, label: 'Campaign Information' },
  { fields: fields3, label: 'Contact Information' },
];

function PortalCampaignManagerWrapper() {
  const {
    candidate,
    updateCandidateCallback,
    role,
    uploadImageCallback,
    loading,
    s3Url,
  } = useContext(PortalCampaignManagerPageContext);

  const [state, setState] = useState({});
  const [errors, setErrors] = useState({});
  const [updateImage, setUpdateImage] = useState(false);
  const [showHidden, setShowHidden] = useState(false);
  useEffect(() => {
    const newState = {};
    const newErrors = {};
    panels.forEach((panel) => {
      panel.fields.forEach((field) => {
        newState[field.key] = candidate[field.key] || '';
        if (
          field.isUrl &&
          candidate[field.key] &&
          candidate[field.key] !== ''
        ) {
          if (!isValidUrl(candidate[field.key])) {
            newErrors[field.key] = 'invalid URL';
          }
        }
      });
    });
    setState(newState);
    setErrors(newErrors);
    if (candidate.party === 'Other') {
      setShowHidden(true);
    }
  }, [candidate]);

  const onChangeField = (key, value, isUrl, isRequired) => {
    setState({
      ...state,
      [key]: value,
    });
    if (key === 'party' && value === 'Other') {
      setShowHidden(true);
    }
    if (key === 'party' && value !== 'Other') {
      setShowHidden(false);
    }

    let urlFailed = false;
    if (isUrl) {
      if (value !== '' && !isValidUrl(value)) {
        urlFailed = true;
        setErrors({ ...errors, [key]: 'invalid URL' });
      } else {
        setErrors({ ...errors, [key]: false });
      }
    }

    if (!urlFailed) {
      // don't override the non valid error
      if (isRequired && value === '') {
        setErrors({ ...errors, [key]: 'This field is required' });
      } else {
        setErrors({ ...errors, [key]: false });
      }
    }
  };

  const handleUpload = (url) => {
    uploadImageCallback(candidate.id, url);
    setUpdateImage(false);
  };

  const canSubmit = () => {
    let valid = true;
    try {
      panels.forEach((panel) => {
        panel.fields.forEach((field) => {
          const val = state[field.key];
          if (field.isUrl && val && val !== '') {
            if (!isValidUrl(val)) {
              valid = false;
              throw new Error('invalid');
            }
          }
          if (field.required && val === '') {
            valid = false;
            throw new Error('invalid');
          }
        });
      });
    } catch (_) {
      return false;
    }

    return valid;
  };

  return (
    <PortalPageWrapper role={role} title="Edit Campaign Page">
      <CampaignColorPicker />
      {panels.map((panel, index) => (
        <PortalPanel color="#EE6C3B" key={panel.label} data-cy="campaign-manage-panel">
          <Inner>
            <FontH3 style={{ margin: '0 0 45px 0' }} data-cy="panel-title">{panel.label}</FontH3>
            <Grid container spacing={2}>
              {panel.fields.map((field) => (
                <React.Fragment key={field.key}>
                  {(!field.isHidden || showHidden) && (
                    <Grid item xs={12} lg={field.columns ? field.columns : 12} data-cy="panel-field">
                      {field.isRichText && (
                        <>
                          {field.label}
                          <br />
                          <JoditEditorWrapper
                            onChangeCallback={(value) =>
                              onChangeField(field.key, value)
                            }
                            initialText={state[field.key]}
                          />
                          {errors[field.key] && <Err>{errors[field.key]}</Err>}
                          <br />
                        </>
                      )}
                      {field.type === 'select' && (
                        <>
                          <Select
                            native
                            value={state[field.key]}
                            fullWidth
                            variant="outlined"
                            required={field.required}
                            error={field.required && state[field.key] === ''}
                            onChange={(e) =>
                              onChangeField(
                                field.key,
                                e.target.value,
                                false,
                                field.required,
                              )
                            }
                          >
                            <option value="">Select</option>
                            {field.options.map((op) => (
                              <option value={op} key={op}>
                                {partyResolver(op)}
                              </option>
                            ))}
                          </Select>
                          {errors[field.key] && <Err>{errors[field.key]}</Err>}
                        </>
                      )}
                      {field.type !== 'select' &&
                        !field.isRichText &&
                        field.type !== 'phone' && (
                          <TextField
                            fullWidth
                            label={field.label}
                            name={field.label}
                            variant="outlined"
                            value={state[field.key] || ''}
                            initialValue={state[field.key]}
                            type={
                              field.isDate
                                ? 'date'
                                : field.type === 'email'
                                ? 'email'
                                : 'text'
                            }
                            onChange={(e) =>
                              onChangeField(
                                field.key,
                                e.target.value,
                                field.isUrl,
                                field.required,
                              )
                            }
                            inputProps={{ maxLength: field.maxLength || 200 }}
                            InputLabelProps={{
                              shrink: !!state[field.key] || field.isDate,
                            }}
                            error={
                              (field.required && state[field.key] === '') ||
                              !!errors[field.key]
                            }
                            helperText={
                              errors[field.key] ? errors[field.key] : ''
                            }
                            required={field.required}
                          />
                        )}
                      {field.type === 'phone' && (
                        <PhoneInput
                          value={state[field.key] || ''}
                          onChangeCallback={(phone) =>
                            onChangeField('contactPhone', phone)
                          }
                          hideIcon
                        />
                      )}
                    </Grid>
                  )}
                </React.Fragment>
              ))}
              {index === 1 && (
                <Grid item xs={12}>
                  <ImageWrapper>
                    Campaign Photo
                    <br />
                    <br />
                    {loading ? (
                      <div>Uploading...</div>
                    ) : (
                      <>
                        {(candidate.image || s3Url) && !updateImage ? (
                          <div>
                            <img
                              src={s3Url || candidate.image}
                              className="full-image"
                            />
                            <br />
                            <BlackButton
                              onClick={() => setUpdateImage(true)}
                              fullWidth
                            >
                              <InnerButton>Change Photo</InnerButton>
                            </BlackButton>
                          </div>
                        ) : (
                          <div>
                            <strong>Upload an Image</strong>
                            <br />
                            <ImageUploadContainer
                              uploadCallback={handleUpload}
                              maxFileSize={1000000}
                            />
                          </div>
                        )}
                      </>
                    )}
                  </ImageWrapper>
                </Grid>
              )}
            </Grid>
          </Inner>
          {index === 0 && (
            <StickyWrapper>
              <Sticky>
                <SaveWrapper>
                  <BlackButton
                    onClick={() => updateCandidateCallback(candidate.id, state)}
                    className="sticky-el"
                    disabled={!canSubmit()}
                  >
                    <InnerButton>SAVE</InnerButton>
                  </BlackButton>
                </SaveWrapper>
              </Sticky>
            </StickyWrapper>
          )}
        </PortalPanel>
      ))}
    </PortalPageWrapper>
  );
}

export default PortalCampaignManagerWrapper;
