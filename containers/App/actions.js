import types from './constants';

const refreshTokenAction = () => ({
  type: types.REFRESH_TOKEN,
});

const loadContentAction = () => ({
  type: types.LOAD_CONTENT,
});

const loadContentActionSuccess = content => ({
  type: types.LOAD_CONTENT_SUCCESS,
  content,
});

const loadContentActionError = error => ({
  type: types.LOAD_CONTENT_ERROR,
  error,
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
  loadContentAction,
  loadContentActionSuccess,
  loadContentActionError,
  setArticleModalAction,
  clearArticleModalAction,
  logErrorAction,
  refreshTokenAction,
};
