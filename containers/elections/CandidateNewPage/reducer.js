/*
 *
 * CandidateNewPage reducer
 *
 */
import produce from 'immer';

import types from './constants';

export const initialState = {
  candidate: false,
  loading: false,
  error: false,
  userSupports: false,
  candidateSupports: false,
};

const candidateNewPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.LOAD_CANDIDATE:
        draft.candidate = false;
        draft.loading = true;
        draft.error = false;
        break;

      case types.LOAD_CANDIDATE_SUCCESS:
        draft.candidate = action.candidate;
        draft.loading = false;
        draft.error = false;
        break;

      case types.LOAD_CANDIDATE_ERROR:
        draft.candidate = false;
        draft.loading = false;
        draft.error = action.error;
        break;

      case types.USER_SUPPORTS:
        draft.userSupports = false;
        break;

      case types.USER_SUPPORTS_SUCCESS:
        draft.userSupports = action.userSupports;
        break;

      case types.USER_SUPPORTS_ERROR:
        draft.userSupports = false;
        break;

      case types.CANDIDATE_SUPPORTS:
        draft.candidateSupports = false;
        break;

      case types.CANDIDATE_SUPPORTS_SUCCESS:
        draft.candidateSupports = action.candidateSupports;
        break;

      case types.CANDIDATE_SUPPORTS_ERROR:
        draft.candidateSupports = false;
        break;
    }
  });

export default candidateNewPageReducer;
