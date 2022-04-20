/*
 *
 * CandidateNewPage reducer
 *
 */
import produce from 'immer';

import types from './constants';

export const initialState = {
  userSupports: false,
  candidateSupports: false,
  supportCount: false,
};

const candidatePageReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
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
        draft.supportCount = action.supportCount;
        break;

      case types.CANDIDATE_SUPPORTS_ERROR:
        draft.candidateSupports = false;
        break;
    }
  });

export default candidatePageReducer;
