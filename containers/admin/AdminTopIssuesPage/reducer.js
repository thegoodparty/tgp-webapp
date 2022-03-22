/*
 *
 * Issue Topics reducer
 *
 */
import produce from 'immer';
import types from './constants';

export const initialState = {
  topIssues: [],
};

/* eslint-disable default-case, no-param-reassign */
const adminTopIssuesPageReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case types.LOAD_TOP_ISSUES_SUCCESS:
        draft.topIssues = action.topIssues;
        break;
    }
  });

export default adminTopIssuesPageReducer;
