import produce from 'immer';
import types from './constants';

const initialState = {
  content: false,
  loading: false,
  error: false,
  appVersion: '1.0.3',
};

const globalReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.LOAD_CONTENT:
        draft.content = false;
        draft.loading = true;
        draft.error = false;
        break;

      case types.LOAD_CONTENT_SUCCESS:
        draft.content = action.content;
        draft.loading = false;
        draft.error = false;
        break;

      case types.LOAD_CONTENT_ERROR:
        draft.content = false;
        draft.loading = false;
        draft.error = action.error;
        break;
    }
  });

export default globalReducer;
