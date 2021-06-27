/*
 *
 * AdminCandidateStageSettingsPage reducer
 *
 */
import produce from 'immer';
import types from './constants';

export const initialState = {
  candidate: false,
};

/* eslint-disable default-case, no-param-reassign */
const adminCandidateStageSettingsPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.LOAD_CANDIDATE_SUCCESS:
        draft.candidate = action.candidate;
        break;
    }
  });

export default adminCandidateStageSettingsPageReducer;
