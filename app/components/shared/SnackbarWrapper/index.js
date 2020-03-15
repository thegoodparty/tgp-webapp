/**
 *
 * SnackbarWrapper
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

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
  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={4000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert onClose={handleClose} severity={severity}>
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
