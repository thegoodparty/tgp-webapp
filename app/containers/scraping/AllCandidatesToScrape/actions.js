import types from './constants';

const loadAllCandidatesAction = () => ({
  type: types.LOAD_ALL_CANDIDATES,
});

const loadAllCandidatesActionSuccess = candidates => ({
  type: types.LOAD_ALL_CANDIDATES_SUCCESS,
  candidates,
});

const loadAllCandidatesActionError = error => ({
  type: types.LOAD_ALL_CANDIDATES_ERROR,
  error,
});

export default {
  loadAllCandidatesAction,
  loadAllCandidatesActionSuccess,
  loadAllCandidatesActionError,
};
