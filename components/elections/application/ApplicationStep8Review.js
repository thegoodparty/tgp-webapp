/**
 *
 * ApplicationStep8
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import PageWrapper from '../../shared/PageWrapper';
import { Body, H1 } from '../../shared/typogrophy';
import LightPurpleButton from '../../shared/buttons/LightPurpleButton';
import BlackButton from '../../shared/buttons/BlackButton';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  height: 100%;
  min-height: calc(100vh - 80px);
`;

const Inner = styled.div`
  width: 80vw;
  max-width: 800px;
`;

const StyledH1 = styled(H1)`
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 16px;
`;

const InnerButton = styled.span`
  font-weight: 600;
`;

function ApplicationStep8({
  id,
  approveApplicationCallback,
  rejectApplicationCallback,
}) {
  const [state, setState] = useState({
    feedback: '',
    loading: false,
  });

  const onChangeField = (key, e) => {
    setState({
      ...state,
      [key]: e.target.value,
    });
  };

  const approve = () => {
    setState({ ...state, loading: true });
    approveApplicationCallback(id, state.feedback);
  };

  const reject = () => {
    setState({ ...state, loading: true });
    rejectApplicationCallback(id, state.feedback);
  };
  return (
    <PageWrapper purple>
      <Wrapper>
        <Inner>
          <StyledH1>Approve / Reject</StyledH1>
          <TextField
            fullWidth
            variant="outlined"
            label="Feedback"
            multiline
            required
            rows={6}
            onChange={(e) => onChangeField('feedback', e)}
            value={state.feedback}
          />
          <br />
          <br />
          {state.loading ? (
            <div className="text-center">Saving...</div>
          ) : (
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <LightPurpleButton
                  fullWidth
                  disabled={state.feedback === ''}
                  onClick={reject}
                >
                  <InnerButton>Reject</InnerButton>
                </LightPurpleButton>
              </Grid>
              <Grid item xs={6}>
                <BlackButton
                  fullWidth
                  disabled={state.feedback === ''}
                  onClick={approve}
                >
                  <InnerButton>Approve</InnerButton>
                </BlackButton>
              </Grid>
            </Grid>
          )}
        </Inner>
      </Wrapper>
    </PageWrapper>
  );
}

ApplicationStep8.propTypes = {
  id: PropTypes.string,
  approveApplicationCallback: PropTypes.func,
  rejectApplicationCallback: PropTypes.func,
};

export default ApplicationStep8;
