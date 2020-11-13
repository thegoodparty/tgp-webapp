import types from './constants';

const loadIncumbentsAction = () => ({
  type: types.LOAD_INCUMBENTS,
});

const loadIncumbentsActionSuccess = incumbents => ({
  type: types.LOAD_INCUMBENTS_SUCCESS,
  incumbents,
});

const loadIncumbentsActionError = error => ({
  type: types.LOAD_INCUMBENTS_ERROR,
  error,
});

export default {
  loadIncumbentsAction,
  loadIncumbentsActionSuccess,
  loadIncumbentsActionError,
};
