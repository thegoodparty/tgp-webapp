import React from 'react';
import MaskedInput from 'react-text-mask';

const DobFormat = ({ inputRef, ...other }) => {
  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /[1-2]/, /\d/, /\d/, /\d/]}
      placeholderChar={'\u2000'}
      showMask  
    />
  );
};

export default DobFormat;