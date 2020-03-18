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

const saveRankPresidentialCandidateAction = presidentialRank => ({
  type: types.SAVE_RANK_PRESIDENTIAL_CANDIDATE,
  presidentialRank,
});

const loadRankingFromCookieAction = () => ({
  type: types.LOAD_RANKING_FROM_COOKIE,
});

export default {
  loadCandidateAction,
  loadCandidateActionSuccess,
  loadCandidateActionError,
  saveRankPresidentialCandidateAction,
  loadRankingFromCookieAction,
};
