/*
 *
 * ProfilePage reducer
 *
 */
import produce from 'immer';
import types from './constants';

export const initialState = {
  loading: false,
  userSupported: false,
};

/* eslint-disable default-case, no-param-reassign */
const profilePageReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case types.LOAD_USER_SUPPORTED:
        draft.loading = false;
        draft.userSupported = false;
        break;

      case types.LOAD_USER_SUPPORTED_SUCCESS:
        draft.loading = false;
        draft.userSupported = action.userSupported;
        break;

    }
  });

export default profilePageReducer;
