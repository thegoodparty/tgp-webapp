import types from './constants';

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

export default {
  loadContentAction,
  loadContentActionSuccess,
  loadContentActionError,
};
