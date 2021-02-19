/**
 *
 * AdminAddCandidateWrapper
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import Nav from 'containers/shared/Nav';
import { BlueButton } from 'components/shared/buttons';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Checkbox from '@material-ui/core/Checkbox';

import { Body, H2 } from '../../shared/typogrophy';
import JoditEditorWrapper from '../AdminEditCandidate/JoditEditor';
import ImageCrop from '../../shared/ImageCrop';
import ComparedCandidates from './ComparedCandidates';
import CandidateAvatar from '../../shared/CandidateAvatar';

const Wrapper = styled.div`
  min-height: calc(100vh - 50px);
  padding: 36px 0;
  max-width: ${({ theme }) => theme.breakpoints.contentMax};
  margin: 0 auto;
`;

const CropWrapper = styled.div`
  position: relative;
`;

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
];

const fields = [
  {
    label: 'Show on Homepage?',
    key: 'onHomepage',
    initialValue: false,
    isCheckbox: true,
  },
  { label: 'First Name', key: 'firstName', initialValue: '' },
  { label: 'Last Name', key: 'lastName', initialValue: '' },
  { label: 'Hero Video (YouTube id)', key: 'heroVideo', initialValue: '' },
  { label: 'Headline', key: 'headline', initialValue: '' },
  { label: 'Chamber', key: 'chamber', initialValue: 'local' },
  { label: 'Race (Office Seeking)', key: 'race', initialValue: '' },
  {
    label: 'Party',
    key: 'party',
    initialValue: '',
    isSelect: true,
    options: partyOptions,
  },
  { label: 'Facebook', key: 'facebook', initialValue: '' },
  { label: 'Twitter', key: 'twitter', initialValue: '' },
  { label: 'TikTok', key: 'tiktok', initialValue: '' },
  { label: 'Snap', key: 'snap', initialValue: '' },
  { label: 'Likely Voters', key: 'likelyVoters', initialValue: 0 },
  { label: 'Votes Needed', key: 'votesNeeded', initialValue: 0 },
  {
    label: 'Campaign Summary',
    key: 'campaignSummary',
    rte: true,
    initialValue: '',
  },
  { label: 'About', key: 'about', rte: true, initialValue: '' },
];

function AdminAddCandidateWrapper({
  createCandidateCallback,
  editCandidateCallback,
  candidate,
  mode,
}) {
  const initialState = {};
  fields.forEach(field => {
    initialState[field.key] = candidate
      ? candidate[field.key]
      : field.initialValue;
  });
  const [formState, setFormState] = useState(initialState);
  const [comparedCandidates, setComparedCandidates] = useState(
    candidate ? candidate.comparedCandidates : false,
  );
  const [updates, setUpdates] = useState(
    candidate?.updates ? candidate.updates : [],
  );

  const onChangeField = (key, value, type = 'text') => {
    setFormState({
      ...formState,
      [key]: type === 'number' ? parseInt(value, 10) : value,
    });
  };

  const handleUpload = base64 => {
    setFormState({ ...formState, imageBase64: base64 });
  };

  const canSubmit = () => {
    return formState.firstName !== '' && formState.lastName !== '';
  };

  const createCandidate = () => {
    if (mode === 'add') {
      createCandidateCallback({ ...formState, comparedCandidates, updates });
    } else {
      editCandidateCallback({
        ...formState,
        comparedCandidates,
        updates,
        id: candidate.id,
        image: candidate.image,
      });
    }
  };
  const compareCandidatesCallback = comparedCands => {
    setComparedCandidates(comparedCands);
  };

  const addUpdate = () => {
    const existingUpdates = [...updates];
    existingUpdates.push('');
    setUpdates(existingUpdates);
  };

  const onChangeUpdates = (val, index) => {
    const existingUpdates = [...updates];
    existingUpdates[index] = val;
    setUpdates(existingUpdates);
  };

  return (
    <div style={{ backgroundColor: '#FFF' }}>
      <Nav />
      {/* <MobileHeader /> */}
      <Wrapper>
        <H2>Admin add candidate</H2>
        <br />
        {candidate && candidate.image && (
          <div className="flex-center">
            <CandidateAvatar
              src={candidate.image}
              name={candidate.firstName}
              good
              size="xl"
            />
          </div>
        )}

        {!formState.imageBase64 ? (
          <CropWrapper>
            <ImageCrop uploadImageCallback={handleUpload} />
          </CropWrapper>
        ) : (
          <Body>Image Selected</Body>
        )}
        {fields.map(field => (
          <React.Fragment key={field.key}>
            {field.rte ? (
              <>
                <Label>{field.label}</Label>
                <JoditEditorWrapper
                  onChangeCallback={value => onChangeField(field.key, value)}
                  initialText={formState[field.key]}
                />
              </>
            ) : field.isSelect ? (
              <FormControl style={{ width: '100%' }}>
                <InputLabel id={field.key}>{field.label}</InputLabel>
                <Select
                  native
                  value={formState[field.key]}
                  labelId={field.key}
                  onChange={e => onChangeField(field.key, e.target.value)}
                  fullWidth
                  variant="outlined"
                  style={{ marginTop: '2rem' }}
                >
                  <option value="">Select A Party</option>
                  {field.options?.map(item => (
                    <option value={item.key} key={item.key}>
                      {item.value}
                    </option>
                  ))}
                </Select>
              </FormControl>
            ) : field.isCheckbox ? (
              <>
                {field.label}: <br />
                <Checkbox
                  checked={formState[field.key]}
                  onChange={e => onChangeField(field.key, e.target.checked)}
                />
              </>
            ) : (
              <Input
                fullWidth
                label={field.label}
                name={field.label}
                variant="outlined"
                value={formState[field.key]}
                type={field.initialValue === 0 ? 'number' : 'text'}
                onChange={e =>
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
        <br />
        <br />
        <hr />
        <br />
        <Label>Compare Candidates</Label>
        <ComparedCandidates
          candidate={candidate}
          candidatesCallback={compareCandidatesCallback}
        />
        <br />
        <br />
        <hr />
        <br />
        {updates.map((update, index) => (
          <React.Fragment>
            Update #{index + 1}
            <JoditEditorWrapper
              onChangeCallback={value => onChangeUpdates(value, index)}
              initialText={update}
            />
            <br />
            <br />
          </React.Fragment>
        ))}
        <BlueButton onClick={addUpdate}>Add update</BlueButton>
        <br />
        <br />
        <BlueButton fullWidth onClick={createCandidate} disabled={!canSubmit()}>
          {mode === 'add' ? 'CREATE' : 'EDIT'} CANDIDATE
        </BlueButton>
      </Wrapper>
    </div>
  );
}

AdminAddCandidateWrapper.propTypes = {
  createCandidateCallback: PropTypes.func,
  editCandidateCallback: PropTypes.func,
  candidate: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  mode: PropTypes.string,
};

export default AdminAddCandidateWrapper;
