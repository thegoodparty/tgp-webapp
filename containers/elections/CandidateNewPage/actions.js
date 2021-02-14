import types from './constants';

const loadCandidateAction = (id, chamber, isIncumbent) => ({
  type: types.LOAD_CANDIDATE,
  id,
  chamber,
  isIncumbent,
});

const loadCandidateActionSuccess = candidate => ({
  type: types.LOAD_CANDIDATE_SUCCESS,
  candidate,
});

const loadCandidateActionError = error => ({
  type: types.LOAD_CANDIDATE_ERROR,
  error,
});

const supportAction = candidateId => ({
  type: types.SUPPORT,
  candidateId,
});

const supportActionSuccess = () => ({
  type: types.SUPPORT_SUCCESS,
});

const supportActionError = error => ({
  type: types.SUPPORT_ERROR,
  error,
});

const candidateSupportsAction = candidateId => ({
  type: types.CANDIDATE_SUPPORTS,
  candidateId,
});

const candidateSupportsActionSuccess = candidateSupports => ({
  type: types.CANDIDATE_SUPPORTS_SUCCESS,
  candidateSupports,
});

const candidateSupportsActionError = error => ({
  type: types.CANDIDATE_SUPPORTS_ERROR,
  error,
});
const userSupportsAction = () => ({
  type: types.USER_SUPPORTS,
});

const userSupportsActionSuccess = userSupports => ({
  type: types.USER_SUPPORTS_SUCCESS,
  userSupports,
});

const userSupportsActionError = error => ({
  type: types.USER_SUPPORTS_ERROR,
  error,
});

const removeSupportAction = candidateId => ({
  type: types.REMOVE_SUPPORT,
  candidateId,
});

const updateSupportAction = (candidateId, message) => ({
  type: types.UPDATE_SUPPORT,
  candidateId,
  message,
});

export default {
  loadCandidateAction,
  loadCandidateActionSuccess,
  loadCandidateActionError,

  supportAction,
  supportActionSuccess,
  supportActionError,

  candidateSupportsAction,
  candidateSupportsActionSuccess,
  candidateSupportsActionError,

  userSupportsAction,
  userSupportsActionSuccess,
  userSupportsActionError,

  removeSupportAction,
  updateSupportAction,
};
