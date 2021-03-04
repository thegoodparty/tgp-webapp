/*
 *
 * CandidateNewPage reducer
 *
 */
import produce from 'immer';
import { getCookie, setCookie } from 'helpers/cookieHelper';

import types from './constants';

export const initialState = {
  candidate: false,
  loading: false,
  error: false,
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
    }
  });

export default candidateNewPageReducer;
