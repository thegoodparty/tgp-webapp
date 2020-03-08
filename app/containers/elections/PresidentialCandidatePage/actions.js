import types from './constants';

const loadPresidentialCandidateAction = id => ({
  type: types.LOAD_PRESIDENTIAL_CANDIDATE,
  id,
});

const loadPresidentialCandidateActionSuccess = candidate => ({
  type: types.LOAD_PRESIDENTIAL_CANDIDATE_SUCCESS,
  candidate,
});

const loadPresidentialCandidateActionError = error => ({
  type: types.LOAD_PRESIDENTIAL_CANDIDATE_ERROR,
  error,
});

const saveRankPresidentialCandidateAction = presidentialRank => ({
  type: types.SAVE_RANK_PRESIDENTIAL_CANDIDATE,
  presidentialRank,
});

const loadRankingFromCookieAction = () => ({
  type: types.LOAD_RANKING_FROM_COOKIE,
});

export default {
  loadPresidentialCandidateAction,
  loadPresidentialCandidateActionSuccess,
  loadPresidentialCandidateActionError,
  saveRankPresidentialCandidateAction,
  loadRankingFromCookieAction,
};
