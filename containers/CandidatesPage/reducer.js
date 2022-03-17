/*
 *
 * CandidateNewPage reducer
 *
 */
import produce from 'immer';

import types from './constants';

export const initialState = {
  positions: [],
  candidates: [],
};

const candidatesPageReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case types.SET_POSITIONS:
        draft.positions = action.positions;
        break;
      case types.SET_CANDIDATES:
        draft.candidates = action.candidates;
        break;
    }
  });

export default candidatesPageReducer;
