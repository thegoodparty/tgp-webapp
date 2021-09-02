/*
 *
 * AdminPage reducer
 *
 */
import produce from 'immer';
import types from './constants';

export const initialState = {
  user: false,
};

/* eslint-disable default-case, no-param-reassign */
const adminPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.FIND_ASSOCIATED_USER_SUCCESS:
        draft.user = action.user;
        break;
    }
  });

export default adminPageReducer;
