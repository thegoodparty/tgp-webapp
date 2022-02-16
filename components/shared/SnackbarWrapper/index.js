/**
 *
 * SnackbarWrapper
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import theme from '/theme';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function SnackbarWrapper({ message, severity, isOpen, closeCallback }) {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    closeCallback();
  };
  const width = typeof window !== 'undefined' ? window.innerWidth : 1200;
  let vertical = 'top';
  if (width > theme.breakpointsPixels.mdPx) {
    vertical = 'bottom';
  }
  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={4000}
      onClose={handleClose}
      anchorOrigin={{ vertical, horizontal: 'center' }}
    >
      <Alert onClose={handleClose} severity={severity} data-cy="alert">
        {message}
      </Alert>
    </Snackbar>
  );
}

SnackbarWrapper.propTypes = {
  message: PropTypes.string,
  severity: PropTypes.string,
  isOpen: PropTypes.bool,
  closeCallback: PropTypes.func,
};

export default SnackbarWrapper;
