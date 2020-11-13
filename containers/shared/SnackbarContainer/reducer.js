/*
 *
 * SnackbarContainer reducer
 *
 */
import produce from 'immer';
import types from './constants';

export const initialState = {
  message: '',
  isOpen: false,
  severity: 'success',
};

/* eslint-disable default-case, no-param-reassign */
const snackbarContainerReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.SHOW_SNACKBAR:
        draft.message = action.message;
        draft.severity = action.severity;
        draft.isOpen = true;
        break;
      case types.HIDE_SNACKBAR:
        draft.message = '';
        draft.severity = initialState.severity;
        draft.isOpen = false;
        break;
    }
  });

export default snackbarContainerReducer;
