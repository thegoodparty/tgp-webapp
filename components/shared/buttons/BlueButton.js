import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import tgpTheme from '/theme/index';

const StyledButton = styled(Button)`
  && {
    border-radius: 30px;
    padding: 12px 18px;
    font-family: ${tgpTheme.typography.fontFamily};
    letter-spacing: 0.2px;
    background-color: ${({ theme }) => theme.colors.blue};
    &.outline {
      background-color: white;
      border: 2px solid ${({ theme }) => theme.colors.blue};
      color: ${({ theme }) => theme.colors.blue};
      font-size: 1rem;
      box-shadow: none;
    }
    &.center {
      display: inherit;
      margin: 0 auto;
    }
    color: #fff;
  }
`;

const BlueButton = ({
  fullWidth = false,
  onClick,
  children,
  disabled = false,
  style = {},
  className,
}) => (
  <StyledButton
    color="primary"
    fullWidth={fullWidth}
    onClick={onClick}
    variant="contained"
    disabled={disabled}
    style={style}
    className={className}
  >
    {children}
  </StyledButton>
);

BlueButton.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
    PropTypes.string,
  ]),
  fullWidth: PropTypes.bool,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
};

export default BlueButton;
