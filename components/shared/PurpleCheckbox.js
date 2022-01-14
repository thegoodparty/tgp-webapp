import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Checkbox = styled.input`
  -webkit-appearance: none;
  background-color: #fff;
  border: 2px solid #bb91e4;
  //box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05),
  //  inset 0px -15px 10px -12px rgba(0, 0, 0, 0.05);
  padding: 11px;
  border-radius: 3px;
  display: inline-block;
  position: relative;
  margin-right: 16px;

  &:active,
  &:checked:active {
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05),
      inset 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  &:checked {
    background-color: ${({ theme }) => theme.colors.purple3};
    border: 2px solid ${({ theme }) => theme.colors.purple};
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05),
      inset 0px -15px 10px -12px rgba(0, 0, 0, 0.05),
      inset 15px 10px -12px rgba(255, 255, 255, 0.1);
    color: #99a1a7;
  }

  &:checked:after {
    content: '\\2714';
    font-size: 18px;
    position: absolute;
    top: 0;
    left: 3px;
    color: ${({ theme }) => theme.colors.purple};
  }
`;

function PurpleCheckbox({
  value = false,
  onChange = () => {},
  disabled = false,
}) {
  return (
    <Checkbox
      type="checkbox"
      checked={value}
      onClick={onChange}
      disabled={disabled}
    />
  );
}

PurpleCheckbox.propTypes = {
  value: PropTypes.bool,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
};

export default PurpleCheckbox;
