/*
 *
 * AdminUpdateRequestsPage reducer
 *
 */
import produce from 'immer';
import types from './constants';

export const initialState = {
  ugc: false,
  topIssues: false,
};

/* eslint-disable default-case, no-param-reassign */
const adminUpdateRequestsPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.LOAD_UGC_SUCCESS:
        draft.ugc = action.ugc;
        break;
      case types.LOAD_TOP_ISSUES_SUCCESS:
        draft.topIssues = action.topIssues;
        break;
    }
  });

export default adminUpdateRequestsPageReducer;
