/**
 *
 * AdminAddCandidateWrapper
 *
 */

import React, { useState, memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import { BlueButton } from '/components/shared/buttons';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { states } from '/helpers/statesHelper';

import { Body } from '../../shared/typogrophy';
import JoditEditorWrapper from '../shared/JoditEditor';

import AdminPageWrapper from '../shared/AdminPageWrapper';
import AdminPanel from '../shared/AdminPanel';



const Input = styled(TextField)`
  && {
    margin-top: 2rem;
  }
`;

const Label = styled(Body)`
  margin: 2rem 0 1rem;
`;

const partyOptions = [
  { key: 'D', value: 'Democrat' },
  { key: 'R', value: 'Republican' },
  { key: 'GP', value: 'Green Party' },
  { key: 'L', value: 'Libertarian' },
  { key: 'LI', value: 'Liberation' },
  { key: 'I', value: 'Independent' },
  { key: 'W', value: 'Working Families Party' },
  { key: 'S', value: 'SAM' },
];

const chmaberOptions = [
  { key: 'local', value: 'Local' },
  { key: 'state', value: 'State' },
  { key: 'federal', value: 'Federal' },
];

const statesOptions = states.map((state) => ({
  key: state.abbreviation,
  value: state.name,
}));

const fields = [
  // {
  //   label: 'Show on Homepage?',
  //   key: 'isOnHomepage',
  //   initialValue: false,
  //   isCheckbox: true,
  // },
  {
    label: 'Is Active',
    key: 'isActive',
    initialValue: true,
    isCheckbox: true,
  },
  { label: 'First Name', key: 'firstName', initialValue: '' },
  { label: 'Last Name', key: 'lastName', initialValue: '' },
  { label: 'Hero Video (YouTube id)', key: 'heroVideo', initialValue: '' },
  { label: 'Headline', key: 'headline', initialValue: '' },
  // {
  //   label: 'Chamber',
  //   key: 'chamber',
  //   initialValue: 'local',
  //   isSelect: true,
  //   options: chmaberOptions,
  // },
  { label: 'Race (Office Seeking)', key: 'race', initialValue: '' },
  {
    label: 'State',
    key: 'state',
    initialValue: '',
    isSelect: true,
    options: statesOptions,
    emptySelectLabel: 'Select A State',
  },
  {
    label: 'Party',
    key: 'party',
    initialValue: '',
    isSelect: true,
    options: partyOptions,
    emptySelectLabel: 'Select A Party',
  },
  { label: 'Facebook', key: 'facebook', initialValue: '' },
  { label: 'Twitter', key: 'twitter', initialValue: '' },
  { label: 'TikTok', key: 'tiktok', initialValue: '' },
  { label: 'Snap', key: 'snap', initialValue: '' },
  { label: 'Instagram', key: 'instagram', initialValue: '' },
  { label: 'YouTube', key: 'youtube', initialValue: '' },
  { label: 'Twitch', key: 'twitch', initialValue: '' },
  { label: 'Reddit', key: 'reddit', initialValue: '' },
  { label: 'Unrepresented voters', key: 'unrepVoters', initialValue: 0 },
  { label: 'Likely Voters', key: 'likelyVoters', initialValue: 0 },
  { label: 'Votes Needed', key: 'votesNeeded', initialValue: 0 },
];

function AdminAddCandidateWrapper({
  createCandidateCallback,
  editCandidateCallback,
  candidate,
  mode,
}) {
  const initialState = {};
  fields.forEach((field) => {
    initialState[field.key] = field.initialValue;
  });

  const [formState, setFormState] = useState(initialState);
  const [about, setAbout] = useState(candidate ? candidate.about : '');

  useEffect(() => {
    if (candidate) {
      const newState = {};
      fields.forEach((field) => {
        newState[field.key] = candidate
          ? candidate[field.key]
          : field.initialValue;
      });
      setAbout(candidate.about);
      newState.isActive = candidate.isActive;
      setFormState(newState);
    }
  }, [candidate]);

  const onChangeField = (key, value, type = 'text') => {
    setFormState({
      ...formState,
      [key]: type === 'number' ? parseInt(value, 10) : value,
    });
  };

  const canSubmit = () => {
    return formState.firstName !== '' && formState.lastName !== '';
  };

  const createCandidate = () => {
    // if (mode === 'add') {
    createCandidateCallback({
      ...candidate,
      ...formState,
      about,
    });
    // } else {
    //   editCandidateCallback({
    //     ...candidate,
    //     ...formState,
    //     about,
    //     id: candidate.id,
    //   });
    // }
  };

  return (
    <AdminPageWrapper title="Add a new candidate">
      <AdminPanel>
        {fields.map((field) => (
          <React.Fragment key={field.key}>
            {field.isSelect ? (
              <FormControl style={{ width: '100%' }}>
                <InputLabel id={field.key}>{field.label}</InputLabel>
                <Select
                  native
                  value={formState[field.key]}
                  labelId={field.key}
                  onChange={(e) => onChangeField(field.key, e.target.value)}
                  fullWidth
                  variant="outlined"
                  style={{ marginTop: '2rem' }}
                >
                  <option value="">{field.emptySelectLabel}</option>
                  {field.options?.map((item) => (
                    <option value={item.key} key={item.key}>
                      {item.value}
                    </option>
                  ))}
                </Select>
              </FormControl>
            ) : field.isCheckbox ? (
              <>
                <div>
                  <Checkbox
                    checked={formState[field.key]}
                    onChange={(e) => onChangeField(field.key, e.target.checked)}
                  />
                  &nbsp; &nbsp; {field.label}
                </div>
              </>
            ) : (
              <Input
                fullWidth
                label={field.label}
                name={field.label}
                variant="outlined"
                value={formState[field.key]}
                type={field.initialValue === 0 ? 'number' : 'text'}
                onChange={(e) =>
                  onChangeField(
                    field.key,
                    e.target.value,
                    field.initialValue === 0 ? 'number' : 'text',
                  )
                }
              />
            )}
          </React.Fragment>
        ))}
        <Label>About</Label>
        <JoditEditorWrapper
          onChangeCallback={(value) => setAbout(value)}
          initialText={about}
        />

        <br />
        <br />
        <BlueButton fullWidth onClick={createCandidate} disabled={!canSubmit()}>
          SAVE
        </BlueButton>
      </AdminPanel>
    </AdminPageWrapper>
  );
}

AdminAddCandidateWrapper.propTypes = {
  createCandidateCallback: PropTypes.func,
  editCandidateCallback: PropTypes.func,
  candidate: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  mode: PropTypes.string,
};

export default memo(AdminAddCandidateWrapper);
