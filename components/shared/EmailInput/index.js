/**
 *
 * EmailInput
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import EmailIcon from '@material-ui/icons/Email';
import TextField from '@material-ui/core/TextField';

const Input = styled(TextField)`
  && {
    margin-bottom: 18px;

    .MuiInputBase-input {
      line-height: 22px;
      font-size: 16px;
      letter-spacing: 0.1px;
      background-color: #fff;

      @media only screen and (min-width: ${({ theme }) =>
          theme.breakpointsPixels.md}) {
        font-size: 20px;
        line-height: 26px;
      }
    }
  }
`;

export const isValidEmail = mail => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(mail).toLowerCase());
};

function EmailInput({ value, onChangeCallback, onBlurCallback }) {
  return (
    <Input
      value={value}
      label="Email"
      required
      size="medium"
      fullWidth
      name="email"
      error={value !== '' && !isValidEmail(value)}
      onChange={onChangeCallback}
      onBlur={onBlurCallback}
      variant="outlined"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton>
              <EmailIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}

EmailInput.propTypes = {
  onChangeCallback: PropTypes.func,
  onBlurCallback: PropTypes.func,
  value: PropTypes.string,
};

export default EmailInput;
