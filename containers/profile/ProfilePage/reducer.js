/*
 *
 * ProfilePage reducer
 *
 */
import produce from 'immer';
import types from './constants';

export const initialState = {
  loading: false,
  candidates: false,
};

/* eslint-disable default-case, no-param-reassign */
const profilePageReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case types.LOAD_CANDIDATES:
        draft.loading = true;
        draft.candidates = [];
        break;
      case types.LOAD_CANDIDATES_SUCCESS:
        draft.loading = false;
        draft.candidates = action.candidates;
        break;
      case types.LOAD_CANDIDATES_ERROR:
        draft.loading = false;
        draft.candidates = [];
        break;
    }
  });

export default profilePageReducer;
