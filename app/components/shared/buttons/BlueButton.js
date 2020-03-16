import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import tgpTheme from 'theme/index';

const StyledButton = styled(Button)`
  && {
    border-radius: 30px;
    padding: 12px 18px;
    font-family: ${tgpTheme.typography.fontFamily};
    letter-spacing: 0.2px;
    background-color: ${({ theme }) => theme.colors.blue};
    color: #fff;
  }
`;

const BlueButton = ({
  fullWidth = false,
  onClick,
  children,
  disabled = false,
  style = {},
}) => (
  <StyledButton
    color="primary"
    fullWidth={fullWidth}
    onClick={onClick}
    variant="contained"
    disabled={disabled}
    style={style}
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
};

export default BlueButton;
