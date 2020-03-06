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
  }

  &.white {
    && {
      color: #fff;
      border-color: #fff;
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
}) => {
  let buttonClass = className;
  if (white) {
    buttonClass = 'white';
  }
  return (
    <StyledButton
      variant="outlined"
      color="primary"
      fullWidth={fullWidth}
      className={buttonClass}
      onClick={onClick}
      disabled={!active}
    >
      {children}
    </StyledButton>
  );
};

OutlinedButton.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  active: PropTypes.bool,
  fullWidth: PropTypes.bool,
  white: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default OutlinedButton;
