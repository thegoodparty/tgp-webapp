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
import { BsTrash } from 'react-icons/bs';
import { states } from 'helpers/statesHelper';

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

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
const statesOptions = states.map(state => ({
  key: state.abbreviation,
  value: state.name,
}));

const fields = [
  {
    label: 'Show on Homepage?',
    key: 'isOnHomepage',
    initialValue: false,
    isCheckbox: true,
  },
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
  { label: 'Chamber', key: 'chamber', initialValue: 'local' },
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
  { label: 'Likely Voters', key: 'likelyVoters', initialValue: 0 },
  { label: 'Votes Needed', key: 'votesNeeded', initialValue: 0 },
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
  if (candidate) {
    initialState.isActive = candidate.isActive;
  }
  const [formState, setFormState] = useState(initialState);
  const [comparedCandidates, setComparedCandidates] = useState(
    candidate ? candidate.comparedCandidates : false,
  );
  const [updates, setUpdates] = useState(
    candidate?.updates ? candidate.updates : [],
  );
  const [updatesDates, setUpdatesDates] = useState(
    candidate?.updatesDates ? candidate.updatesDates : [],
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
      createCandidateCallback({
        ...formState,
        comparedCandidates,
        updates,
        updatesDates,
      });
    } else {
      editCandidateCallback({
        ...formState,
        comparedCandidates,
        updates,
        updatesDates,
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

    const existingUpdatesDates = [...updatesDates];
    existingUpdatesDates.push('');
    setUpdatesDates(existingUpdatesDates);
  };

  const deleteUpdate = index => {
    const existingUpdates = [...updates];
    existingUpdates.splice(index, 1);
    setUpdates(existingUpdates);

    const existingUpdatesDates = [...updatesDates];
    existingUpdatesDates.splice(index, 1);
    setUpdatesDates(existingUpdatesDates);
  };

  const onChangeUpdates = (val, index) => {
    const existingUpdates = [...updates];
    existingUpdates[index] = val;
    setUpdates(existingUpdates);
  };

  const onChangeUpdateMeta = (val, index) => {
    const existingUpdatesDates = [...updatesDates];
    existingUpdatesDates[index] = val;
    setUpdatesDates(existingUpdatesDates);
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
                  <option value="">{field.emptySelectLabel}</option>
                  {field.options?.map(item => (
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
                    onChange={e => onChangeField(field.key, e.target.checked)}
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
        <br />
        {updates.map((update, index) => (
          <React.Fragment key={index}>
            <Row>
              <span>Update #{index + 1}</span>
              <BsTrash
                onClick={() => {
                  deleteUpdate(index);
                }}
                style={{ cursor: 'pointer' }}
              />
            </Row>
            <br />
            <Input
              fullWidth
              label={`update ${index + 1} date`}
              name={`update ${index + 1} date`}
              variant="outlined"
              value={updatesDates.length > index ? updatesDates[index] : ''}
              onChange={e => onChangeUpdateMeta(e.target.value, index)}
            />
            <br />
            <br />
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
