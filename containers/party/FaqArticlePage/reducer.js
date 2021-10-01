import produce from 'immer';
import types from './constants';

export const initialState = {
  article: false,
  loading: false,
  error: false,
};

/* eslint-disable default-case, no-param-reassign */
const faqArticleReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.LOAD_ARTICLE:
        draft.article = false;
        draft.loading = true;
        draft.error = false;
        break;
      case types.LOAD_ARTICLE_SUCCESS:
        draft.article = action.article;
        draft.loading = false;
        draft.error = false;
        break;
    }
  });

export default faqArticleReducer;
