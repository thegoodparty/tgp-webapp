/**
 *
 * AdminAddCandidateWrapper
 *
 */

import React, { useState, memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import Link from 'next/link';

import Nav from 'containers/shared/Nav';
import { BlueButton, PurpleButton } from 'components/shared/buttons';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { BsTrash } from 'react-icons/bs';
import { states } from 'helpers/statesHelper';

import { Body, H2 } from '../../shared/typogrophy';
import JoditEditorWrapper from '../AdminEditCandidate/JoditEditor';
import CandidateTopMenu from '../CandidateTopMenu';

const Wrapper = styled.div`
  min-height: calc(100vh - 50px);
  padding: 36px 0;
  max-width: ${({ theme }) => theme.breakpointsPixels.contentMax};
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
  { key: 'W', value: 'Working Families Party' },
  { key: 'S', value: 'SAM' },
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
  {
    label: 'Draft Candidate',
    key: 'isDraft',
    initialValue: false,
    isCheckbox: true,
  },
  { label: 'Draft Office', key: 'draftOffice', initialValue: '' },
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
  // { label: 'About', key: 'about', rte: true, initialValue: '' },
];

function AdminAddCandidateWrapper({
  createCandidateCallback,
  editCandidateCallback,
  candidate,
  mode,
}) {
  const initialState = {};
  fields.forEach(field => {
    initialState[field.key] = field.initialValue;
  });

  const [formState, setFormState] = useState(initialState);
  const [about, setAbout] = useState(candidate ? candidate.about : '');
  const [showUpdates, setShowUpdates] = useState(false);
  const [candidateUpdates, setCandidateUpdates] = useState([]);

  useEffect(() => {
    if (candidate) {
      const newState = {};
      fields.forEach(field => {
        newState[field.key] = candidate
          ? candidate[field.key]
          : field.initialValue;
      });
      setAbout(candidate.about);
      newState.isActive = candidate.isActive;
      setFormState(newState);
      setCandidateUpdates(candidate.updatesList || []);
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
    if (mode === 'add') {
      createCandidateCallback({
        ...candidate,
        ...formState,
        about,
        candidateUpdates,
      });
    } else {
      editCandidateCallback({
        ...candidate,
        ...formState,
        about,
        candidateUpdates,
        id: candidate.id,
      });
    }
  };

  const addUpdate = () => {
    const existingUpdates = [...candidateUpdates];
    existingUpdates.push({
      text: '',
      date: '',
    });
    setCandidateUpdates(existingUpdates);
  };

  const deleteUpdateListItem = index => {
    const existingUpdates = [...candidateUpdates];
    existingUpdates.splice(index, 1);
    setCandidateUpdates(existingUpdates);
  };
  const onChangeUpdateList = (val, index, key) => {
    const existingUpdates = [...candidateUpdates];
    existingUpdates[index][key] = val;
    setCandidateUpdates(existingUpdates);
  };

  return (
    <div style={{ backgroundColor: '#FFF' }}>
      <Nav />
      {/* <MobileHeader /> */}
      <Wrapper>
        <CandidateTopMenu candidate={candidate} />

        <br />

        {fields.map(field => (
          <React.Fragment key={field.key}>
            {field.isSelect ? (
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
        <Label>About</Label>
        <JoditEditorWrapper
          onChangeCallback={value => setAbout(value)}
          initialText={about}
        />

        <br />
        <br />
        <PurpleButton onClick={() => setShowUpdates(!showUpdates)}>
          &nbsp;&nbsp;{showUpdates ? 'Hide' : 'Show'} Updates&nbsp;&nbsp;
        </PurpleButton>
        <br />
        <br />
        {showUpdates && (
          <>
            {candidateUpdates.map((update, index) => (
              <React.Fragment key={update.id}>
                <Row>
                  <span>Update #{index + 1}</span>
                  <BsTrash
                    onClick={() => {
                      deleteUpdateListItem(index);
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
                  value={update.date || ''}
                  onChange={e =>
                    onChangeUpdateList(e.target.value, index, 'date')
                  }
                />
                <br />
                <br />
                <JoditEditorWrapper
                  onChangeCallback={value =>
                    onChangeUpdateList(value, index, 'text')
                  }
                  initialText={update.text}
                />
                <br />
                <br />
              </React.Fragment>
            ))}

            <BlueButton onClick={addUpdate}>Add update</BlueButton>
          </>
        )}
        <br />
        <br />
        <BlueButton fullWidth onClick={createCandidate} disabled={!canSubmit()}>
          SAVE
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

export default memo(AdminAddCandidateWrapper);
