/*
 *
 * SnackbarContainer actions
 *
 */

import types from './constants';

const showSnakbarAction = (message, severity = 'success') => ({
  type: types.SHOW_SNACKBAR,
  message,
  severity,
});

const hideSnakbarAction = () => ({
  type: types.HIDE_SNACKBAR,
});

export default {
  showSnakbarAction,
  hideSnakbarAction,
};
