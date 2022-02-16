/**
 *
 * AdminCandidateStageSettingsWrapper
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';

import { PurpleButton } from '/components/shared/buttons';
import { H2, H3 } from '../../shared/typogrophy';
import CandidateAvatar from '../../shared/CandidateAvatar';
import CandidateTopMenu from '../CandidateTopMenu';
import AdminPageWrapper from '../AdminWrapper/AdminPageWrapper';

const Wrapper = styled.div`
  min-height: calc(100vh - 50px);
  padding: 36px 0;
  max-width: ${({ theme }) => theme.breakpointsPixels.contentMax};
  margin: 0 auto;
`;

const StageTitle = styled.div`
  padding: 10px 0;
  font-weight: 700;
  font-size: 1.2rem;
`;

const Item = styled.div`
  padding: 10px 0;
`;

function AdminCandidateStageSettingsWrapper({ candidate, saveCallback }) {
  const [signatureState, setSignatureState] = useState({
    isActive: false,
    startDate: new Date(),
    endDate: new Date(),
    signaturesNeeded: 0,
  });

  const [registrationState, setRegistrationState] = useState({
    endDate: new Date(),
    isActive: false,
  });

  const [gotvState, setGotvState] = useState({
    electionDay: new Date(),
    isActive: false,
  });

  useEffect(() => {
    if (candidate?.campaignStage) {
      setSignatureState(candidate.campaignStage.signatureStage);
      setRegistrationState(candidate.campaignStage.registrationStage);
      setGotvState(candidate.campaignStage.gotvStage);
    }
  }, [candidate]);

  const onChangeSignature = (key, value) => {
    setSignatureState({
      ...signatureState,
      [key]: value,
    });
  };

  const onChangeRegistration = (key, value) => {
    setRegistrationState({
      ...registrationState,
      [key]: value,
    });
  };

  const onChangeGotv = (key, value) => {
    setGotvState({
      ...gotvState,
      [key]: value,
    });
  };

  const save = () => {
    const campaignStage = {
      signatureStage: signatureState,
      registrationStage: registrationState,
      gotvStage: gotvState,
    };
    saveCallback({
      ...candidate,
      campaignStage,
    });
  };

  return (
    <AdminPageWrapper>
      <Wrapper>
        <CandidateTopMenu candidate={candidate} />
        <br />
        {candidate && candidate.image && (
          <>
            <div className="flex-center">
              <CandidateAvatar
                src={candidate.image}
                name={candidate.firstName}
                good
                size="xl"
              />
            </div>
            <br />
            <H2 className="text-center">
              {candidate.firstName} {candidate.lastName}
            </H2>
          </>
        )}
        <hr />
        <br />
        <H3>Campaign Stage</H3>
        <br />
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <StageTitle>
              <Checkbox
                checked={signatureState.isActive}
                onChange={(event) =>
                  onChangeSignature('isActive', event.target.checked)
                }
              />{' '}
              Signature Stage
            </StageTitle>
            <Item>
              <TextField
                fullWidth
                label="Start Date"
                type="date"
                variant="outlined"
                value={signatureState.startDate}
                onChange={(ev) => {
                  onChangeSignature('startDate', ev.target.value);
                }}
                InputLabelProps={{ shrink: true }}
              />
            </Item>
            <Item>
              <TextField
                fullWidth
                label="End Date"
                type="date"
                variant="outlined"
                value={signatureState.endDate}
                onChange={(ev) => {
                  onChangeSignature('endDate', ev.target.value);
                }}
                InputLabelProps={{ shrink: true }}
              />
            </Item>
            <Item>
              <TextField
                fullWidth
                variant="outlined"
                label="Signature Needed"
                value={signatureState.signaturesNeeded}
                onChange={(e) =>
                  onChangeSignature('signaturesNeeded', e.target.value)
                }
              />
            </Item>
            <Item>Shares #: 123</Item>
            <Item>Signed #: 123</Item>
          </Grid>
          <Grid item xs={12} md={4}>
            <StageTitle>
              <Checkbox
                checked={registrationState.isActive}
                onChange={(event) =>
                  onChangeRegistration('isActive', event.target.checked)
                }
              />{' '}
              Registration stage
            </StageTitle>
            <Item>
              <TextField
                fullWidth
                label="End Date"
                type="date"
                variant="outlined"
                value={registrationState.endDate}
                onChange={(ev) => {
                  onChangeRegistration('endDate', ev.target.value);
                }}
                InputLabelProps={{ shrink: true }}
              />
            </Item>

            <Item>Registration #: 123</Item>
          </Grid>
          <Grid item xs={12} md={4}>
            <StageTitle>
              <Checkbox
                checked={gotvState.isActive}
                onChange={(event) =>
                  onChangeGotv('isActive', event.target.checked)
                }
              />{' '}
              GOTV stage
            </StageTitle>
            <Item>
              <TextField
                fullWidth
                label="Election Day"
                type="date"
                variant="outlined"
                value={gotvState.electionDay}
                onChange={(ev) => {
                  onChangeGotv('electionDay', ev.target.value);
                }}
                InputLabelProps={{ shrink: true }}
              />
            </Item>
          </Grid>
        </Grid>
        <PurpleButton onClick={save} fullWidth>
          &nbsp;&nbsp;SAVE&nbsp;&nbsp;
        </PurpleButton>
      </Wrapper>
    </AdminPageWrapper>
  );
}

AdminCandidateStageSettingsWrapper.propTypes = {
  candidate: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  saveCallback: PropTypes.func,
};

export default AdminCandidateStageSettingsWrapper;
