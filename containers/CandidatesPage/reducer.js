/*
 *
 * CandidateNewPage reducer
 *
 */
import produce from 'immer';

import types from './constants';

export const initialState = {};

const candidatesPageReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case types.NONE:
        break;
    }
  });

export default candidatesPageReducer;
