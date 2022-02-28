import types from './constants';

const loadCandidateAction = (id, chamber, isIncumbent) => ({
  type: types.LOAD_CANDIDATE,
  id,
  chamber,
  isIncumbent,
});

const loadCandidateActionSuccess = (candidate) => ({
  type: types.LOAD_CANDIDATE_SUCCESS,
  candidate,
});

const loadCandidateActionError = (error) => ({
  type: types.LOAD_CANDIDATE_ERROR,
  error,
});

const shareImageAction = (candidate) => ({
  type: types.SHARE_IMAGE,
  candidate,
});

export default {
  loadCandidateAction,
  loadCandidateActionSuccess,
  loadCandidateActionError,

  shareImageAction,
};
