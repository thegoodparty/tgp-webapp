import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import tgpTheme from '/theme/index';

const StyledButton = styled(Button)`
  && {
    border-radius: 8px;
    padding: 12px 3px;
    font-weight: 600;
    font-family: ${tgpTheme.typography.fontFamily};
    letter-spacing: 0.2px;
    border: 2px solid ${({ theme }) => theme.colors.purple};
    background: linear-gradient(
        103.63deg,
        rgba(255, 15, 19, 0.15) -3.51%,
        rgba(191, 0, 32, 0) 94.72%
      ),
      linear-gradient(
        257.82deg,
        rgba(67, 0, 211, 0.25) -11.17%,
        rgba(67, 0, 211, 0) 96.34%
      ),
      ${({ theme }) => theme.colors.purple};
    font-size: 1rem;
    &.outline {
      background: #fff;
      border: 2px solid ${({ theme }) => theme.colors.purple};
      color: ${({ theme }) => theme.colors.purple};
      box-shadow: none;
    }
    &.center {
      display: inherit;
      margin: 0 auto;
    }
    color: #fff;
    box-shadow: none;

    &.Mui-disabled {
      background: ${({ theme }) => theme.colors.purple3};
      border: solid 2px #e0d4ea;
    }
    &.submit {
      padding: 12px 22px;
    }
  }
`;

const PurpleButton = ({
  fullWidth = false,
  onClick,
  children,
  disabled = false,
  style = {},
  className,
  type = 'button',
}) => (
  <StyledButton
    color="primary"
    fullWidth={fullWidth}
    onClick={onClick}
    variant="contained"
    disabled={disabled}
    style={style}
    className={className}
    type={type}
  >
    {children}
  </StyledButton>
);

PurpleButton.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
    PropTypes.string,
  ]),
  fullWidth: PropTypes.bool,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  type: PropTypes.string,
  style: PropTypes.object,
};

export default PurpleButton;
