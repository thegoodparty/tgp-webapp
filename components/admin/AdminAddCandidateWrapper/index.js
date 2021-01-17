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
import MobileHeader from 'components/shared/navigation/MobileHeader';
import { Body, H2 } from '../../shared/typogrophy';
import JoditEditorWrapper from '../AdminEditCandidate/JoditEditor';
import ImageCrop from '../../shared/ImageCrop';
import { BlueButton } from 'components/shared/buttons';

const Wrapper = styled.div`
  min-height: calc(100vh - 50px);
  padding: 36px 0;
  max-width: ${({ theme }) => theme.breakpoints.contentMax};
  margin: 0 auto;
`;

const Slug = styled.div`
  margin: 2rem 0;
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
  { label: 'Election', key: 'election', initialValue: '' },
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
const initialState = {};
fields.forEach(field => {
  initialState[field.key] = field.initialValue;
});

function AdminAddCandidateWrapper({ createCandidateCallback }) {
  const [formState, setFormState] = useState(initialState);

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
    createCandidateCallback(formState);
  };

  return (
    <div style={{ backgroundColor: '#FFF' }}>
      <Nav />
      <MobileHeader />
      <Wrapper>
        <H2>Admin add candidate</H2>
        <br />
        <Slug>
          Slug: {`elections/local/${formState.firstName}-${formState.lastName}`}
        </Slug>
        {!formState.imageBase64 ? (
          <ImageCrop uploadImageCallback={handleUpload} />
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
        <BlueButton fullWidth onClick={createCandidate} disabled={!canSubmit()}>
          CREATE CANDIDATE
        </BlueButton>
      </Wrapper>
    </div>
  );
}

AdminAddCandidateWrapper.propTypes = {
  createCandidateCallback: PropTypes.func,
};

export default AdminAddCandidateWrapper;
