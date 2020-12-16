import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const StyledButton = styled(Button)`
  && {
    border-radius: 30px;
    padding: 12px 18px;
    border: solid 2px;
    justify-content: flex-end;
    align-self: flex-end;
    background-color: #fff;
  }
`;

const NextButton = ({ children, active = false, onClick = () => {} }) => (
  <StyledButton
    variant="outlined"
    color="primary"
    endIcon={<ChevronRightIcon style={{ marginLeft: '30px' }} />}
    disabled={!active}
    onClick={onClick}
    type="submit"
  >
    {children}
  </StyledButton>
);

NextButton.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  active: PropTypes.bool,
  onClick: PropTypes.func,
};

export default NextButton;
