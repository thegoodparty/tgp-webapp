/*
 *
 * AdminCandidateStageSettingsPage reducer
 *
 */
import produce from 'immer';
import types from './constants';

export const initialState = {};

/* eslint-disable default-case, no-param-reassign */
const adminCandidateStageSettingsPageReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case types.UPDATE_CANDIDATE:
        break;
    }
  });

export default adminCandidateStageSettingsPageReducer;
