/*
 *
 * HomePage reducer
 *
 */
import produce from 'immer';
import types from './constants';

export const initialState = {
  topics: [],
  topicsFeedback: false,
};

/* eslint-disable default-case, no-param-reassign */
const adminTopicsPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.LOAD_TOPICS_SUCCESS:
        draft.topics = action.topics;
        break;
      case types.LOAD_TOPICS_FEEDBACK_SUCCESS:
        draft.topicsFeedback = action.topicsFeedback;
        break;
    }
  });

export default adminTopicsPageReducer;
