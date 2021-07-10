/*
 *
 * AdminPage reducer
 *
 */
import produce from 'immer';
import types from './constants';

export const initialState = {
  users: false,
  loading: false,
  error: false,
};

/* eslint-disable default-case, no-param-reassign */
const adminPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.LOAD_ALL_USERS:
        draft.users = false;
        draft.loading = true;
        draft.error = false;
        break;
      case types.LOAD_ALL_USERS_SUCCESS:
        draft.users = action.users;
        draft.loading = false;
        draft.error = false;
        break;
      case types.LOAD_ALL_USERS_ERROR:
        draft.users = false;
        draft.loading = false;
        draft.error = action.error;
        break;
    }
  });

export default adminPageReducer;
