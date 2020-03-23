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

const saveRankSenateCandidateAction = senateRank => ({
  type: types.SAVE_RANK_SENATE_CANDIDATE,
  senateRank,
});

const saveRankHouseCandidateAction = houseRank => ({
  type: types.SAVE_RANK_HOUSE_CANDIDATE,
  houseRank,
});

const loadRankingFromCookieAction = () => ({
  type: types.LOAD_RANKING_FROM_COOKIE,
});

const loadDistrictIncumbentAction = (state, district) => ({
  type: types.LOAD_DISTRICT_INCUMBENT,
  state,
  district,
});

const loadDistrictIncumbentActionSuccess = incumbent => ({
  type: types.LOAD_DISTRICT_INCUMBENT_SUCCESS,
  incumbent,
});

export default {
  loadCandidateAction,
  loadCandidateActionSuccess,
  loadCandidateActionError,
  saveRankPresidentialCandidateAction,
  saveRankSenateCandidateAction,
  saveRankHouseCandidateAction,
  loadRankingFromCookieAction,
  loadDistrictIncumbentAction,
  loadDistrictIncumbentActionSuccess,
};
