import types from './constants';

const loadInactiveCandidateAction = id => ({
  type: types.LOAD_INACTIVE_CANDIDATE,
  id,
});

const loadCandidateAction = id => ({
  type: types.LOAD_CANDIDATE,
  id,
});

const loadCandidateActionSuccess = candidate => ({
  type: types.LOAD_CANDIDATE_SUCCESS,
  candidate,
});

const shareImageAction = candidate => ({
  type: types.SHARE_IMAGE,
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

const candidateSupportsActionSuccess = (candidateSupports, total) => ({
  type: types.CANDIDATE_SUPPORTS_SUCCESS,
  candidateSupports,
  total,
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

const adminDeleteSupportAction = (supportId, candidateId) => ({
  type: types.ADMIN_DELETE_SUPPORT,
  supportId,
  candidateId,
});

const trackShare = candidateId => ({
  type: types.TRACK_SHARE,
  candidateId,
});

export default {
  loadInactiveCandidateAction,

  loadCandidateAction,
  loadCandidateActionSuccess,
  loadCandidateActionError,
  shareImageAction,

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
  adminDeleteSupportAction,

  trackShare,
};
