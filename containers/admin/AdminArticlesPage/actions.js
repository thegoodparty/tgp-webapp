import types from './constants';

function loadArticlesFeedback() {
  return {
    type: types.LOAD_ARTICLES_FEEDBACK,
  };
}

function loadArticlesFeedbackSuccess(articlesFeedback) {
  return {
    type: types.LOAD_ARTICLES_FEEDBACK_SUCCESS,
    articlesFeedback,
  };
}

export default {
  loadArticlesFeedback,
  loadArticlesFeedbackSuccess,
};
