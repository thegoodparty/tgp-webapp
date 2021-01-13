/**
 *
 * AdminAddCandidateWrapper
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import dynamic from 'next/dynamic';
import TextField from '@material-ui/core/TextField';
import Nav from 'containers/shared/Nav';
import MobileHeader from 'components/shared/navigation/MobileHeader';
import { H2 } from '../../shared/typogrophy';
import JoditEditorWrapper from '../AdminEditCandidate/JoditEditor';

// const JoditEditorWrapper = dynamic(
//   () => import('../AdminEditCandidate/JoditEditor').default,
//   {
//     ssr: false,
//   },
// );

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

function AdminAddCandidateWrapper() {
  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    election: '',
    likelyVoters: 0,
    votesNeeded: 0,
    about: '',
  });

  const onChangeField = (key, value) => {
    setFormState({
      ...formState,
      [key]: value,
    });
  };
  const fields = [
    { label: 'First Name', key: 'firstName' },
    { label: 'Last Name', key: 'lastName' },
    { label: 'Election', key: 'election' },
    { label: 'Likely Voters', key: 'likelyVoters' },
    { label: 'Votes Needed', key: 'votesNeeded' },
    { label: 'About', key: 'about', rte: true },
  ];
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
        {fields.map(field => (
          <React.Fragment key={field.key}>
            {field.rte ? (
              <JoditEditorWrapper
                onChangeCallback={value => onChangeField(field.key, value)}
              />
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
      </Wrapper>
    </div>
  );
}

AdminAddCandidateWrapper.propTypes = {};

export default AdminAddCandidateWrapper;
