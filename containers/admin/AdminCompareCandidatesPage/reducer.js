/*
 *
 * AdminCandidateStageSettingsPage reducer
 *
 */
import produce from 'immer';
import types from './constants';

export const initialState = {
  topics: [],
};

/* eslint-disable default-case, no-param-reassign */
const adminCandidateStageSettingsPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.LOAD_TOPICS_SUCCESS:
        draft.topics = action.topics;
        break;
    }
  });

export default adminCandidateStageSettingsPageReducer;
