import React from 'react';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';

const DobFormat = ({ inputRef, onChange, name, ...props }) => (
  <NumberFormat
    {...props}
    getInputRef={inputRef}
    onValueChange={values => {
      onChange({
        target: {
          name,
          value: values.value,
        },
      });
    }}
    placeholder="MM/DD/YYYY"
    format="##/##/####"
    mask={['M', 'M', 'D', 'D', 'Y', 'Y', 'Y', 'Y']}
    isNumericString
  />
);

DobFormat.propTypes = {
  inputRef: PropTypes.object,
  onChange: PropTypes.func,
  name: PropTypes.string,
};

export default DobFormat;
