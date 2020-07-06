import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';

const Wrapper = styled.div`
  padding: 0;
  position: fixed;
  bottom: -300px;
  width: 100%;
  max-height: 95vh;
  overflow-x: hidden;
  overflow-y: auto;
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    width: ${({ theme }) => theme.breakpoints.contentMax};
  }
  transition: bottom 0.5s;

  &.open {
    bottom: 0;
  }
`;
const InnerWrapper = styled.div`
  box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  padding: 27px 21px;
  border-top-right-radius: 16px;
  border-top-left-radius: 16px;
`;

const CloseWrapper = styled.div`
  text-align: right;
  cursor: pointer;
  position: fixed;
  margin-top: 16px;
  right: 16px;
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    right: auto;
    left: 50%;
    margin-left: 350px;
  }
`;

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    padding: 0,
  },
}));

const BottomPopup = ({ open, handleClose, children }) => {
  const classes = useStyles();
  return (
    <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
      <Wrapper className={open ? 'open' : 'close'} data-cy="bottom-popup">
        <CloseWrapper onClick={handleClose} data-cy="popup-close">
          <CloseIcon />
        </CloseWrapper>
        <InnerWrapper>{children}</InnerWrapper>
      </Wrapper>
    </Backdrop>
  );
};

BottomPopup.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.array,
  ]),
};

export default BottomPopup;
