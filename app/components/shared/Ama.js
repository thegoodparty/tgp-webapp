import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import CloseIcon from '@material-ui/icons/Cancel';
import Dialog from '@material-ui/core/Dialog';

import { Body, H3 } from 'components/shared/typogrophy';
import { OutlinedButton } from './buttons';

const AskQuestion = styled(Body)`
  cursor: pointer;
  color: ${({ theme }) => theme.colors.blue};
  margin-top: 28px;
  padding-bottom: 28px;
  font-weight: 700;
`;

const TgpDialog = styled(Dialog)`
  && {
    .MuiDialog-paper {
      width: 100vw;
      max-width: ${({ theme }) => theme.breakpoints.contentMax};
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

  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 24px;
  }
`;

const Title = styled(H3)`
  padding: 0 16px;
`;

const ButtonWrapper = styled.div`
  padding: 0 16px;
`;

const StyledTextField = styled(TextField)`
  && {
    padding: 10px 24px;
    // box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.1);
    margin: 12px 0;
  }
`;

const Ama = ({ sendAmaCallback }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  const onChangeMessage = event => {
    setMessage(event.target.value);
  };

  const handleSubmitForm = e => {
    e.preventDefault();
    handleSubmit();
  };

  const handleSubmit = () => {
    if (message !== '') {
      sendAmaCallback(message);
    }
  };

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  const mail = () =>
    `mailto:ask@thegoodparty.org?subject=Good%20Party%20Question&body=${encodeURI(
      message,
    )}`;
  return (
    <>
      <AskQuestion onClick={openModal}>
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
            <TopClose onClick={closeModal} />
          </CloseWrapper>
          <Title>
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
            <StyledTextField
              rows={4}
              multiline
              fullWidth
              autofocus
              placeholder="Enter your question here"
              onChange={onChangeMessage}
            />
            <ButtonWrapper>
              <a href={mail()}>
                <OutlinedButton
                  fullWidth
                  active={message !== ''}
                  onClick={handleSubmit}
                >
                  Send
                </OutlinedButton>
              </a>
            </ButtonWrapper>
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
