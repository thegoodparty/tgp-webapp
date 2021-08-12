/**
 *
 * AdminAssociateCandidateUserWrapper
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';

import AdminPageWrapper from '../AdminWrapper/AdminPageWrapper';
import CandidateTopMenu from '../CandidateTopMenu';
import { Body, H3 } from '../../shared/typogrophy';
import { PurpleButton } from '../../shared/buttons';

const Wrapper = styled.div`
  min-height: calc(100vh - 50px);
  padding: 36px 0;
  max-width: ${({ theme }) => theme.breakpointsPixels.contentMax};
  margin: 0 auto;
`;
const Remove = styled.div`
  color: red;
  text-decoration: underline;
  font-weight: 500;
  margin: 18px 0;
  cursor: pointer;
`;

function AdminAssociateCandidateUserWrapper({
  candidate,
  saveCallback,
  user,
  removeUserCallback,
}) {
  const [email, setEmail] = useState(user ? user.email : '');

  const onChangeEmail = e => {
    setEmail(e.target.value);
  };

  const isValidEmail = mail => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(mail).toLowerCase());
  };

  const canSave = () => {
    return isValidEmail(email);
  };

  const handleSave = () => {
    if (isValidEmail(email)) {
      saveCallback(candidate.id, email);
    }
  };

  const handleSubmitForm = e => {
    e.preventDefault();
    handleSave();
  };

  const handleRemove = () => {
    removeUserCallback(candidate.id);
  };

  return (
    <AdminPageWrapper>
      <Wrapper>
        <CandidateTopMenu candidate={candidate} />
        <br />
        <H3>
          Associate a user to {candidate.firstName} {candidate.lastName}
        </H3>
        <br />
        <Body>
          By associating the candidate with a user you give the user access to
          the candidate portal and the permission to manage the candidate
          campaign
        </Body>
        <br />
        <br />
        {user ? (
          <Body>
            Associated User:
            <br />
            {user.name} <br />
            Email: {user.email}
            <Remove onClick={handleRemove}>Remove Associated User</Remove>
          </Body>
        ) : (
          <form noValidate onSubmit={handleSubmitForm}>
            <TextField
              label="User Email"
              name="User Email"
              variant="outlined"
              value={email}
              onChange={onChangeEmail}
              style={{ minWidth: '320px' }}
            />
            <br />
            <br />
            <PurpleButton
              onClick={handleSave}
              fullWidth
              disabled={!canSave()}
              type="submit"
            >
              ASSOCIATE with {candidate.firstName} {candidate.lastName}
            </PurpleButton>
          </form>
        )}
      </Wrapper>
    </AdminPageWrapper>
  );
}

AdminAssociateCandidateUserWrapper.propTypes = {
  candidate: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  user: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  saveCallback: PropTypes.func,
  removeUserCallback: PropTypes.func,
};

export default AdminAssociateCandidateUserWrapper;
