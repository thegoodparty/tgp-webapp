import produce from 'immer';
import types from './constants';

export const initialState = {
  candidates: false,
  loading: false,
  error: false,
};

const globalReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.ALL_CANDIDATES:
        draft.candidates = false;
        draft.loading = true;
        draft.error = false;
        break;

      case types.ALL_CANDIDATES_SUCCESS:
        draft.candidates = action.candidates;
        draft.loading = false;
        draft.error = false;
        break;

      case types.ALL_CANDIDATES:
        draft.candidates = false;
        draft.loading = false;
        draft.error = action.error;
        break;
    }
  });

export default globalReducer;
