/**
 *
 * PhoneInput
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { AsYouType } from 'libphonenumber-js';

import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import PhoneIcon from '@material-ui/icons/Phone';
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

export const isValidPhone = (phone) => {
  if (!phone) {
    return false;
  }
  const formattedPhone = phone.replace(/\D/g, '');
  return (
    formattedPhone.length === 10 ||
    (formattedPhone.length === 11 && formattedPhone.charAt(0) === '1')
  );
};

function PhoneInput({
  value,
  onChangeCallback,
  onBlurCallback = () => {},
  hideIcon,
}) {
  const [displayValue, setDisplayValue] = useState('');
  const [validPhone, setValidPhone] = useState(false);

  useEffect(() => {
    if (value) {
      formatDisplay(value);
      setValidPhone(value);
    }
  }, [value]);

  const onChangeValue = async (event) => {
    if (event) {
      const val = event.target.value;
      const isValid = isValidPhone(val);
      setValidPhone(isValid);
      formatDisplay(val);
      onChangeCallback(val.replace(/\D/g, ''), isValid);
    }
  };

  const formatDisplay = (val) => {
    const formatted = new AsYouType('US').input(val);
    // issue that we can't delete (XXX)
    if (
      val.length === 4 &&
      formatted.length === 5 &&
      formatted.charAt(4) === ')'
    ) {
      setDisplayValue(val);
    } else {
      setDisplayValue(formatted);
    }
  };

  const onBlurChange = async (event) => {
    if (event) {
      const val = event.target.value;
      onBlurCallback(val.replace(/\D/g, ''));
    }
  };

  return (
    <Input
      value={displayValue}
      label="(555) 555-5555"
      size="medium"
      fullWidth
      name="phone"
      onChange={onChangeValue}
      onBlur={onBlurChange}
      variant="outlined"
      error={!validPhone && displayValue !== ''}
      InputProps={
        !hideIcon
          ? {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <PhoneIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }
          : {}
      }
    />
  );
}

PhoneInput.propTypes = {
  onChangeCallback: PropTypes.func,
  onBlurCallback: PropTypes.func,
  value: PropTypes.string,
  hideIcon: PropTypes.bool,
};

export default PhoneInput;
