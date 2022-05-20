import React from 'react';
const Emoji = ({ label, symbol }) => (
  <span className="emoji" role="img" aria-label={label ? label : ''}>
    {symbol}
  </span>
);
export default Emoji;
