import React from 'react';
import NumberFormat from 'react-number-format';

const DobFormat = ({ inputRef, onChange, name, ...other }) => {
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
      placeholder="YYYY-MM-DD"
      format="####-##-##"
      mask={['Y', 'Y', 'Y', 'Y', 'M', 'M', 'D', 'D']}
      isNumericString
    />
  );
};

export default DobFormat;