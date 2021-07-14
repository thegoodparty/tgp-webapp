/*
 *
 * AdminPage reducer
 *
 */
import produce from 'immer';
import types from './constants';

export const initialState = {
  candidates: false,
};

/* eslint-disable default-case, no-param-reassign */
const adminCandidateListPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.LOAD_CANDIDATES:
        draft.candidates = false;
        draft.loading = true;
        draft.error = false;
        break;
      case types.LOAD_CANDIDATES_SUCCESS:
        draft.candidates = action.candidates;
        draft.loading = false;
        draft.error = false;
        break;
      case types.LOAD_CANDIDATES_ERROR:
        draft.candidates = false;
        draft.loading = false;
        draft.error = action.error;
        break;
    }
  });

export default adminCandidateListPageReducer;
