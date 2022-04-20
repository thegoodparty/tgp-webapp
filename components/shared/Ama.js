import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import CloseIcon from '@material-ui/icons/Cancel';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import { Body, H3 } from '/components/shared/typogrophy';
import { validateEmail } from '/helpers/emailHelper';
import { OutlinedButton } from './buttons';

const AskQuestion = styled(Body)`
  cursor: pointer;
  color: ${({ theme }) => theme.colors.primary};
  margin-top: 28px;
  padding-bottom: 28px;
  font-weight: 700;
`;

const StyleTextField = styled(TextField)`
  && {
    margin-top: 20px;
  }
`;
const FormGrid = styled(Grid)`
  && {
    margin-top: 20px;
  }
`;
const AmaSubmit = styled.a`
  width: 100%;
  padding-left: 1rem;
`;

const TgpDialog = styled(Dialog)`
  && {
    .MuiDialog-paper {
      width: 100vw;
      max-width: ${({ theme }) => theme.breakpointsPixels.contentMax};
      margin: 12px !important;
    }
  }
`;

const CloseWrapper = styled.div`
  text-align: right;
`;

const TopClose = styled(CloseIcon)`
  font-size 24px;
  cursor: pointer;
`;

const Wrapper = styled.div`
  padding: 12px;
  @media only screen and (min-width: ${({ theme }) => theme.breakpointsPixels.md}) {
    padding: 24px;
  }
`;

const Title = styled(H3)`
  padding: 0 16px;
`;

const Ama = ({ sendAmaCallback }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [replyEmail, setReplyEmail] = useState('');
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);
  const onChangeMessage = event => {
    setMessage(event.target.value);
  };
  const onChangeEmail = event => {
    setReplyEmail(event.target.value);
  };
  const handleSubmitForm = e => {
    e.preventDefault();
    handleSubmit();
  };
  const handleSubmit = () => {
    if (message !== '') {
      sendAmaCallback(message, replyEmail);
      closeModal();
    }
  };

  return (
    <>
      <AskQuestion onClick={openModal} data-cy="ama">
        <span role="img" aria-label="thinker">
          🤔
        </span>{' '}
        Ask a Question or{' '}
        <span role="img" aria-label="light-bulb">
          💡
        </span>
        Give a Suggestion
      </AskQuestion>
      <TgpDialog onClose={closeModal} open={open}>
        <Wrapper>
          <CloseWrapper>
            <TopClose onClick={closeModal} data-cy="ama-dialog-close" />
          </CloseWrapper>
          <Title data-cy="ama-dialog-title">
            <span role="img" aria-label="thinker">
              🤔
            </span>{' '}
            Ask a Question or{' '}
            <span role="img" aria-label="light-bulb">
              💡
            </span>
            Give a Suggestion
          </Title>
          <form noValidate onSubmit={handleSubmitForm}>
            <StyleTextField
              rows={4}
              multiline
              fullWidth
              autoFocus
              placeholder="Enter your question or suggestion here"
              onChange={onChangeMessage}
              variant="outlined"
            />
            <FormGrid container>
              <Grid item xs={7} p={1}>
                <TextField
                  fullWidth
                  placeholder="For reply: Enter your Email (Optional)"
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
                <AmaSubmit data-cy="ama-dialog-submit">
                  <OutlinedButton
                    fullWidth
                    active={
                      message !== '' &&
                      (replyEmail === '' || validateEmail(replyEmail))
                    }
                    onClick={handleSubmit}
                  >
                    Send
                  </OutlinedButton>
                </AmaSubmit>
              </Grid>
            </FormGrid>
          </form>
        </Wrapper>
      </TgpDialog>
    </>
  );
};

Ama.propTypes = {
  sendAmaCallback: PropTypes.func,
};

export default Ama;
