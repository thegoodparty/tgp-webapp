import produce from 'immer';
import types from './constants';

const initialState = {
  loading: false,
  error: false,
  appVersion: '1.0.19',
  modalArticleId: false,
};

const globalReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.SET_ARTICLE_MODAL:
        draft.modalArticleId = action.modalArticleId;
        break;

      case types.CLEAR_ARTICLE_MODAL:
        draft.modalArticleId = false;
        break;
    }
  });

export default globalReducer;
