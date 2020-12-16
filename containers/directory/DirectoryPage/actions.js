import types from './constants';

const allCandidatesAction = () => ({
  type: types.ALL_CANDIDATES,
});

const allCandidatesActionSuccess = candidates => ({
  type: types.ALL_CANDIDATES_SUCCESS,
  candidates,
});

const allCandidatesActionError = error => ({
  type: types.ALL_CANDIDATES_SUCCESS,
  error,
});

export default {
  allCandidatesAction,
  allCandidatesActionSuccess,
  allCandidatesActionError,
};
