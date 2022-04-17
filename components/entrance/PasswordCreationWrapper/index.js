/**
 *
 * PasswordCreationWrapper
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import PageWrapper from '../../shared/PageWrapper';
import { H1 } from '../../shared/typogrophy';
import { PurpleButton } from '../../shared/buttons';
import PasswordInput from '../../shared/PasswordInput';
import { passwordRegex } from '/helpers/userHelper';

const Wrapper = styled.div`
  padding: 24px 0;
  max-width: 600px;
  margin: 0 auto;
`;


function PasswordCreationWrapper({ savePasswordCallback }) {
  const [formData, setFormData] = useState({
    password: '',
    passwordConfirmation: '',
  });

  const handleSubmitForm = e => {
    e.preventDefault();
  };

  const enableSubmit = () =>
    formData.password !== '' &&
    formData.password.match(passwordRegex) &&
    formData.password.length >= 8 &&
    formData.password === formData.passwordConfirmation;

  const handleSubmit = () => {
    if (enableSubmit()) {
      savePasswordCallback(formData.password);
    }
  };

  const onChangeField = (value, key) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };
  return (
    <PageWrapper>
      <Wrapper>
        <H1 data-cy="title">Create a password</H1>
        <br />
        <br />
        <form noValidate onSubmit={handleSubmitForm}>
          <PasswordInput
            label="Password"
            onChangeCallback={pwd => onChangeField(pwd, 'password')}
            helperText="For security, passwords must have at least 1 capital letter, 1 lowercase, 1 special character or number, and 8 characters minimum"
          />
          <PasswordInput
            label="Retype Password"
            onChangeCallback={pwd => onChangeField(pwd, 'passwordConfirmation')}
            helperText=""
          />

          <PurpleButton
            fullWidth
            disabled={!enableSubmit()}
            onClick={handleSubmit}
            type="submit"
          >
            SAVE
          </PurpleButton>
        </form>
      </Wrapper>
    </PageWrapper>
  );
}

PasswordCreationWrapper.propTypes = {
  savePasswordCallback: PropTypes.func,
};

export default PasswordCreationWrapper;
