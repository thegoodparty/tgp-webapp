/*
 *
 * AdminPage reducer
 *
 */
import produce from 'immer';
import types from './constants';

export const initialState = {
  candidateUgc: false,
};

/* eslint-disable default-case, no-param-reassign */
const portalCampaignManagerPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.FIND_UGC:
        draft.loading = true;
        draft.error = false;
        break;
      case types.FIND_UGC_SUCCESS:
        draft.candidateUgc = action.candidateUgc;
        draft.loading = false;
        draft.error = false;
        break;
    }
  });

export default portalCampaignManagerPageReducer;
