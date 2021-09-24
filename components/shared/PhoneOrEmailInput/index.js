/**
 *
 * PhoneOrEmailInput
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { AsYouType } from 'libphonenumber-js';

import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import PhoneIcon from '@material-ui/icons/Phone';
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

function PhoneOrEmailInput({ onChangeCallback }) {
  const [value, setValue] = useState('');
  const [displayValue, setDisplayValue] = useState('');
  const [valueType, setValueType] = useState(false);

  const onChangeValue = async event => {
    if (event) {
      const val = event.target.value;
      const valType = setType(val);
      let isValid = false;
      if (valType === 'email' && isValidEmail(val)) {
        isValid = true;
      } else if (valType === 'phone' && isValidPhone(val)) {
        isValid = true;
      }
      setValue(val);
      if (valType === 'email') {
        setDisplayValue(val);
      } else {
        const formatted = new AsYouType('US').input(val);
        setDisplayValue(formatted);
      }
      if (valType === 'phone') {
        onChangeCallback(val.replace(/\D/g, ''), isValid, valType);
      } else {
        onChangeCallback(val, isValid, valType);
      }
    }
  };

  const setType = val => {
    const onlyDigitsRegex = /^\d+$/;
    const onlyDigits = onlyDigitsRegex.test(val.charAt(0));
    if ((val.length > 0 && onlyDigits) || val.charAt(0) === '(') {
      setValueType('phone');
      return 'phone';
    }
    if (val.length > 0) {
      setValueType('email');
      return 'email';
    }
    setValueType(false);
    return false;
  };

  const isValidEmail = mail => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(mail).toLowerCase());
  };

  const isValidPhone = phone => {
    const formattedPhone = phone.replace(/\D/g, '');
    return formattedPhone.length === 10;
  };

  return (
    <Input
      value={displayValue}
      label="Email or 10 digits phone number"
      required
      size="medium"
      fullWidth
      name="password"
      onChange={onChangeValue}
      variant="outlined"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton>
              {valueType === 'email' && <EmailIcon />}
              {valueType === 'phone' && <PhoneIcon />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}

PhoneOrEmailInput.propTypes = {
  onChangeCallback: PropTypes.func,
  variant: PropTypes.string,
  label: PropTypes.string,
  helperText: PropTypes.string,
};

export default PhoneOrEmailInput;
