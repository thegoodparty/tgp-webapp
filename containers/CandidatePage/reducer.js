/*
 *
 * CandidateNewPage reducer
 *
 */
import produce from 'immer';

import types from './constants';

export const initialState = {
  claiming: undefined,
};

const candidatePageReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {

      case types.CLAIM:
        draft.claiming = true;
        break;

      case types.CLAIM_SUCCESS:
        draft.claiming = false;
        break;
    }
  });

export default candidatePageReducer;
