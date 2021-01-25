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

import { Body, H2 } from '../../shared/typogrophy';
import JoditEditorWrapper from '../AdminEditCandidate/JoditEditor';
import ImageCrop from '../../shared/ImageCrop';
import ComparedCandidates from './ComparedCandidates';

const Wrapper = styled.div`
  min-height: calc(100vh - 50px);
  padding: 36px 0;
  max-width: ${({ theme }) => theme.breakpoints.contentMax};
  margin: 0 auto;
`;

const Slug = styled.div`
  margin: 2rem 0;
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

const fields = [
  { label: 'First Name', key: 'firstName', initialValue: '' },
  { label: 'Last Name', key: 'lastName', initialValue: '' },
  { label: 'Hero Video (YouTube id)', key: 'heroVideo', initialValue: '' },
  { label: 'Chamber', key: 'chamber', initialValue: 'local' },
  { label: 'Race (Office Seeking)', key: 'race', initialValue: '' },
  { label: 'Party', key: 'party', initialValue: '' },
  { label: 'Facebook', key: 'facebook', initialValue: '' },
  { label: 'Twitter', key: 'twitter', initialValue: '' },
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
  const [comparedCandidates, setComparedCandidates] = useState(false);

  const onChangeField = (key, value) => {
    setFormState({
      ...formState,
      [key]: value,
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
      createCandidateCallback({ ...formState, comparedCandidates });
    } else {
      editCandidateCallback({
        ...formState,
        comparedCandidates,
        id: candidate.id,
      });
    }
  };
  const compareCandidatesCallback = comparedCands => {
    setComparedCandidates(comparedCands);
  };

  return (
    <div style={{ backgroundColor: '#FFF' }}>
      <Nav />
      {/* <MobileHeader /> */}
      <Wrapper>
        <H2>Admin add candidate</H2>
        <br />
        <Slug>
          Slug: {`elections/local/${formState.firstName}-${formState.lastName}`}
        </Slug>
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
            ) : (
              <Input
                fullWidth
                label={field.label}
                variant="outlined"
                value={formState[field.key]}
                onChange={e => onChangeField(field.key, e.target.value)}
              />
            )}
          </React.Fragment>
        ))}
        <br />
        <br />
        <Label>Compare Candidates</Label>
        <ComparedCandidates
          candidate={candidate}
          candidatesCallback={compareCandidatesCallback}
        />
        <br />
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
