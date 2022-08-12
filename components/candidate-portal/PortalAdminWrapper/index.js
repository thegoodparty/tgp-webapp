/**
 *
 * PortalAdminWrapper
 *
 */

import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';

import { PortalAdminPageContext } from '/containers/candidate-portal/PortalAdminPage';
import PortalPageWrapper from '../shared/PortalPageWrapper';
import { FontH1 } from '../../shared/typogrophy';
import { PurpleButton } from '../../shared/buttons';
import BlackButton, { InnerButton } from '../../shared/buttons/BlackButton';
import Row from '../../shared/Row';
import EmailInput, { isValidEmail } from '../../shared/EmailInput';

const Wrapper = styled.div`
  min-height: calc(100vh - 120px);
  max-width: ${({ theme }) => theme.breakpointsPixels.contentMax};
  margin: 24px auto 0;
`;

const FieldWrapper = styled.div`
  margin: 12px 0;
`;

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
  { label: 'Followers Offset', key: 'followersOffset', initialValue: 0 },
  { label: 'Likely Voters', key: 'likelyVoters', initialValue: 0 },
  { label: 'Votes Needed', key: 'votesNeeded', initialValue: 0 },
  { label: 'hubspot company id', key: 'hubspotId', initialValue: '' },
  { label: 'Pulsar Search ID', key: 'pulsarSearchId', initialValue: '' },
  {
    label: 'This campaign is claimed',
    key: 'isClaimed',
    initialValue: false,
    isCheckbox: true,
  },
];

function PortalAdminWrapper() {
  const { candidate, saveCallback, approveClaimCallback } = useContext(
    PortalAdminPageContext,
  );

  const [claimEmail, setClaimEmail] = useState('');

  const initialState = {};
  fields.forEach((field) => {
    initialState[field.key] = field.initialValue;
  });
  const [state, setState] = useState(initialState);

  useEffect(() => {
    if (candidate) {
      const newState = {};
      fields.forEach((field) => {
        newState[field.key] = candidate[field.key]
          ? candidate[field.key]
          : field.initialValue;
      });
      newState.isActive = candidate.isActive;
      setState(newState);
    }
  }, [candidate]);

  const onChangeField = (key, value, type = 'text') => {
    setState({
      ...state,
      [key]: type === 'number' ? parseInt(value, 10) : value,
    });
  };

  const canSubmit = () => {
    return (
      state.likelyVoters >= 0 &&
      state.votesNeeded >= 0
    );
  };

  const approveClaim = () => {
    approveClaimCallback(claimEmail, candidate.id);
  };

  return (
    <PortalPageWrapper role="admin">
      <Wrapper>
        <FontH1>Admin Portal Page</FontH1>
        <br />
        {fields.map((field) => (
          <FieldWrapper key={field.key}>
            {field.isCheckbox ? (
              <>
                <div>
                  <Checkbox
                    checked={state[field.key]}
                    onChange={(e) => onChangeField(field.key, e.target.checked)}
                  />
                  &nbsp; &nbsp; {field.label}
                </div>
              </>
            ) : (
              <TextField
                fullWidth
                label={field.label}
                name={field.label}
                variant="outlined"
                value={state[field.key]}
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
          </FieldWrapper>
        ))}
        <br />
        {!candidate.isClaimed && (
          <div>
            <form noValidate onSubmit={(e) => e.preventDefault()}>
              <Row style={{ alignItems: 'center' }}>
                <EmailInput
                  hideIcon
                  value={claimEmail}
                  onChangeCallback={(e) => {
                    setClaimEmail(e.target.value);
                  }}
                />
                <BlackButton
                  disabled={!isValidEmail(claimEmail)}
                  onClick={approveClaim}
                  type="submit"
                  style={{
                    marginLeft: '20px',
                    marginBottom: '18px',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <InnerButton>Approve Claim</InnerButton>
                </BlackButton>
              </Row>
            </form>
          </div>
        )}
        <br />
        <br />
        <BlackButton
          fullWidth
          onClick={() => {
            saveCallback({ ...candidate, ...state });
          }}
          disabled={!canSubmit()}
        >
          Save
        </BlackButton>
      </Wrapper>
    </PortalPageWrapper>
  );
}

export default PortalAdminWrapper;
