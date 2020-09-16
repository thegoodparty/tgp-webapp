import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import WarningIcon from '@material-ui/icons/Warning';

const AlertWrapper = styled.div`
  border: solid 1px red;
`;
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
        <DialogTitle id="alert-dialog-title" data-cy="alert-dialog-title">
          <WarningIcon /> {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" data-cy="alert-dialog-description">
            {description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" data-cy="alert-dialog-cancel">
            Cancel
          </Button>
          <Button onClick={handleProceed} color="primary" autoFocus data-cy="alert-dialog-proceed">
            Proceed
          </Button>
        </DialogActions>
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
