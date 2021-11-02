/**
 *
 * Modal
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CloseIcon from '@material-ui/icons/HighlightOff';
import Dialog from '@material-ui/core/Dialog';

const TgpDialog = styled(Dialog)`
  && {
    z-index: 2501 !important;

    .MuiDialog-paper {
      //position: relative;
      //width: 100vw;
      background-color: rgba(255, 255, 255, 0.7);
      //padding: 24px;
      //border-radius: 8px;
      //box-shadow: none;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;

const TopWrapper = styled.div`
  position: absolute;
  top: 24px;
  right: 24px;
`;

const TopClose = styled(CloseIcon)`
  font-size: 24px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.purple};
  &.purple {
    color: #fff;
  }
`;

function Modal({ closeModalCallback, children, open, showCloseButton = true }) {
  return (
    <TgpDialog
      onClose={closeModalCallback}
      open={open}
      fullScreen
      // style={modalStyles.dialog}
    >
      {showCloseButton && (
        <TopWrapper className="top-wrapper">
          <TopClose onClick={closeModalCallback} />
        </TopWrapper>
      )}
      {children}
    </TgpDialog>
  );
}

Modal.propTypes = {
  closeModalCallback: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  open: PropTypes.bool,
  showCloseButton: PropTypes.bool,
};

export default Modal;
