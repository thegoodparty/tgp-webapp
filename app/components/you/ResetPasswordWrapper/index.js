/**
 *
 * ResetPasswordWrapper
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import TextField from '@material-ui/core/TextField';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import PageWrapper from 'components/shared/PageWrapper';
import { H2, Body } from 'components/shared/typogrophy';
import { OutlinedButton } from 'components/shared/buttons';

const Input = styled(TextField)`
  && {
    margin-top: 54px;
    margin-bottom: 40px;

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

function ResetPasswordWrapper({ email, token, resetPasswordCallback }) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const enableSubmit = () => {
    return password.length >= 8;
  };

  const handleSubmitForm = e => {
    e.preventDefault();
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const onChangePassword = event => {
    setPassword(event.target.value);
  };

  const handleSubmit = () => {
    if (enableSubmit()) {
      resetPasswordCallback(email, password, token);
    }
  };
  return (
    <PageWrapper>
      <H2>New Password</H2>
      <Body style={{ marginTop: '8px' }}>
        Enter a new password for <strong>{email}</strong>
      </Body>
      <form
        noValidate
        onSubmit={handleSubmitForm}
        data-cy="reset-password-form"
      >
        <Input
          value={password}
          label="Enter a New Password"
          required
          size="medium"
          fullWidth
          type={showPassword ? 'text' : 'password'}
          name="password"
          onChange={onChangePassword}
          data-cy="password"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <div className="text-right">
          <OutlinedButton
            active={enableSubmit()}
            onClick={handleSubmit}
            type="submit"
          >
            CHANGE PASSWORD <ChevronRightIcon />
          </OutlinedButton>
        </div>
      </form>
    </PageWrapper>
  );
}

ResetPasswordWrapper.propTypes = {
  email: PropTypes.string,
  token: PropTypes.string,
  resetPasswordCallback: PropTypes.func,
};

export default ResetPasswordWrapper;
