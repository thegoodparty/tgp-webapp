/**
 *
 * PasswordInput
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

const Input = styled(TextField)`
  && {
    margin-bottom: 18px;

    .MuiInputBase-input {
      line-height: 22px;
      font-size: 16px;
      letter-spacing: 0.1px;
      background-color: #fff;

      @media only screen and (min-width: 768px) {
        font-size: 20px;
        line-height: 26px;
      }
    }
  }
`;

function PasswordInput({
  onChangeCallback,
  variant = 'outlined',
  label = 'Password',
  helperText = '8 characters minimum',
  autoFocus = false,
}) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const onChangePassword = event => {
    if (event) {
      setPassword(event.target.value);
      onChangeCallback(event.target.value);
    }
  };
  return (
    <Input
      value={password}
      label={label}
      required
      size="medium"
      fullWidth
      type={showPassword ? 'text' : 'password'}
      helperText={helperText}
      name="password"
      onChange={onChangePassword}
      data-cy="password"
      variant={variant}
      autoFocus={autoFocus}
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
  );
}

PasswordInput.propTypes = {
  onChangeCallback: PropTypes.func,
  variant: PropTypes.string,
  label: PropTypes.string,
  helperText: PropTypes.string,
  autoFocus: PropTypes.bool,
};

export default PasswordInput;
