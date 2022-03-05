/*
 *
 * AdminPage reducer
 *
 */
import produce from 'immer';
import types from './constants';

export const initialState = {
  candidateUgc: false,
  loading: false,
  s3Url: false,
};

/* eslint-disable default-case, no-param-reassign */
const portalCampaignManagerPageReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case types.FIND_UGC:
        break;
      case types.FIND_UGC_SUCCESS:
        draft.candidateUgc = action.candidateUgc;
        break;

      case types.SAVE_IMAGE:
        draft.loading = true;
        break;
      case types.SAVE_IMAGE_SUCCESS:
        draft.s3Url = action.s3Url;
        draft.loading = false;
        break;
    }
  });

export default portalCampaignManagerPageReducer;
