/*
 *
 * LeaderboardPage actions
 *
 */

import types from './constants';

const loadCrewAction = () => ({
  type: types.LOAD_CREW,
});

const loadCrewActionSuccess = crew => ({
  type: types.LOAD_CREW_SUCCESS,
  crew,
});

const loadLeaderboradAction = () => ({
  type: types.LOAD_LEADERBOARD,
});

const loadLeaderboradActionSuccess = leaderboard => ({
  type: types.LOAD_LEADERBOARD_SUCCESS,
  leaderboard,
});

export default {
  loadCrewAction,
  loadCrewActionSuccess,

  loadLeaderboradAction,
  loadLeaderboradActionSuccess,
};
