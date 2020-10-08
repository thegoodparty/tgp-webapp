import React from 'react';
import NumberFormat from 'react-number-format';

const DobFormat = ({ inputRef, onChange, ...other }) => {
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
      format="+1 (###)-###-####"
      mask="_"
      isNumericString
    />
  );
};

export default DobFormat;