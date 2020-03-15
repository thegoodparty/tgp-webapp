import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Wrapper from 'components/shared/Wrapper';
import MobileHeader from 'components/shared/navigation/MobileHeader';
import Nav from 'containers/shared/Nav';
import { Body13, H2 } from 'components/shared/typogrophy/index';
import NextButton from 'components/shared/buttons/NextButton';

import TextField from '@material-ui/core/TextField';

const Input = styled(TextField)`
  && {
    margin-bottom: 48px;

    .MuiInputBase-input {
      line-height: 22px;
      font-size: 16px;
      letter-spacing: 0.1px;

      @media only screen and (min-width: ${({ theme }) =>
          theme.breakpoints.md}) {
        font-size: 20px;
        line-height: 26px;
      }
    }
  }
`;

const SubmitWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-bottom: 20px;
  margin-top: 30px;
`;

const LoginWrapper = ({ loginCallback }) => {
  const [email, setEmail] = useState('');
  const onChangeEmail = event => {
    setEmail(event.target.value);
  };

  const validateEmail = () => {
    const validEmail = /\S+@\S+\.\S+/;
    return validEmail.test(email);
  };

  const handleSubmitForm = e => {
    e.preventDefault();
    handleSubmit();
  };

  const handleSubmit = () => {
    if (validateEmail()) {
      loginCallback(email);
    }
  };
  return (
    <div>
      <Nav />
      <Wrapper white>
        <MobileHeader />
        <H2>Sign in to your account</H2>
        <Body13 style={{ marginTop: '16px', marginBottom: '28px' }}>
          Enter your email so we can send a code to confirm it is really you
        </Body13>
        <form noValidate onSubmit={handleSubmitForm}>
          <Input
            value={email}
            label="Email Address"
            required
            size="medium"
            fullWidth
            type="email"
            onChange={onChangeEmail}
          />
          <SubmitWrapper onClick={handleSubmit}>
            <NextButton active={validateEmail()}>Submit</NextButton>
          </SubmitWrapper>
        </form>
      </Wrapper>
    </div>
  );
};

LoginWrapper.propTypes = {
  loginCallback: PropTypes.func,
};

export default LoginWrapper;
