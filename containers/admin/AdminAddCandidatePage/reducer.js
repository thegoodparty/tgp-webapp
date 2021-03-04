/*
 *
 * AdminAddCandidatePage reducer
 *
 */
import produce from 'immer';
import types from './constants';

export const initialState = {};

/* eslint-disable default-case, no-param-reassign */
const adminAddCandidatePageReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case types.CREATE_CANDIDATE:
        break;
    }
  });

export default adminAddCandidatePageReducer;
