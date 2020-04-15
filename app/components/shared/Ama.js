import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

import { Body, H3 } from 'components/shared/typogrophy';
import { OutlinedButton } from './buttons';

const Wrapper = styled.div`
  margin: 38px auto 4.5rem;
  max-width: ${({ theme }) => theme.breakpoints.contentMax};
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-bottom: 0;
    padding-bottom: 2rem;
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
    background-color: ;#FFF;
    padding: 10px 24px;
    // border: 0.5px solid #F0F0F0;
    box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.1);
    margin: 12px 0;
  }
`;

const Ama = ({ sendAmaCallback }) => {
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

  const mail = () =>
    `mailto:ask@thegoodparty.org?subject=Good%20Party%20Question&body=${encodeURI(
      message,
    )}`;
  return (
    <Wrapper>
      <Title>Ask us Anything</Title>
      <form noValidate onSubmit={handleSubmitForm}>
        <StyledTextField
          multiline
          rows="4"
          fullWidth
          placeholder="Please ask or suggest anything to help us improve!"
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
  );
};

Ama.propTypes = {
  sendAmaCallback: PropTypes.func,
};

export default Ama;
