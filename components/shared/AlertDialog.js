import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import WarningIcon from '@material-ui/icons/Warning';
import BlackButton, { InnerButton } from './buttons/BlackButton';

const AlertWrapper = styled.div`
  padding: 32px;
`;

const Title = styled.div`
  font-size: 28px;
  display: flex;
  align-items: center;
  font-weight: 900;
`;

const Summary = styled.div`
  font-size: 17px;
  margin: 32px 0;
`;

const Buttons = styled.div``;
function AlertDialog({
  handleClose,
  handleProceed,
  open,
  title,
  description,
  ariaLabel,
}) {
  return (
    <Dialog onClose={handleClose} aria-labelledby={ariaLabel} open={open}>
      <AlertWrapper>
        <Title id="alert-dialog-title">
          <WarningIcon /> &nbsp; {title}
        </Title>
        <Summary id="alert-dialog-description">{description}</Summary>
        <Buttons className="flex-center">
          <BlackButton
            className="outlined"
            onClick={handleClose}
            color="primary"
            style={{ marginRight: '26px' }}
          >
            <InnerButton style={{ fontSize: '11px', fontWeight: 900 }}>
              Cancel
            </InnerButton>
          </BlackButton>
          <BlackButton onClick={handleProceed} color="primary" autoFocus>
            <InnerButton style={{ fontSize: '11px', fontWeight: 900 }}>
              Proceed
            </InnerButton>
          </BlackButton>
        </Buttons>
      </AlertWrapper>
    </Dialog>
  );
}

AlertDialog.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  handleProceed: PropTypes.func,
  title: PropTypes.string,
  description: PropTypes.string,
  ariaLabel: PropTypes.string,
};

export default AlertDialog;
