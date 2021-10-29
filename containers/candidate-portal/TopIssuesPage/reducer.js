/*
 *
 * TopIssuesPage reducer
 *
 */
import produce from 'immer';
import types from './constants';

export const initialState = {
  candidateIssue: false,
};

/* eslint-disable default-case, no-param-reassign */
const topIssuesPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.FIND_ISSUE:
        draft.loading = true;
        draft.error = false;
        break;
      case types.FIND_ISSUE_SUCCESS:
        draft.candidateIssue = action.candidateIssue;
        draft.loading = false;
        draft.error = false;
        break;
    }
  });

export default topIssuesPageReducer;
