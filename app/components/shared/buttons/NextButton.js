import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import tgpTheme from 'theme/index';

const StyledButton = styled(Button)`
  && {
    border-radius: 30px;
    padding: 12px 18px;
    font-family: ${tgpTheme.typography.fontFamily};
    letter-spacing: 0.2px;
    border: solid 1.5px;
    justify-content: flex-end;
    align-self: flex-end;
  }
`;

const NextButton = ({ children, active = false }) => (
  <StyledButton
    variant="outlined"
    color="primary"
    endIcon={<ChevronRightIcon style={{ marginLeft: '30px' }} />}
    disabled={!active}
  >
    {children}
  </StyledButton>
);

NextButton.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  active: PropTypes.bool,
};

export default NextButton;
