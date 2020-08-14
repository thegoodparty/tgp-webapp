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
    border: solid 1.5px;

    &:hover {
      border: solid 1.5px;
    }
  }

  &.white {
    && {
      color: #fff;
      border-color: #fff;
    }
  }
  &.twitter {
    && {
      background-color: #64ccf1;
      border: none;
      p {
        color: #fff;
      }
    }
  }
  &.auth {
    && {
      margin-top: 24px;
      p {
        font-size: 16px;
      }
      width: 100%;
    }
  }
`;

const OutlinedButton = ({
  children,
  active = false,
  fullWidth = false,
  white = false,
  className = '',
  onClick,
  style = {},
  type = 'button',
  twitter = false,
  auth = false
}) => {
  let buttonClass = className;
  if (white) {
    buttonClass += ' white';
  }
  if (twitter) {
    buttonClass += ' twitter';
  }
  if (auth) {
    buttonClass += ' auth';
  }
  return (
    <StyledButton
      variant="outlined"
      color="primary"
      fullWidth={fullWidth}
      className={buttonClass}
      onClick={onClick}
      disabled={!active}
      style={style}
      type={type}
    >
      {children}
    </StyledButton>
  );
};

OutlinedButton.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  active: PropTypes.bool,
  fullWidth: PropTypes.bool,
  white: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
  style: PropTypes.object,
  type: PropTypes.string,
  twitter: PropTypes.bool,
  auth: PropTypes.bool,
};

export default OutlinedButton;
