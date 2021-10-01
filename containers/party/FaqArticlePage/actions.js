import types from './constants';

const sendArticleFeedbackAction = (id, title, isHelpful, feedback) => ({
  type: types.SEND_ARTICLE_FEEDBACK,
  id,
  title,
  isHelpful,
  feedback,
});

const loadArticleAction = id => ({
  type: types.LOAD_ARTICLE,
  id,
});

const loadArticleActionSuccess = article => ({
  type: types.LOAD_ARTICLE_SUCCESS,
  article,
});

export default {
  sendArticleFeedbackAction,

  loadArticleAction,
  loadArticleActionSuccess,
};
