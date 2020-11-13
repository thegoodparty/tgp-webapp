import React from 'react';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';

const PhoneNumberFormat = ({ inputRef, onChange, name, ...other }) => {
  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: name,
            value: values.value,
          },
        });
      }}
      format="+1 (###) ###-####"
      mask="_"
      isNumericString
    />
  );
};

PhoneNumberFormat.propTypes = {
  inputRef: PropTypes.object,
  onChange: PropTypes.func,
  name: PropTypes.string,
};

export default PhoneNumberFormat;