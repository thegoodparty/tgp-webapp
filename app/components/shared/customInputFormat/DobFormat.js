// import React from 'react';
// import MaskedInput from 'react-text-mask';
// 
// const DobFormat = ({ inputRef, ...other }) => {
//   return (
//     <MaskedInput
//       {...other}
//       ref={(ref) => {
//         inputRef(ref ? ref.inputElement : null);
//       }}
//       mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /[1-2]/, /\d/, /\d/, /\d/]}
//       placeholderChar={'\u2000'}
//       showMask  
//     />
//   );
// };
// 
// export default DobFormat;
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
      placeholder="MM/DD/YYYY"
      format="##/##/####"
      mask={['M', 'M', 'D', 'D', 'Y', 'Y', 'Y', 'Y']}
      isNumericString
    />
  );
};

export default DobFormat;