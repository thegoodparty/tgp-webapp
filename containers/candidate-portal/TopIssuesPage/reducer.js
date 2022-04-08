/*
 *
 * TopIssuesPage reducer
 *
 */
import produce from 'immer';
import types from './constants';

export const initialState = {
  candidatePositions: [],
  topIssues: [],
};

/* eslint-disable default-case, no-param-reassign */
const topIssuesPageReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case types.FIND_CANDIDATE_POSITIONS:
        draft.loading = true;
        draft.error = false;
        break;
      case types.FIND_CANDIDATE_POSITIONS_SUCCESS:
        draft.candidatePositions = action.candidatePositions;
        draft.loading = false;
        draft.error = false;
        break;
      case types.LOAD_TOP_ISSUES_SUCCESS:
        draft.topIssues = action.topIssues;
        break;
    }
  });

export default topIssuesPageReducer;
