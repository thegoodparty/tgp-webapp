/*
 *
 * AdminPage reducer
 *
 */
import produce from 'immer';
import types from './constants';

export const initialState = {
  candidate: false,
  stats: false,
  role: false,
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
      case types.LOAD_STATS_SUCCESS:
        draft.stats = action.stats;
        break;
      case types.LOAD_ROLE_SUCCESS:
        draft.role = action.role;
        break;
    }
  });

export default candidatePortalHomePageReducer;
