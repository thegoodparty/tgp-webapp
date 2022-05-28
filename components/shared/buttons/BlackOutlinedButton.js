import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import tgpTheme from '/theme/index';

const StyledButton = styled(Button)`
  && {
    cursor: pointer;
    border-radius: 30px;
    padding: 12px 18px;
    font-family: ${tgpTheme.typography.fontFamily};
    letter-spacing: 0.2px;
    border: solid 1.5px #000;
    background-color: #fff;
    color: #000;
    font-weight: 600;
    transition: background-color 0.5s, color 0.5s;

    &:hover {
      border: solid 1.5px #000;
      background-color: #000;
      color: #fff;
      text-decoration: none;
    }
  }
`;

const Inner = styled.div`
  padding: 0 24px;
`;

const BlackOutlinedButton = ({
  children,
  disabled = false,
  fullWidth = false,
  onClick,
  style = {},
  type = 'button',
  ...props
}) => {
  return (
    <StyledButton
      variant="outlined"
      color="primary"
      fullWidth={fullWidth}
      onClick={onClick}
      disabled={disabled}
      style={style}
      type={type}
      {...props}
    >
      <Inner>{children}</Inner>
    </StyledButton>
  );
};

BlackOutlinedButton.propTypes = {
  children: PropTypes.node,
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  onClick: PropTypes.func,
  style: PropTypes.object,
  type: PropTypes.string,
};

export default BlackOutlinedButton;
