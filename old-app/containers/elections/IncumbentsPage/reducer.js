import produce from 'immer';

import types from './constants';

export const initialState = {
  incumbents: false,
  loading: false,
  error: false,
};

const incumbentsPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.LOAD_INCUMBENTS:
        draft.incumbents = false;
        draft.loading = true;
        draft.error = false;
        break;

      case types.LOAD_INCUMBENTS_SUCCESS:
        draft.incumbents = action.incumbents;
        draft.loading = false;
        draft.error = false;
        break;

      case types.LOAD_INCUMBENTS_ERROR:
        draft.incumbents = false;
        draft.loading = false;
        draft.error = action.error;
        break;
    }
  });

export default incumbentsPageReducer;
