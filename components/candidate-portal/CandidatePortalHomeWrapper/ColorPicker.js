/**
 *
 * ColorPicker
 *
 */

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ChromePicker } from 'react-color';

const Wrapper = styled.div`
  background-color: #fff;
  padding: 14px 18px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  border-radius: 14px;
  display: inline-block;

  .chrome-picker {
    box-shadow: none !important;
  }

  input {
    height: 36px !important;
    border-radius: 6px !important;

    //& + label {
    //  display: none !important;
    //}
  }

  &.lean {
    padding: 8px;
    box-shadow: none;
  }
`;

function ColorPicker({ onColorPick, initialColor = '#000', mode }) {
  const [color, setColor] = useState(initialColor);
  useEffect(() => {
    setColor(initialColor);
  }, [initialColor]);
  const handleColorChange = (color) => {
    setColor(color.hex);
    onColorPick(color.hex);
  };
  return (
    <Wrapper className={mode ?? ''}>
      <ChromePicker
        color={color}
        onChange={handleColorChange}
        disableAlpha
      />
    </Wrapper>
  );
}

export default ColorPicker;
