import types from './constants';

const refreshTokenAction = () => ({
  type: types.REFRESH_TOKEN,
});

const setArticleModalAction = modalArticleId => ({
  type: types.SET_ARTICLE_MODAL,
  modalArticleId,
});

const clearArticleModalAction = () => ({
  type: types.CLEAR_ARTICLE_MODAL,
});

const logErrorAction = (message, error) => ({
  type: types.LOG_ERROR,
  message,
  error,
});

export default {
  setArticleModalAction,
  clearArticleModalAction,
  logErrorAction,
  refreshTokenAction,
};
