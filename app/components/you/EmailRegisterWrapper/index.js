import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';

import Wrapper from 'components/shared/Wrapper';
import MobileHeader from 'components/shared/navigation/MobileHeader';
import Nav from 'containers/shared/Nav';
import { Body13, H2 } from 'components/shared/typogrophy/index';
import NextButton from 'components/shared/buttons/NextButton';
import { fullFirstLastInitials } from '../../../helpers/userHelper';

const Input = styled(TextField)`
  && {
    margin-bottom: 48px;
    margin-top: 40px;

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
`;

const Error = styled(Body13)`
  color: red;
  font-weight: 600;
  margin-top: 12px;
`;

const Login = styled.span`
  a {
    color: ${({ theme }) => theme.colors.blue};
  }
  font-weight: 600;
  text-decoration: underline;
  margin-left: 4px;
`;

const RegisterWrapper = ({ registerCallback, loading, error }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [showName, setShowName] = useState(false);

  const onChangeName = event => {
    setName(event.target.value);
  };

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
      registerCallback(email, name);
    }
  };

  const onEmailFocus = () => {
    console.log('on Focus');
    if (name !== '') {
      setShowName(true);
    }
  };

  return (
    <div>
      <Nav />
      <Wrapper white>
        <MobileHeader />
        <H2>Join The Good Party</H2>
        <Body13 style={{ marginTop: '16px', marginBottom: '28px' }}>
          Please enter your info, so we can count your support and notify you as
          we make progress.
        </Body13>
        <form noValidate onSubmit={handleSubmitForm}>
          <Input
            value={name}
            label="Full Name"
            required
            placeholder="John Smith"
            size="medium"
            name="name"
            fullWidth
            onChange={onChangeName}
            helperText={`We will never show your full name on our site. ${
              showName
                ? `On our site you'll be: ${fullFirstLastInitials(name)}`
                : ''
            }`}
          />

          <Input
            value={email}
            label="Email Address"
            required
            size="medium"
            fullWidth
            type="email"
            name="email"
            helperText="We will never share or sell your information for any reason"
            autoComplete="email"
            onChange={onChangeEmail}
            onFocus={onEmailFocus}
          />

          {!loading && (
            <SubmitWrapper onClick={handleSubmit}>
              <NextButton active={validateEmail() && name !== ''}>
                Submit
              </NextButton>
              {error && error.exists && (
                <Error>
                  {error.message}{' '}
                  <Login>
                    <Link to="/login">Login</Link>
                  </Login>
                </Error>
              )}
            </SubmitWrapper>
          )}
        </form>
      </Wrapper>
    </div>
  );
};

RegisterWrapper.propTypes = {
  registerCallback: PropTypes.func,
  loading: PropTypes.bool,
  error: PropTypes.bool,
};

export default RegisterWrapper;
