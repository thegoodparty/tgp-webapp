/*
 *
 * AdminPage reducer
 *
 */
import produce from 'immer';
import types from './constants';

export const initialState = {
  loading: false,
  s3Url: false,
};

/* eslint-disable default-case, no-param-reassign */
const portalCampaignManagerPageReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case types.SAVE_IMAGE:
        draft.s3Url = false;
        draft.loading = true;
        break;
      case types.SAVE_IMAGE_SUCCESS:
        draft.s3Url = action.s3Url;
        draft.loading = false;
        break;
    }
  });

export default portalCampaignManagerPageReducer;
