/**
 *
 * AdminCandidateStageSettingsWrapper
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import Nav from 'containers/shared/Nav';
import { H2, H3 } from '../../shared/typogrophy';
import CandidateAvatar from '../../shared/CandidateAvatar';
import CandidateTopMenu from '../CandidateTopMenu';

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

function AdminCandidateStageSettingsWrapper({ candidate }) {
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

  return (
    <div style={{ backgroundColor: '#FFF' }}>
      <Nav />
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
                onChange={event =>
                  onChangeSignature('isActive', event.target.checked)
                }
              />{' '}
              Signature Stage
            </StageTitle>
            <Item>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  fullWidth
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="signature-start-date"
                  label="Start Date"
                  value={signatureState.startDate}
                  onChange={date => {
                    onChangeSignature('startDate', date);
                  }}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>
            </Item>
            <Item>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  fullWidth
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="signature-end-date"
                  label="End Date"
                  value={signatureState.endDate}
                  onChange={date => {
                    onChangeSignature('endDate', date);
                  }}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>
            </Item>
            <Item>
              <TextField
                fullWidth
                variant="outlined"
                label="Signature Needed"
                value={signatureState.signaturesNeeded}
                onChange={e =>
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
                onChange={event =>
                  onChangeRegistration('isActive', event.target.checked)
                }
              />{' '}
              Registration stage
            </StageTitle>
            <Item>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  fullWidth
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="registration-end-date"
                  label="End Date"
                  value={registrationState.endDate}
                  onChange={date => {
                    onChangeRegistration('endDate', date);
                  }}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>
            </Item>

            <Item>Registration #: 123</Item>
          </Grid>
          <Grid item xs={12} md={4}>
            <StageTitle>
              <Checkbox
                onChange={event =>
                  onChangeGotv('isActive', event.target.checked)
                }
              />{' '}
              GOTV stage
            </StageTitle>
            <Item>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  fullWidth
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="election-date"
                  label="Election Day"
                  value={gotvState.electionDay}
                  onChange={date => {
                    onChangeGotv('electionDay', date);
                  }}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>
            </Item>
          </Grid>
        </Grid>
      </Wrapper>
    </div>
  );
}

AdminCandidateStageSettingsWrapper.propTypes = {
  candidate: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
};

export default AdminCandidateStageSettingsWrapper;
