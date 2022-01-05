/*
 *
 * Issue Topics reducer
 *
 */
import produce from 'immer';
import types from './constants';

export const initialState = {
  topics: [],
};

/* eslint-disable default-case, no-param-reassign */
const issuePositionsPickerContainerReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.LOAD_ISSUE_TOPICS_SUCCESS:
        draft.topics = action.topics;
        break;
    }
  });

export default issuePositionsPickerContainerReducer;
