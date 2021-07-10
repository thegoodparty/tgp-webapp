/*
 *
 * AdminPage reducer
 *
 */
import produce from 'immer';
import types from './constants';

export const initialState = {
  articlesFeedback: false,
};

/* eslint-disable default-case, no-param-reassign */
const adminArticlesPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.LOAD_ARTICLES_FEEDBACK_SUCCESS:
        draft.articlesFeedback = action.articlesFeedback;
        break;
    }
  });

export default adminArticlesPageReducer;
