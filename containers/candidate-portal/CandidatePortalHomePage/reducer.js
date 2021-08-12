/*
 *
 * AdminPage reducer
 *
 */
import produce from 'immer';
import types from './constants';

export const initialState = {
  candidate: false,
};

/* eslint-disable default-case, no-param-reassign */
const candidatePortalHomePageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.FIND_CANDIDATE:
        draft.candidate = false;
        draft.loading = true;
        draft.error = false;
        break;
      case types.FIND_CANDIDATE_SUCCESS:
        draft.candidate = action.candidate;
        draft.loading = false;
        draft.error = false;
        break;
    }
  });

export default candidatePortalHomePageReducer;
