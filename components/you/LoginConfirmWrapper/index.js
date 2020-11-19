import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Link from 'next/link';

import PageWrapper from 'components/shared/PageWrapper';
import { Body13, H2 } from 'components/shared/typogrophy/index';
import NextButton from 'components/shared/buttons/NextButton';

import TextField from '@material-ui/core/TextField';

const Input = styled(TextField)`
  && {
    margin-bottom: 20px;

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

const StyledBody13 = styled(Body13)`
  color: ${({ theme }) => theme.colors.blue};
  cursor: pointer;
`;

const SubmitWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-bottom: 20px;
  margin-top: 30px;
`;

const LoginConfirmWrapper = ({ confirmLoginCallback, email }) => {
  const [code, setCode] = useState('');

  const onChangeCode = event => {
    setCode(event.target.value);
  };

  const validateCode = () => code.length === 6;

  const handleSubmitForm = e => {
    e.preventDefault();
    handleSubmit();
  };

  const handleSubmit = () => {
    if (validateCode()) {
      confirmLoginCallback(email, code);
    }
  };
  return (
    <PageWrapper white>
      <H2 style={{ marginBottom: '28px' }} data-cy="title">
        A code was sent to {email}
      </H2>
      <form noValidate onSubmit={handleSubmitForm}>
        <Input
          value={code}
          label="Enter 6 digit code"
          required
          size="medium"
          fullWidth
          type="tel"
          onChange={onChangeCode}
        />
        <Link href="/login" data-cy="return-link">
          <StyledBody13>Didn’t receive the code?</StyledBody13>
        </Link>
        <SubmitWrapper onClick={handleSubmit} data-cy="submit">
          <NextButton active={validateCode()}>Confirm</NextButton>
        </SubmitWrapper>
      </form>
    </PageWrapper>
  );
};

LoginConfirmWrapper.propTypes = {
  loginCallback: PropTypes.func,
};

export default LoginConfirmWrapper;
