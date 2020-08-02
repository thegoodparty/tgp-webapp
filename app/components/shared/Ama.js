import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import CloseIcon from '@material-ui/icons/Cancel';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';

import { Body, H3 } from 'components/shared/typogrophy';
import { validateEmail } from 'helpers/emailHelper';
import { OutlinedButton } from './buttons';

const AskQuestion = styled(Body)`
  cursor: pointer;
  color: ${({ theme }) => theme.colors.blue};
  margin-top: 28px;
  padding-bottom: 28px;
  font-weight: 700;
`;
const StyledTextField = styled(TextField)`
  && {
    // box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.1);
    margin: 6px 0;
  }
`;
const AmaSubmit = styled.a`
  width: 100%;
  padding-left: 1rem;
`;
const Ama = ({ sendAmaCallback }) => {
  const [message, setMessage] = useState('');
  const [replyEmail, setReplyEmail] = useState('');

  const onChangeMessage = event => {
    setMessage(event.target.value);
  };
  const onChangeEmail = event => {
    setReplyEmail(event.target.value);
  };

  const handleSubmit = () => {
    if (message !== '') {
      sendAmaCallback(message, replyEmail);
    }
  };

  const mail = () =>
    `mailto:ask@thegoodparty.org?subject=Good%20Party%20Question&body=${encodeURI(
      message,
    )}`;
  return (
    <>
      <AskQuestion data-cy="ama">
        <span role="img" aria-label="thinker">
          🤔
        </span>{' '}
        Ask a Question or{' '}
        <span role="img" aria-label="light-bulb">
          💡
        </span>
        Give a Suggestion
      </AskQuestion>
      <StyledTextField
        rows={4}
        multiline
        fullWidth
        autoFocus
        placeholder="Enter your question here"
        onChange={onChangeMessage}
        variant="outlined"
      />
      <Grid container>
        <Grid item xs={7} p={1}>
          <StyledTextField
            fullWidth
            autoFocus
            placeholder="Enter Email for Reploy(Optional)"
            onChange={onChangeEmail}
            variant="outlined"
          />
        </Grid>
        <Grid
          item
          xs={5}
          p={1}
          style={{ alignItems: 'center', display: 'flex' }}
        >
          <AmaSubmit href={mail()} data-cy="ama-dialog-submit">
            <OutlinedButton
              fullWidth
              active={message !== '' && validateEmail(replyEmail)}
              onClick={handleSubmit}
            >
              Send
            </OutlinedButton>
          </AmaSubmit>
        </Grid>
      </Grid>
    </>
  );
};

Ama.propTypes = {
  sendAmaCallback: PropTypes.func,
};

export default Ama;
